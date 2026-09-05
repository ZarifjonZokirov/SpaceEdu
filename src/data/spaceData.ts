export interface PlanetData {
  id: string;
  name: string;
  uzbekName: string;
  type: string;
  tagline: string;
  description: string;
  diameterKm: number;
  massEarthRatio: number;
  gravityMps2: number;
  distanceFromSunAU: number;
  distanceFromSunKm: number;
  dayLengthHours: number;
  yearLengthDays: number;
  avgTempC: number;
  minTempC: number;
  maxTempC: number;
  moonsCount: number;
  atmosphere: string[];
  features: string[];
  color: string;
  accentColor: string;
  image: string;
  stillImage?: string;
  videoUrl?: string;
}

export const PLANETS: Record<string, PlanetData> = {
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    uzbekName: 'Merkuriy',
    type: 'Toshli sayyora',
    tagline: 'Quyoshga eng yaqin va eng kichik sayyora',
    description: 'Merkuriy Quyosh tizimidagi eng tez harakatlanuvchi sayyora bo\'lib, Quyosh atrofini atigi 88 kunda aylanib chiqadi. Unda atmosfera deyarli yo\'q, shu sababli kunduzi jazirama, kechasi esa qahraton sovuq hukm suradi.',
    diameterKm: 4879,
    massEarthRatio: 0.055,
    gravityMps2: 3.7,
    distanceFromSunAU: 0.39,
    distanceFromSunKm: 57910000,
    dayLengthHours: 1407.6,
    yearLengthDays: 88,
    avgTempC: 167,
    minTempC: -173,
    maxTempC: 427,
    moonsCount: 0,
    atmosphere: ['Kislorod (42%)', 'Natriy (29%)', 'Vodorod (22%)', 'Geliy (6%)'],
    features: [
      'Quyosh tizimidagi eng zich ikkinchi sayyora (temir yadrosi juda katta)',
      'Sirti xuddi Oy kabi son-sanoqsiz kraterlar bilan qoplangan',
      'Atmosferasi yo\'qligi sababli osmon kunduzi ham tim qora ko\'rinadi'
    ],
    color: '#a3a3a3',
    accentColor: '#d4d4d8',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80'
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    uzbekName: 'Venera',
    type: 'Toshli sayyora',
    tagline: 'Quyosh tizimidagi eng qizg\'in issiqxona dunyosi',
    description: 'Venera qalin karbonat angidrid atmosferasi va sulfat kislotali bulutlar bilan o\'ralgan. U issiqxona effekti sabab Merkuriyga qaraganda ham issiqroq bo\'lib, sirt harorati qo\'rg\'oshinni eritib yuborishga qodir.',
    diameterKm: 12104,
    massEarthRatio: 0.815,
    gravityMps2: 8.87,
    distanceFromSunAU: 0.72,
    distanceFromSunKm: 108200000,
    dayLengthHours: 5832.5,
    yearLengthDays: 224.7,
    avgTempC: 464,
    minTempC: 438,
    maxTempC: 482,
    moonsCount: 0,
    atmosphere: ['Karbonat angidrid (96.5%)', 'Azot (3.5%)', 'Sulfat kislotasi (izlari)'],
    features: [
      'O\'z o\'qi atrofida soat strelkasi bo\'ylab teskari aylanadi (retrograd aylanish)',
      'Venerada bir kun (243 yer kuni) uning bir yilidan (225 kun) uzunroq!',
      'Sirtidagi atmosfera bosimi Yerdagi dengiz tubidan 90 marta yuqori'
    ],
    color: '#eab308',
    accentColor: '#fef08a',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202012_640b239a-d08a-4200-adb2-741bbe129ac8.png',
    stillImage: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4'
  },
  earth: {
    id: 'earth',
    name: 'Earth',
    uzbekName: 'Yer',
    type: 'Toshli sayyora',
    tagline: 'Koinotdagi hayot guldastasi va moviy uyimiz',
    description: 'Yer — hozircha biz bilgan yagona hayot mavjud osmon jismi. Sirtining 71 foizi suv bilan qoplangan, himoyalovchi magnit maydoni va kislorodga boy atmosferasi hayotning davom etishini kafolatlaydi.',
    diameterKm: 12742,
    massEarthRatio: 1.0,
    gravityMps2: 9.81,
    distanceFromSunAU: 1.0,
    distanceFromSunKm: 149600000,
    dayLengthHours: 24,
    yearLengthDays: 365.25,
    avgTempC: 15,
    minTempC: -89.2,
    maxTempC: 56.7,
    moonsCount: 1,
    atmosphere: ['Azot (78%)', 'Kislorod (21%)', 'Argon (0.9%)', 'Karbonat angidrid (0.04%)'],
    features: [
      'Sirtida suyuq holatdagi suv havzalari barqaror saqlanadigan yagona sayyora',
      'Faol tektonik plitalarga ega, bu uglerod aylanishini ta\'minlaydi',
      'Yagona tabiiy yo\'ldoshi — Oy sayyora o\'qining barqaror qiyaligini saqlaydi'
    ],
    color: '#38bdf8',
    accentColor: '#79dce8',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png',
    stillImage: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4'
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    uzbekName: 'Mars',
    type: 'Toshli sayyora',
    tagline: 'Qizil sayyora va insoniyatning yangi chegarasi',
    description: 'Mars o\'zining temir oksidi (zang) bilan to\'yingan qizil tuprog\'i bilan mashhur. Unda Quyosh tizimidagi eng baland vulqon va eng bahaybat kanyon joylashgan. Qutblarida muzlagan suv va quruq muz qatlamlari mavjud.',
    diameterKm: 6779,
    massEarthRatio: 0.107,
    gravityMps2: 3.72,
    distanceFromSunAU: 1.52,
    distanceFromSunKm: 227900000,
    dayLengthHours: 24.6,
    yearLengthDays: 687,
    avgTempC: -63,
    minTempC: -140,
    maxTempC: 20,
    moonsCount: 2,
    atmosphere: ['Karbonat angidrid (95.3%)', 'Azot (2.6%)', 'Argon (1.9%)'],
    features: [
      'Olympus Mons — balandligi 21.9 km bo\'lgan Quyosh tizimidagi eng ulkan vulqon',
      'Valles Marineris kanyonlar tizimi uzunligi 4000 km dan ortiq',
      'Fobos va Deymos nomli ikkita kichik asteroidsimon yo\'ldoshi bor'
    ],
    color: '#f97316',
    accentColor: '#fdba74',
    image: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202018_3d559490-f613-4ed7-a3bb-3b7e9fc90fb8.png',
    stillImage: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4'
  },
  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    uzbekName: 'Yupiter',
    type: 'Gaz giganti',
    tagline: 'Quyosh tizimining eng bahaybat qiroli',
    description: 'Yupiterning massasi tizimdagi barcha boshqa sayyoralar yig\'indisidan 2.5 barobar kattaroq. U asosan vodorod va geliydan iborat ulkan gaz to\'pidir. Uning mashhur Katta Qizil Dog\'i yuzlab yillardan beri davom etayotgan bo\'rondir.',
    diameterKm: 139820,
    massEarthRatio: 317.8,
    gravityMps2: 24.79,
    distanceFromSunAU: 5.2,
    distanceFromSunKm: 778500000,
    dayLengthHours: 9.9,
    yearLengthDays: 4333,
    avgTempC: -110,
    minTempC: -145,
    maxTempC: -108,
    moonsCount: 95,
    atmosphere: ['Vodorod (89%)', 'Geliy (10%)', 'Metan va ammiak (1%)'],
    features: [
      'Katta Qizil Dog\' — Yerdan kattaroq bo\'lgan 350 yillik ulkan siklon',
      'Ganimed yo\'ldoshi hatto Merkuriy sayyorasidan ham kattaroqdir',
      'Kuchli gravitatsiyasi orqali Yerni xavfli kometalar zarbasidan qalqondek asraydi'
    ],
    color: '#d97706',
    accentColor: '#fde68a',
    image: 'https://images.unsplash.com/photo-1630839437035-dac17da5809f?auto=format&fit=crop&w=800&q=80'
  },
  saturn: {
    id: 'saturn',
    name: 'Saturn',
    uzbekName: 'Saturn',
    type: 'Gaz giganti',
    tagline: 'Maftunkor va betakror halqalar sohibi',
    description: 'Saturn o\'zining minglab yaltiroq muz va tosh parchalaridan iborat halqalari bilan mashhur. Garchi hajmi juda katta bo\'lsa-da, uning o\'rtacha zichligi suvnikidan ham kamroq — agar ulkan okean bo\'lsa, Saturn unda cho\'kmasdan qalqib turar edi!',
    diameterKm: 116460,
    massEarthRatio: 95.2,
    gravityMps2: 10.44,
    distanceFromSunAU: 9.58,
    distanceFromSunKm: 1434000000,
    dayLengthHours: 10.7,
    yearLengthDays: 10759,
    avgTempC: -140,
    minTempC: -178,
    maxTempC: -130,
    moonsCount: 146,
    atmosphere: ['Vodorod (96%)', 'Geliy (3%)', 'Metan va ammiak (1%)'],
    features: [
      'Halqalari kengligi 282,000 km, biroq qalinligi atigi 10 metr atrofida!',
      'Titan yo\'ldoshi qalin atmosferaga va metan ko\'llariga ega yagona yo\'ldosh',
      'Quyosh tizimida eng ko\'p yo\'ldoshga ega sayyora (146 ta rasmiy)'
    ],
    color: '#ca8a04',
    accentColor: '#fef08a',
    image: 'https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&w=800&q=80'
  },
  uranus: {
    id: 'uranus',
    name: 'Uranus',
    uzbekName: 'Uran',
    type: 'Muz giganti',
    tagline: 'Yonboshlagan sirli moviy muz olami',
    description: 'Uran atmosferasidagi metan gazi sabab moviy-yashil tusda jilvalanadi. U o\'z o\'qi atrofida deyarli 98 gradus qiyalikda, ya\'ni yonboshlagan holda aylanadi, natijada qutblarida 42 yillik kunduz va 42 yillik tun almashadi.',
    diameterKm: 50724,
    massEarthRatio: 14.5,
    gravityMps2: 8.69,
    distanceFromSunAU: 19.2,
    distanceFromSunKm: 2871000000,
    dayLengthHours: 17.2,
    yearLengthDays: 30687,
    avgTempC: -195,
    minTempC: -224,
    maxTempC: -190,
    moonsCount: 28,
    atmosphere: ['Vodorod (83%)', 'Geliy (15%)', 'Metan (2%)'],
    features: [
      'Quyosh tizimidagi eng sovuq sayyora (minimal -224°C)',
      'Aylanish o\'qi deyarli orbital tekisligida yotadi ("dumalaydigan sayyora")',
      '13 ta nozik va qorong\'i halqalar tizimiga ega'
    ],
    color: '#06b6d4',
    accentColor: '#a5f3fc',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80'
  },
  neptune: {
    id: 'neptune',
    name: 'Neptune',
    uzbekName: 'Neptun',
    type: 'Muz giganti',
    tagline: 'Quyosh tizimining eng shiddatli shamollari saltanati',
    description: 'Neptun Quyoshdan eng uzoqda joylashgan rasmiy sayyoradir. U teleskop orqali kuzatilmasdan avval sof matematik hisob-kitoblar vositasida bashorat qilingan. Unda shamol tezligi soatiga 2100 km gacha yetadi.',
    diameterKm: 49244,
    massEarthRatio: 17.1,
    gravityMps2: 11.15,
    distanceFromSunAU: 30.05,
    distanceFromSunKm: 4495000000,
    dayLengthHours: 16.1,
    yearLengthDays: 60190,
    avgTempC: -200,
    minTempC: -218,
    maxTempC: -198,
    moonsCount: 16,
    atmosphere: ['Vodorod (80%)', 'Geliy (19%)', 'Metan (1.5%)'],
    features: [
      'Tovush tezligidan tezroq esadigan dovullar (2100 km/soat)',
      'Triton nomli yo\'ldoshi sayyora aylanishiga qarama-qarshi yo\'nalishda aylanadi',
      'Bir marta Quyosh atrofida aylanishi uchun 165 Yer yili kerak bo\'ladi'
    ],
    color: '#2563eb',
    accentColor: '#93c5fd',
    image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=800&q=80'
  }
};

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Quyosh tizimidagi eng issiq sayyora qaysi?",
    options: ["Merkuriy", "Venera", "Mars", "Yupiter"],
    correctIndex: 1,
    explanation: "Garchi Merkuriy Quyoshga eng yaqin bo'lsa-da, Veneraning qalin karbonat angidrid atmosferasi tufayli sirt harorati 464°C ga yetadi va eng issiq sayyora hisoblanadi."
  },
  {
    id: 2,
    question: "Quyosh tizimidagi eng baland vulqon (Olympus Mons) qaysi sayyorada joylashgan?",
    options: ["Yer", "Venera", "Mars", "Merkuriy"],
    correctIndex: 2,
    explanation: "Olympus Mons Mars sayyorasida joylashgan bo'lib, uning balandligi deyarli 22 km ni tashkil qiladi — bu Everestdan salkam 2.5 barobar baland!"
  },
  {
    id: 3,
    question: "Zichligi suvnikidan ham kam bo'lgan, ulkan suv havzasida cho'kmaydigan sayyora qaysi?",
    options: ["Saturn", "Uran", "Neptun", "Yupiter"],
    correctIndex: 0,
    explanation: "Saturn asosan yengil gazlardan iborat bo'lib, uning o'rtacha zichligi 0.687 g/sm³ — ya'ni toza suv zichligidan (1 g/sm³) kamroqdir."
  },
  {
    id: 4,
    question: "Qaysi sayyora o'z o'qi atrofida 'yonboshlagan' holda aylanadi (qiyaligi ~98°)?",
    options: ["Neptun", "Merkuriy", "Mars", "Uran"],
    correctIndex: 3,
    explanation: "Uranning aylanish o'qi 97.8 darajaga qiyishgan, shu sababli u orbital tekislikda xuddi dumalab ketayotgan to'pdek harakatlanadi."
  },
  {
    id: 5,
    question: "Yerdan uchirilgan jism Yerning gravitatsiyasini yengib koinotga chiqishi uchun zarur bo'lgan 2-kosmik tezlik qanchaga teng?",
    options: ["7.9 km/s", "11.2 km/s", "16.7 km/s", "29.8 km/s"],
    correctIndex: 1,
    explanation: "Birinchi kosmik tezlik (orbital) 7.9 km/s, ikkinchi kosmik tezlik (parabolik/ozod bo'lish) esa taxminan 11.2 km/s ni tashkil etadi."
  },
  {
    id: 6,
    question: "Quyosh nuri Yergacha yetib kelishi uchun taxminan qancha vaqt ketadi?",
    options: ["8 soniya", "8 daqiqa 20 soniya", "1 soat", "Darhol yetib keladi"],
    correctIndex: 1,
    explanation: "Yorug'lik tezligi 300,000 km/s bo'lib, 149.6 mln km masofani bosib o'tishi uchun taxminan 500 soniya (8 daqiqa 20 soniya) kerak bo'ladi."
  },
  {
    id: 7,
    question: "Yupiterning mashhur 'Katta Qizil Dog'i' aslida nima?",
    options: ["Ulkan temir krater", "Uch yuz yildan ortiq davom etayotgan bo'ron", "Suyuq lava ko'li", "Muzlagan uglerod qatlami"],
    correctIndex: 1,
    explanation: "Katta Qizil Dog' — Yerdan ham kattaroq diametrga ega bo'lgan, kamida 350 yildan beri to'xtamay aylanayotgan antisiklonik ulkan bo'rondir."
  },
  {
    id: 8,
    question: "Teleskopda ko'rilishidan avval sof matematik hisob-kitoblar bilan topilgan sayyora qaysi?",
    options: ["Pluton", "Uran", "Neptun", "Saturn"],
    correctIndex: 2,
    explanation: "Neptun 1846-yilda Uranning orbitasidagi og'ishlarni matematik hisoblash (Urban Leverye va Jon Adams) orqali kashf etilgan."
  }
];

export interface SpaceEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'eclipse' | 'meteor' | 'mission' | 'planetary';
  visibilityUzbekistan: string;
}

export const UPCOMING_EVENTS: SpaceEvent[] = [
  {
    id: 'e1',
    date: '12-13 Avgust, 2026',
    title: 'Perseidlar Meteor Yomg\'iri',
    description: 'Yilning eng go\'zal meteor oqimlaridan biri. Har soatda 100 dan ortiq yorqin uchuvchi yulduzlarni kuzatish mumkin.',
    category: 'meteor',
    visibilityUzbekistan: 'Butun O\'zbekiston bo\'ylab ochiq osmonda a\'lo darajada ko\'rinadi'
  },
  {
    id: 'e2',
    date: '17 Fevral, 2026',
    title: 'Halqasimon Quyosh Tutilishi',
    description: 'Oy Quyosh markazini to\'sib, uning atrofida nurli oltin halqa hosil qiladi.',
    category: 'eclipse',
    visibilityUzbekistan: 'Qisman faza shaklida kuzatiladi'
  },
  {
    id: 'e3',
    date: '25 Sentyabr, 2026',
    title: 'Yupiterning Qarama-qarshi Turishi (Oppozitsiya)',
    description: 'Yupiter Quyoshga to\'g\'ridan-to\'g\'ri qarama-qarshi joylashadi va yil bo\'yicha eng yaqin va eng yorqin ko\'rinadi.',
    category: 'planetary',
    visibilityUzbekistan: 'Tungi osmonda oddiy durbin orqali ham uning 4 yo\'ldoshi ko\'rinadi'
  },
  {
    id: 'e4',
    date: '13-14 Dekabr, 2026',
    title: 'Geminidlar Kuchli Meteor Oqimi',
    description: 'Fayeton asteroidi qoldiqlaridan hosil bo\'lgan eng intensiv meteor oqimi. Soatiga 120-150 tagacha meteor.',
    category: 'meteor',
    visibilityUzbekistan: 'Shahar chiroqlaridan uzoqda ajoyib manzara hosil qiladi'
  }
];
