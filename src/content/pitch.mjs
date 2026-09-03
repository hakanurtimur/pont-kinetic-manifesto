export const ROBOT_TECHNOLOGIES = Object.freeze([
  'AI',
  'VISION',
  'EMBEDDED',
  'ELECTRONICS',
  'MOTORS',
  'SENSORS',
  'BATTERIES',
  'MANUFACTURING',
]);

export const SCENES = Object.freeze([
  {
    id: 'physical-era',
    index: '01',
    eyebrow: 'THE NEXT ERA',
    statements: [
      'AI LEARNED TO THINK.',
      'NOW IT IS LEARNING TO ACT.',
      'THE NEXT ERA IS PHYSICAL.',
    ],
  },
  {
    id: 'european-paradox',
    index: '02',
    eyebrow: 'THE EUROPEAN PARADOX',
    statements: [
      'EUROPE MAKES THE SCIENCE.',
      'IT KEEPS LOSING THE COMPANIES.',
      'BUILD SOMETHING WORTH STAYING FOR.',
    ],
  },
  {
    id: 'two-worlds',
    index: '03',
    eyebrow: 'ONE PHYSICAL FUTURE',
    statements: [
      'PHYSICAL AI',
      'LIFE SCIENCES',
      'TWO WORLDS. ONE PHYSICAL FUTURE.',
    ],
  },
  {
    id: 'robot-ecosystem',
    index: '04',
    eyebrow: 'ONE ROBOT IS AN ECOSYSTEM',
    statements: [
      'ONE ROBOT.',
      'HUNDREDS OF TECHNOLOGIES.',
      'NO SINGLE COMPANY BUILDS THE PHYSICAL AI FUTURE ALONE.',
    ],
    technologies: ROBOT_TECHNOLOGIES,
  },
]);

export const CAPABILITIES = Object.freeze({
  physical: ['SENSE', 'DECIDE', 'MOVE'],
  life: ['DISCOVER', 'ENGINEER', 'HEAL'],
});
