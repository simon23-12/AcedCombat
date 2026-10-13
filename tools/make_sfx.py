"""Synthesised sound effects -> assets/audio/<name>.mp3
gun (seamless loop of a 6000 rpm cannon), msl (launch + motor roar), boom1/boom2 (explosions with tail), splash,
cat (catapult steam stroke), trap (arresting wire), flare (pop + hiss), hit (metal impact)

python3 tools/make_sfx.py
"""
import os, subprocess
import numpy as np
from scipy import signal

SR = 44100
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "audio")
rng = np.random.default_rng(3)


def lp(x, f, o=2): return signal.sosfilt(signal.butter(o, f / (SR / 2), "low", output="sos"), x)
def hp(x, f, o=2): return signal.sosfilt(signal.butter(o, f / (SR / 2), "high", output="sos"), x)
def bp(x, a, b, o=2): return signal.sosfilt(signal.butter(o, [a / (SR / 2), b / (SR / 2)], "band", output="sos"), x)
def noise(n): return rng.normal(0, 1, n)
def t_(d): return np.arange(int(d * SR)) / SR


def reverb(x, rt=1.6, mix=0.3):
    n = int(rt * SR); t = np.arange(n) / SR
    ir = lp(noise(n) * np.exp(-t * 6.9 / rt), 3500)
    ir[:int(0.01 * SR)] = 0
    w = signal.fftconvolve(x, ir / np.sqrt(np.sum(ir ** 2)))
    y = np.zeros(len(w)); y[:len(x)] = x
    return y * (1 - mix) + w * mix


def write(name, x, stereo=False, rate="96k", wav=False):
    x = x / (np.abs(x).max() + 1e-9) * 0.95
    pcm = (x * 32767).astype(np.int16).tobytes()
    if wav:   # loops must be sample-exact (mp3 adds encoder padding)
        import wave
        with wave.open(os.path.join(OUT, name + ".wav"), "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm)
        print(name, "wav", f"{len(x) / SR:.2f}s")
        return
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(SR), "-ac", "1", "-i", "-", "-codec:a", "libmp3lame", "-b:a", rate,
                    os.path.join(OUT, name + ".mp3")], input=pcm, check=True)
    print(name, f"{len(x) / SR:.2f}s")


def gun():
    # 100 rounds/s; loop length exactly 50 rounds -> seamless
    period = SR // 100
    n = period * 50
    x = np.zeros(n)
    for k in range(50):
        i = k * period + rng.integers(-8, 8)
        m = int(0.03 * SR)
        tt = np.arange(m) / SR
        shot = (noise(m) * np.exp(-tt * 140) * 0.9 + np.sin(2 * np.pi * (120 + rng.random() * 20) * tt) * np.exp(-tt * 90) * 0.8)
        seg = np.arange(i, i + m) % n
        x[seg] += shot
    x = lp(x, 3800) + hp(x, 2500) * 0.2
    x = np.tanh(x * 1.8)
    # gentle body rumble (periodic)
    tt = np.arange(n) / SR
    x += np.sin(2 * np.pi * 100 * tt) * 0.25
    return x


def missile():
    t = t_(2.6)
    ign = noise(len(t)) * np.exp(-t * 18) * 1.2
    roar = bp(noise(len(t)), 300, 4500) * np.minimum(1, t / 0.08) * np.exp(-t * 0.9)
    whoosh = np.zeros(len(t))
    nz = noise(len(t))
    # moving band-pass to suggest the missile pulling away (doppler-ish)
    for i in range(0, len(t), 1024):
        f = 2600 * np.exp(-t[i] * 1.1) + 300
        seg = bp(nz[i:i + 1024], f * 0.6, min(f * 1.6, 16000))
        whoosh[i:i + len(seg)] = seg
    x = ign + roar * 0.8 + whoosh * np.exp(-t * 1.4) * 0.9
    return reverb(x, 1.2, 0.25)


def boom(seed, size=1.0):
    r = np.random.default_rng(seed)
    t = t_(3.5)
    n = len(t)
    crack = hp(r.normal(0, 1, n), 1500) * np.exp(-t * 40) * 0.8
    body = lp(r.normal(0, 1, n), 700) * np.exp(-t * 2.2) * 3.0
    sub = np.sin(2 * np.pi * np.cumsum(50 + 60 * np.exp(-t * 8)) / SR) * np.exp(-t * 3) * 1.5
    rumble = lp(r.normal(0, 1, n), 180) * np.exp(-t * 0.9) * 2.5 * size
    debris = np.zeros(n)
    for k in range(25):
        i = int(r.uniform(0.1, 1.8) * SR)
        m = int(0.04 * SR)
        if i + m < n:
            debris[i:i + m] += hp(r.normal(0, 1, m), 2000) * np.exp(-np.arange(m) / SR * 80) * r.uniform(0.05, 0.25)
    x = np.tanh((crack + body + sub + rumble + debris) * 1.2)
    return reverb(x, 2.4, 0.35)


def splash():
    t = t_(2.2)
    x = bp(noise(len(t)), 300, 6000) * (np.minimum(1, t / 0.02) * np.exp(-t * 2.4))
    x += lp(noise(len(t)), 300) * np.exp(-t * 6) * 1.5
    return reverb(x, 1.0, 0.2)


def catapult():
    t = t_(3.0)
    hiss = hp(noise(len(t)), 1500) * np.minimum(1, t / 0.05) * np.exp(-t * 1.4)
    thump = lp(noise(len(t)), 200) * np.exp(-t * 6) * 2
    clank = np.zeros(len(t)); i = int(2.3 * SR); m = int(0.3 * SR)
    tt = np.arange(m) / SR
    clank[i:i + m] = (np.sin(2 * np.pi * 310 * tt) + np.sin(2 * np.pi * 517 * tt) * 0.6) * np.exp(-tt * 14) + lp(noise(m), 1200) * np.exp(-tt * 30)
    x = hiss + thump + clank * 0.9
    return reverb(x, 1.0, 0.2)


def trap():
    t = t_(2.0)
    bang = lp(noise(len(t)), 900) * np.exp(-t * 10) * 2
    ring = sum(np.sin(2 * np.pi * f * t) * np.exp(-t * d) * g for f, d, g in ((180, 4, 1), (412, 6, 0.6), (733, 8, 0.4), (1290, 10, 0.25)))
    hyd = bp(noise(len(t)), 200, 900) * np.exp(-((t - 0.7) / 0.5) ** 2) * 0.8
    return reverb(bang + ring * 0.6 + hyd, 0.9, 0.2)


def flare():
    t = t_(1.4)
    pop = np.zeros(len(t))
    for k in range(4):
        i = int(k * 0.07 * SR); m = int(0.05 * SR)
        pop[i:i + m] += lp(noise(m), 2500) * np.exp(-np.arange(m) / SR * 60)
    hiss = hp(noise(len(t)), 3000) * np.exp(-t * 2.5) * 0.4
    return pop * 1.4 + hiss


def hit():
    t = t_(0.6)
    x = hp(noise(len(t)), 800) * np.exp(-t * 30)
    x += sum(np.sin(2 * np.pi * f * t) * np.exp(-t * 18) for f in (620, 1130, 1870)) * 0.4
    return np.tanh(x * 2)


if __name__ == "__main__":
    write("gun", gun(), wav=True)
    write("msl", missile())
    write("boom1", boom(1))
    write("boom2", boom(2, 1.3))
    write("splash", splash())
    write("cat", catapult())
    write("trap", trap())
    write("flare", flare())
    write("hit", hit())
