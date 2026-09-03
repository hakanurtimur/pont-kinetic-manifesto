import test from 'node:test';
import assert from 'node:assert/strict';

import { SCENES } from '../src/content/pitch.mjs';

test('prototype contains the approved scenes through the robot ecosystem', () => {
  assert.deepEqual(
    SCENES.map(({ id }) => id),
    ['physical-era', 'european-paradox', 'two-worlds', 'robot-ecosystem'],
  );
});

test('manifesto statements stay verbatim', () => {
  assert.deepEqual(SCENES[0].statements, [
    'AI LEARNED TO THINK.',
    'NOW IT IS LEARNING TO ACT.',
    'THE NEXT ERA IS PHYSICAL.',
  ]);
  assert.deepEqual(SCENES[1].statements, [
    'EUROPE MAKES THE SCIENCE.',
    'IT KEEPS LOSING THE COMPANIES.',
    'BUILD SOMETHING WORTH STAYING FOR.',
  ]);
  assert.equal(SCENES[2].statements.at(-1), 'TWO WORLDS. ONE PHYSICAL FUTURE.');
  assert.deepEqual(SCENES[3].statements, [
    'ONE ROBOT.',
    'HUNDREDS OF TECHNOLOGIES.',
    'NO SINGLE COMPANY BUILDS THE PHYSICAL AI FUTURE ALONE.',
  ]);
  assert.deepEqual(SCENES[3].technologies, [
    'AI',
    'VISION',
    'EMBEDDED',
    'ELECTRONICS',
    'MOTORS',
    'SENSORS',
    'BATTERIES',
    'MANUFACTURING',
  ]);
});
