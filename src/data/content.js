// Central content store.
// Edit copy here rather than inside components — once the admin app
// and Firestore are connected, most of this will move to the database
// and this file will hold only fallback/default values.

export const org = {
  name: "Promised Land Initiative",
  shortName: "PLI",
  tagline: "Restoring Hope, Transforming Lives",
  founder: "Samuel Ssempijja",
  location: "Uganda",
  yearFounded: "2026",
  // TODO: replace with the organisation's real contact details once assigned.
  email: "",
  phone: "",
  social: {
    facebook: "https://www.facebook.com/share/1EeZemm8tK/",
    twitter: "https://x.com/promisedlandug",
    tiktok: "https://www.tiktok.com/@ssempijja.samuel3",
    instagram: "https://www.instagram.com/ssempijja.s",
    youtube: "https://youtube.com/@promisedlandinitiative?si=Dpm2GSTKt5odOTiZ"
  },
};

export const vision =
  "To see a transformed generation living in purpose, dignity, and the knowledge of God.";

export const mission =
  "To reach communities and schools with the Gospel, provide counseling and life skills, restore dignity to vulnerable girls, and support education for underprivileged children.";

// A fuller narrative for the About page, expanded from the ministry's
// founding documents (background, implementation strategy, and closing
// statement) into a more developed story — no new facts invented.
export const background = [
  "Promised Land Initiative was founded with a clear and urgent purpose: to transform lives through the Gospel of Jesus Christ and practical, hands-on community support. The ministry responds to the spiritual, emotional, and physical needs of children, youth, and vulnerable communities across Uganda — meeting people not just with words of hope, but with tangible help.",
  "The young people we serve face real, layered challenges: poverty that limits opportunity, a lack of mentorship at critical ages, school dropout driven by financial and social pressure, the risk of exploitation, and something as basic as access to sanitary products standing between a girl and her education. These are not abstract statistics — they are the daily reality behind every program we run.",
  "Rather than a single intervention, Promised Land Initiative works through holistic, integrated programs — evangelism and discipleship, counseling and life skills, the Dignity Program, education scholarships, hospital ministry, and more — delivered through direct partnerships with schools, churches, and hospitals. Volunteers and field officers carry this work into the community on a regular, ongoing basis, not as an occasional gesture.",
  "Our aim is not simply to help in the moment, but to help raise a generation that is empowered, disciplined, and rooted in Godly values — equipped to move beyond hardship rather than just endure it. Every program we run, from a sanitary pad distribution to a hospital bedside visit, is one part of that same, longer commitment.",
];

export const coreValues = [
  "Faith in God",
  "Integrity",
  "Compassion",
  "Excellence",
  "Accountability",
  "Service to humanity",
];

export const objectives = [
  "Spread the Gospel and disciple young people",
  "Provide counseling and mentorship for boys and girls",
  "Promote menstrual health and dignity among girls",
  "Support access to education through scholarships",
  "Provide humanitarian assistance to vulnerable communities",
];

export const beneficiaries = [
  "School-going children and youth",
  "Vulnerable girls lacking access to sanitary products",
  "Orphans and vulnerable students",
  "Children with special needs",
  "Hospitalised patients and caregivers",
  "Low-income families",
  "Elderly and sick community members",
];

// Each program gets a slug for its detail page and a short line of SVG
// path data for a simple custom line-icon (no emoji, no icon-font).
export const programs = [
  {
    slug: "evangelism-discipleship",
    name: "Evangelism & Discipleship",
    goal: "To lead individuals to Christ and nurture spiritual growth.",
    summary:
      "School outreaches, community evangelism, and Bible study groups that plant and grow local faith.",
    activities: [
      "School outreaches and fellowships",
      "Community evangelism",
      "Bible study groups",
      "Leadership and discipleship training",
    ],
  },
  {
    slug: "counseling-life-skills",
    name: "Counseling & Life Skills",
    goal: "To equip young people with knowledge and skills for responsible living.",
    summary:
      "Guidance, counseling, and life-skills education delivered in schools and one-on-one.",
    activities: [
      "Guidance and counseling sessions in schools",
      "Life skills education",
      "Mental health awareness",
      "One-on-one counseling support",
    ],
  },
  {
    slug: "dignity-program",
    name: "Dignity Program",
    goal: "To restore dignity and keep girls in school.",
    summary:
      "Monthly sanitary pad distribution and menstrual health education so girls stay in class.",
    activities: [
      "Monthly distribution of sanitary pads",
      "Menstrual hygiene education",
      "Mentorship for girls",
    ],
  },
  {
    slug: "education-support",
    name: "Education Support & Scholarships",
    goal: "To enable vulnerable children to access education.",
    summary:
      "School fees, scholastic materials, and ongoing mentorship for students who need it most.",
    activities: [
      "Payment of school fees",
      "Provision of scholastic materials",
      "Student mentorship and follow-up",
    ],
  },
  {
    slug: "hospital-ministry",
    name: "Hospital Ministry & Patient Support",
    goal: "To provide holistic care to patients through spiritual encouragement and practical support.",
    summary:
      "Weekly hospital visitation teams offering prayer, encouragement, and starter kits to patients and caregivers.",
    activities: [
      "Hospital visitations",
      "Prayer and counseling",
      "Distribution of patient starter kits",
      "Caregiver support",
    ],
  },
  {
    slug: "special-needs-inclusion",
    name: "Special Needs Inclusion",
    goal: "To make worship, care, and skills training accessible to children and adults with special needs.",
    summary:
      "Inclusive worship, home visits, caregiver support, and assistive-device support.",
    activities: [
      "Inclusive worship and outreach",
      "Home visits",
      "Caregiver support",
      "Skills training",
      "Assistive device support",
    ],
  },
  {
    slug: "child-evangelism",
    name: "Child Evangelism",
    goal: "To introduce children to Christ in a simple, engaging, and age-appropriate way.",
    summary:
      "Age-appropriate Bible storytelling, songs, and games for children 5–12, always run in teams under child-protection guidelines.",
    activities: [
      "Action songs and Bible storytelling",
      "Drama and role play",
      "Games, quizzes and memory verses",
      "Run in schools, churches and community outreaches",
    ],
    note:
      "Delivered in teams, following child-protection rules, with permissions obtained in advance.",
  },
  {
    slug: "community-charity",
    name: "Community Charity",
    goal: "To support vulnerable families and individuals.",
    summary:
      "Food, clothing, and emergency assistance for families facing hardship.",
    activities: [
      "Food distribution",
      "Clothing donations",
      "Community outreach programs",
    ],
  },
];

export const involvementOptions = [
  {
    title: "Volunteer",
    description:
      "Join a hospital visitation team, a school outreach, or the child-evangelism program.",
  },
  {
    title: "Partner",
    description:
      "Churches, schools, and NGOs can partner with us on ongoing programs in their community.",
  },
  {
    title: "Donate",
    description:
      "Support school fees, sanitary pads, patient starter kits, or a program of your choice.",
  },
];

export const structure = [
  "Executive Director",
  "Program Coordinators",
  "Field Officers",
  "Volunteers",
];

export const partners = ["Churches", "Schools", "Hospitals", "NGOs", "Individual donors"];

// Populated by the admin app via Cloudinary + Firestore. Each item stores
// a Cloudinary public_id (not a full URL) plus a caption. Empty for now —
// the Gallery page shows a clear empty state until real items exist.
export const galleryItems = [];
