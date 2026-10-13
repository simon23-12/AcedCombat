"""Radio chatter: neural TTS (Piper voices) -> radio processing (band-pass, saturation, compression, hiss,
squelch clicks) -> assets/audio/voice/<id>.mp3 + lines.json manifest for the game.

usage: <venv-with-piper>/bin/python tools/make_voices.py <voices_dir> [ids...]
needs: piper-tts, numpy, scipy, ffmpeg; espeak data at build/espeak-ng-data (short path, see README)
"""
import os, sys, json, wave, subprocess, io
import numpy as np
from scipy import signal
from piper import PiperVoice, SynthesisConfig

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "audio", "voice")
os.makedirs(OUT, exist_ok=True)
VDIR = sys.argv[1]
ONLY = set(sys.argv[2:])
ESPEAK = os.path.join(ROOT, "build", "espeak-ng-data")
spec = json.load(open(os.path.join(ROOT, "tools", "voice_script.json")))
SR = 22050
rng = np.random.default_rng(5)
voices = {}


def synth(voice, text, rate):
    if voice not in voices:
        voices[voice] = PiperVoice.load(os.path.join(VDIR, voice + ".onnx"), espeak_data_dir=ESPEAK)
    v = voices[voice]
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        v.synthesize_wav(text, w, syn_config=SynthesisConfig(length_scale=1.0 / rate, noise_scale=0.6, noise_w_scale=0.75))
    buf.seek(0)
    with wave.open(buf, "rb") as w:
        sr = w.getframerate()
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
    if sr != SR:
        a = signal.resample_poly(a, SR, sr)
    return a


def pitch(a, semis):
    if not semis:
        return a
    f = 2 ** (semis / 12)
    n = int(len(a) / f)
    return signal.resample(a, n).astype(np.float32)


def radio(a, heavy=False):
    lo, hi = (380, 2900) if heavy else (300, 3400)
    sos = signal.butter(4, [lo, hi], btype="band", fs=SR, output="sos")
    y = signal.sosfilt(sos, a)
    y = y / (np.abs(y).max() + 1e-6)
    drive = 3.2 if heavy else 2.2
    y = np.tanh(y * drive) / np.tanh(drive)
    # presence peak
    b, a2 = signal.iirpeak(1800, 1.2, fs=SR)
    y = y + 0.25 * signal.lfilter(b, a2, y)
    # hiss under the voice + squelch bursts
    env = np.convolve(np.abs(y), np.ones(400) / 400, mode="same")
    hiss = rng.normal(0, 1, len(y)) * (0.025 + 0.02 * (env > 0.02))
    hiss = signal.sosfilt(sos, hiss)
    y = y + hiss
    pre = signal.sosfilt(sos, rng.normal(0, 1, int(0.07 * SR))) * np.linspace(0.6, 0.0, int(0.07 * SR))
    click = np.zeros(int(0.012 * SR)); click[:30] = np.linspace(0.8, 0, 30)
    post_n = int(0.16 * SR)
    post = signal.sosfilt(sos, rng.normal(0, 1, post_n)) * np.concatenate([np.linspace(0, 0.5, post_n // 5), np.linspace(0.5, 0, post_n - post_n // 5)])
    y = np.concatenate([click, pre * 0.5, np.zeros(int(0.03 * SR)), y, np.zeros(int(0.05 * SR)), post * 0.6])
    return y / (np.abs(y).max() + 1e-6) * 0.92


def studio(a):
    sos = signal.butter(2, 90, btype="high", fs=SR, output="sos")
    y = signal.sosfilt(sos, a)
    y = np.tanh(y / (np.abs(y).max() + 1e-6) * 1.3) / np.tanh(1.3)
    return y * 0.9


def write_mp3(y, path):
    pcm = (np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-",
                    "-codec:a", "libmp3lame", "-b:a", "48k", path], input=pcm, check=True)


manifest = {}
mpath = os.path.join(OUT, "lines.json")
if ONLY and os.path.exists(mpath):
    manifest = json.load(open(mpath))
for lid, spk, text in spec["lines"]:
    S = spec["speakers"][spk]
    if ONLY and lid not in ONLY:
        continue
    a = synth(S["voice"], text, S.get("rate", 1.0))
    a = pitch(a, S.get("pitch", 0))
    y = studio(a) if S.get("clean") else radio(a, heavy=spk in ("BANDIT", "CRIMSON 1"))
    fn = f"assets/audio/voice/{lid}.mp3"
    write_mp3(y, os.path.join(ROOT, fn))
    manifest[lid] = dict(file=fn, speaker=spk, color=S["color"], text=text, dur=round(len(y) / SR, 2))
    print(lid, manifest[lid]["dur"], flush=True)
json.dump(manifest, open(mpath, "w"), indent=1)
print("lines:", len(manifest))
