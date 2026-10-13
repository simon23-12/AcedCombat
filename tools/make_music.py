"""Offline synthesis of the ACED COMBAT soundtrack: orchestral-rock in the genre's style (driving drums, distorted
power-chord guitars, string ostinati, brass themes, choir, timpani). Everything is synthesised here with numpy /
scipy - no samples, no licensed music.

python3 tools/make_music.py [menu battle ace calm win lose]  ->  assets/audio/music_*.mp3, sting_*.mp3
"""
import os, sys, subprocess
import numpy as np
from scipy import signal

SR = 44100
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "audio")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(11)


def mtof(m):
    return 440.0 * 2.0 ** ((np.asarray(m, dtype=np.float64) - 69) / 12.0)


NOTE = {"C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11}


def nm(s):
    """'D5' -> midi"""
    name, octv = s[:-1], int(s[-1])
    return 12 * (octv + 1) + NOTE[name]


# ------------------------------------------------------------------------------------------------ oscillators
def poly_blep(t, dt):
    dt = np.broadcast_to(dt, t.shape)
    out = np.zeros_like(t)
    m = t < dt
    x = t[m] / dt[m]
    out[m] = x + x - x * x - 1.0
    m2 = t > 1.0 - dt
    x = (t[m2] - 1.0) / dt[m2]
    out[m2] = x * x + x + x + 1.0
    return out


def saw(f, n, ph0=None, vib=0.0, vibf=5.5):
    """band-limited saw; f may be a scalar; optional vibrato depth in semitones"""
    ph0 = rng.random() if ph0 is None else ph0
    if vib:
        tt = np.arange(n) / SR
        fi = f * 2 ** (vib * np.sin(2 * np.pi * vibf * tt + rng.random() * 6) / 12)
        ph = (ph0 + np.cumsum(fi) / SR) % 1.0
        dt = fi / SR
        return 2 * ph - 1 - poly_blep(ph, dt)
    dt = f / SR
    t = (ph0 + np.arange(n) * dt) % 1.0
    return 2.0 * t - 1.0 - poly_blep(t, dt)


def sine(f, n, ph0=0.0):
    return np.sin(2 * np.pi * (ph0 + np.arange(n) * f / SR))


def env(n, a, d, s, r):
    e = np.zeros(n)
    na, nd, nr = min(int(a * SR), n), int(d * SR), int(r * SR)
    if na > 0:
        e[:na] = np.linspace(0, 1, na, endpoint=False)
    nd = min(nd, n - na)
    if nd > 0:
        e[na:na + nd] = np.linspace(1, s, nd, endpoint=False)
    hold_end = max(na + nd, n - nr)
    e[na + nd:hold_end] = s
    nr = n - hold_end
    if nr > 0:
        e[hold_end:] = np.linspace(s if hold_end > na + nd else e[max(hold_end - 1, 0)], 0, nr)
    return e


def lp(x, fc, order=2):
    sos = signal.butter(order, min(fc, SR * 0.45) / (SR / 2), "low", output="sos")
    return signal.sosfilt(sos, x)


def hp(x, fc, order=2):
    sos = signal.butter(order, fc / (SR / 2), "high", output="sos")
    return signal.sosfilt(sos, x)


def bp(x, lo, hi, order=2):
    sos = signal.butter(order, [lo / (SR / 2), min(hi, SR * 0.45) / (SR / 2)], "band", output="sos")
    return signal.sosfilt(sos, x)


def peak(x, f, q, gain_db):
    b, a = signal.iirpeak(f, q, fs=SR)
    g = 10 ** (gain_db / 20) - 1
    return x + g * signal.lfilter(b, a, x)


def tv_lp(x, fc_curve):
    """time-varying one-pole lowpass (cut-off updated every 256 samples)"""
    y = np.empty_like(x)
    z = 0.0
    B = 256
    for i in range(0, len(x), B):
        fc = fc_curve[min(i, len(fc_curve) - 1)]
        a = np.exp(-2 * np.pi * fc / SR)
        seg, _ = signal.lfilter([1 - a], [1, -a], x[i:i + B], zi=[a * z])
        y[i:i + B] = seg
        z = seg[-1]
    return y


# ------------------------------------------------------------------------------------------------ instruments
def strings(f, dur, amp=1.0, a=0.12, r=0.35, bright=3500, vib=0.12, voices=5):
    n = int((dur + r) * SR)
    x = np.zeros(n)
    for k in range(voices):
        det = 2 ** ((k - (voices - 1) / 2) * 0.06 / 12)
        x += saw(f * det, n, vib=vib, vibf=5.0 + rng.random())
    x = lp(x / voices, bright, 2)
    x = hp(x, 120)
    return x * env(n, a, 0.2, 0.85, r) * amp


def staccato(f, dur, amp=1.0, bright=4200):
    n = int((dur + 0.12) * SR)
    x = (saw(f, n) + saw(f * 1.004, n) + saw(f * 0.997, n)) / 3
    x = lp(x, bright)
    return hp(x, 150) * env(n, 0.006, dur * 0.6, 0.3, 0.1) * amp


def brass(f, dur, amp=1.0, a=0.06, r=0.25, bright=2800, voices=3, vib=0.08):
    n = int((dur + r) * SR)
    x = np.zeros(n)
    for k in range(voices):
        det = 2 ** ((k - 1) * 0.08 / 12)
        x += saw(f * det, n, vib=vib, vibf=5.2)
    x /= voices
    e = env(n, a, 0.25, 0.8, r)
    fc = 300 + bright * (0.35 + 0.65 * np.minimum(1, np.arange(n) / (a * SR * 2.5 + 1))) * (0.6 + 0.4 * e)
    x = tv_lp(x, fc)
    x = tv_lp(x, fc * 1.4)
    x = peak(x, 1100, 1.2, 4)
    return np.tanh(x * 2.0) * e * amp


def choir(f, dur, amp=1.0, vowel="a", a=0.4, r=0.8):
    n = int((dur + r) * SR)
    F = {"a": [(800, 1.0), (1150, 0.5), (2900, 0.25)], "o": [(450, 1.0), (800, 0.4), (2830, 0.15)], "u": [(325, 1.0), (700, 0.25), (2530, 0.1)]}[vowel]
    x = np.zeros(n)
    for k in range(6):
        det = 2 ** ((k - 2.5) * 0.09 / 12)
        x += saw(f * det, n, vib=0.18, vibf=4.6 + rng.random() * 0.8)
    x /= 6
    y = np.zeros(n)
    for fc, g in F:
        y += bp(x, fc * 0.88, fc * 1.12, 2) * g
    y += lp(x, 400) * 0.25
    return y * env(n, a, 0.3, 0.9, r) * amp * 2.2


def piano(f, dur, amp=1.0):
    n = int((dur + 1.2) * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for h in range(1, 9):
        x += np.sin(2 * np.pi * f * h * (1 + 0.0004 * h * h) * t) * (0.6 ** (h - 1)) * np.exp(-t * (1.2 + h * 0.9))
    x *= np.minimum(1, t / 0.004)
    rel = np.ones(n); m = int(dur * SR)
    if m < n:
        rel[m:] = np.exp(-np.arange(n - m) / (0.25 * SR))
    return x * rel * amp * 0.6


def ks_pluck(f, dur, damp=0.996, bright=0.5):
    """Karplus-Strong via IIR: y[n] = x[n] + damp/2 (y[n-N] + y[n-N-1])"""
    N = max(2, int(SR / f))
    n = int(dur * SR)
    exc = np.zeros(n)
    burst = rng.uniform(-1, 1, N)
    burst = lp(burst, 1500 + 6000 * bright)
    exc[:N] = burst
    a = np.zeros(N + 2); a[0] = 1; a[N] = -damp / 2; a[N + 1] = -damp / 2
    return signal.lfilter([1.0], a, exc)


_gcache = {}


def guitar_hit(root_midi, dur, mute=True, amp=1.0):
    """distorted power chord (root, fifth, octave)"""
    key = (root_midi, mute)
    if key not in _gcache:
        L = 1.8
        x = sum(ks_pluck(mtof(m), L, 0.997 if not mute else 0.99, 0.6) for m in (root_midi, root_midi + 7, root_midi + 12))
        _gcache[key] = x
    x = _gcache[key][:int(dur * SR)].copy()
    x *= env(len(x), 0.002, 0.05, 1.0, min(0.05, dur * 0.3))
    if mute:
        x *= np.exp(-np.arange(len(x)) / (0.09 * SR))
    return x * amp


def amp_sim(x, drive=18.0):
    y = hp(x, 90)
    y = np.tanh(y * drive)
    y = peak(y, 1600, 1.0, 3)
    y = peak(y, 400, 1.2, -3)
    y = lp(y, 4600, 4)
    return y * 0.5


def bass(f, dur, amp=1.0):
    n = int((dur + 0.08) * SR)
    x = saw(f, n) * 0.6 + sine(f / 2 if f > 70 else f, n) * 0.6
    x = lp(x, 900)
    return np.tanh(x * 1.6) * env(n, 0.004, 0.1, 0.8, 0.06) * amp


# drums -------------------------------------------------------------------------------------------
def kick(amp=1.0):
    n = int(0.45 * SR); t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t * 32)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7.5)
    x += lp(rng.normal(0, 1, n), 3000) * np.exp(-t * 120) * 0.35
    return np.tanh(x * 1.6) * amp


def snare(amp=1.0):
    n = int(0.35 * SR); t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 28) * 0.6
    nz = bp(rng.normal(0, 1, n), 1200, 9000) * np.exp(-t * 16)
    return np.tanh((tone + nz) * 1.4) * amp


def hat(amp=1.0, open_=False):
    n = int((0.35 if open_ else 0.07) * SR); t = np.arange(n) / SR
    return hp(rng.normal(0, 1, n), 7000, 4) * np.exp(-t * (9 if open_ else 60)) * amp * 0.5


def crash(amp=1.0):
    n = int(2.6 * SR); t = np.arange(n) / SR
    return hp(rng.normal(0, 1, n), 4000, 2) * np.exp(-t * 1.6) * amp * 0.45


def tom(f, amp=1.0, dec=6.0):
    n = int(0.9 * SR); t = np.arange(n) / SR
    fr = f * (1 + 0.6 * np.exp(-t * 25))
    x = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * dec)
    x += lp(rng.normal(0, 1, n), 1500) * np.exp(-t * 40) * 0.3
    return np.tanh(x * 1.5) * amp


def timpani(f, amp=1.0):
    n = int(2.2 * SR); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * r * t) * g * np.exp(-t * d) for r, g, d in ((1, 1, 2.2), (1.5, 0.45, 3), (1.98, 0.3, 4), (2.44, 0.15, 5)))
    x += lp(rng.normal(0, 1, n), 800) * np.exp(-t * 30) * 0.4
    return x * amp


def riser(dur, amp=1.0):
    n = int(dur * SR); t = np.arange(n) / SR
    x = rng.normal(0, 1, n)
    fc = 300 + 7000 * (t / dur) ** 2
    y = tv_lp(x, fc)
    return y * (t / dur) ** 2 * amp


# ------------------------------------------------------------------------------------------------ mixer
class Song:
    def __init__(self, bpm, bars, tail=4.0):
        self.bpm = bpm
        self.beat = 60.0 / bpm
        self.bar = self.beat * 4
        self.bars = bars
        self.N = int(round(bars * self.bar * SR))
        self.T = int(tail * SR)
        self.L = np.zeros(self.N + self.T); self.R = np.zeros(self.N + self.T)
        self.rev = np.zeros((2, self.N + self.T))
        self.buses = {}

    def t(self, bar, beat=0.0):
        return (bar * 4 + beat) * self.beat

    def place(self, x, t0, pan=0.0, gain=1.0, rev=0.0, bus=None):
        i0 = int(t0 * SR)
        if i0 < 0:
            x = x[-i0:]; i0 = 0
        n = min(len(x), len(self.L) - i0)
        if n <= 0:
            return
        x = x[:n]
        gl = np.cos((pan + 1) * np.pi / 4) * gain * 1.414
        gr = np.sin((pan + 1) * np.pi / 4) * gain * 1.414
        if bus:
            if bus not in self.buses:
                self.buses[bus] = np.zeros((2, len(self.L)))
            self.buses[bus][0, i0:i0 + n] += x * gl
            self.buses[bus][1, i0:i0 + n] += x * gr
            return
        self.L[i0:i0 + n] += x * gl
        self.R[i0:i0 + n] += x * gr
        if rev:
            self.rev[0, i0:i0 + n] += x * gl * rev
            self.rev[1, i0:i0 + n] += x * gr * rev

    def bus_out(self, name, fn, gain=1.0, rev=0.0):
        if name not in self.buses:
            return
        b = self.buses.pop(name)
        l, r = fn(b[0]), fn(b[1])
        self.L += l * gain; self.R += r * gain
        self.rev[0] += l * gain * rev; self.rev[1] += r * gain * rev

    def render(self, path, rt=2.4, loop=True, master=0.92, mp3_rate="160k"):
        # synthetic hall impulse response
        n = int(rt * SR); t = np.arange(n) / SR
        irs = []
        for s in range(2):
            ir = rng.normal(0, 1, n) * np.exp(-t * 6.9 / rt)
            ir = lp(ir, 5200) * 0.7 + lp(ir, 1800) * 0.3
            ir[:int(0.012 * SR)] = 0
            irs.append(ir / np.sqrt(np.sum(ir ** 2)))
        wl = signal.fftconvolve(self.rev[0], irs[0])[:len(self.L)] * 0.9
        wr = signal.fftconvolve(self.rev[1], irs[1])[:len(self.L)] * 0.9
        L = self.L + wl; R = self.R + wr
        if loop:
            # fold the tail back onto the start for a seamless loop
            L[:self.T] += L[self.N:self.N + self.T]; R[:self.T] += R[self.N:self.N + self.T]
            L, R = L[:self.N], R[:self.N]
        # master: gentle glue compression + soft clip
        m = np.maximum(np.abs(L), np.abs(R))
        envm = signal.lfilter([0.0005], [1, -0.9995], m)
        g = 1.0 / np.maximum(1.0, (envm / 0.35) ** 0.45)
        L *= g; R *= g
        pk = max(np.abs(L).max(), np.abs(R).max())
        L = np.tanh(L / pk * 1.15) / np.tanh(1.15) * master
        R = np.tanh(R / pk * 1.15) / np.tanh(1.15) * master
        pcm = (np.stack([L, R], 1) * 32767).astype(np.int16).tobytes()
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(SR), "-ac", "2", "-i", "-",
                        "-codec:a", "libmp3lame", "-b:a", mp3_rate, path], input=pcm, check=True)
        print("wrote", path, f"{len(L) / SR:.1f}s", os.path.getsize(path) // 1024, "KB", flush=True)


def chord_notes(root, kind):
    iv = {"m": [0, 3, 7], "M": [0, 4, 7], "sus": [0, 5, 7], "7": [0, 4, 7, 10], "m7": [0, 3, 7, 10], "5": [0, 7]}[kind]
    return [root + i for i in iv]


def melody(song, notes, bar0, fn, octave_shift=0, pan=0.0, gain=1.0, rev=0.3, bus=None):
    """notes: list of (name or None, beats)"""
    t = song.t(bar0)
    for name, beats in notes:
        dur = beats * song.beat
        if name:
            f = mtof(nm(name) + octave_shift)
            song.place(fn(f, dur * 0.97), t, pan, gain, rev, bus)
        t += dur


# ================================================================================================ BATTLE
def song_battle():
    S = Song(150, 48)
    D, Bb, F, C, G, A = nm("D2"), nm("Bb1"), nm("F2"), nm("C2"), nm("G1"), nm("A1")
    progA = [("D", "m"), ("Bb", "M"), ("F", "M"), ("C", "M")]
    progB = [("Bb", "M"), ("C", "M"), ("D", "m"), ("D", "m"), ("G", "m"), ("A", "M"), ("D", "m"), ("A", "M")]
    roots = {"D": nm("D2"), "Bb": nm("Bb1"), "F": nm("F2"), "C": nm("C2"), "G": nm("G1"), "A": nm("A1")}

    def sec(b):
        return "intro" if b < 4 else "A" if b < 20 else "B" if b < 36 else "bridge" if b < 44 else "A2"

    def chord(b):
        s = sec(b)
        if s == "intro":
            return ("D", "m")
        if s == "B":
            return progB[(b - 20) % 8]
        if s == "bridge":
            return [("Bb", "M"), ("Bb", "M"), ("C", "M"), ("C", "M"), ("G", "m"), ("G", "m"), ("A", "M"), ("A", "M")][b - 36]
        return progA[(b - (4 if s == "A" else 44)) % 4]

    for b in range(S.bars):
        s = sec(b)
        rn, kind = chord(b)
        r = roots[rn]
        # ---------------- drums
        if s in ("A", "B", "A2"):
            for bt in (0, 1.5, 2, 2.75) if s != "B" else (0, 0.75, 1.5, 2, 2.5, 3.5):
                S.place(kick(0.95), S.t(b, bt), 0, 0.9, 0.05)
            for bt in (1, 3):
                S.place(snare(0.8), S.t(b, bt), 0.05, 0.8, 0.25)
            for k in range(8):
                S.place(hat(0.5 if k % 2 else 0.7, open_=(k == 7 and b % 2)), S.t(b, k * 0.5), 0.35, 0.5, 0.05)
            if b in (4, 20, 28, 44):
                S.place(crash(1.0), S.t(b), -0.4, 0.7, 0.3)
        elif s == "bridge":
            S.place(kick(1.0), S.t(b, 0), 0, 1.0, 0.1)
            S.place(snare(0.9), S.t(b, 2), 0, 0.9, 0.4)
            for k, (ff, bt) in enumerate(((110, 2.5), (90, 3.0), (70, 3.5))):
                S.place(tom(ff, 0.9), S.t(b, bt), -0.5 + k * 0.5, 0.75, 0.3)
            if b == 43:
                S.place(riser(S.bar, 0.5), S.t(b), 0, 0.6, 0.3)
        else:
            S.place(timpani(mtof(nm("D2")), 0.9), S.t(b, 0), 0, 0.9, 0.4)
            if b == 3:
                for k in range(8):
                    S.place(snare(0.3 + k * 0.08), S.t(b, 2 + k * 0.25), 0, 0.7, 0.3)
        # ---------------- bass (8ths)
        if s != "intro":
            for k in range(8):
                S.place(bass(mtof(r), S.beat * 0.45, 0.9), S.t(b, k * 0.5), 0, 0.75, 0.0)
        # ---------------- guitars (palm muted 8ths, open accent on 1)
        if s in ("A", "B", "A2") or (s == "bridge" and b % 2 == 0):
            gm = r + 12
            for k in range(8):
                if s == "bridge" and k > 0:
                    break
                mute = not (k == 0 or (s == "B" and k == 4))
                d = S.beat * (0.45 if mute else (1.9 if s != "bridge" else 3.8))
                x = guitar_hit(gm, d, mute, 0.8)
                S.place(x, S.t(b, k * 0.5) + 0.002, -0.7, 1.0, bus="gtrL")
                S.place(guitar_hit(gm, d, mute, 0.8), S.t(b, k * 0.5) + 0.011, 0.7, 1.0, bus="gtrR")
        # ---------------- string ostinato (16ths)
        cn = chord_notes(r + 36, kind)
        pattern = [cn[0], cn[1], cn[2], cn[1]] if s != "bridge" else [cn[0], cn[0] + 12, cn[1], cn[2]]
        if s != "bridge" or b % 2:
            for k in range(16):
                m = pattern[k % 4] + (12 if (s in ("B",) and k % 8 >= 4) else 0)
                S.place(staccato(mtof(m), S.beat * 0.2, 0.32 if k % 4 else 0.42), S.t(b, k * 0.25), 0.25 * (1 if k % 2 else -1), 0.6, 0.25)
        # ---------------- pads / choir
        if s in ("B", "bridge", "intro"):
            for i, m in enumerate(chord_notes(r + 24, kind)):
                S.place(strings(mtof(m), S.bar * 1.0, 0.28, a=0.25), S.t(b), -0.3 + i * 0.3, 0.6, 0.5)
        if s == "bridge" or (s == "B" and b >= 28):
            for m in chord_notes(r + 36, kind):
                S.place(choir(mtof(m), S.bar, 0.35, "a"), S.t(b), 0, 0.5, 0.7)
        # brass stabs in the bridge
        if s == "bridge":
            for bt in (0, 1.5, 3):
                for m in chord_notes(r + 24, kind):
                    S.place(brass(mtof(m), S.beat * 0.4, 0.45, a=0.02, r=0.15), S.t(b, bt), 0.1, 0.7, 0.4)
    # ---------------- melodies
    themeA = [("D5", 2), ("F5", 1), ("A5", 1), ("Bb5", 1.5), ("A5", 0.5), ("F5", 1), ("D5", 1), ("C5", 2), ("F5", 1), ("A5", 1), ("G5", 3), ("E5", 1),
              ("D5", 1), ("E5", 1), ("F5", 1), ("A5", 1), ("D6", 2), ("C6", 1), ("Bb5", 1), ("A5", 1.5), ("G5", 0.5), ("F5", 1), ("C5", 1), ("E5", 2), ("G5", 1), ("E5", 1)]
    themeB = [("F5", 1), ("Bb5", 1), ("D6", 2), ("E6", 1.5), ("D6", 0.5), ("C6", 2), ("D6", 3), ("A5", 1), ("F5", 1), ("E5", 1), ("D5", 1), ("A5", 1),
              ("Bb5", 2), ("G5", 1), ("D6", 1), ("C#6", 2), ("A5", 1), ("E5", 1), ("F5", 1), ("A5", 1), ("D6", 1), ("F6", 1), ("E6", 4)]
    for bar0 in (4, 12):
        melody(S, themeA, bar0, lambda f, d: brass(f, d, 0.55), -12, 0.0, 0.9, 0.35)
        melody(S, themeA, bar0, lambda f, d: strings(f, d, 0.3, a=0.05, bright=5000), 0, 0.2, 0.6, 0.35)
    for bar0 in (20, 28):
        melody(S, themeB, bar0, lambda f, d: brass(f, d, 0.6, bright=3400), -12, -0.1, 1.0, 0.4)
        melody(S, themeB, bar0, lambda f, d: strings(f, d, 0.35, a=0.05, bright=5500), 0, 0.15, 0.7, 0.4)
    melody(S, themeA[:13], 44, lambda f, d: brass(f, d, 0.55), -12, 0.0, 0.9, 0.35)
    S.bus_out("gtrL", amp_sim, 0.32, 0.12)
    S.bus_out("gtrR", amp_sim, 0.32, 0.12)
    S.render(os.path.join(OUT, "music_battle.mp3"))


# ================================================================================================ ACE
def song_ace():
    S = Song(164, 40)
    roots = {"E": nm("E2"), "C": nm("C2"), "D": nm("D2"), "B": nm("B1"), "A": nm("A1"), "G": nm("G2")}
    prog = [("E", "m"), ("C", "M"), ("D", "M"), ("B", "M")]
    prog2 = [("A", "m"), ("C", "M"), ("E", "m"), ("B", "M")]

    def sec(b):
        return "intro" if b < 4 else "A" if b < 20 else "B" if b < 32 else "C"

    for b in range(S.bars):
        s = sec(b)
        rn, kind = (prog if s in ("intro", "A", "C") else prog2)[b % 4]
        r = roots[rn]
        # drums: galloping, toms
        if s != "intro":
            for bt in (0, 0.75, 1.5, 2, 2.75, 3.5):
                S.place(kick(1.0), S.t(b, bt), 0, 0.9, 0.05)
            for bt in (1, 3):
                S.place(snare(0.9), S.t(b, bt), 0, 0.85, 0.3)
            for k in range(8):
                S.place(hat(0.6), S.t(b, k * 0.5), 0.3, 0.45, 0.0)
            if b % 4 == 3:
                for k, ff in enumerate((140, 120, 100, 80, 70, 60)):
                    S.place(tom(ff, 0.8), S.t(b, 2.5 + k * 0.25), -0.6 + k * 0.24, 0.7, 0.3)
            if b % 8 == 4:
                S.place(crash(1.0), S.t(b), 0.4, 0.7, 0.3)
        else:
            for bt in (0, 2):
                S.place(tom(70, 1.0, 4), S.t(b, bt), 0, 1.0, 0.5)
                S.place(timpani(mtof(nm("E2")), 0.8), S.t(b, bt), 0, 0.8, 0.4)
        # gallop strings + guitars
        gal = [0, 0.5, 0.75, 1, 1.5, 1.75, 2, 2.5, 2.75, 3, 3.5, 3.75]
        cn = chord_notes(r + 24, kind)
        for bt in gal:
            S.place(staccato(mtof(cn[0]), S.beat * 0.22, 0.45, 2600), S.t(b, bt), -0.2, 0.7, 0.2)
            S.place(staccato(mtof(cn[0] + 12), S.beat * 0.22, 0.25, 3600), S.t(b, bt), 0.2, 0.6, 0.2)
        if s != "intro":
            for bt in gal:
                mute = bt not in (0, 2)
                d = S.beat * (0.22 if mute else 0.9)
                S.place(guitar_hit(r + 12, d, mute, 0.85), S.t(b, bt), -0.75, 1.0, bus="gL")
                S.place(guitar_hit(r + 12, d, mute, 0.85), S.t(b, bt) + 0.009, 0.75, 1.0, bus="gR")
            for k in range(8):
                S.place(bass(mtof(r), S.beat * 0.42, 1.0), S.t(b, k * 0.5), 0, 0.8)
        # choir
        if s in ("B", "C", "intro"):
            for m in chord_notes(r + 36, kind):
                S.place(choir(mtof(m), S.bar, 0.42, "a" if s != "intro" else "o", a=0.15), S.t(b), 0, 0.6, 0.7)
        if s == "B":
            for i, m in enumerate(chord_notes(r + 12, kind)):
                S.place(strings(mtof(m), S.bar, 0.3), S.t(b), -0.3 + i * 0.3, 0.7, 0.4)
    themeA = [("E5", 1.5), ("G5", 0.5), ("B5", 2), ("C6", 1.5), ("B5", 0.5), ("G5", 2), ("A5", 1.5), ("F#5", 0.5), ("D5", 2), ("D#5", 3), ("B4", 1)]
    themeB = [("A5", 2), ("C6", 2), ("B5", 1), ("A5", 1), ("G5", 2), ("E5", 1), ("G5", 1), ("B5", 2), ("D#6", 3), ("F#6", 1)]
    for bar0 in (4, 8, 12, 16):
        melody(S, themeA, bar0, lambda f, d: brass(f, d, 0.6, bright=3600), -12, 0, 1.0, 0.35)
    for bar0 in (20, 24, 28):
        melody(S, themeB, bar0, lambda f, d: brass(f, d, 0.65, bright=3800), -12, 0, 1.0, 0.4)
        melody(S, themeB, bar0, lambda f, d: strings(f, d, 0.35, a=0.04, bright=6000), 0, 0.2, 0.7, 0.4)
    for bar0 in (32, 36):
        melody(S, themeA, bar0, lambda f, d: brass(f, d, 0.65, bright=3800), -12, 0, 1.0, 0.35)
        melody(S, themeA, bar0, lambda f, d: strings(f, d, 0.32, a=0.04, bright=6000), 0, 0.2, 0.65, 0.4)
    S.bus_out("gL", lambda x: amp_sim(x, 26), 0.34, 0.1)
    S.bus_out("gR", lambda x: amp_sim(x, 26), 0.34, 0.1)
    S.render(os.path.join(OUT, "music_ace.mp3"))


# ================================================================================================ MENU
def song_menu():
    S = Song(96, 32, 5)
    roots = {"F": nm("F2"), "C": nm("C2"), "D": nm("D2"), "Bb": nm("Bb1"), "A": nm("A1"), "G": nm("G2")}
    prog = [("F", "M"), ("C", "M"), ("D", "m"), ("Bb", "M"), ("F", "M"), ("C", "M"), ("Bb", "M"), ("C", "M")]
    for b in range(S.bars):
        rn, kind = prog[b % 8]
        r = roots[rn]
        intro = b < 8
        # pads + low strings
        for i, m in enumerate(chord_notes(r + 24, kind)):
            S.place(strings(mtof(m), S.bar, 0.32 if intro else 0.4, a=0.6, r=0.8), S.t(b), -0.4 + i * 0.4, 0.7, 0.6)
        S.place(strings(mtof(r + 12), S.bar, 0.4, a=0.3, bright=1500), S.t(b), 0, 0.8, 0.4)
        # pulse
        for k in range(8):
            cn = chord_notes(r + 36, kind)
            S.place(staccato(mtof(cn[k % 3]), S.beat * 0.25, 0.22, 3000), S.t(b, k * 0.5), 0.3 if k % 2 else -0.3, 0.5, 0.45)
        if not intro:
            S.place(timpani(mtof(r if r > 36 else r + 12), 0.7), S.t(b, 0), 0, 0.7, 0.5)
            S.place(kick(0.6), S.t(b, 0), 0, 0.5, 0.2)
            S.place(snare(0.4), S.t(b, 2), 0, 0.5, 0.6)
            if b % 8 == 7:
                for k in range(4):
                    S.place(tom(90 - k * 8, 0.6), S.t(b, 3 + k * 0.25), 0, 0.6, 0.4)
        if b >= 16:
            for m in chord_notes(r + 36, kind):
                S.place(choir(mtof(m), S.bar, 0.3, "o"), S.t(b), 0, 0.5, 0.8)
        if b in (8, 16, 24):
            S.place(crash(0.8), S.t(b), 0.3, 0.6, 0.5)
    horn = [("C5", 1.5), ("F5", 0.5), ("G5", 1), ("A5", 1), ("G5", 3), ("C5", 1), ("D5", 1.5), ("F5", 0.5), ("A5", 1), ("C6", 1), ("Bb5", 4),
            ("A5", 1.5), ("G5", 0.5), ("F5", 1), ("A5", 1), ("G5", 2), ("E5", 2), ("F5", 1), ("G5", 1), ("Bb5", 1), ("A5", 1), ("G5", 4)]
    for bar0 in (8, 16, 24):
        melody(S, horn, bar0, lambda f, d: brass(f, d, 0.5, a=0.12, bright=2000, vib=0.1), -12, -0.1, 0.9, 0.55)
        if bar0 >= 16:
            melody(S, horn, bar0, lambda f, d: strings(f, d, 0.3, a=0.1, bright=5000), 0, 0.15, 0.6, 0.55)
    S.render(os.path.join(OUT, "music_menu.mp3"), rt=3.2)


# ================================================================================================ CALM
def song_calm():
    S = Song(80, 24, 5)
    roots = {"D": nm("D2"), "Bb": nm("Bb1"), "F": nm("F2"), "C": nm("C2"), "G": nm("G1")}
    prog = [("D", "m"), ("Bb", "M"), ("F", "M"), ("C", "M")]
    for b in range(S.bars):
        rn, kind = prog[b % 4]
        r = roots[rn]
        for i, m in enumerate(chord_notes(r + 24, kind)):
            S.place(strings(mtof(m), S.bar, 0.25, a=1.2, r=1.2, bright=2200, vib=0.06), S.t(b), -0.5 + i * 0.5, 0.7, 0.7)
        cn = chord_notes(r + 36, kind) + [r + 48]
        for k in range(8):
            S.place(piano(mtof(cn[[0, 1, 2, 3, 2, 1, 2, 3][k]]), S.beat * 0.5, 0.35), S.t(b, k * 0.5), 0.3 * (1 if k % 2 else -1), 0.6, 0.6)
        if b >= 4:
            S.place(kick(0.35), S.t(b, 0), 0, 0.5, 0.3)
            S.place(kick(0.25), S.t(b, 2.5), 0, 0.5, 0.3)
            for k in range(4):
                S.place(hat(0.25), S.t(b, k + 0.5), 0.3, 0.4, 0.2)
        S.place(bass(mtof(r), S.bar * 0.9, 0.5), S.t(b), 0, 0.5)
    S.render(os.path.join(OUT, "music_calm.mp3"), rt=3.5)


# ================================================================================================ STINGS
def sting_win():
    S = Song(100, 3, 4)
    seq = [(0, ("D", [nm("D3"), nm("F#3"), nm("A3"), nm("D4")])), (1.5, ("G", [nm("D3"), nm("G3"), nm("B3"), nm("D4")])),
           (2.5, ("A", [nm("C#3"), nm("E3"), nm("A3"), nm("E4")])), (4, ("D", [nm("D3"), nm("F#3"), nm("A3"), nm("D4"), nm("F#4")]))]
    for bt, (_, notes) in seq:
        d = (1.4 if bt < 4 else 6.5) * S.beat
        for m in notes:
            S.place(brass(mtof(m), d, 0.4, a=0.04, bright=3200), S.t(0, bt), 0, 0.9, 0.5)
            S.place(strings(mtof(m + 12), d, 0.25, a=0.05), S.t(0, bt), 0.2, 0.6, 0.5)
        S.place(timpani(mtof(nm("D2")), 0.9), S.t(0, bt), 0, 0.9, 0.5)
    melody(S, [("A4", 1.5), ("D5", 1), ("F#5", 1.5), ("A5", 6)], 0, lambda f, d: brass(f, d, 0.55, bright=3600), 0, 0, 0.9, 0.5)
    S.place(crash(1.0), S.t(1), 0, 0.7, 0.5)
    S.render(os.path.join(OUT, "sting_win.mp3"), loop=False)


def sting_lose():
    S = Song(70, 2, 4)
    for m in (nm("D2"), nm("A2"), nm("D3"), nm("F3"), nm("Ab3")):
        S.place(strings(mtof(m), S.bar * 1.6, 0.35, a=0.3, r=1.5, bright=1800), S.t(0), 0, 0.8, 0.6)
    for m in (nm("D4"), nm("F4"), nm("Ab4")):
        S.place(choir(mtof(m), S.bar * 1.4, 0.3, "u"), S.t(0, 0.5), 0, 0.6, 0.8)
    for k in range(10):
        S.place(timpani(mtof(nm("D2")), 0.2 + k * 0.06), S.t(0, k * 0.12), 0, 0.7, 0.4)
    S.place(timpani(mtof(nm("D2")), 1.0), S.t(0, 1.25), 0, 1.0, 0.6)
    S.render(os.path.join(OUT, "sting_lose.mp3"), loop=False)


SONGS = {"menu": song_menu, "battle": song_battle, "ace": song_ace, "calm": song_calm, "win": sting_win, "lose": sting_lose}
if __name__ == "__main__":
    for k in (sys.argv[1:] or SONGS):
        SONGS[k]()
