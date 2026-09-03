import test from 'node:test';
import assert from 'node:assert/strict';

import { COVER, SCENES } from '../src/content/pitch.mjs';

test('cover carries the core proposition and ecosystem pillars from the brief', () => {
  assert.equal(
    COVER.proposition,
    'BUILDING THE PHYSICAL INFRASTRUCTURE FOR EUROPE\u2019S NEXT TECHNOLOGICAL ERA.',
  );
  assert.deepEqual(COVER.pillars, [
    'PHYSICAL AI',
    'LIFE SCIENCES',
    'CAPITAL',
    'COMMUNITY',
    'EDUCATION',
  ]);
});

test('prototype contains the approved scenes through the robot ecosystem', () => {
  assert.deepEqual(
    SCENES.map(({ id }) => id),
    ['physical-era', 'european-paradox', 'two-worlds', 'robot-ecosystem'],
  );
});

test('presentation statements stay verbatim', () => {
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

test('every approved scene carries a visible argument line from the brief', () => {
  assert.deepEqual(SCENES.map(({ argument }) => argument), [
    'AI IS MOVING BEYOND SCREENS AND SOFTWARE INTO MACHINES, LABORATORIES, FACTORIES AND HEALTHCARE.',
    'EUROPE HAS THE SCIENCE AND TALENT. IT LACKS THE ENVIRONMENTS WHERE AMBITIOUS COMPANIES CAN BUILD, TEST, FINANCE AND SCALE TOGETHER.',
    'BOTH DOMAINS SHARE ONE CHALLENGE: TURNING INTELLIGENCE, SCIENCE AND SOFTWARE INTO PHYSICAL REALITY.',
    'EVERY LAYER DEPENDS ON COMPANIES, SPECIALISTS AND SUPPLIERS THAT NEED ONE ANOTHER.',
  ]);
});
