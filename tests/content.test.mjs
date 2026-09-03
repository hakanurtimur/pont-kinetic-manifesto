import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CAPITAL_PARTNERS,
  BRIDGE_ROUTES,
  COMMUNITY_GROUPS,
  COVER,
  ECOSYSTEM_SERVICES,
  FOUNDERS,
  HARD_INFRASTRUCTURE,
  HOME_LAYERS,
  MODEL_LAYERS,
  FLYWHEEL_LAYERS,
  FLYWHEEL_STEPS,
  FOUNDER_FIRST_FEATURES,
  REVENUE_ENGINES,
  SCENES,
  STACK_TRANSITIONS,
  THERAPY_DISCIPLINES,
  UNIVERSITY_LAYERS,
  UNIVERSITY_MODES,
  VISION_TRANSFORMATIONS,
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
      'the-home',
      'stack-pont',
      'business-model',
      'economic-flywheel',
      'capital-inside',
      'two-way-bridge',
      'founder-first-university',
      'university-inside-companies',
      'traveling-model',
      'final-vision',
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
  assert.deepEqual(SCENES[9].statements, [
    '10,000 M² TO BUILD WHAT EUROPE IS MISSING.',
    'PONT ADDS THE PHYSICAL LAYER.',
    'AN ECOSYSTEM INSIDE AN ECOSYSTEM.',
  ]);
  assert.deepEqual(SCENES[10].statements, [
    'THE STACK BUILDS THE INTELLIGENCE LAYER.',
    'PONT GIVES INTELLIGENCE A BODY.',
    'INTELLIGENCE MEETS THE REAL WORLD.',
  ]);
  assert.deepEqual(SCENES[11].statements, [
    'WE DON’T MONETISE DESKS.',
    'WE MONETISE THE ECOSYSTEM.',
    'PARTICIPATE ECONOMICALLY IN THE VALUE CREATED BY THE ECOSYSTEM.',
  ]);
  assert.deepEqual(SCENES[12].statements, [
    'EVERY COMPANY THAT ENTERS PONT CAN CREATE MORE THAN RENT.',
    'SUCCESSFUL FOUNDERS ATTRACT THE NEXT GENERATION OF FOUNDERS.',
    'EQUITY CAPTURES THE UPSIDE.',
  ]);
  assert.deepEqual(SCENES[13].statements, [
    'FOUNDERS SHOULDN’T HAVE TO LEAVE THE BUILDING TO FIND INVESTORS.',
    'FROM LANDLORD AND TENANT TO FOUNDER AND INVESTOR.',
    'DISCOVERED. FINANCED. SCALED.',
  ]);
  assert.deepEqual(SCENES[14].statements, [
    'KEEP EUROPEAN TALENT IN.',
    'BRING GLOBAL TALENT IN.',
    'EUROPE DOESN’T ONLY NEED TO STOP THE OUTFLOW. IT NEEDS TO BECOME THE DESTINATION.',
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

test('the home preserves every physical layer from the brief', () => {
  assert.deepEqual(HOME_LAYERS, [
    'ROBOTICS',
    'LIFE SCIENCES',
    'HARDWARE',
    'LABS',
    'TESTING',
    'CAPITAL',
    'COMMUNITY',
  ]);
  assert.deepEqual(SCENES[9].layers, HOME_LAYERS);
});

test('The Stack and PONT make the three complementary transitions explicit', () => {
  assert.deepEqual(STACK_TRANSITIONS, [
    { from: 'AI', to: 'PHYSICAL AI' },
    { from: 'SOFTWARE', to: 'SCIENCE' },
    { from: 'INTELLIGENCE', to: 'THE REAL WORLD' },
  ]);
  assert.deepEqual(SCENES[10].transitions, STACK_TRANSITIONS);
});

test('the business model preserves all six interconnected revenue engines', () => {
  assert.deepEqual(REVENUE_ENGINES.map(({ name }) => name), [
    'SPACE',
    'SERVICES',
    'COMMUNITY',
    'VENTURES',
    'CAPITAL',
    'EDUCATION',
  ]);
  assert.deepEqual(SCENES[11].engines, REVENUE_ENGINES);
});

test('the economic flywheel keeps the journey and value layers from the brief', () => {
  assert.deepEqual(FLYWHEEL_STEPS, [
    'TENANT',
    'COMMUNITY MEMBER',
    'EMBEDDED SERVICES',
    'INVESTOR ACCESS',
    'COLLABORATION',
    'CORPORATE DISCOVERY',
    'SELECTED EQUITY',
    'NEXT-GEN FOUNDERS',
  ]);
  assert.deepEqual(FLYWHEEL_LAYERS, [
    'RENT PAYS THE FLOOR',
    'SERVICES DEEPEN THE RELATIONSHIP',
    'COMMUNITY CREATES THE NETWORK EFFECT',
    'EQUITY CAPTURES THE UPSIDE',
  ]);
  assert.deepEqual(SCENES[12].steps, FLYWHEEL_STEPS);
});

test('capital lives inside the ecosystem with the full investor mix', () => {
  assert.deepEqual(CAPITAL_PARTNERS, [
    'INVESTOR GATHERINGS',
    'CORPORATE INVESTORS',
    'VENTURE CAPITAL',
    'FAMILY OFFICES',
    'STRATEGIC PARTNERS',
    'INVESTMENT VEHICLES',
  ]);
  assert.deepEqual(SCENES[13].partners, CAPITAL_PARTNERS);
});

test('the two-way bridge preserves both directions through PONT', () => {
  assert.deepEqual(BRIDGE_ROUTES, [
    { origin: 'EUROPE', via: 'PONT', destination: 'SCALE IN EUROPE' },
    { origin: 'WORLD', via: 'PONT', destination: 'ENTER EUROPE' },
  ]);
  assert.deepEqual(SCENES[14].routes, BRIDGE_ROUTES);
});

test('the university is embedded inside the founder ecosystem', () => {
  assert.deepEqual(UNIVERSITY_LAYERS, [
    'ENTREPRENEURSHIP',
    'TECHNOLOGY',
    'PROJECTS',
    'COMPETENCIES',
    'NETWORKS',
    'REAL-WORLD PRODUCTION',
  ]);
  assert.deepEqual(SCENES[15].layers, UNIVERSITY_LAYERS);
  assert.equal(SCENES[15].statements.at(-1), 'PUT THE UNIVERSITY INSIDE THE ECOSYSTEM.');
});

test('the founder-first university preserves its 90/10 operating model', () => {
  assert.deepEqual(UNIVERSITY_MODES, [
    { value: '90%', label: 'DIGITAL' },
    { value: '10%', label: 'PHYSICAL' },
  ]);
  assert.deepEqual(FOUNDER_FIRST_FEATURES, [
    'AI-NATIVE ADMINISTRATION',
    'AI-NATIVE EDUCATION',
    'AI-SUPPORTED LEGAL + OPERATIONAL ARCHITECTURE',
    'PROJECT-BASED',
    'FOUNDER-LED',
    'INDUSTRY-EMBEDDED',
    'INTERNATIONAL BY DESIGN',
  ]);
  assert.deepEqual(SCENES[16].modes, UNIVERSITY_MODES);
  assert.deepEqual(SCENES[16].features, FOUNDER_FIRST_FEATURES);
  assert.equal(SCENES[16].statements.at(-1), 'WE ARE BUILDING A UNIVERSITY INSIDE THE COMPANIES.');
});

test('the traveling model keeps the same five-part ecosystem architecture', () => {
  assert.deepEqual(MODEL_LAYERS, [
    'INFRASTRUCTURE',
    'COMMUNITY',
    'CAPITAL',
    'SERVICES',
    'EDUCATION',
  ]);
  assert.deepEqual(SCENES[17].layers, MODEL_LAYERS);
  assert.equal(SCENES[17].statements.at(-1), 'BUILD THE ECOSYSTEM ONCE. LEARN FROM IT. THEN MAKE THE MODEL TRAVEL.');
});

test('the final vision closes every transformation from the brief', () => {
  assert.deepEqual(VISION_TRANSFORMATIONS, [
    { from: 'INTELLIGENCE', to: 'MACHINES' },
    { from: 'SCIENCE', to: 'COMPANIES' },
    { from: 'FOUNDERS', to: 'CAPITAL' },
    { from: 'COMMUNITY', to: 'INFRASTRUCTURE' },
    { from: 'EDUCATION', to: 'THE REAL ECONOMY' },
  ]);
  assert.deepEqual(SCENES[18].transformations, VISION_TRANSFORMATIONS);
  assert.equal(SCENES[18].statements.at(-1), 'NOW LET’S BUILD THE ENVIRONMENT THAT TURNS IT INTO THE FUTURE.');
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
    'PONT IS BEING DEVELOPED IN THE STACK, IN AMSTERDAM OOST, WITH ROOM TO GROW TOWARDS APPROXIMATELY 10,000 M².',
    'PONT HAS SIGNED AN MOU WITH TECHLEAP TO EXPLORE AND DEVELOP THIS COLLABORATION.',
    'PONT IS DESIGNED AROUND MULTIPLE INTERCONNECTED REVENUE ENGINES.',
    'A TENANT CAN BECOME A MEMBER, CUSTOMER, COLLABORATOR, INVESTMENT AND THE NEXT GENERATION’S MAGNET.',
    'CAPITAL IS PART OF PONT’S PHYSICAL AND SOCIAL ARCHITECTURE, INTERACTING DIRECTLY WITH THE COMPANIES BUILDING INSIDE.',
    'PONT IS DESIGNED AS A TWO-WAY BRIDGE: HELPING EUROPEAN FOUNDERS REMAIN AND SCALE HERE WHILE AMBITIOUS INTERNATIONAL DEEP-TECH COMPANIES ESTABLISH A CREDIBLE EUROPEAN BASE.',
    'PONT INTENDS TO ESTABLISH A FOUNDER-FIRST UNIVERSITY, DESIGNED FROM THE GROUND UP AROUND ENTREPRENEURSHIP, TECHNOLOGY, PROJECTS, COMPETENCIES, NETWORKS AND REAL-WORLD PRODUCTION.',
    'STUDENTS LEARN INSIDE THE ENVIRONMENT WHERE TECHNOLOGIES ARE BUILT, COMPANIES ARE FINANCED AND FOUNDERS SOLVE REAL PROBLEMS.',
    'AMSTERDAM IS THE STARTING POINT, NOT THE LIMIT. DIFFERENT CITIES CAN EXPRESS DIFFERENT TECHNOLOGICAL STRENGTHS THROUGH THE SAME ECOSYSTEM ARCHITECTURE.',
    'SCIENTISTS, ENGINEERS, FOUNDERS, INVESTORS, CORPORATES AND STUDENTS PARTICIPATE IN THE SAME TECHNOLOGICAL ECOSYSTEM.',
  ]);
});
