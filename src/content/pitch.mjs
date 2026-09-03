export const COVER = Object.freeze({
  proposition: 'BUILDING THE PHYSICAL INFRASTRUCTURE FOR EUROPE\u2019S NEXT TECHNOLOGICAL ERA.',
  pillars: Object.freeze([
    'PHYSICAL AI',
    'LIFE SCIENCES',
    'CAPITAL',
    'COMMUNITY',
    'EDUCATION',
  ]),
});

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
    argument: 'AI IS MOVING BEYOND SCREENS AND SOFTWARE INTO MACHINES, LABORATORIES, FACTORIES AND HEALTHCARE.',
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
    argument: 'EUROPE HAS THE SCIENCE AND TALENT. IT LACKS THE ENVIRONMENTS WHERE AMBITIOUS COMPANIES CAN BUILD, TEST, FINANCE AND SCALE TOGETHER.',
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
    argument: 'BOTH DOMAINS SHARE ONE CHALLENGE: TURNING INTELLIGENCE, SCIENCE AND SOFTWARE INTO PHYSICAL REALITY.',
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
    argument: 'EVERY LAYER DEPENDS ON COMPANIES, SPECIALISTS AND SUPPLIERS THAT NEED ONE ANOTHER.',
    technologies: ROBOT_TECHNOLOGIES,
  },
]);

export const CAPABILITIES = Object.freeze({
  physical: ['SENSE', 'DECIDE', 'MOVE'],
  life: ['DISCOVER', 'ENGINEER', 'HEAL'],
});
