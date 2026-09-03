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

export const THERAPY_DISCIPLINES = Object.freeze(THERAPY_NODE_LAYOUT.map(({ label }) => label));

export const HARD_INFRASTRUCTURE = Object.freeze([
  Object.freeze({ name: 'ROBOTICS', detail: 'PROTOTYPING \u00b7 HARDWARE \u00b7 TESTING' }),
  Object.freeze({ name: 'LIFE SCIENCES', detail: 'CERTIFIED LABS \u00b7 VENTILATION \u00b7 CONTROLLED ENVIRONMENTS' }),
  Object.freeze({ name: 'SHARED SYSTEMS', detail: 'POWER \u00b7 EQUIPMENT \u00b7 STORAGE \u00b7 SAFETY' }),
]);

export const ECOSYSTEM_SERVICES = Object.freeze([
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

export const FOUNDERS = Object.freeze([
  Object.freeze({ name: 'OLIVER ROCKALL', focus: 'OPERATIONS \u00d7 MEDICINE \u00d7 PRODUCT \u00d7 DEEP TECH' }),
  Object.freeze({ name: 'FABIEN BOUHIER', focus: 'COMMUNITY \u00d7 FOUNDERS \u00d7 TECHNOLOGY \u00d7 EVENTS' }),
  Object.freeze({ name: 'RE\u015eAT VOLKAN G\u00dcNEL', focus: 'INVESTMENT \u00d7 INTERNATIONAL NETWORKS \u00d7 LAW \u00d7 EDUCATION' }),
]);

export const COMMUNITY_GROUPS = Object.freeze([
  'TECHMAKERS',
  'ENTREPRENEURS',
  'FOUNDERS',
  'INVESTORS',
  'TECHNOLOGY PROFESSIONALS',
  'ECOSYSTEM PARTNERS',
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
  {
    id: 'therapy-ecosystem',
    index: '05',
    eyebrow: 'ONE THERAPY IS AN ECOSYSTEM',
    statements: [
      'ONE THERAPY.',
      'HUNDREDS OF DISCIPLINES.',
      'SCIENCE BECOMES INDUSTRY THROUGH COLLABORATION.',
    ],
    argument: 'A BIOTECH COMPANY DOES NOT MOVE FROM DISCOVERY TO CLINIC ALONE.',
    disciplines: THERAPY_DISCIPLINES,
  },
  {
    id: 'hard-infrastructure',
    index: '06',
    eyebrow: 'HARD TECH NEEDS HARD INFRASTRUCTURE',
    statements: [
      'YOU CANNOT BUILD THE PHYSICAL FUTURE FROM A LAPTOP AND A COFFEE SHOP.',
      'SOFTWARE CAN START ANYWHERE.',
      'DEEP TECH CANNOT.',
    ],
    argument: 'PHYSICAL AI AND LIFE SCIENCES NEED PLACES WHERE COMPANIES CAN ACTUALLY BUILD.',
    infrastructure: HARD_INFRASTRUCTURE,
  },
  {
    id: 'ecosystem-product',
    index: '07',
    eyebrow: 'SPACE IS NOT THE PRODUCT',
    statements: [
      'SQUARE METRES ARE INFRASTRUCTURE.',
      'ECOSYSTEM IS THE PRODUCT.',
      'EVERYTHING A FOUNDER NORMALLY SEARCHES FOR OUTSIDE, WE BRING INSIDE.',
    ],
    argument: 'PONT IS DESIGNED AS AN ENGINEERED ECOSYSTEM, NOT SIMPLY A BUILDING FILLED WITH TECHNOLOGY COMPANIES.',
    services: ECOSYSTEM_SERVICES,
  },
  {
    id: 'founder-ecosystems',
    index: '08',
    eyebrow: 'WHY THE FOUNDERS',
    statements: [
      'PONT DIDN\u2019T START WITH A BUILDING.',
      'IT STARTED WITH THREE ECOSYSTEMS.',
      'WHAT WE BUILT SEPARATELY, WE NOW BRING UNDER ONE ROOF.',
    ],
    argument: 'THREE DIFFERENT BACKGROUNDS. ONE SHARED CONVICTION.',
    founders: FOUNDERS,
  },
  {
    id: 'community-first',
    index: '09',
    eyebrow: 'COMMUNITY BEFORE REAL ESTATE',
    statements: [
      'MOST CAMPUSES BUILD A BUILDING AND THEN SEARCH FOR A COMMUNITY.',
      'WE BUILT THE COMMUNITY FIRST.',
      'COMMUNITY IS INFRASTRUCTURE.',
    ],
    argument: 'PONT STARTS WITH AN EXISTING COMMUNITY OF THOUSANDS AND GIVES THAT ECOSYSTEM A PHYSICAL HOME.',
    community: COMMUNITY_GROUPS,
  },
]);

export const CAPABILITIES = Object.freeze({
  physical: ['SENSE', 'DECIDE', 'MOVE'],
  life: ['DISCOVER', 'ENGINEER', 'HEAL'],
});
import { THERAPY_NODE_LAYOUT } from './therapy-layout.mjs';
