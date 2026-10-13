// Campaign: tutorial + six missions. Each mission is an async script driving the Game API.
import * as THREE from 'three';

const V = (x, y, z) => new THREE.Vector3(x, y, z);
const FIGHTERS = ['f15', 'f35a', 'f22', 'f35b'];

export const MISSIONS = [
  {
    id: 'm0', code: 'TRAINING', title: 'BASIC FLIGHT TRAINING', env: 'noon', clouds: 'broken', start: 'air',
    startPos: { x: 0, y: 2300, z: -6000, heading: 0 }, planes: ['f15'], music: 'calm', chatter: false, area: 26000, center: { x: 0, z: 0 },
    brief: 'Learn to fly with your phone: tilt like a steering wheel to turn, lean to climb and dive. Gun drones, lock missiles, use your special weapon. Nobody shoots back.',
    briefVoice: 'brief_m0', voice: ['instr_welcome', 'instr_turn', 'instr_pitch', 'instr_boost', 'instr_gun', 'instr_msl', 'instr_tgt', 'instr_done', 'instr_good'],
    async run(g) {
      g.godMode = true;
      await g.wait(1.5);
      g.say('instr_welcome');
      await g.wait(5);
      g.say('instr_turn');
      g.objective('Fly through the gates');
      const p = g.player.pos;
      const r1 = g.ring(V(0, 2300, -3600), 0);
      const r2 = g.ring(V(-500, 2300, -1700), -22);
      const r3 = g.ring(V(-1500, 2300, -200), -50);
      await g.until(() => r1.passed && r2.passed && r3.passed, 140);
      g.say('instr_pitch');
      g.objective('Climb through the high gate, dive through the low gate');
      const f = g.player.forward(new THREE.Vector3()); f.y = 0; f.normalize();
      const yaw = Math.atan2(f.x, f.z) * 180 / Math.PI;
      const r4 = g.ring(p.clone().addScaledVector(f, 2400).setY(3000), yaw, 15);
      const r5 = g.ring(p.clone().addScaledVector(f, 5200).setY(2100), yaw, -15);
      await g.until(() => r4.passed && r5.passed, 120);
      g.say('instr_boost');
      g.objective('Hold BOOST, then BRAKE');
      let usedB = false, usedR = false;
      await g.until(() => { usedB ||= g.input.boostV; usedR ||= usedB && g.input.brakeV; return usedR; }, 25);
      g.say('instr_gun');
      g.objective('Destroy the drones with your GUN');
      const fw = g.player.forward(new THREE.Vector3()); fw.y = 0; fw.normalize();
      const h = Math.atan2(fw.x, fw.z) * 180 / Math.PI;
      const base = g.player.pos.clone().addScaledVector(fw, 1600);
      const d1 = await g.spawnPlane('drone', base.clone().add(V(60, 0, 0)), h, { role: 'drone', mission: true, label: 'DRONE', orbit: base.clone(), alt: base.y });
      const d2 = await g.spawnPlane('drone', base.clone().add(V(-150, 40, 200)), h, { role: 'drone', mission: true, label: 'DRONE', orbit: base.clone(), alt: base.y + 40 });
      g.weaponLock = 'gun';
      await g.until(() => g.allDead([d1, d2]), 240);
      g.say('instr_good');
      await g.wait(2);
      g.say('instr_msl');
      g.objective('Lock on and destroy the drones with MISSILES');
      const b2 = g.player.pos.clone().addScaledVector(g.player.forward(new THREE.Vector3()).setY(0).normalize(), 2600);
      const ds = [];
      for (let i = 0; i < 3; i++) ds.push(await g.spawnPlane('drone', b2.clone().add(V((i - 1) * 500, i * 60, i * 300)), h + 90, { role: 'drone', mission: true, label: 'DRONE', orbit: b2.clone(), alt: b2.y + i * 60 }));
      await g.until(() => g.allDead(ds), 240);
      g.say('instr_tgt');
      g.objective('Switch weapon with SP and lock several drones at once');
      const b3 = g.player.pos.clone().addScaledVector(g.player.forward(new THREE.Vector3()).setY(0).normalize(), 3000);
      const ds2 = [];
      for (let i = 0; i < 4; i++) ds2.push(await g.spawnPlane('drone', b3.clone().add(V((i - 1.5) * 260, (i % 2) * 80, 0)), h + 180, { role: 'drone', mission: true, label: 'DRONE', orbit: b3.clone(), alt: b3.y + (i % 2) * 80 }));
      await g.until(() => g.allDead(ds2), 240);
      g.objective('');
      g.say('instr_done');
      await g.wait(5);
      g.complete();
    },
  },
  {
    id: 'm1', code: 'MISSION 01', title: 'FIRST LIGHT', env: 'dawn', clouds: 'scattered', start: 'carrier',
    carrier: { x: 0, z: 0, heading: 0, speed: 9 }, planes: FIGHTERS, music: 'battle', area: 34000, center: { x: 0, z: 6000 },
    brief: 'Dawn patrol off the coast. Launch from CVN-77, intercept an enemy strike package of fighters and bombers before it reaches the fleet, then land back on deck.',
    briefVoice: 'brief_m1', voice: ['tower_cat', 'm1_start', 'm1_bombers', 'm1_wave2', 'm1_rtb', 'm1_carrier_hit', 'wing_join', 'lso_ball', 'bandit_1', 'bandit_2'],
    async run(g) {
      await g.wait(1);
      g.say('tower_cat');
      await g.until(() => g.state === 'air');
      g.objective('');
      await g.wait(3);
      const wing = await g.spawnPlane(g.planeKey === 'f15' ? 'f15' : g.planeKey, g.player.pos.clone().add(V(60, 30, -120)), 0, { role: 'escort', skill: 0.6, label: 'VIPER 2' });
      g.say('wing_join');
      await g.wait(3);
      g.say('m1_start');
      g.objective('Destroy the strike package. Protect <b>CVN-77</b>');
      const c = g.carrier;
      const n0 = V(0, 3200, 16000);
      const wave1 = [];
      for (let i = 0; i < 4; i++) wave1.push(await g.spawnPlane('bandit', n0.clone().add(V((i - 1.5) * 300, i * 80, i * 150)), 180, { orbit: V(0, 3000, 7000), alt: 3000 }));
      const bombers = [];
      for (let i = 0; i < 2; i++) bombers.push(await g.spawnPlane('bomber', V(-1500 + i * 3000, 2600, 19000), 180, { role: 'bomber', goal: c, alt: 2400, mission: true, label: 'BOMBER' }));
      await g.wait(4);
      g.say('m1_bombers');
      let hitCarrier = false;
      const checkBombers = () => { for (const b of bombers) if (b.alive && Math.hypot(b.pos.x - c.pos.x, b.pos.z - c.pos.z) < 1500) hitCarrier = true; return hitCarrier; };
      await g.until(() => checkBombers() || g.allDead([...wave1, ...bombers]));
      if (hitCarrier) { g.say('m1_carrier_hit'); g.fail('CVN-77 WAS HIT'); return; }
      await g.wait(2);
      g.say('m1_wave2');
      const wave2 = [];
      for (let i = 0; i < 4; i++) wave2.push(await g.spawnPlane('bandit', V(-9000 + i * 400, 3500 + i * 120, 12000), 140, { orbit: V(0, 3000, 6000), alt: 3200 }));
      await g.until(() => g.allDead(wave2));
      await g.wait(2);
      g.say('m1_rtb');
      g.objective('Land on <b>CVN-77</b> (optional)');
      g.waypoint(c.glidePoint(4000));
      g.beginLanding(true);
      await g.wait(6);
      g.say('lso_ball');
      await g.until(() => g.landed || g.skipLanding);
      await g.wait(g.landed ? 2.5 : 0.2);
      g.complete(g.landed ? 'CARRIER LANDING +2500' : '');
    },
  },
  {
    id: 'm2', code: 'MISSION 02', title: 'ABOVE THE CLOUDS', env: 'noon', clouds: 'sea', start: 'air',
    startPos: { x: 0, y: 3600, z: -9000, heading: 0 }, planes: FIGHTERS, music: 'battle', area: 30000, center: { x: 0, z: 0 },
    brief: 'Enemy fighters are operating above a solid cloud deck. Climb, find them and clear the sky. Watch for bandits popping out of the clouds.',
    briefVoice: 'brief_m2', voice: ['m2_start', 'm2_wave2', 'm2_wave3', 'm2_end', 'wing_clouds', 'bandit_1', 'bandit_3'],
    async run(g) {
      const wing = await g.spawnPlane(g.planeKey, V(80, 3640, -9150), 0, { role: 'escort', skill: 0.6, label: 'VIPER 2' });
      await g.wait(2);
      g.say('m2_start');
      g.objective('Destroy all enemy fighters');
      const w1 = [];
      for (let i = 0; i < 5; i++) w1.push(await g.spawnPlane('bandit', V((i - 2) * 700, 3400 + (i % 2) * 400, 2000 + i * 300), 180, { orbit: V(0, 3400, 0), alt: 3400 }));
      await g.wait(12);
      g.say('bandit_1');
      await g.until(() => g.allDead(w1));
      g.say('m2_wave2');
      const w2 = [];
      for (let i = 0; i < 5; i++) w2.push(await g.spawnPlane('bandit', V(5000 - i * 500, 2200, 6000 + i * 300), 220, { orbit: V(0, 3200, 2000), alt: 3500 }));
      await g.wait(6);
      g.say('wing_clouds');
      await g.until(() => g.allDead(w2));
      g.say('m2_wave3');
      const w3 = [];
      for (let i = 0; i < 2; i++) w3.push(await g.spawnPlane('ace', V(-6000 + i * 300, 4200, 8000), 150, { mission: true, label: 'ACE', orbit: V(0, 3800, 2000), alt: 3800 }));
      await g.until(() => g.allDead(w3));
      g.say('m2_end');
      await g.wait(4);
      g.complete();
    },
  },
  {
    id: 'm3', code: 'MISSION 03', title: 'SPIRIT OF ACE', env: 'sunset', clouds: 'scattered', start: 'air',
    startPos: { x: 0, y: 3800, z: -14000, heading: 0 }, planes: ['b2'], music: 'ace', area: 36000, center: { x: 0, z: 0 },
    brief: 'Fly the B-2 Spirit deep into enemy waters. Two F-22 Raptors escort you. Sink the enemy fleet with guided bombs - bombs lock on ships ahead of and below you. Use flares against missiles.',
    briefVoice: 'brief_m3', voice: ['m3_start', 'm3_fleet', 'm3_fighters', 'm3_flares', 'm3_end', 'bandit_2'],
    async run(g) {
      const esc = [];
      for (let i = 0; i < 2; i++) esc.push(await g.spawnPlane('f22', V((i ? -1 : 1) * 120, 3900, -14200), 0, { role: 'escort', skill: 0.75, label: 'RAPTOR ' + (i + 1) }));
      await g.wait(2);
      g.say('m3_start');
      g.objective('Destroy the enemy fleet');
      const ships = [];
      const fleetC = V(0, 0, 4000);
      for (let i = 0; i < 5; i++) ships.push(await g.spawnShip('destroyer', fleetC.clone().add(V((i - 2) * 700, 0, (i % 2) * 600)), 90 + (i % 2) * 10, { mission: true, label: 'DDG', speed: 7 }));
      g.waypoint(fleetC);
      await g.until(() => g.player.pos.distanceTo(fleetC) < 12000, 120);
      g.say('m3_fleet');
      await g.wait(4);
      g.say('m3_fighters');
      const ints = [];
      for (let i = 0; i < 6; i++) ints.push(await g.spawnPlane('bandit', V((i - 2.5) * 500, 3500, 9000), 180, { orbit: fleetC.clone().setY(3500), alt: 3500 }));
      await g.wait(8);
      g.say('m3_flares');
      await g.until(() => g.allDead(ships));
      g.say('m3_end');
      await g.wait(4);
      g.complete();
    },
  },
  {
    id: 'm4', code: 'MISSION 04', title: 'STEEL RAIN', env: 'dawn', clouds: 'broken', start: 'air',
    startPos: { x: -14000, y: 3000, z: 0, heading: 90 }, planes: FIGHTERS, music: 'battle', area: 32000, center: { x: 0, z: 0 },
    brief: 'An enemy surface group is shelling the coast, protected by air cover and SAMs. Sink every ship. Guided bombs and air-to-ground missiles are cleared hot.',
    briefVoice: 'brief_m4', voice: ['m4_start', 'm4_mid', 'm4_end', 'bandit_1'],
    async run(g) {
      await g.wait(2);
      g.say('m4_start');
      g.objective('Sink the enemy surface group');
      const ships = [];
      const c = V(2000, 0, 0);
      for (let i = 0; i < 6; i++) ships.push(await g.spawnShip('destroyer', c.clone().add(V((i % 3) * 700 - 700, 0, Math.floor(i / 3) * 900 - 450)), 0, { mission: true, label: 'DDG', speed: 6 }));
      g.waypoint(c);
      const cap = [];
      for (let i = 0; i < 4; i++) cap.push(await g.spawnPlane('bandit', V(3000, 3200 + i * 150, (i - 1.5) * 600), 270, { orbit: c.clone().setY(3200), alt: 3200 }));
      await g.until(() => ships.filter((s) => !s.alive).length >= 3);
      g.say('m4_mid');
      await g.until(() => g.allDead(ships));
      g.say('m4_end');
      await g.wait(4);
      g.complete();
    },
  },
  {
    id: 'm5', code: 'MISSION 05', title: 'SHORT DECK', env: 'sunset', clouds: 'scattered', start: 'carrier',
    carrier: { x: 0, z: 0, heading: 20, speed: 9 }, planes: FIGHTERS, music: 'battle', area: 34000, center: { x: 0, z: 4000 },
    brief: 'A bomber raid is heading for the carrier. Launch, stop all six bombers, then bring your jet back. The F-35B can land vertically: hold BRAKE at low speed to hover.',
    briefVoice: 'brief_m5', voice: ['tower_cat', 'm5_start', 'm5_mid', 'm5_land', 'lso_vtol_hint', 'lso_ball', 'm1_carrier_hit'],
    async run(g) {
      await g.wait(1);
      g.say('tower_cat');
      await g.until(() => g.state === 'air');
      g.objective('');
      await g.wait(4);
      g.say('m5_start');
      g.objective('Stop the bomber raid - bombers are priority targets');
      const c = g.carrier;
      const bombers = [], esc = [];
      for (let i = 0; i < 6; i++) bombers.push(await g.spawnPlane('bomber', V(-3000 + i * 1200, 2400 + (i % 2) * 300, 26000 + (i % 3) * 900), 180, { role: 'bomber', goal: c, alt: 2300 + (i % 2) * 300, mission: true, label: 'BOMBER' }));
      for (let i = 0; i < 4; i++) esc.push(await g.spawnPlane('bandit', V(-2000 + i * 1300, 3200, 19000), 180, { orbit: V(0, 3000, 12000), alt: 3000 }));
      let hit = false;
      const chk = () => { for (const b of bombers) if (b.alive && Math.hypot(b.pos.x - c.pos.x, b.pos.z - c.pos.z) < 1500) hit = true; return hit; };
      await g.until(() => chk() || bombers.filter((b) => !b.alive).length >= 3);
      if (!hit) { g.say('m5_mid'); await g.until(() => chk() || g.allDead(bombers)); }
      if (hit) { g.say('m1_carrier_hit'); g.fail('CVN-77 WAS HIT'); return; }
      await g.wait(2);
      g.say('m5_land');
      g.objective(g.player.def.vtol ? 'Hover and land on <b>CVN-77</b> (optional)' : 'Land on <b>CVN-77</b> (optional)');
      g.beginLanding(true);
      await g.wait(5);
      g.say(g.player.def.vtol ? 'lso_vtol_hint' : 'lso_ball');
      await g.until(() => g.landed || g.skipLanding);
      await g.wait(g.landed ? 2.5 : 0.2);
      g.complete(g.landed ? 'CARRIER LANDING +2500' : '');
    },
  },
  {
    id: 'm6', code: 'MISSION 06', title: 'ACE OF ACES', env: 'sunset', clouds: 'sea', start: 'air',
    startPos: { x: 0, y: 4200, z: -10000, heading: 0 }, planes: FIGHTERS, music: 'ace', area: 28000, center: { x: 0, z: 0 }, maxIncoming: 2, missileSkill: 1.0,
    brief: 'The Crimson squadron: four red-tailed aces, the best the enemy has. Above the clouds at sunset, one sky, one winner.',
    briefVoice: 'brief_m6', voice: ['m6_start', 'm6_crimson1', 'm6_crimson2', 'm6_crimson3', 'm6_lead', 'm6_end'],
    async run(g) {
      await g.wait(2);
      g.say('m6_start');
      g.objective('Defeat the Crimson squadron');
      const aces = [];
      for (let i = 0; i < 3; i++) aces.push(await g.spawnPlane('ace', V((i - 1) * 500, 4400, 5000 + i * 200), 180, { mission: true, label: 'CRIMSON ' + (i + 2), orbit: V(0, 4200, 0), alt: 4200, skill: 0.85 }));
      const lead = await g.spawnPlane('ace', V(0, 4800, 6500), 180, { mission: true, label: 'CRIMSON 1', orbit: V(0, 4400, 0), alt: 4400, skill: 1.0, hp: 520 });
      await g.wait(5);
      g.say('m6_crimson1');
      await g.until(() => aces.filter((a) => !a.alive).length >= 1);
      g.say('m6_crimson2');
      await g.until(() => g.allDead(aces));
      g.say('m6_lead');
      await g.until(() => lead.hp < 260 || !lead.alive);
      g.say('m6_crimson3');
      await g.until(() => !lead.alive);
      g.say('m6_end');
      await g.wait(5);
      g.complete();
    },
  },
];

export const RANKS = [[12000, 'S'], [8000, 'A'], [5000, 'B'], [0, 'C']];
export function rankFor(score) { for (const [s, r] of RANKS) if (score >= s) return r; return 'C'; }
