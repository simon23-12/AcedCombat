# ACED COMBAT

Arcade jet combat in the spirit of *Ace Combat*, built for the phone browser. Hold your phone **upright**, **tilt** to fly,
fire guns, missiles and special weapons with your thumbs. Dogfights above a sea of clouds, carrier launches and landings,
a B-2 strike, and a red-tailed ace squadron at sunset.

**Play:** https://simon23-12.github.io/AcedCombat/ (Safari on iPhone: "Add to Home Screen" for fullscreen)

## Aircraft

| | unlock | special |
|---|---|---|
| F-15C Eagle | start | 4AAM (4 targets) |
| F-35A Lightning II | clear Mission 01 | GPB guided bombs |
| F-22A Raptor | clear Mission 02 | 6AAM (6 targets) |
| B-2A Spirit | clear Mission 03 | GPB / MOP + flares |
| F-35B Lightning II | clear Mission 04 | 4AGM, vertical landing (hold BRAKE at low speed) |

Campaign: Training, *First Light*, *Above the Clouds*, *Spirit of Ace*, *Steel Rain*, *Short Deck*, *Ace of Aces*.

## Controls

| | |
|---|---|
| tilt like a steering wheel | bank / turn (STANDARD auto-pulls into the turn, EXPERT = roll rate) |
| lean the top away / toward you | pitch (invertable in Settings) |
| BOOST / BRAKE (left thumb) | afterburner / airbrake (F-35B: hover) |
| MSL / GUN (right thumb) | missile or bomb at the locked target / cannon |
| SP · TGT | switch special weapon · cycle targets |
| desktop | arrows/WASD, Space gun, F missile, Q special, E target, Shift boost, B brake, Esc pause |

## What is made in Blender

Everything visual is modelled / rendered / baked with **Blender 5.2 + Cycles** (scripts in [`blender/`](blender)):

| asset | script | |
|---|---|---|
| `assets/models/{f15,f22,f35a,f35b,b2,bandit,ace,bomber,drone}.*` | `blender/aircraft.py` | procedural lofted fuselages, airfoil wings, canted tails, intakes, nozzles, gear; object-space camo, panel lines, decals; baked albedo/AO/normal/roughness-metal/emission atlas |
| `assets/models/{carrier,destroyer}.*` | `blender/ships.py` + `tools/make_deck.py` | CVN-77 with flight-deck markings, wires, island, lens; deck AO bake |
| `assets/sky/*.webp` | `blender/sky.py` | HDR equirect panoramas with volumetric cumulus + art-directed sky (log-encoded WebP) |
| `assets/fx/{explosion,smoke}.webp` | `blender/fx.py` | volumetric fireball flipbook, lit smoke puffs |
| `assets/ui/og.jpg`, `title.jpg` | `blender/hero.py` + `tools/make_og.py` | cover art |

Audio: soundtrack synthesised with numpy (`tools/make_music.py`), sound effects (`tools/make_sfx.py`), radio chatter from
neural TTS (Piper voices) with radio processing (`tools/make_voices.py`, script in `tools/voice_script.json`).

## Real-time (three.js, WebGL 2)

* Volumetric clouds: low-resolution raymarch through a weather-map driven cumulus layer with 3D Perlin-Worley erosion,
  sun shadow taps, dual-lobe phase, aerial perspective - you can fly through them
* HDR pipeline, dual-filter bloom, ACES, sun lens flare, aerial-perspective fog into the Blender sky
* FFT-normal-mapped ocean with sky reflections, sun glitter, cloud shadows and ship wakes
* Instanced particles (Blender sprites), ribbon trails, afterburners, adaptive resolution, LOW / MED / HIGH / ULTRA

## Build

```bash
npm install
npm run build          # esbuild -> dist/game.js
node tools/serve.mjs 8080
```

Debug URL flags: `?q=low|medium|high|ultra`, `?fixed=1` (no adaptive resolution), `?unlock=1`, `?auto` (autopilot playtest).
