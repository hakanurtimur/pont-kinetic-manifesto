export const COVER = Object.freeze({
  proposition: 'BUILDING THE PHYSICAL INFRASTRUCTURE FOR EUROPE\u2019S NEXT TECHNOLOGICAL ERA.',
  pillars: Object.freeze([
    'PHYSICAL AI',
    'LIFE SCIENCES',
    'CAPITAL',
    'COMMUNITY',
    'ACADEMY',
  ]),
});

export const EUROPE_GAP_STATEMENTS = Object.freeze([
  'ROBOTS CAN’T BE BUILT AT A DESK.',
  'SCIENCE CAN’T SCALE WITHOUT LABS.',
  'EUROPE’S EARLY-STAGE FOUNDERS LACK BOTH.',
]);

export const PONT_SOLUTION_STATEMENTS = Object.freeze([
  'PRIVATELY INVESTED. INDEPENDENTLY BUILT.',
  'LABS-AS-A-SERVICE. ROBOTICS ASSEMBLY & TESTING.',
  'ALL POWERED BY COMMUNITY AND CAPITAL.',
]);

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
  Object.freeze({ name: 'RESAT VOLKAN GUNEL', focus: 'INVESTMENT \u00d7 INTERNATIONAL NETWORKS \u00d7 LAW \u00d7 EDUCATION' }),
]);

export const COMMUNITY_GROUPS = Object.freeze([
  'TECHMAKERS',
  'ENTREPRENEURS',
  'FOUNDERS',
  'INVESTORS',
  'TECHNOLOGY PROFESSIONALS',
  'ECOSYSTEM PARTNERS',
]);

export const HOME_LAYERS = Object.freeze([
  'ROBOTICS',
  'LIFE SCIENCES',
  'HARDWARE',
  'LABS',
  'TESTING',
  'CAPITAL',
  'COMMUNITY',
]);

export const STACK_TRANSITIONS = Object.freeze([
  Object.freeze({ from: 'AI', to: 'PHYSICAL AI' }),
  Object.freeze({ from: 'SOFTWARE', to: 'SCIENCE' }),
  Object.freeze({ from: 'INTELLIGENCE', to: 'THE REAL WORLD' }),
]);

export const REVENUE_ENGINES = Object.freeze([
  Object.freeze({ name: 'SPACE', detail: 'LABS · ROBOTICS · OFFICES · FLEXIBLE SPACE' }),
  Object.freeze({ name: 'SERVICES', detail: 'LEGAL · FINANCE · REGULATORY · OPERATIONS · CORPORATE SERVICES' }),
  Object.freeze({ name: 'COMMUNITY', detail: 'EVENTS · MEMBERSHIPS · PARTNERSHIPS · SPONSORSHIPS' }),
  Object.freeze({ name: 'VENTURES', detail: 'EQUITY-FOR-SPACE · EQUITY-FOR-SERVICES · STARTUP PORTFOLIO' }),
  Object.freeze({ name: 'CAPITAL', detail: 'INVESTOR NETWORK · CO-INVESTMENT · FUTURE INVESTMENT VEHICLES' }),
  Object.freeze({ name: 'ACADEMY', detail: 'AI-NATIVE EDUCATION · EXECUTIVE PROGRAMMES · FUTURE UNIVERSITY' }),
]);

export const FLYWHEEL_STEPS = Object.freeze([
  'TENANT',
  'COMMUNITY MEMBER',
  'EMBEDDED SERVICES',
  'INVESTOR ACCESS',
  'COLLABORATION',
  'CORPORATE DISCOVERY',
  'SELECTED EQUITY',
  'NEXT-GEN FOUNDERS',
]);

export const FLYWHEEL_LAYERS = Object.freeze([
  'RENT PAYS THE FLOOR',
  'SERVICES DEEPEN THE RELATIONSHIP',
  'COMMUNITY CREATES THE NETWORK EFFECT',
  'EQUITY CAPTURES THE UPSIDE',
]);

export const FLYWHEEL_HEADING_LINES = Object.freeze([
  Object.freeze({ text: 'EVERY COMPANY' }),
  Object.freeze({ text: 'CAN CREATE' }),
  Object.freeze({ text: 'MORE THAN', accent: 'RENT.' }),
]);

export const CAPITAL_PARTNERS = Object.freeze([
  'INVESTOR GATHERINGS',
  'CORPORATE INVESTORS',
  'VENTURE CAPITAL',
  'FAMILY OFFICES',
  'STRATEGIC PARTNERS',
  'INVESTMENT VEHICLES',
]);

export const BRIDGE_ROUTES = Object.freeze([
  { origin: 'EUROPE', via: 'PONT', destination: 'SCALE IN EUROPE' },
  { origin: 'WORLD', via: 'PONT', destination: 'ENTER EUROPE' },
]);

export const UNIVERSITY_LAYERS = Object.freeze([
  'ENTREPRENEURSHIP',
  'TECHNOLOGY',
  'PROJECTS',
  'COMPETENCIES',
  'NETWORKS',
  'REAL-WORLD PRODUCTION',
]);

export const UNIVERSITY_MODES = Object.freeze([
  Object.freeze({ label: 'ONLINE LEARNING', detail: 'Academic content · Courses · AI-enabled learning' }),
  Object.freeze({ label: 'PHYSICAL EXPERIENCE', detail: 'Internships · Founder sessions · Workshops · Community' }),
]);

export const FOUNDER_FIRST_FEATURES = Object.freeze([
  'AI-NATIVE ADMINISTRATION',
  'AI-NATIVE EDUCATION',
  'AI-SUPPORTED LEGAL + OPERATIONAL ARCHITECTURE',
  'PROJECT-BASED',
  'FOUNDER-LED',
  'INDUSTRY-EMBEDDED',
  'INTERNATIONAL BY DESIGN',
]);

export const MODEL_LAYERS = Object.freeze([
  'INFRASTRUCTURE',
  'COMMUNITY',
  'CAPITAL',
  'SERVICES',
  'ACADEMY',
]);

export const VISION_TRANSFORMATIONS = Object.freeze([
  Object.freeze({ from: 'INTELLIGENCE', to: 'MACHINES' }),
  Object.freeze({ from: 'SCIENCE', to: 'COMPANIES' }),
  Object.freeze({ from: 'FOUNDERS', to: 'CAPITAL' }),
  Object.freeze({ from: 'COMMUNITY', to: 'INFRASTRUCTURE' }),
  Object.freeze({ from: 'ACADEMY', to: 'THE REAL ECONOMY' }),
]);

export const SCENES = Object.freeze([
  {
    id: 'physical-era',
    index: '01',
    eyebrow: 'THE NEXT ERA',
    statements: [
      'AI LEARNED TO THINK.',
      'NOW AI IS LEARNING HOW TO ACT.',
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
      'BUT IT KEEPS LOSING THE COMPANIES.',
      'THE INFRASTRUCTURE GAP.',
      ...EUROPE_GAP_STATEMENTS,
      'THIS IS WHERE PONT COMES IN.',
      ...PONT_SOLUTION_STATEMENTS,
    ],
    argument: 'EARLY-STAGE FOUNDERS LACK THE PHYSICAL INFRASTRUCTURE REQUIRED TO BUILD AND SCALE.',
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
      'IT STARTED WITH THREE ECOSYSTEM BUILDERS.',
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
  {
    id: 'the-home',
    index: '10',
    eyebrow: 'THE HOME',
    statements: [
      '10.000 M² TO ACCELERATE WHAT’S MISSING IN EUROPE.',
      'PONT ADDS THE PHYSICAL LAYER.',
      'AN ECOSYSTEM INSIDE AN ECOSYSTEM.',
    ],
    argument: 'PONT IS BEING DEVELOPED IN THE STACK, IN AMSTERDAM OOST, WITH ROOM TO GROW TOWARDS APPROXIMATELY 10.000 M².',
    layers: HOME_LAYERS,
  },
  {
    id: 'stack-pont',
    index: '11',
    eyebrow: 'THE STACK × PONT',
    statements: [
      'THE STACK BUILDS THE INTELLIGENCE LAYER.',
      'PONT GIVES INTELLIGENCE A BODY.',
      'INTELLIGENCE MEETS THE REAL WORLD.',
    ],
    argument: 'PONT HAS SIGNED AN MOU WITH TECHLEAP TO EXPLORE AND DEVELOP THIS COLLABORATION.',
    transitions: STACK_TRANSITIONS,
  },
  {
    id: 'business-model',
    index: '12',
    eyebrow: 'THE BUSINESS MODEL',
    statements: [
      'WE DON’T MONETISE DESKS.',
      'WE MONETISE THE ECOSYSTEM.',
      'PARTICIPATE ECONOMICALLY IN THE VALUE CREATED BY THE ECOSYSTEM.',
    ],
    argument: 'PONT IS DESIGNED AROUND MULTIPLE INTERCONNECTED REVENUE ENGINES.',
    engines: REVENUE_ENGINES,
  },
  {
    id: 'economic-flywheel',
    index: '13',
    eyebrow: 'THE ECONOMIC FLYWHEEL',
    statements: [
      'EVERY COMPANY THAT ENTERS PONT CAN CREATE MORE THAN RENT.',
      'SUCCESSFUL FOUNDERS ATTRACT THE NEXT GENERATION OF FOUNDERS.',
      'EQUITY CAPTURES THE UPSIDE.',
    ],
    argument: 'A TENANT CAN BECOME A MEMBER, CUSTOMER, COLLABORATOR, INVESTMENT AND THE NEXT GENERATION’S MAGNET.',
    steps: FLYWHEEL_STEPS,
    layers: FLYWHEEL_LAYERS,
  },
  {
    id: 'capital-inside',
    index: '14',
    eyebrow: 'CAPITAL LIVES INSIDE THE ECOSYSTEM',
    statements: [
      'FOUNDERS SHOULDN’T HAVE TO LEAVE THE BUILDING TO FIND INVESTORS.',
      'FROM LANDLORD AND TENANT TO FOUNDER AND INVESTOR.',
      'DISCOVERED. FINANCED. SCALED.',
    ],
    argument: 'CAPITAL IS PART OF PONT’S PHYSICAL AND SOCIAL ARCHITECTURE, INTERACTING DIRECTLY WITH THE COMPANIES BUILDING INSIDE.',
    partners: CAPITAL_PARTNERS,
  },
  {
    id: 'two-way-bridge',
    index: '15',
    eyebrow: 'THE TWO-WAY BRIDGE',
    statements: [
      'PONT CONNECTS WHAT THE WORLD BUILDS BEST.',
    ],
    argument: 'A two-way bridge connecting talent, technology and capital across global deep-tech ecosystems.',
    network: 'NON-EU AND THE WIDER EAST–WEST CORRIDOR PROVIDE AN IMMEDIATE STARTING NETWORK. THE AMBITION IS GLOBAL.',
    routes: BRIDGE_ROUTES,
  },
  {
    id: 'founder-first-university',
    index: '16',
    eyebrow: 'THE UNIVERSITY',
    statements: [
      'NOT ANOTHER UNIVERSITY SURROUNDED BY ENTREPRENEURSHIP PROGRAMMES.',
      'A FOUNDER-FIRST UNIVERSITY.',
      'PUT THE UNIVERSITY INSIDE THE ECOSYSTEM.',
    ],
    argument: 'PONT INTENDS TO ESTABLISH A FOUNDER-FIRST UNIVERSITY, DESIGNED FROM THE GROUND UP AROUND ENTREPRENEURSHIP, TECHNOLOGY, PROJECTS, COMPETENCIES, NETWORKS AND REAL-WORLD PRODUCTION.',
    layers: UNIVERSITY_LAYERS,
  },
  {
    id: 'university-inside-companies',
    index: '17',
    eyebrow: 'THE FOUNDER-FIRST UNIVERSITY',
    statements: [
      'WE ARE BUILDING A UNIVERSITY INSIDE THE COMPANIES.',
    ],
    argument: 'Learning happens online. Experience happens inside the ecosystem.',
    modes: UNIVERSITY_MODES,
    features: FOUNDER_FIRST_FEATURES,
  },
  {
    id: 'traveling-model',
    index: '18',
    eyebrow: 'THE MODEL',
    statements: [
      'ONE BUILDING NOW.',
      'A MODEL THAT CAN TRAVEL.',
      'BUILD THE ECOSYSTEM ONCE. LEARN FROM IT. THEN MAKE THE MODEL TRAVEL.',
    ],
    argument: 'AMSTERDAM IS THE STARTING POINT, NOT THE LIMIT. DIFFERENT CITIES CAN EXPRESS DIFFERENT TECHNOLOGICAL STRENGTHS THROUGH THE SAME ECOSYSTEM ARCHITECTURE.',
    layers: MODEL_LAYERS,
  },
  {
    id: 'final-vision',
    index: '19',
    eyebrow: 'THE VISION',
    statements: [
      'THE PHYSICAL HOME OF EUROPE’S NEXT TECHNOLOGICAL ERA.',
      'NOW LET’S BUILD THE ENVIRONMENT THAT TURNS IT INTO THE FUTURE.',
    ],
    argument: 'SCIENTISTS, ENGINEERS, FOUNDERS, INVESTORS, CORPORATES AND STUDENTS PARTICIPATE IN THE SAME TECHNOLOGICAL ECOSYSTEM.',
    transformations: VISION_TRANSFORMATIONS,
  },
]);

export const CAPABILITIES = Object.freeze({
  physical: ['SENSE', 'DECIDE', 'MOVE'],
  life: ['DISCOVER', 'ENGINEER', 'HEAL'],
});
import { THERAPY_NODE_LAYOUT } from './therapy-layout.mjs';
