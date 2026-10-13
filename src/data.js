// Aircraft, weapons and environment presets.

export const PLANES = {
  f15: {
    name: 'F-15C EAGLE', short: 'F-15C', role: 'AIR SUPERIORITY', model: 'f15',
    desc: 'The Eagle. Twin-engine air superiority fighter with over a hundred air-to-air victories and no losses. Fast, rugged and forgiving.',
    cruise: 230, maxSpd: 390, minSpd: 62, accel: 46, pitch: 1.18, roll: 3.4, yaw: 0.42, hp: 100,
    gun: true, msl: 64, sp: { id: '4AAM', name: '4AAM', count: 16, kind: 'aam', multi: 4, range: 4200 },
    stats: { speed: 0.78, mobility: 0.7, stability: 0.85, air: 0.82, ground: 0.35, defense: 0.75 },
    gearH: 1.86, nozzleScale: 1.0, burner: 1.0, stall: 'normal', engines: ['nozzle_L', 'nozzle_R'],
    hook: true, vtol: false, unlock: null,
  },
  f22: {
    name: 'F-22A RAPTOR', short: 'F-22A', role: 'STEALTH AIR DOMINANCE', model: 'f22',
    desc: 'Fifth-generation stealth fighter with supercruise and thrust vectoring. Enemies have trouble locking on. Unmatched in a dogfight.',
    cruise: 255, maxSpd: 420, minSpd: 48, accel: 54, pitch: 1.5, roll: 3.9, yaw: 0.55, hp: 100,
    gun: true, msl: 56, sp: { id: '6AAM', name: '6AAM', count: 12, kind: 'aam', multi: 6, range: 4800 },
    stats: { speed: 0.9, mobility: 0.95, stability: 0.8, air: 0.98, ground: 0.4, defense: 0.8 },
    gearH: 1.86, nozzleScale: 1.0, burner: 1.15, stealth: 0.55, engines: ['nozzle_L', 'nozzle_R'],
    hook: true, vtol: false, unlock: 'm2',
  },
  f35a: {
    name: 'F-35A LIGHTNING II', short: 'F-35A', role: 'STEALTH MULTIROLE', model: 'f35a',
    desc: 'Stealth multirole fighter with sensor fusion. Carries guided bombs that make short work of ships and ground targets.',
    cruise: 225, maxSpd: 370, minSpd: 55, accel: 44, pitch: 1.3, roll: 3.3, yaw: 0.5, hp: 100,
    gun: true, msl: 52, sp: { id: 'GPB', name: 'GPB', count: 16, kind: 'gpb', multi: 1, range: 4000 },
    stats: { speed: 0.72, mobility: 0.78, stability: 0.9, air: 0.75, ground: 0.92, defense: 0.75 },
    gearH: 1.66, nozzleScale: 1.15, burner: 1.0, stealth: 0.7, engines: ['nozzle_C'],
    hook: true, vtol: false, unlock: 'm1',
  },
  f35b: {
    name: 'F-35B LIGHTNING II', short: 'F-35B', role: 'STOVL MULTIROLE', model: 'f35b',
    desc: 'Short take-off / vertical landing variant. Hold BRAKE at low speed to transition into hover and land anywhere on the deck.',
    cruise: 220, maxSpd: 360, minSpd: 0, accel: 42, pitch: 1.25, roll: 3.2, yaw: 0.5, hp: 100,
    gun: true, msl: 48, sp: { id: '4AGM', name: '4AGM', count: 16, kind: 'agm', multi: 4, range: 4200 },
    stats: { speed: 0.68, mobility: 0.74, stability: 0.85, air: 0.72, ground: 0.88, defense: 0.78 },
    gearH: 1.66, nozzleScale: 1.15, burner: 1.0, stealth: 0.7, engines: ['nozzle_C'],
    hook: false, vtol: true, unlock: 'm4',
  },
  b2: {
    name: 'B-2A SPIRIT', short: 'B-2A', role: 'STEALTH STRATEGIC BOMBER', model: 'b2',
    desc: 'Flying-wing stealth bomber. No gun, no air-to-air missiles - massive guided bomb loads and flares. Let the escorts handle the fighters.',
    cruise: 200, maxSpd: 290, minSpd: 70, accel: 18, pitch: 0.55, roll: 1.25, yaw: 0.28, hp: 220,
    gun: false, msl: 0, primary: { id: 'GPB', name: 'GPB', count: 40, kind: 'gpb', multi: 1, range: 5000 },
    sp: { id: 'MOP', name: 'MOP', count: 4, kind: 'mop', multi: 1, range: 5000 },
    flares: 30,
    stats: { speed: 0.5, mobility: 0.2, stability: 1.0, air: 0.0, ground: 1.0, defense: 0.95 },
    gearH: 0, nozzleScale: 0, burner: 0, stealth: 0.35, engines: ['nozzle_L', 'nozzle_R'],
    hook: false, vtol: false, bomber: true, unlock: 'm3',
  },
};

export const PLANE_ORDER = ['f15', 'f35a', 'f22', 'f35b', 'b2'];

export const ENEMIES = {
  bandit: { model: 'bandit', name: 'FIGHTER', hp: 100, cruise: 215, maxSpd: 330, pitch: 1.0, roll: 3.0, msl: true, gun: true, score: 300 },
  ace:    { model: 'ace', name: 'ACE', hp: 380, cruise: 245, maxSpd: 380, pitch: 1.4, roll: 3.6, msl: true, gun: true, score: 1500, ace: true },
  bomber: { model: 'bomber', name: 'BOMBER', hp: 260, cruise: 175, maxSpd: 220, pitch: 0.4, roll: 0.9, msl: false, gun: true, score: 500, big: true },
  drone:  { model: 'drone', name: 'DRONE', hp: 30, cruise: 120, maxSpd: 160, pitch: 0.6, roll: 1.5, msl: false, gun: false, score: 100 },
  destroyer: { model: 'destroyer', name: 'DESTROYER', hp: 420, ship: true, score: 800 },
};

// sky presets: panorama + sun + lighting for clouds / aircraft
export const ENVS = {
  noon: {
    sky: { url: 'assets/sky/clouds.webp', sunEl: 38, sunAz: 200, sunCol: [1.0, 0.97, 0.92], gain: 1.0, fogGain: 1.0, envGain: 1.0, hazeSun: 0.25 },
    sunI: 3.2, cloudSun: [2.2, 2.15, 2.05], ambTop: [0.45, 0.55, 0.75], ambBot: [0.24, 0.27, 0.33], fog: [1 / 30000, 1 / 2800, 1 / 220000],
    grade: { lift: [0, 0.004, 0.012], gain: [1.0, 1.0, 1.02], sat: 1.08, exposure: 1.0 },
  },
  sunset: {
    sky: { url: 'assets/sky/sunset.webp', sunEl: 2.6, sunAz: 250, sunCol: [1.0, 0.62, 0.32], gain: 1.0, fogGain: 1.0, envGain: 1.0, hazeSun: 0.55, sunSize: 0.8 },
    sunI: 3.0, cloudSun: [2.6, 1.45, 0.7], ambTop: [0.3, 0.3, 0.45], ambBot: [0.13, 0.1, 0.13], fog: [1 / 22000, 1 / 2400, 1 / 160000],
    grade: { lift: [0.01, 0.0, 0.02], gain: [1.04, 0.98, 0.94], sat: 1.15, exposure: 1.05 },
  },
  dawn: {
    sky: { url: 'assets/sky/dawn.webp', sunEl: 6, sunAz: 95, sunCol: [1.0, 0.74, 0.62], gain: 1.0, fogGain: 1.0, envGain: 1.0, hazeSun: 0.45, sunSize: 0.7 },
    sunI: 2.8, cloudSun: [2.2, 1.55, 1.25], ambTop: [0.36, 0.38, 0.52], ambBot: [0.16, 0.14, 0.18], fog: [1 / 24000, 1 / 2600, 1 / 180000],
    grade: { lift: [0.008, 0.0, 0.018], gain: [1.02, 0.99, 1.0], sat: 1.12, exposure: 1.0 },
  },
};
