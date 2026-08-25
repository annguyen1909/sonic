import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { VOICE_SCRIPTS } from '../src/utils/audio.js';

const audioDir = new URL('../public/audio/', import.meta.url);
const expected = Object.keys(VOICE_SCRIPTS).map((id) => `${id}.mp3`).sort();
const actual = readdirSync(audioDir).filter((name) => name.endsWith('.mp3')).sort();

assert.deepEqual(actual, expected, 'Audio files must exactly match VOICE_SCRIPTS');

for (const name of actual) {
  const file = new URL(name, audioDir);
  assert.ok(statSync(file).size > 0, `${name} is empty`);
  const probe = spawnSync('ffprobe', ['-v', 'error', file.pathname]);
  assert.equal(probe.status, 0, `${name} is not valid MP3 audio`);
}

console.log(`Validated ${actual.length} voice clips.`);
