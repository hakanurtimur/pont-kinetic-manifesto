import test from 'node:test';
import assert from 'node:assert/strict';

import {
  COMMUNITY_GROUPS,
  COVER,
  ECOSYSTEM_SERVICES,
  FOUNDERS,
  HARD_INFRASTRUCTURE,
  SCENES,
  THERAPY_DISCIPLINES,
} from '../src/content/pitch.mjs';

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

test('prototype contains the approved scenes through community before real estate', () => {
  assert.deepEqual(
    SCENES.map(({ id }) => id),
    [
      'physical-era',
      'european-paradox',
      'two-worlds',
      'robot-ecosystem',
      'therapy-ecosystem',
      'hard-infrastructure',
      'ecosystem-product',
      'founder-ecosystems',
      'community-first',
    ],
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
  assert.deepEqual(SCENES[4].statements, [
    'ONE THERAPY.',
    'HUNDREDS OF DISCIPLINES.',
    'SCIENCE BECOMES INDUSTRY THROUGH COLLABORATION.',
  ]);
  assert.deepEqual(SCENES[4].disciplines, THERAPY_DISCIPLINES);
  assert.deepEqual(THERAPY_DISCIPLINES, [
    'MOLECULAR BIOLOGY',
    'AI',
    'BIOINFORMATICS',
    'DIAGNOSTICS',
    'MICROFLUIDICS',
    'LAB AUTOMATION',
    'BIOMATERIALS',
    'CLINICAL',
    'REGULATORY',
    'MANUFACTURING',
    'QUALITY SYSTEMS',
  ]);
  assert.deepEqual(SCENES[5].statements, [
    'YOU CANNOT BUILD THE PHYSICAL FUTURE FROM A LAPTOP AND A COFFEE SHOP.',
    'SOFTWARE CAN START ANYWHERE.',
    'DEEP TECH CANNOT.',
  ]);
  assert.deepEqual(SCENES[6].statements, [
    'SQUARE METRES ARE INFRASTRUCTURE.',
    'ECOSYSTEM IS THE PRODUCT.',
    'EVERYTHING A FOUNDER NORMALLY SEARCHES FOR OUTSIDE, WE BRING INSIDE.',
  ]);
  assert.deepEqual(SCENES[7].statements, [
    'PONT DIDN\u2019T START WITH A BUILDING.',
    'IT STARTED WITH THREE ECOSYSTEMS.',
    'WHAT WE BUILT SEPARATELY, WE NOW BRING UNDER ONE ROOF.',
  ]);
  assert.deepEqual(SCENES[8].statements, [
    'MOST CAMPUSES BUILD A BUILDING AND THEN SEARCH FOR A COMMUNITY.',
    'WE BUILT THE COMMUNITY FIRST.',
    'COMMUNITY IS INFRASTRUCTURE.',
  ]);
});

test('sections 08 to 10 retain the infrastructure, ecosystem and founder detail', () => {
  assert.deepEqual(HARD_INFRASTRUCTURE.map(({ name }) => name), [
    'ROBOTICS',
    'LIFE SCIENCES',
    'SHARED SYSTEMS',
  ]);
  assert.deepEqual(ECOSYSTEM_SERVICES, [
    'CAPITAL',
    'TALENT',
    'LEGAL & FINANCE',
    'REGULATORY EXPERTISE',
    'CORPORATE ACCESS',
    'MANUFACTURING PARTNERS',
    'ACADEMIC CONNECTIONS',
    'CUSTOMERS',
    'SERVICE PROVIDERS',
    'COMMUNITY',
  ]);
  assert.deepEqual(FOUNDERS, [
    { name: 'OLIVER ROCKALL', focus: 'OPERATIONS \u00d7 MEDICINE \u00d7 PRODUCT \u00d7 DEEP TECH' },
    { name: 'FABIEN BOUHIER', focus: 'COMMUNITY \u00d7 FOUNDERS \u00d7 TECHNOLOGY \u00d7 EVENTS' },
    { name: 'RE\u015eAT VOLKAN G\u00dcNEL', focus: 'INVESTMENT \u00d7 INTERNATIONAL NETWORKS \u00d7 LAW \u00d7 EDUCATION' },
  ]);
});

test('community before real estate starts with an existing network', () => {
  assert.deepEqual(COMMUNITY_GROUPS, [
    'TECHMAKERS',
    'ENTREPRENEURS',
    'FOUNDERS',
    'INVESTORS',
    'TECHNOLOGY PROFESSIONALS',
    'ECOSYSTEM PARTNERS',
  ]);
  assert.deepEqual(SCENES[8].community, COMMUNITY_GROUPS);
});

test('every approved scene carries a visible argument line from the brief', () => {
  assert.deepEqual(SCENES.map(({ argument }) => argument), [
    'AI IS MOVING BEYOND SCREENS AND SOFTWARE INTO MACHINES, LABORATORIES, FACTORIES AND HEALTHCARE.',
    'EUROPE HAS THE SCIENCE AND TALENT. IT LACKS THE ENVIRONMENTS WHERE AMBITIOUS COMPANIES CAN BUILD, TEST, FINANCE AND SCALE TOGETHER.',
    'BOTH DOMAINS SHARE ONE CHALLENGE: TURNING INTELLIGENCE, SCIENCE AND SOFTWARE INTO PHYSICAL REALITY.',
    'EVERY LAYER DEPENDS ON COMPANIES, SPECIALISTS AND SUPPLIERS THAT NEED ONE ANOTHER.',
    'A BIOTECH COMPANY DOES NOT MOVE FROM DISCOVERY TO CLINIC ALONE.',
    'PHYSICAL AI AND LIFE SCIENCES NEED PLACES WHERE COMPANIES CAN ACTUALLY BUILD.',
    'PONT IS DESIGNED AS AN ENGINEERED ECOSYSTEM, NOT SIMPLY A BUILDING FILLED WITH TECHNOLOGY COMPANIES.',
    'THREE DIFFERENT BACKGROUNDS. ONE SHARED CONVICTION.',
    'PONT STARTS WITH AN EXISTING COMMUNITY OF THOUSANDS AND GIVES THAT ECOSYSTEM A PHYSICAL HOME.',
  ]);
});
