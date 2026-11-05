export const brand = {
  name: "KINETIK",
  tagline: "More than fitness. Living at full power.",
  hours: "06:30 – 22:00",
  hoursLong: "from 06:30am to 10pm",
  phone: "0800 505 180",
};

export const cities = ["Ashford", "Brightwater", "Crestview", "Dunmore"];

export const nav = [
  { label: "Homepage", href: "/" },
  { label: "Clubs", href: "/clubs" },
  { label: "Classes", href: "/classes" },
  { label: "Fitness Hub", href: "/fitness-hub" },
  { label: "Timetable", href: "/timetable" },
];

export type Tone = "yellow" | "pilates" | "nutrition" | "stream";

/* ------------------------------------------------------------------ clubs */

export type Club = {
  slug: string;
  name: string;
  type: "Fitness Club" | "Health Club";
  city: string;
  address: string;
  hours: string;
  image: string;
  perks: string[];
  tagline: string;
  blurb: string;
  size: string;
  founded: number;
  classesPerWeek: number;
  phone: string;
  schedule: string[];
  gallery: string[];
  facilities: string[];
};

const weekSchedule = [
  "Monday to Friday 06:30am – 10pm",
  "Saturdays 9am – 7pm",
  "Sundays and holidays 9am – 2pm",
];

export const clubs: Club[] = [
  {
    slug: "central",
    name: "Club Central",
    type: "Fitness Club",
    city: "Ashford",
    address: "12 Foundry Lane, Ashford",
    hours: "06:30 – 22:00",
    image: "/images/gym-wide.jpg",
    perks: ["Pool", "Sauna", "Pilates"],
    tagline: "The training hub of Ashford",
    blurb:
      "Three floors in the middle of town: a full strength floor, a heated pool, a private Pilates studio and more than eighty classes every week. Built for people who train before work, after work and on their lunch break.",
    size: "3,200 m²",
    founded: 2014,
    classesPerWeek: 80,
    phone: "0800 505 180 · option 1",
    schedule: weekSchedule,
    gallery: ["/images/gym-wide.jpg", "/images/weights.jpg", "/images/pool.jpg", "/images/pilates.jpg", "/images/cardio.jpg"],
    facilities: ["Heated indoor pool", "Sauna and steam room", "Strength floor", "Cardio deck", "Private Pilates studio", "Group studios"],
  },
  {
    slug: "harbor",
    name: "Club Harbor",
    type: "Health Club",
    city: "Brightwater",
    address: "48 Quay Street, Brightwater",
    hours: "06:30 – 22:00",
    image: "/images/outdoor-pool.jpg",
    perks: ["Pool", "Spa", "Boxing"],
    tagline: "Waterfront wellness",
    blurb:
      "A health club by the water. Two pools, a full spa circuit with sauna, Turkish bath and jacuzzi, and a boxing studio for the days you need to let off steam.",
    size: "2,600 m²",
    founded: 2016,
    classesPerWeek: 64,
    phone: "0800 505 180 · option 2",
    schedule: weekSchedule,
    gallery: ["/images/outdoor-pool.jpg", "/images/wellness.jpg", "/images/spa-bath.jpg", "/images/boxing.jpg", "/images/pool.jpg"],
    facilities: ["Two heated pools", "Spa circuit", "Jacuzzi", "Boxing studio", "Strength floor", "Recovery lounge"],
  },
  {
    slug: "hilltop",
    name: "Club Hilltop",
    type: "Fitness Club",
    city: "Crestview",
    address: "3 Summit Road, Crestview",
    hours: "06:30 – 22:00",
    image: "/images/weights.jpg",
    perks: ["Strength", "Cardio", "Classes"],
    tagline: "Strength with a view",
    blurb:
      "The biggest free-weight area in the network, floor-to-ceiling windows over the valley and a cardio deck that is never crowded. Come here when the goal is serious.",
    size: "2,100 m²",
    founded: 2018,
    classesPerWeek: 52,
    phone: "0800 505 180 · option 3",
    schedule: weekSchedule,
    gallery: ["/images/weights.jpg", "/images/dark-lift.jpg", "/images/strong.jpg", "/images/bench.jpg", "/images/treadmill.jpg"],
    facilities: ["Free-weight hall", "Cardio deck", "Functional zone", "Group studio", "Cycling studio", "Physio room"],
  },
  {
    slug: "parkside",
    name: "Club Parkside",
    type: "Health Club",
    city: "Crestview",
    address: "90 Linden Avenue, Crestview",
    hours: "07:00 – 22:00",
    image: "/images/yoga.jpg",
    perks: ["Yoga", "Pilates", "Sauna"],
    tagline: "Calm, green and quiet",
    blurb:
      "Next to the park, built around movement and recovery. Light-filled yoga and Pilates studios, a sauna and a small, friendly strength room.",
    size: "1,400 m²",
    founded: 2012,
    classesPerWeek: 58,
    phone: "0800 505 180 · option 4",
    schedule: ["Monday to Friday 7am – 10pm", "Saturdays 9am – 6pm", "Sundays and holidays 9am – 1pm"],
    gallery: ["/images/yoga.jpg", "/images/yoga-sunset.jpg", "/images/pilates.jpg", "/images/bw-yoga.jpg", "/images/wellness.jpg"],
    facilities: ["Yoga studio", "Pilates studio", "Sauna", "Strength room", "Nutrition clinic", "Garden terrace"],
  },
  {
    slug: "mill",
    name: "Club Mill",
    type: "Fitness Club",
    city: "Dunmore",
    address: "7 Old Mill Yard, Dunmore",
    hours: "06:30 – 22:00",
    image: "/images/ropes.jpg",
    perks: ["Functional", "Strength", "Pool"],
    tagline: "A factory turned training ground",
    blurb:
      "Brick walls, high ceilings and a big functional area made for ropes, sleds and boot-camp classes — plus a heated pool for the cool-down.",
    size: "1,900 m²",
    founded: 2020,
    classesPerWeek: 46,
    phone: "0800 505 180 · option 5",
    schedule: weekSchedule,
    gallery: ["/images/ropes.jpg", "/images/floor-lift.jpg", "/images/squat.jpg", "/images/pushup.jpg", "/images/running.jpg"],
    facilities: ["Functional zone", "Strength floor", "Heated pool", "Boxing corner", "Group studio", "Cycling studio"],
  },
];

export const getClub = (slug: string) => clubs.find((c) => c.slug === slug);

export const introCards = [
  "/images/group.jpg",
  "/images/yoga-sunset.jpg",
  "/images/boxing.jpg",
  "/images/ropes.jpg",
  "/images/running.jpg",
  "/images/bench.jpg",
  "/images/squat.jpg",
  "/images/highfive.jpg",
  "/images/pushup.jpg",
  "/images/floor-lift.jpg",
];

export const facilities = [
  { name: "Heated Indoor Swimming Pool", image: "/images/pool.jpg", href: "/clubs/harbor" },
  { name: "Sauna, Turkish Bath and Jacuzzi", image: "/images/wellness.jpg", href: "/clubs/parkside" },
  { name: "Weight and Cardio Room", image: "/images/weights.jpg", href: "/clubs/hilltop" },
  { name: "Private Pilates Studio", image: "/images/pilates.jpg", href: "/fitness-hub" },
  { name: "Group Classes", image: "/images/group2.jpg", href: "/classes" },
];

/* ---------------------------------------------------------------- classes */

export type Category = "Power" | "Flow" | "Moves" | "Aqua" | "Ride" | "Kids";

export const categories: Category[] = ["Power", "Flow", "Moves", "Aqua", "Ride", "Kids"];

export const categoryTone: Record<Category, Tone> = {
  Power: "yellow",
  Flow: "nutrition",
  Moves: "pilates",
  Aqua: "stream",
  Ride: "yellow",
  Kids: "nutrition",
};

export type GymClass = {
  slug: string;
  name: string;
  category: Category;
  tone: Tone;
  duration: string;
  level: string;
  image: string;
  description: string;
  featured: boolean;
};

// name, category, duration, level, image, description, featured
const rawClasses: Array<[string, Category, string, string, string, string, boolean?]> = [
  ["Heavy Lift", "Power", "50 min", "All levels", "/images/dark-lift.jpg", "Coached barbell work: squat, hinge, press and pull, with clear progressions so you add weight safely.", true],
  ["Boxing Fit", "Power", "45 min", "Intermediate", "/images/boxing.jpg", "Pads, bags and footwork drills in a high-energy, no-contact format. Gloves provided.", true],
  ["Battle Ropes", "Power", "30 min", "Advanced", "/images/ropes.jpg", "A short, brutal conditioning session built around ropes, sleds and bodyweight finishers.", true],
  ["Bootcamp", "Power", "45 min", "All levels", "/images/floor-lift.jpg", "Circuit training that mixes strength and cardio. Every exercise scales up or down.", false],
  ["Kettle Burn", "Power", "40 min", "Intermediate", "/images/strong.jpg", "Swings, cleans and carries for strong hips, a strong back and a high heart rate.", false],
  ["Power Circuit", "Power", "35 min", "All levels", "/images/squat.jpg", "Eight stations, one hard minute each. Quick, efficient and different every week.", false],
  ["Sunrise Flow", "Flow", "60 min", "All levels", "/images/yoga-sunset.jpg", "A flowing yoga sequence that wakes up the whole body and settles the mind.", true],
  ["Deep Stretch", "Flow", "40 min", "Beginner", "/images/bw-yoga.jpg", "Slow, supported stretching for tight hips, shoulders and backs.", false],
  ["Mobility Lab", "Flow", "45 min", "All levels", "/images/yoga.jpg", "Joint-by-joint mobility work that makes every other workout feel better.", false],
  ["Breathe and Reset", "Flow", "30 min", "Beginner", "/images/yoga-sunset.jpg", "Breathwork and gentle movement for a calmer evening.", false],
  ["Power Pilates", "Moves", "45 min", "Beginner", "/images/pilates.jpg", "Mat Pilates for a strong core, good posture and controlled movement.", true],
  ["Core Studio", "Moves", "40 min", "All levels", "/images/ball.jpg", "Stability-ball and mat work aimed squarely at your deep core.", true],
  ["Dance Cardio", "Moves", "50 min", "All levels", "/images/group.jpg", "Choreographed, upbeat and impossible not to smile at. No dance experience needed.", false],
  ["Step Together", "Moves", "45 min", "Beginner", "/images/group2.jpg", "Classic step aerobics with a modern playlist and friendly coaches.", false],
  ["Run Club", "Moves", "55 min", "Intermediate", "/images/running.jpg", "Coached treadmill and track intervals to build speed and endurance.", true],
  ["Reformer Basics", "Moves", "50 min", "Beginner", "/images/pilates.jpg", "Learn the reformer in a small group with a certified instructor.", false],
  ["Aqua Burn", "Aqua", "45 min", "Beginner", "/images/pool.jpg", "Low-impact, high-resistance cardio in the pool. Kind to joints, hard on calories.", true],
  ["Aqua Flow", "Aqua", "40 min", "All levels", "/images/outdoor-pool.jpg", "Gentle, rhythmic movement in warm water.", false],
  ["Swim Technique", "Aqua", "45 min", "Intermediate", "/images/pool.jpg", "Stroke coaching with video feedback. Swim further with less effort.", false],
  ["Hydro Ride", "Aqua", "35 min", "All levels", "/images/outdoor-pool.jpg", "Cycling in the water: all the intensity, none of the sweat on your face.", false],
  ["Spin Cycle", "Ride", "45 min", "All levels", "/images/cardio.jpg", "Music-driven indoor cycling with hills, sprints and a big finish.", true],
  ["Endurance Ride", "Ride", "60 min", "Intermediate", "/images/gym-wide.jpg", "A longer, steadier ride for building your aerobic base.", false],
  ["Sprint Ride", "Ride", "30 min", "Advanced", "/images/treadmill.jpg", "Short, sharp intervals. Come ready to work.", false],
  ["Little Movers", "Kids", "40 min", "Ages 4–7", "/images/highfive.jpg", "Games, balance and coordination that make movement a habit.", false],
  ["Kids Swim", "Kids", "40 min", "Ages 5–10", "/images/outdoor-pool.jpg", "Confidence in the water, one stroke at a time.", false],
  ["Junior Boxing", "Kids", "45 min", "Ages 8–13", "/images/boxing.jpg", "Technique, discipline and fitness. Strictly no contact.", false],
];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const classes: GymClass[] = rawClasses.map(([name, category, duration, level, image, description, featured]) => ({
  slug: slugify(name),
  name,
  category,
  tone: categoryTone[category],
  duration,
  level,
  image,
  description,
  featured: Boolean(featured),
}));

export const featuredClasses = classes.filter((c) => c.featured);
export const getClass = (slug: string) => classes.find((c) => c.slug === slug);

/* ----------------------------------------------------------------- socials */

export type Social = {
  name: string;
  handle: string;
  tone: Tone;
  images: string[];
};

export const socials: Social[] = [
  { name: "Instagram", handle: "@kinetikclubs", tone: "pilates", images: ["/images/highfive.jpg", "/images/bw-yoga.jpg", "/images/dumbbell.jpg", "/images/group2.jpg"] },
  { name: "Facebook", handle: "/kinetikclubs", tone: "nutrition", images: ["/images/outdoor-pool.jpg", "/images/cardio.jpg", "/images/situp.jpg", "/images/treadmill.jpg"] },
  { name: "YouTube", handle: "@kinetik", tone: "stream", images: ["/images/squat.jpg", "/images/boxing.jpg", "/images/strong.jpg", "/images/floor-lift.jpg"] },
  { name: "TikTok", handle: "@kinetik_clubs", tone: "yellow", images: ["/images/pushup.jpg", "/images/ropes.jpg", "/images/yoga.jpg", "/images/running.jpg"] },
];

/* ------------------------------------------------------------ fitness hub */

export type Service = {
  key: string;
  name: string;
  tone: Tone;
  image: string;
  intro: string;
  closing: string;
  features: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    key: "coach",
    name: "Coach",
    tone: "yellow",
    image: "/images/dark-lift.jpg",
    intro:
      "Whether you want to perform better, feel better or come back from an injury, it is easier with the right support. Our coaches build a plan that fits your life and keeps you moving.",
    closing: "Training that adapts to you.",
    features: [
      { title: "Safety first", text: "Technique checks and corrections so every rep builds you up instead of wearing you down." },
      { title: "Programme management", text: "A written plan, tracked week by week and adjusted as you progress." },
      { title: "Goal planning", text: "Targets based on your body, your schedule and what you actually want." },
      { title: "Accountability", text: "Regular check-ins that keep the habit going when motivation dips." },
    ],
  },
  {
    key: "physio",
    name: "Physio",
    tone: "pilates",
    image: "/images/situp.jpg",
    intro:
      "Our physiotherapists work alongside the coaches, so treatment and training are never out of step. Prevention, recovery and relief, all under one roof.",
    closing: "Move well, feel well.",
    features: [
      { title: "Posture correction", text: "Hands-on assessment and exercises for better alignment and a healthier back." },
      { title: "Injury treatment", text: "Rehabilitation plans with follow-up until you are fully back to training." },
      { title: "Pain relief", text: "A mix of manual therapy and targeted exercise that tackles the cause, not just the symptom." },
    ],
  },
  {
    key: "nutri",
    name: "Nutri",
    tone: "nutrition",
    image: "/images/dumbbell.jpg",
    intro:
      "Food education is the difference between a good month and a good life. Our nutritionists give you a plan that suits your taste, your training and your week.",
    closing: "Eat well without the rules.",
    features: [
      { title: "Body scan", text: "A detailed composition analysis so we start from facts, not guesses." },
      { title: "Nutrition plan", text: "A flexible plan with regular reviews, built around foods you enjoy." },
      { title: "Food diary", text: "Simple tracking and lifestyle analysis that reveals your real patterns." },
    ],
  },
  {
    key: "pilates",
    name: "Pilates",
    tone: "stream",
    image: "/images/pilates.jpg",
    intro:
      "Private and small-group Pilates built around you. We tune the challenge to your body and goals, and teach you to feel what each muscle is doing.",
    closing: "Strong from the inside out.",
    features: [
      { title: "Adapted to you", text: "Pregnancy, teens, seniors, injury recovery or elite sport: the programme changes, the care stays the same." },
      { title: "Studio sessions", text: "Reformers, mats and small equipment in a calm, private studio." },
    ],
  },
];
