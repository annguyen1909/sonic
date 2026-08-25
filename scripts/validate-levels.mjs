import assert from 'node:assert/strict';
import { FRUITS } from '../src/data/fruits.js';
import { LEVELS, MATCH_COUNTS, SORT_LEVELS, MEMORY_PAIRS } from '../src/data/levels.js';

assert.equal(LEVELS.length, 3);
assert.equal(MATCH_COUNTS.length, LEVELS.length);
assert.equal(SORT_LEVELS.length, LEVELS.length);
assert.equal(MEMORY_PAIRS.length, LEVELS.length);

for (const counts of [MATCH_COUNTS, MEMORY_PAIRS]) {
  assert.ok(counts.every((count, index) => index === 0 || count > counts[index - 1]));
}

assert.ok(Math.max(...MATCH_COUNTS, ...MEMORY_PAIRS) <= FRUITS.length);
for (const level of SORT_LEVELS) {
  const available = FRUITS.filter((fruit) => level.groups.includes(fruit.colorGroup));
  assert.ok(level.count >= level.groups.length && level.count <= available.length);
}

console.log('Validated 3 progressive levels for Match, Sort, and Memory.');
