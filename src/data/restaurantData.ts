import heroDiningRoomImg from '../assets/images/hero_dining_room_1794546899793.jpg';
import heroDiningBrightImg from '../assets/images/hero_dining_bright_1794547610573.jpg';
import philosophySpicesBrightImg from '../assets/images/philosophy_spices_bright_1794547610183.jpg';
import curryCopperHandiImg from '../assets/images/curry_copper_handi_1794546900376.jpg';
import dishPaneerTikkaImg from '../assets/images/dish_paneer_tikka_1794546901320.jpg';
import dishSeekhKebabImg from '../assets/images/dish_seekh_kebab_1794546900736.jpg';
import dishButterChickenImg from '../assets/images/dish_butter_chicken_1794546901884.jpg';
import dishBiryaniImg from '../assets/images/dish_biryani_1794546902664.jpg';
import dishChaatImg from '../assets/images/dish_chaat_1794546902473.jpg';
import dishAmritsariFishImg from '../assets/images/dish_amritsari_fish_1794546902345.jpg';
import dishGarlicNaanImg from '../assets/images/dish_garlic_naan_1794546903081.jpg';
import dishGulabJamunImg from '../assets/images/dish_gulab_jamun_1794546903066.jpg';
import dishKulfiShrikhandImg from '../assets/images/dish_kulfi_shrikhand_1794546903850.jpg';
import dishMasalaChaiImg from '../assets/images/dish_masala_chai_1794546903654.jpg';
import facilityCourtyardImg from '../assets/images/facility_courtyard_1794546904643.jpg';
import kitchenTandoorFireImg from '../assets/images/kitchen_tandoor_fire_1794546905439.jpg';

export type PageRoute = 'home' | 'menu' | 'story' | 'facilities' | 'gallery';

export type MenuCategory =
  | 'All'
  | 'Tandoor'
  | 'Curry'
  | 'Rice'
  | 'Small Plates'
  | 'Breads'
  | 'Dessert'
  | 'Drinks';

export interface DishItem {
  id: string;
  index: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  description: string;
  tastingNotes: string;
  spiceLevel: 'No heat' | 'Mild' | 'Medium' | 'Warming';
  dietary: 'Vegetarian' | 'Non-Vegetarian';
  signature?: boolean;
  pairing: string;
  prepNote: string;
  image: string;
}

export interface SpaceFacility {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  capacity: string;
  hours: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Spaces' | 'Tandoor & Craft' | 'The Table';
  caption: string;
  aspect: 'wide' | 'square';
  image: string;
}

export const SITE_ASSETS = {
  heroDiningRoom: heroDiningRoomImg,
  heroDiningBright: heroDiningBrightImg,
  philosophySpicesBright: philosophySpicesBrightImg,
  curryCopperHandi: curryCopperHandiImg,
  facilityCourtyard: facilityCourtyardImg,
  kitchenTandoorFire: kitchenTandoorFireImg,
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Tandoor',
  'Curry',
  'Rice',
  'Small Plates',
  'Breads',
  'Dessert',
  'Drinks',
];

export const MENU_DISHES: DishItem[] = [
  {
    id: 'paneer-tikka',
    index: '01',
    name: 'Paneer Tikka',
    category: 'Tandoor',
    price: 420,
    description: 'Charred cottage cheese, hung curd, ajwain, heirloom peppers',
    tastingNotes:
      'Pressed house-churned paneer marinated overnight in strained yoghurt, smoked Kashmiri chili, roasted carom seeds, and cold-pressed mustard oil before roasting over live charcoal.',
    spiceLevel: 'Medium',
    dietary: 'Vegetarian',
    signature: true,
    pairing: 'Pair with Lachha Paratha & stone-ground mint-coriander chutney.',
    prepNote: 'Finished tableside with chaat masala and charred lime.',
    image: dishPaneerTikkaImg,
  },
  {
    id: 'chicken-seekh-kebab',
    index: '02',
    name: 'Chicken Seekh Kebab',
    category: 'Tandoor',
    price: 560,
    description: 'Hand-minced chicken skewers, green chili, roasted cumin, mint',
    tastingNotes:
      'Coarsely hand-chopped thigh meat folded with caramelized ginger, fresh coriander stems, white pepper, and aged cheddar for tenderness over glowing embers.',
    spiceLevel: 'Medium',
    dietary: 'Non-Vegetarian',
    signature: true,
    pairing: 'Best enjoyed with pickled shallots and chilled Rose Lassi.',
    prepNote: 'Skewered on iron rods and pulled to order from the clay tandoor.',
    image: dishSeekhKebabImg,
  },
  {
    id: 'dal-makhani',
    index: '03',
    name: 'Dal Makhani',
    category: 'Curry',
    price: 380,
    description: 'Black lentils, tomato, butter, a 12-hour simmer',
    tastingNotes:
      'Whole urad lentils soaked and slow-cooked overnight on dying tandoor coals with heirloom tomato puree, hand-churned white butter, and freshly pounded green cardamom.',
    spiceLevel: 'Mild',
    dietary: 'Vegetarian',
    signature: true,
    pairing: 'Essential alongside blistered Garlic Naan.',
    prepNote: 'Our house recipe from 1987, stirred in heavy copper degs.',
    image: curryCopperHandiImg,
  },
  {
    id: 'butter-chicken',
    index: '04',
    name: 'Butter Chicken',
    category: 'Curry',
    price: 480,
    description: 'Clay-oven chicken, tomato makhani, fenugreek',
    tastingNotes:
      'Char-grilled tandoori chicken tikka simmered in a satin-smooth San Marzano and desi tomato gravy perfumed with toasted kasuri methi and cultured butter.',
    spiceLevel: 'Mild',
    dietary: 'Non-Vegetarian',
    signature: true,
    pairing: 'Pair with Garlic Naan or aged basmati jeera rice.',
    prepNote: 'Balanced natural sweetness with zero artificial colour.',
    image: dishButterChickenImg,
  },
  {
    id: 'hyderabadi-biryani',
    index: '05',
    name: 'Hyderabadi Biryani',
    category: 'Rice',
    price: 520,
    description: 'Saffron basmati, charred vegetables, fried onion, burhani raita',
    tastingNotes:
      'Two-year-aged Dehraduni basmati steamed under a wheat-dough seal with seasonal root vegetables, roasted jackfruit, Pampore saffron milk, and crisp birista shallots.',
    spiceLevel: 'Medium',
    dietary: 'Vegetarian',
    pairing: 'Served with roasted-garlic yoghurt raita and mirchi ka salan.',
    prepNote: 'Baked dum-style in earthenware handis and unsealed at the table.',
    image: dishBiryaniImg,
  },
  {
    id: 'lucknowi-chicken-biryani',
    index: '06',
    name: 'Lucknowi Chicken Biryani',
    category: 'Rice',
    price: 580,
    description: 'Tender chicken, aged basmati, kewra, mint',
    tastingNotes:
      'Delicate Awadhi-style layered biryani scented with screwpine kewra water, mace, saffron, and clarified butter over slow-braised bone-in chicken.',
    spiceLevel: 'Mild',
    dietary: 'Non-Vegetarian',
    pairing: 'Served with toasted cumin raita and crisp onion rings.',
    prepNote: 'Fragrant rather than fiery, crafted for long Sunday lunches.',
    image: dishBiryaniImg,
  },
  {
    id: 'samosa-chaat',
    index: '07',
    name: 'Samosa Chaat',
    category: 'Small Plates',
    price: 280,
    description: 'Punjabi potato samosa, spiced chickpeas, sweet yoghurt, tamarind',
    tastingNotes:
      'Flaky ajwain-crusted potato and green pea pastry crushed warm over slow-stewed chana, cool whipped curd, jaggery-tamarind glaze, and ruby pomegranate seeds.',
    spiceLevel: 'Medium',
    dietary: 'Vegetarian',
    pairing: 'An ideal opening plate with crisp sparkling lime.',
    prepNote: 'Assembled seconds before reaching your table for crisp contrast.',
    image: dishChaatImg,
  },
  {
    id: 'papdi-chaat',
    index: '08',
    name: 'Papdi Chaat',
    category: 'Small Plates',
    price: 260,
    description: 'Crisp wheat wafers, potato, mint chutney, pomegranate',
    tastingNotes:
      'Paper-thin house-fried semolina wafers layered with diced boiled potato, chilled salted yoghurt, emerald coriander-mint chutney, and fine chickpea sev.',
    spiceLevel: 'Mild',
    dietary: 'Vegetarian',
    pairing: 'Pairs bright and cool with smoky Tandoor starters.',
    prepNote: 'Inspired by Old Delhi evening street carts.',
    image: dishChaatImg,
  },
  {
    id: 'amritsari-fish',
    index: '09',
    name: 'Amritsari Fish',
    category: 'Small Plates',
    price: 490,
    description: 'Gram flour, carom, pickled onion',
    tastingNotes:
      'Fresh river sole marinated with crushed ajwain, ginger-garlic paste, and turmeric, dipped in an airy chickpea batter and fried golden to an audible crunch.',
    spiceLevel: 'Medium',
    dietary: 'Non-Vegetarian',
    pairing: 'Served with vinegar-pickled pink onions and green chutney.',
    prepNote: 'Dusted with house-ground black salt chaat masala.',
    image: dishAmritsariFishImg,
  },
  {
    id: 'garlic-naan',
    index: '10',
    name: 'Garlic Naan',
    category: 'Breads',
    price: 140,
    description: 'Clay-oven bread, roasted garlic, coriander, cultured butter',
    tastingNotes:
      'Naturally fermented refined wheat dough slapped onto the glowing clay wall of the tandoor, blistered crisp, and brushed with brown-garlic ghee and fresh cilantro.',
    spiceLevel: 'No heat',
    dietary: 'Vegetarian',
    pairing: 'Built for scooping Dal Makhani and Butter Chicken.',
    prepNote: 'Pulled piping hot straight to the basket.',
    image: dishGarlicNaanImg,
  },
  {
    id: 'gulab-jamun',
    index: '11',
    name: 'Gulab Jamun',
    category: 'Dessert',
    price: 220,
    description: 'Warm milk dumplings, saffron syrup, pistachio',
    tastingNotes:
      'Slow-reduced khoya milk dumplings fried gently in clarified butter until deep amber, soaked in warm green-cardamom rose syrup with slivered Iranian pistachios.',
    spiceLevel: 'No heat',
    dietary: 'Vegetarian',
    signature: true,
    pairing: 'Order alongside a steaming kulhad of Masala Chai.',
    prepNote: 'Served warm from the brass chafing dish.',
    image: dishGulabJamunImg,
  },
  {
    id: 'mango-shrikhand',
    index: '12',
    name: 'Mango Shrikhand',
    category: 'Dessert',
    price: 240,
    description: 'Alphonso mango, hung yoghurt, cardamom',
    tastingNotes:
      'Thick muslin-strained farm yoghurt whipped by hand until cloud-light with Ratnagiri Alphonso mango puree, steeped saffron strands, and freshly ground nutmeg.',
    spiceLevel: 'No heat',
    dietary: 'Vegetarian',
    pairing: 'A cool, sunlit finish after rich tandoor dishes.',
    prepNote: 'Chilled in stoneware bowls with roasted almonds.',
    image: dishKulfiShrikhandImg,
  },
  {
    id: 'kulfi-trio',
    index: '13',
    name: 'Kulfi Trio',
    category: 'Dessert',
    price: 260,
    description: 'Pistachio, rose, and roasted almond',
    tastingNotes:
      'Traditional slow-evaporated whole milk frozen in conical brass moulds in three classic flavours: green pistachio, Kannauj rose petal, and toasted Kashmiri almond.',
    spiceLevel: 'No heat',
    dietary: 'Vegetarian',
    pairing: 'Shared easily across the table.',
    prepNote: 'Dense, creamy, and lightly scented with saffron.',
    image: dishKulfiShrikhandImg,
  },
  {
    id: 'masala-chai',
    index: '14',
    name: 'Masala Chai',
    category: 'Drinks',
    price: 120,
    description: 'Assam tea, ginger, cardamom, black pepper',
    tastingNotes:
      'Single-estate second-flush Assam black tea simmered with crushed heirloom ginger, green cardamom pods, Tellicherry black pepper, and whole milk in earthen kulhads.',
    spiceLevel: 'Warming',
    dietary: 'Vegetarian',
    pairing: 'Ideal mid-afternoon or alongside warm Gulab Jamun.',
    prepNote: 'Brewed fresh per pot, never from concentrate.',
    image: dishMasalaChaiImg,
  },
];

export const RESTAURANT_SPACES: SpaceFacility[] = [
  {
    id: 'main-dining',
    index: '01',
    name: 'The Main Dining Room',
    subtitle: 'Walnut tables, candlelight, and brass',
    capacity: '64 covers · Tables for 2 to 8',
    hours: 'Daily · 12:00 — 23:00',
    description:
      'Our anchor dining room pairs dark Burma walnut tables with hand-thrown stoneware, warm brass sconces, and framed archival photography from Old Delhi.',
    highlights: [
      'Acoustically softened plaster ceilings for easy conversation',
      'Full à la carte lunch and dinner service',
      'Wheelchair accessible ground-floor seating',
    ],
    image: heroDiningRoomImg,
  },
  {
    id: 'courtyard-verandah',
    index: '02',
    name: 'The Courtyard Verandah',
    subtitle: 'Private dining beneath pierced brass lanterns',
    capacity: 'Up to 18 guests · Private long table',
    hours: 'By reservation · Lunch & Dinner',
    description:
      'Enclosed in warm terracotta lime-plaster and lush courtyard greenery, the verandah hosts milestone family dinners, intimate celebrations, and tasting menus.',
    highlights: [
      'Custom family-style feast menus prepared with our head chef',
      'Dedicated sommelier & spice-pairing hospitality',
      'Private terrace lounge for pre-dinner chaat & aperitifs',
    ],
    image: facilityCourtyardImg,
  },
  {
    id: 'tandoor-counter',
    index: '03',
    name: 'The Copper Tandoor Counter',
    subtitle: 'Front-row seats to the charcoal ovens',
    capacity: '6 seats · Chef’s counter',
    hours: 'Dinner seatings · 19:00 & 21:15',
    description:
      'Sit steps away from our glowing clay tandoors as master ustads skewer kebabs, pull blistered naans, and finish copper-handi curries right in front of you.',
    highlights: [
      'Direct interaction with Chef Ravi Malhotra and the grill team',
      'Seasonal off-menu tandoor specials straight from the iron rod',
      'Complimentary kulhad chai service at the close of the meal',
    ],
    image: kitchenTandoorFireImg,
  },
  {
    id: 'chai-spice-bar',
    index: '04',
    name: 'The Chai & Spice Bar',
    subtitle: 'Kulhad pours, lassis, and small plates',
    capacity: '14 covers · Walk-ins welcome',
    hours: 'Daily · 12:00 — 22:30',
    description:
      'A relaxed corner at the front of Khan Market dedicated to freshly pounded Assam masala chai, mango lassi, and afternoon samosa chaat.',
    highlights: [
      'No reservation needed for afternoon chai & small plates',
      'Freshly ground whole-spice blends available in small tins',
      'Terracotta kulhad service roasted daily',
    ],
    image: dishMasalaChaiImg,
  },
];

export const STORY_MILESTONES = [
  {
    year: '1987',
    title: 'The First Clay Oven',
    detail:
      'Ravi Malhotra opened a twelve-table dining room in Khan Market with one hand-built clay tandoor, three copper degs, and his mother’s recipe notebook from Amritsar.',
  },
  {
    year: '2004',
    title: 'A Regional Pantry',
    detail:
      'We began sourcing single-origin Pampore saffron, Malabar black pepper, and Ratnagiri Alphonso mangoes directly from small family farms across India.',
  },
  {
    year: 'Today',
    title: 'Old Recipes, Bright Fire',
    detail:
      'Now led by the second generation alongside Chef Ravi, the kitchen still simmers its Dal Makhani for twelve hours over dying embers before the doors open at noon.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'Evening Candlelight in the Main Room',
    category: 'Spaces',
    caption: 'Walnut tables, hand-thrown stoneware, and warm amber votives before the 19:30 seating.',
    aspect: 'wide',
    image: heroDiningRoomImg,
  },
  {
    id: 'g-2',
    title: 'Pulled Fresh from the Clay Tandoor',
    category: 'Tandoor & Craft',
    caption: 'Blistered garlic naan lifted straight off glowing charcoal walls.',
    aspect: 'wide',
    image: kitchenTandoorFireImg,
  },
  {
    id: 'g-3',
    title: 'The 12-Hour Dal Makhani',
    category: 'The Table',
    caption: 'Simmered overnight in hammered copper and finished with cream and green chili.',
    aspect: 'square',
    image: curryCopperHandiImg,
  },
  {
    id: 'g-4',
    title: 'The Courtyard Verandah',
    category: 'Spaces',
    caption: 'Pierced brass lanterns over our eighteen-seat private dining table.',
    aspect: 'wide',
    image: facilityCourtyardImg,
  },
  {
    id: 'g-5',
    title: 'Smoky Chicken Seekh Kebabs',
    category: 'The Table',
    caption: 'Charred lime, pickled pink shallots, and stone-ground mint chutney.',
    aspect: 'square',
    image: dishSeekhKebabImg,
  },
  {
    id: 'g-6',
    title: 'Earthenware Handi Biryani',
    category: 'The Table',
    caption: 'Two-year-aged basmati sealed with saffron and crisp birista onions.',
    aspect: 'square',
    image: dishBiryaniImg,
  },
  {
    id: 'g-7',
    title: 'Sizzling Paneer Tikka',
    category: 'Tandoor & Craft',
    caption: 'Carom-marinated cottage cheese blistered over white-hot coals.',
    aspect: 'square',
    image: dishPaneerTikkaImg,
  },
  {
    id: 'g-8',
    title: 'Warm Gulab Jamun in Brass',
    category: 'The Table',
    caption: 'Cardamom-saffron milk dumplings topped with crushed pistachio and rose.',
    aspect: 'square',
    image: dishGulabJamunImg,
  },
  {
    id: 'g-9',
    title: 'Kulhad Masala Chai',
    category: 'The Table',
    caption: 'Second-flush Assam tea simmered with whole cardamom, star anise, and ginger.',
    aspect: 'square',
    image: dishMasalaChaiImg,
  },
];
