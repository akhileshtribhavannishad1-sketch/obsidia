import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'crimson-vow',
    number: '01',
    name: 'Crimson Vow',
    subtitle: 'Signature Sovereign Ring',
    material: 'Garnet · Oxidized Silver',
    price: 690,
    category: 'Rings',
    metal: 'Oxidized Silver',
    weight: '34g',
    purity: '925 Sterling Silver / Natural Bohemian Garnet',
    description: 'A monument of sacred restraint. Centered around a deep pigeon-blood Bohemian garnet held within hand-chiseled talon prongs and flanked by oxidized relief filigree.',
    story: 'Cast by single-flame lost-wax technique in our London subterranean forge. Each talon is individually filed and pressure-set by our master silversmith. The silver is dipped in sulfur bath solution and hand-buffed to expose natural high-points while embedding velvety charcoal depths in every recess.',
    details: [
      'Hand-carved 925 solid sterling silver body',
      'Untreated oval-cut deep crimson garnet (approx. 5.8ct)',
      'Subterranean charcoal oxidation finish',
      'Inner band engraved with bespoke OBSIDIA seal',
      'Deliberate heavyweight feel: 34 grams of solid precious metal',
      'Accompanied by hand-numbered parchment seal of authenticity'
    ],
    image: './assets/images/crimson-vow.jpg',
    gallery: [
      './assets/images/crimson-vow.jpg',
      './assets/images/smoke-craft.jpg',
      './assets/images/hero-hand.jpg'
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    inStock: true,
  },
  {
    id: 'matte-eclipse',
    number: '02',
    name: 'Matte Eclipse',
    subtitle: 'Brutalist Architectural Band',
    material: 'Brushed Blackened Bronze',
    price: 350,
    category: 'Rings',
    metal: 'Blackened Bronze',
    weight: '28g',
    purity: 'High-Density Architectural Bronze',
    description: 'Pure geometric brutality softened by hand-brushed satin grain. A continuous faceted band engineered with substantial heft and an ergonomic interior radius.',
    story: 'Forged from dense architectural bronze and tempered in organic bone ash oil to achieve its distinct gunmetal-umbra hue. With wear, the corners develop subtle golden halos as the raw metal responds to the wearer’s skin oils and touch.',
    details: [
      'Solid architectural bronze with dark graphite patina',
      'Hand-grained horizontal brushed matte texture',
      'Comfort-fit beveled interior contour',
      'Self-weathering patina that darkens and deepens over years',
      'Weight: 28 grams',
      'Hypoallergenic sealed interior core'
    ],
    image: './assets/images/matte-eclipse.jpg',
    gallery: [
      './assets/images/matte-eclipse.jpg',
      './assets/images/smoke-craft.jpg'
    ],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    inStock: true,
  },
  {
    id: 'onyx-halo',
    number: '03',
    name: 'Onyx Halo',
    subtitle: 'Reliquary Crown Ring',
    material: 'Black Pavé · Sterling',
    price: 540,
    category: 'Rings',
    metal: 'Graphite Silver',
    weight: '31g',
    purity: '925 Oxidized Silver / Natural Jet Onyx Pavé',
    description: 'An intricate corona of blackened botanical thorns grasping a faceted natural black onyx stone. An ode to medieval reliquaries and nocturnal silence.',
    story: 'Every spine and thorn is shaped with miniature micro-files to capture dramatic chiaroscuro highlights when lit from above. The deep black onyx reflects light like quiet subterranean water.',
    details: [
      'Gothic crown claw setting with pierced openwork',
      'Natural hand-cut and faceted black onyx',
      'Double-dipped dark graphite patina',
      'Tapered cathedral shank for finger articulation',
      'Weight: 31 grams',
      'Hand-finished in limited editions of 30 castings'
    ],
    image: './assets/images/onyx-halo.jpg',
    gallery: [
      './assets/images/onyx-halo.jpg',
      './assets/images/hero-hand.jpg'
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11],
    inStock: true,
  },
  {
    id: 'nocturne-relic',
    number: '04',
    name: 'Nocturne Relic',
    subtitle: 'Thorned Talisman Pendant',
    material: 'Raw Garnet · Oxidized 925 Chain',
    price: 780,
    category: 'Talismans',
    metal: 'Oxidized Silver',
    weight: '58g',
    purity: '925 Sterling Silver / Rough Bohemian Garnet',
    description: 'A heavy sculptural amulet cradling a raw, crystallized garnet cluster within an intertwined thorn thicket, hung from a custom hand-linked cable chain.',
    story: 'Formed through an ancient organic casting procedure where wax master molds are destroyed in the pour, making each pendant’s thorn geometry subtly unique. Weighted to rest directly over the sternum.',
    details: [
      'Sculptural thorn armature in oxidized 925 silver',
      'Uncut raw crystal garnet node from private mine reserve',
      'Includes 60cm heavy oxidized silver anchor chain (4.2mm links)',
      'Substantial weight: 58 grams total with chain',
      'Custom skull-and-crossbar toggle clasp mechanism',
      'Treated with archival microcrystalline museum wax'
    ],
    image: './assets/images/nocturne-relic.jpg',
    gallery: [
      './assets/images/nocturne-relic.jpg',
      './assets/images/smoke-craft.jpg'
    ],
    sizes: [0], // 0 indicates standard 60cm chain
    inStock: true,
  }
];

export const CRAFT_SPECS = [
  {
    stat: '100%',
    label: 'HANDMADE',
    description: 'Every ring crafted by a single artisan, start to finish.'
  },
  {
    stat: '14–92g',
    label: 'PER PIECE',
    description: 'Deliberate weight — a presence you feel on the hand.'
  },
  {
    stat: '925',
    label: 'STERLING',
    description: 'Oxidized silver, blackened bronze, and raw garnet.'
  },
  {
    stat: '∞',
    label: 'LIFETIME',
    description: 'Made to last — and to be inherited, not replaced.'
  }
];
