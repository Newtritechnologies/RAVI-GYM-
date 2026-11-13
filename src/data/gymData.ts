import gymHeroFloorImg from '../assets/images/gym_hero_floor_1794548260041.jpg';
import gymPhilosophyKettlebellsImg from '../assets/images/gym_philosophy_kettlebells_1794548260157.jpg';
import gymEquipDumbbellsImg from '../assets/images/gym_equip_dumbbells_1794548286712.jpg';
import gymEquipSquatRackImg from '../assets/images/gym_equip_squatrack_1794548260372.jpg';
import gymEquipCardioTurfImg from '../assets/images/gym_equip_cardio_turf_1794548282167.jpg';
import gymEquipCablesImg from '../assets/images/gym_equip_cables_1794548262114.jpg';
import gymTrainerStrengthImg from '../assets/images/gym_trainer_strength_1794548262193.jpg';
import gymTrainerConditioningImg from '../assets/images/gym_trainer_conditioning_1794548262137.jpg';
import gymTrainerMobilityImg from '../assets/images/gym_trainer_mobility_1794548262525.jpg';
import gymTrainerOlympicImg from '../assets/images/gym_trainer_olympic_1794548263366.jpg';
import gymFacilityRecoveryImg from '../assets/images/gym_facility_recovery_1794548264367.jpg';
import gymFacilityCombatImg from '../assets/images/gym_facility_combat_1794548263402.jpg';

export type GymPageRoute =
  | 'home'
  | 'offers'
  | 'equipments'
  | 'trainers'
  | 'facilities';

export type OfferCategory =
  | 'All'
  | 'Monthly'
  | 'Quarterly'
  | 'Annual'
  | 'Coaching';

export type EquipmentCategory =
  | 'All'
  | 'Racks & Platforms'
  | 'Free Weights'
  | 'Cardio & Turf'
  | 'Cables & Machines'
  | 'Functional';

export type TrainerSpecialty =
  | 'All'
  | 'Strength & Powerlifting'
  | 'HIIT & Conditioning'
  | 'Boxing & Combat'
  | 'Olympic Lifting';

export interface GymOffer {
  id: string;
  index: string;
  title: string;
  category: Exclude<OfferCategory, 'All'>;
  price: number;
  originalPrice?: number;
  billingLabel: string;
  summary: string;
  details: string;
  inclusions: string[];
  validityNote: string;
  featured?: boolean;
  image: string;
}

export interface GymEquipment {
  id: string;
  index: string;
  name: string;
  category: Exclude<EquipmentCategory, 'All'>;
  brandSpec: string;
  summary: string;
  fullSpecs: string;
  targetMuscles: string;
  zone: string;
  unitsCount: number;
  coachingTip: string;
  image: string;
}

export interface GymTrainer {
  id: string;
  index: string;
  name: string;
  role: string;
  specialty: Exclude<TrainerSpecialty, 'All'>;
  experienceYears: number;
  summary: string;
  bio: string;
  certifications: string[];
  sessionPrice: number;
  availability: string;
  image: string;
}

export interface GymFacility {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  areaOrCapacity: string;
  hours: string;
  summary: string;
  details: string;
  highlights: string[];
  image: string;
}

export const GYM_ASSETS = {
  heroFloor: gymHeroFloorImg,
  philosophyKettlebells: gymPhilosophyKettlebellsImg,
  recoveryLounge: gymFacilityRecoveryImg,
  combatStudio: gymFacilityCombatImg,
  olympicCoaching: gymTrainerOlympicImg,
};

export const OFFER_CATEGORIES: OfferCategory[] = [
  'All',
  'Monthly',
  'Quarterly',
  'Annual',
  'Coaching',
];

export const GYM_OFFERS: GymOffer[] = [
  {
    id: 'offer-foundation-monthly',
    index: '01',
    title: 'All-Access Strength Pass',
    category: 'Monthly',
    price: 3499,
    originalPrice: 4200,
    billingLabel: 'per month',
    summary: 'Full strength floor, turf arena, locker rooms, and 2 coach check-ins.',
    details:
      'Designed for consistent lifters who want unrestricted daily access from 05:30 to 22:30 across all 8 Olympic lifting platforms, free weights, and the 40-meter conditioning turf.',
    inclusions: [
      'Unlimited access to Main Strength Floor & Turf Arena',
      '2 complimentary form & programming check-ins per month',
      'Locker, hot shower & towel service included',
      'Zero joining fee on first month enrollment',
    ],
    validityNote: 'Cancel or pause anytime with 7 days notice.',
    featured: true,
    image: gymHeroFloorImg,
  },
  {
    id: 'offer-quarterly-transform',
    index: '02',
    title: '90-Day Strength & Recovery',
    category: 'Quarterly',
    price: 9499,
    originalPrice: 12600,
    billingLabel: 'for 3 months',
    summary: 'Full floor + Finnish sauna, 4°C cold plunge, and body composition scan.',
    details:
      'Our most popular quarterly block pairs unlimited strength & conditioning access with full Recovery Lounge privileges and bi-weekly InBody progress tracking.',
    inclusions: [
      'Unlimited strength, turf, boxing & mobility studios',
      'Unlimited Finnish cedar sauna & 4°C cold plunge access',
      '3 InBody composition scans + nutrition guidelines',
      '2 guest passes per month for training partners',
    ],
    validityNote: 'Saves ₹3,101 compared to standard monthly billing.',
    featured: true,
    image: gymFacilityRecoveryImg,
  },
  {
    id: 'offer-annual-founder',
    index: '03',
    title: 'Annual Black Card Membership',
    category: 'Annual',
    price: 31999,
    originalPrice: 44000,
    billingLabel: 'per year',
    summary: '12 months all-access + 2 bonus months freeze + 4 personal training sessions.',
    details:
      'Built for year-round athletes. Includes every training floor, unlimited Recovery Lounge, combat classes, and four dedicated 1-on-1 coaching sessions to dial in your lifts.',
    inclusions: [
      'Full 12-month access to every zone & recovery suite',
      '4 complimentary 1-on-1 personal training sessions',
      'Dedicated personal locker & laundry drop-off',
      'Up to 60 days travel freeze at zero cost',
    ],
    validityNote: 'Includes priority booking for weekend workshops.',
    featured: true,
    image: gymFacilityCombatImg,
  },
  {
    id: 'offer-offpeak-morning',
    index: '04',
    title: 'Mid-Day & Student Pass',
    category: 'Monthly',
    price: 2499,
    originalPrice: 3499,
    billingLabel: 'per month',
    summary: 'Off-peak access (10:30 — 16:30) with full floor & cardio turf.',
    details:
      'Train during the quietest sunlit hours of the day on our main strength floor and sprint turf at an unbeatable monthly rate.',
    inclusions: [
      'Daily entry between 10:30 and 16:30',
      'Full access to racks, dumbbells, cables & sprint turf',
      '1 monthly mobility & posture assessment',
    ],
    validityNote: 'Valid student ID or off-peak preference.',
    image: gymEquipDumbbellsImg,
  },
  {
    id: 'offer-pt-starter',
    index: '05',
    title: '12-Session Coaching Pack',
    category: 'Coaching',
    price: 14400,
    originalPrice: 18000,
    billingLabel: '12 sessions',
    summary: 'Dedicated 1-on-1 coach, custom 6-week block, and video lift review.',
    details:
      'Work directly with a certified RAVI GYM coach twice or thrice a week. Every rep is tracked, coached, and adapted to your joint mobility and strength goals.',
    inclusions: [
      '12 private 60-minute sessions with your chosen coach',
      'Custom progressive overload spreadsheet & nutrition targets',
      'Barbell & movement video breakdown after each week',
    ],
    validityNote: 'Valid for 90 days from first session.',
    image: gymTrainerOlympicImg,
  },
  {
    id: 'offer-partner-duo',
    index: '06',
    title: 'Training Partner Duo Offer',
    category: 'Quarterly',
    price: 16999,
    originalPrice: 22800,
    billingLabel: 'for 2 members · 3 mo',
    summary: 'Two full memberships bundled together with sauna & weekend boxing.',
    details:
      'Bring a friend, sibling, or partner and lock in 25% off two full-access quarterly memberships including the Recovery Lounge.',
    inclusions: [
      'Full access for 2 members across all training zones',
      'Unlimited sauna, cold plunge & group conditioning classes',
      'Shared kickoff movement screen with a head coach',
    ],
    validityNote: 'Both memberships activate on the same start date.',
    image: gymEquipCardioTurfImg,
  },
];

export const EQUIPMENT_CATEGORIES: EquipmentCategory[] = [
  'All',
  'Racks & Platforms',
  'Free Weights',
  'Cardio & Turf',
  'Cables & Machines',
  'Functional',
];

export const GYM_EQUIPMENTS: GymEquipment[] = [
  {
    id: 'eq-olympic-rack',
    index: '01',
    name: 'Competition Power Racks',
    category: 'Racks & Platforms',
    brandSpec: '8 Stations · Oak Platforms',
    summary: 'Heavy-gauge 3×3 steel racks with calibrated bumper plates and safety straps.',
    fullSpecs:
      'Eight dedicated Olympic lifting stations anchored on shock-absorbing oak and vulcanized rubber platforms. Outfitted with competition 20 kg power bars, Eleiko-calibrated bumper plates, and laser-numbered uprights.',
    targetMuscles: 'Full Body · Squats, Deadlifts, Presses',
    zone: 'Main Strength Floor · Bay A',
    unitsCount: 8,
    coachingTip: 'Set safety spotter straps 2 inches below your bottom squat depth.',
    image: gymEquipSquatRackImg,
  },
  {
    id: 'eq-machined-dumbbells',
    index: '02',
    name: 'Machined Steel Dumbbells',
    category: 'Free Weights',
    brandSpec: '2.5 kg — 60 kg · Knurled',
    summary: 'Precision steel dumbbells paired with heavy-duty zero-gap adjustable benches.',
    fullSpecs:
      'Full two-tier rack running in 2.5 kg increments from 2.5 kg up to 60 kg, featuring medium volcano knurling and anti-roll end caps alongside commercial 0–85° incline benches.',
    targetMuscles: 'Chest, Shoulders, Arms, Back',
    zone: 'Free Weight Gallery · Bay B',
    unitsCount: 6,
    coachingTip: 'Keep shoulder blades retracted into the bench pad before pressing.',
    image: gymEquipDumbbellsImg,
  },
  {
    id: 'eq-turf-sleds',
    index: '03',
    name: '40m Sprint Turf & Push Sleds',
    category: 'Cardio & Turf',
    brandSpec: '40m Dual Lane · Weighted Sleds',
    summary: 'High-density athletic sprint turf with dual weighted prowler sleds and harnesses.',
    fullSpecs:
      'Forty-meter marked sprint and sled track cushioned for joint impact, equipped with dual high-low push sleds, speed chutes, and farmer’s walk handles.',
    targetMuscles: 'Glutes, Quads, Posterior Chain, Conditioning',
    zone: 'Conditioning Arena · Bay C',
    unitsCount: 4,
    coachingTip: 'Drive through the balls of your feet with a 45-degree forward torso lean.',
    image: gymEquipCardioTurfImg,
  },
  {
    id: 'eq-concept2-ergs',
    index: '04',
    name: 'Concept2 Rowers & SkiErgs',
    category: 'Cardio & Turf',
    brandSpec: 'PM5 Monitors · 10 Stations',
    summary: 'Air-resistance rowing and upper-body SkiErg machines with live split tracking.',
    fullSpecs:
      'Six Model D Concept2 RowErgs and four wall-mounted SkiErgs synced with PM5 performance monitors for accurate wattage, pace/500m, and interval telemetry.',
    targetMuscles: 'Cardiovascular, Lats, Core, Legs',
    zone: 'Conditioning Arena · Bay C',
    unitsCount: 10,
    coachingTip: 'Row with legs first, hinge back slightly, then finish the pull with your elbows.',
    image: gymEquipCardioTurfImg,
  },
  {
    id: 'eq-cable-tower',
    index: '05',
    name: 'Dual-Pulley Cable Crossover',
    category: 'Cables & Machines',
    brandSpec: '2:1 Ratio · 100 kg Dual Stacks',
    summary: 'Brushed steel functional cable towers with lat pulldown & seated row stations.',
    fullSpecs:
      'Smooth aircraft-cable dual adjustable pulley towers paired with dedicated lat pulldown and low-row stations, stocked with MAG grips, triceps ropes, and single D-handles.',
    targetMuscles: 'Back, Chest, Rear Delts, Arms',
    zone: 'Hypertrophy Wing · Bay D',
    unitsCount: 4,
    coachingTip: 'Control a 2-second eccentric return on every rep for constant tension.',
    image: gymEquipCablesImg,
  },
  {
    id: 'eq-kettlebell-wall',
    index: '06',
    name: 'Cast-Iron Kettlebells & Chalk',
    category: 'Functional',
    brandSpec: '8 kg — 48 kg · Competition',
    summary: 'Color-banded competition and cast-iron kettlebells with wooden chalk stations.',
    fullSpecs:
      'Matched pairs of cast-iron kettlebells ranging from 8 kg to 48 kg resting alongside solid ash chalk stands for clean swings, snatches, and Turkish get-ups.',
    targetMuscles: 'Hips, Grip, Core, Rotational Power',
    zone: 'Strength & Turf Border',
    unitsCount: 24,
    coachingTip: 'Snap your hips forcefully rather than lifting the bell with your shoulders.',
    image: gymPhilosophyKettlebellsImg,
  },
  {
    id: 'eq-heavy-bags',
    index: '07',
    name: 'Leather Heavy Bags & Rings',
    category: 'Functional',
    brandSpec: '60 kg Leather · Birch Rings',
    summary: 'Full-grain leather boxing bags suspended from steel I-beams and gymnastic rings.',
    fullSpecs:
      'Six 60 kg vintage-tanned leather heavy bags, speed bags, and competition-width birchwood gymnastic rings hung over high-density shock-absorbent grappling mats.',
    targetMuscles: 'Shoulders, Core, Footwork, Agility',
    zone: 'Combat & Mobility Studio',
    unitsCount: 6,
    coachingTip: 'Keep your chin tucked and exhale sharply on every punch combination.',
    image: gymFacilityCombatImg,
  },
  {
    id: 'eq-barbell-library',
    index: '08',
    name: 'Specialty Barbells & Plates',
    category: 'Free Weights',
    brandSpec: '20 kg / 15 kg · Calibrated',
    summary: 'Olympic weightlifting bars, trap bars, Swiss bars, and safety squat bars.',
    fullSpecs:
      'Dedicated vertical rack housing needle-bearing Olympic bars, stiff deadlift bars, open-entry hex trap bars, and padded safety squat bars for joint-friendly heavy loading.',
    targetMuscles: 'Full Body Strength & Power',
    zone: 'Main Strength Floor · Bay A',
    unitsCount: 16,
    coachingTip: 'Use the open hex trap bar for high-output lower-back-friendly pulls.',
    image: gymHeroFloorImg,
  },
];

export const TRAINER_SPECIALTIES: TrainerSpecialty[] = [
  'All',
  'Strength & Powerlifting',
  'HIIT & Conditioning',
  'Boxing & Combat',
  'Olympic Lifting',
];

export const GYM_TRAINERS: GymTrainer[] = [
  {
    id: 'tr-arjun',
    index: '01',
    name: 'Arjun Verma',
    role: 'Head of Strength',
    specialty: 'Strength & Powerlifting',
    experienceYears: 11,
    summary: 'Former national powerlifting medalist focused on squat, bench, and deadlift mastery.',
    bio: 'Arjun has coached over 400 lifters from first-time barbell beginners to national podium finishers. His sessions prioritize crisp bar path, bracing mechanics, and sustainable progressive overload.',
    certifications: ['NSCA-CSCS', 'IPF Level 2 Coach', 'Sports Nutritionist'],
    sessionPrice: 1500,
    availability: 'Mon – Sat · 06:00 – 13:00',
    image: gymTrainerStrengthImg,
  },
  {
    id: 'tr-priya',
    index: '02',
    name: 'Priya Nair',
    role: 'Lead Conditioning Coach',
    specialty: 'HIIT & Conditioning',
    experienceYears: 9,
    summary: 'Engine-building intervals, sled work, and metabolic conditioning for endurance.',
    bio: 'A former collegiate 800m track athlete, Priya designs structured aerobic and anaerobic blocks on the Concept2 rowers and 40m sprint turf that burn fat without frying your joints.',
    certifications: ['EXOS Performance Specialist', 'CrossFit Level 2', 'CPR / AED'],
    sessionPrice: 1400,
    availability: 'Tue – Sun · 07:00 – 19:00',
    image: gymTrainerConditioningImg,
  },
  {
    id: 'tr-meera',
    index: '03',
    name: 'Meera Kapoor',
    role: 'Boxing & Mobility Coach',
    specialty: 'Boxing & Combat',
    experienceYears: 8,
    summary: 'Technical boxing footwork, bag rounds, and shoulder-hip mobility restoration.',
    bio: 'Meera blends classic amateur boxing footwork with modern FRC joint-mobility drills—helping desk professionals and athletes build crisp combinations, core rotation, and pain-free overhead reach.',
    certifications: ['Boxing Federation Coach', 'FRC Mobility Specialist', 'Kettlebell SFG'],
    sessionPrice: 1400,
    availability: 'Mon – Sat · 11:00 – 20:30',
    image: gymTrainerMobilityImg,
  },
  {
    id: 'tr-vikram',
    index: '04',
    name: 'Vikram Rathore',
    role: 'Olympic Weightlifting Coach',
    specialty: 'Olympic Lifting',
    experienceYears: 14,
    summary: 'Snatch, clean & jerk technique, explosive hip power, and barbell velocity.',
    bio: 'With fourteen years on the coaching deck, Vikram breaks down complex Olympic lifts into approachable positional drills so lifters build speed, coordination, and confidence under the bar.',
    certifications: ['IWLF Senior Coach', 'NASM-PES', 'Biomechanics Cert'],
    sessionPrice: 1800,
    availability: 'Mon – Fri · 16:00 – 21:30',
    image: gymTrainerOlympicImg,
  },
];

export const GYM_FACILITIES: GymFacility[] = [
  {
    id: 'fac-strength-floor',
    index: '01',
    name: 'The Main Strength Floor',
    subtitle: 'Sunlit steel, oak platforms, and calibrated iron',
    areaOrCapacity: '6,500 sq ft · 8 Olympic Platforms',
    hours: 'Daily · 05:30 — 22:30',
    summary: 'Spacious high-ceiling lifting floor flooded with natural light and zero cramped machines.',
    details:
      'Engineered with heavy acoustic rubber, solid oak lifting inserts, and generous spacing between all 8 power racks so you never bump elbows mid-set.',
    highlights: [
      '8 competition power racks with calibrated bumper plates',
      'Full 2.5 kg – 60 kg machined steel dumbbell wall',
      'Natural daylight arched windows & filtered fresh-air HVAC',
    ],
    image: gymHeroFloorImg,
  },
  {
    id: 'fac-conditioning-arena',
    index: '02',
    name: 'Turf & Conditioning Arena',
    subtitle: '40m sprint track, sleds, and Concept2 rowers',
    areaOrCapacity: '3,200 sq ft · 40m Dual Turf Lane',
    hours: 'Daily · 05:30 — 22:30',
    summary: 'Dedicated indoor sprint lane and ergometer row beneath bright architectural skylights.',
    details:
      'Built for athletic speed, sled pushes, kettlebell complexes, and structured metabolic conditioning without stepping outdoors into pollution or heat.',
    highlights: [
      '40-meter cushioned turf lane with push & pull sleds',
      '10 Concept2 RowErgs & SkiErgs with live telemetry monitors',
      'Kettlebell & chalk station from 8 kg to 48 kg',
    ],
    image: gymEquipCardioTurfImg,
  },
  {
    id: 'fac-recovery-lounge',
    index: '03',
    name: 'Recovery Lounge & Sauna',
    subtitle: 'Finnish cedarwood sauna & 4°C cold plunge',
    areaOrCapacity: '1,400 sq ft · Thermal Contrast Suite',
    hours: 'Daily · 06:30 — 22:00',
    summary: 'Reset your nervous system post-lift with cedar heat, cold immersion, and chilled towels.',
    details:
      'Included in Quarterly and Annual memberships (and available as an add-on pass), our tranquil recovery lounge pairs a glass-fronted 85°C Finnish sauna with a continuously filtered 4°C stone cold plunge.',
    highlights: [
      '85°C cedarwood dry Finnish sauna with eucalyptus steam',
      'Continuously UV-filtered 4°C stone cold plunge pool',
      'Fresh cotton bath towels, botanical wash & lounge daybeds',
    ],
    image: gymFacilityRecoveryImg,
  },
  {
    id: 'fac-combat-mobility',
    index: '04',
    name: 'Combat & Mobility Studio',
    subtitle: 'Heavy leather bags, birch rings, and floor work',
    areaOrCapacity: '1,800 sq ft · 16 Mats & 6 Bags',
    hours: 'Daily · 06:00 — 21:30',
    summary: 'Dedicated studio for heavy-bag boxing rounds, gymnastic rings, and guided mobility.',
    details:
      'Outfitted with hand-stitched 60 kg leather heavy bags, wooden gymnastic rings, stall bars, and cushioned grappling mats for small-group boxing and restorative mobility sessions.',
    highlights: [
      '6 suspended leather heavy bags & speed bag corner',
      'Daily morning thoracic mobility & evening boxing pads',
      'Complimentary hand-wrap station & glove sanitizing',
    ],
    image: gymFacilityCombatImg,
  },
];
