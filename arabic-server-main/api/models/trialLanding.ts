import mongoose, { Document, Schema, Types } from "mongoose";

/**
 * City landing pages (/dubai, /sharjah, /trial-benefits …).
 *
 * Every section is a nested object so the admin editor and the public page can
 * pass a whole section around as one prop. Any text may contain the token
 * `{city}`; the page swaps it for the page's city when it renders, so one set
 * of copy serves every city page until an admin decides to tailor it.
 */

export interface IconTitleSubtitle {
  icon: string;
  title: string;
  subtitle: string;
}

export interface IconTitleDescription {
  icon: string;
  title: string;
  description: string;
}

export interface LandingCtaPair {
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
}

export interface LandingHero extends LandingCtaPair {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  subheading: string;
  /** Plain text; `**words**` renders bold. */
  description: string;
  imageUrl: string;
  imagePublicId: string;
  imageAlt: string;
  floatingCards: IconTitleSubtitle[];
  bottomFeatures: IconTitleSubtitle[];
}

export interface LandingCurriculum extends LandingCtaPair {
  show: boolean;
  badge: string;
  title: string;
  titleHighlight: string;
  paragraphs: string[];
  features: IconTitleDescription[];
  bannerTitle: string;
  bannerSubtitle: string;
}

export interface LandingWhyChoose extends LandingCtaPair {
  show: boolean;
  badge: string;
  titlePrefix: string;
  titleHighlight1: string;
  titleHighlight2: string;
  titleSuffix: string;
  introText: string;
  features: IconTitleDescription[];
  ctaTitle: string;
  ctaDescription: string;
}

export interface LandingAdvantage extends LandingCtaPair {
  show: boolean;
  badge: string;
  title: string;
  titleHighlightPrefix: string;
  titleHighlight: string;
  paragraphs: string[];
  leftFeatures: IconTitleSubtitle[];
  pillars: IconTitleDescription[];
  sidebarLabel: string;
  sidebarTitle: string;
  sidebarText: string;
  trustPoints: { icon: string; text: string }[];
  stats: { icon: string; value: string; label: string }[];
}

export interface LandingFamilies extends LandingCtaPair {
  show: boolean;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  leftIntro: string;
  benefitsBoxTitle: string;
  benefits: IconTitleDescription[];
  rightHeading: string;
  rightHeadingHighlight: string;
  rightParagraphs: string[];
  bannerItem1Title: string;
  bannerItem1Text: string;
  bannerItem2Title: string;
  bannerItem2Text: string;
}

export interface TrialLandingDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;
  /** Replaces `{city}` in every text field. Empty → derived from the slug. */
  city: string;

  hero: LandingHero;
  curriculum: LandingCurriculum;
  whyChoose: LandingWhyChoose;
  advantage: LandingAdvantage;
  families: LandingFamilies;

  // SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogImageUrl: string;
  ogImagePublicId: string;
  indexPage: boolean;
}

const str = (value = "") => ({ type: String, default: value, trim: true });

const iconTitleSubtitleSchema = new Schema<IconTitleSubtitle>(
  { icon: str("Sparkles"), title: str(), subtitle: str() },
  { _id: false }
);

const iconTitleDescriptionSchema = new Schema<IconTitleDescription>(
  { icon: str("Sparkles"), title: str(), description: str() },
  { _id: false }
);

const trustPointSchema = new Schema(
  { icon: str("CheckCircle2"), text: str() },
  { _id: false }
);

const statSchema = new Schema(
  { icon: str("Users"), value: str(), label: str() },
  { _id: false }
);

const ctaPair = (secondaryText = "View Arabic Courses", secondaryUrl = "/pricing") => ({
  primaryCtaText: str("Book a Free Trial Class"),
  primaryCtaUrl: str("/register"),
  secondaryCtaText: str(secondaryText),
  secondaryCtaUrl: str(secondaryUrl),
});

const list = <T>(schema: Schema, items: T[]) => ({
  type: [schema],
  default: () => items.map((item) => ({ ...item })),
});

const strings = (items: string[]) => ({
  type: [String],
  default: () => [...items],
});

// ---------------------------------------------------------------------------
// Section schemas, with the copy the design launched with as their defaults.
// ---------------------------------------------------------------------------

const heroSchema = new Schema<LandingHero>(
  {
    badge: str("LIVE • INTERACTIVE • UAE FOCUSED"),
    titleLine1: str("Arabic Classes &"),
    titleLine2: str("Arabic Tuition in"),
    titleHighlight: str("{city}"),
    subheading: str("Learn Arabic with Expert Teachers from the Comfort of Home"),
    description: str(
      "Give your child the opportunity to learn Arabic with experienced native teachers. Our online **Arabic classes** and **short-term Arabic tuition in {city}** are designed for school students, beginners and advanced learners. We follow **UAE curriculum**, **MOE requirements** and provide personalized support to help every student build strong reading, writing, speaking and listening skills."
    ),
    ...ctaPair(),
    imageUrl: str("/hero-arabic-kid.jpg"),
    imagePublicId: str(),
    imageAlt: str("Student learning Arabic online with Arabic Juniors"),
    floatingCards: list(iconTitleSubtitleSchema, [
      { icon: "GraduationCap", title: "UAE Curriculum Support", subtitle: "MOE, CBSE, British, IB & American" },
      { icon: "Users", title: "Experienced Native Teachers", subtitle: "Qualified, friendly and child-focused" },
      { icon: "Calendar", title: "Flexible Timings", subtitle: "Learn from the comfort of home" },
    ]),
    bottomFeatures: list(iconTitleSubtitleSchema, [
      { icon: "Users", title: "Live One-to-One & Group Classes", subtitle: "Personalized attention for better progress" },
      { icon: "Calendar", title: "Short-Term Arabic Tuition", subtitle: "Ideal for exam prep and quick improvement" },
      { icon: "ShieldCheck", title: "Safe & Supportive Learning Environment", subtitle: "A positive space for confident learning" },
      { icon: "Headphones", title: "Learn from Anywhere", subtitle: "High-quality interactive online classes" },
      { icon: "BookOpen", title: "Build Real Language Skills", subtitle: "Reading, writing, speaking and listening" },
    ]),
  },
  { _id: false }
);

const curriculumSchema = new Schema<LandingCurriculum>(
  {
    show: { type: Boolean, default: true },
    badge: str("ARABIC TUITION IN {city}"),
    title: str("Arabic Classes in {city}"),
    titleHighlight: str("School Students"),
    paragraphs: strings([
      "At Arabic Juniors, we provide high-quality online Arabic classes for school students in {city} and across the UAE. Our programmes are designed to support the UAE curriculum as well as British, American, IB and CBSE curricula, helping students improve their Arabic language skills with confidence.",
      "Our Arabic tuition focuses on building strong reading, writing, listening and speaking skills through a structured and engaging learning approach. With experienced native teachers, personalized lesson plans and regular feedback, we help every student achieve their goals at their own pace.",
      "Whether your child needs support with school Arabic, exam preparation or overall language development, our online Arabic classes in {city} provide the guidance and support they need to make real progress.",
    ]),
    features: list(iconTitleDescriptionSchema, [
      { icon: "BookOpen", title: "UAE Curriculum Support", description: "Specialized Arabic tuition aligned with UAE MOE requirements, school textbooks, homework and exams." },
      { icon: "User", title: "Personalized Learning", description: "Custom lesson plans based on your child's level, school curriculum and learning goals, with regular feedback and guidance." },
      { icon: "Monitor", title: "Live One-to-One Classes", description: "Interactive live classes with experienced native teachers, providing individual attention and a focused learning experience." },
      { icon: "PenSquare", title: "Reading & Writing Skills", description: "Improve reading comprehension, written expression and spelling with step-by-step practice and guided activities." },
      { icon: "BarChart3", title: "Grammar & Vocabulary", description: "Build a strong foundation in Arabic grammar and vocabulary through clear explanations, practice exercises and real-life examples." },
      { icon: "ClipboardCheck", title: "Exam Preparation", description: "Targeted support for school exams with practice questions, past papers and focused revision to help students perform with confidence." },
    ]),
    bannerTitle: str("Build Stronger Arabic Skills"),
    bannerSubtitle: str(
      "Start with a focused Arabic tuition plan designed around your child's learning needs and school goals."
    ),
    ...ctaPair(),
  },
  { _id: false }
);

const whyChooseSchema = new Schema<LandingWhyChoose>(
  {
    show: { type: Boolean, default: true },
    badge: str("WHY CHOOSE US"),
    titlePrefix: str("Why Choose"),
    titleHighlight1: str("Arabic Classes &"),
    titleHighlight2: str("Arabic Tuition"),
    titleSuffix: str("in {city}?"),
    introText: str(
      "Our online Arabic classes and short-term Arabic tuition in {city} are designed to make learning simple, effective, and enjoyable. With experienced native teachers, a structured curriculum, and personalized attention, we help every student build strong Arabic language skills and confidence."
    ),
    features: list(iconTitleDescriptionSchema, [
      { icon: "MonitorPlay", title: "Live Interactive Classes", description: "Engage in real-time online Arabic classes with qualified teachers and interactive tools to keep students focused and motivated." },
      { icon: "Calendar", title: "Flexible Timings", description: "Choose class timings that suit your family's schedule. We offer flexible slots for school students, working parents and busy families." },
      { icon: "GraduationCap", title: "Experienced Native Teachers", description: "Learn from passionate, qualified and child-friendly native Arabic teachers with expertise in teaching Arabic to young learners." },
      { icon: "User", title: "Personalized Learning Plans", description: "Customized lessons based on each student's goals, level and learning style. Whether for school support, conversational Arabic or short-term tuition, we create a plan that works for you." },
      { icon: "BookOpen", title: "UAE Curriculum Support", description: "Specialized support for UAE MOE curriculum, as well as CBSE, British, IB and American curricula. We help with school homework, exams and overall language improvement." },
      { icon: "BarChart3", title: "Regular Progress Updates", description: "Receive regular assessments, detailed progress reports and feedback to track your child's improvement and identify areas for further support." },
    ]),
    ctaTitle: str("Start Your Arabic Learning Journey Today"),
    ctaDescription: str(
      "Whether you are looking for online Arabic classes for kids, short-term Arabic tuition in {city}, school support or conversational Arabic, Arabic Juniors is here to help you achieve your goals with expert guidance and personalized support."
    ),
    ...ctaPair(),
  },
  { _id: false }
);

const advantageSchema = new Schema<LandingAdvantage>(
  {
    show: { type: Boolean, default: true },
    badge: str("THE ARABIC JUNIORS ADVANTAGE"),
    title: str("More Than Just Classes."),
    titleHighlightPrefix: str("A Complete"),
    titleHighlight: str("Arabic Learning Experience."),
    paragraphs: strings([
      "At Arabic Juniors, we are committed to providing high-quality online Arabic classes and short-term Arabic tuition in {city} that are engaging, effective and tailored to every learner. Our programs are designed for children, school students and beginners who want to build strong Arabic language skills with the support of experienced native teachers.",
      "We understand that every student has different goals. Some need support with school Arabic and the UAE curriculum, while others want to improve their reading, writing, speaking and listening skills or learn conversational Arabic. Our structured lessons, interactive tools and personalized approach make learning Arabic simple, enjoyable and results-driven.",
      "With a focus on clear guidance, regular progress updates and a supportive learning environment, we help students develop confidence and achieve their goals at their own pace.",
    ]),
    leftFeatures: list(iconTitleSubtitleSchema, [
      { icon: "Users", title: "Live One-to-One & Group Classes", subtitle: "Personalized attention with real-time interaction." },
      { icon: "ClipboardList", title: "Structured Learning Plans", subtitle: "Step-by-step curriculum designed for steady progress." },
      { icon: "Calendar", title: "Flexible Schedule", subtitle: "Choose class timings that fit your routine." },
      { icon: "Laptop", title: "Learn From Anywhere", subtitle: "Join online classes from {city}, the UAE or anywhere in the world." },
      { icon: "ShieldCheck", title: "Safe & Supportive Environment", subtitle: "A positive and caring space for confident learning." },
    ]),
    pillars: list(iconTitleDescriptionSchema, [
      { icon: "BookOpen", title: "UAE Curriculum Aligned", description: "Support for MOE, CBSE, British, IB and American curricula." },
      { icon: "Sparkles", title: "Modern Learning Tools", description: "Interactive resources, quizzes and practice materials." },
      { icon: "User", title: "Personalized Support", description: "Guidance based on each student's level, goals and learning style." },
      { icon: "BarChart3", title: "Real Progress", description: "Regular assessments and detailed progress reports for parents." },
    ]),
    sidebarLabel: str("START YOUR"),
    sidebarTitle: str("Arabic Learning Journey Today"),
    sidebarText: str(
      "Join thousands of families in {city} and the UAE who trust Arabic Juniors for high-quality, personalized Arabic classes and tuition."
    ),
    ...ctaPair(),
    trustPoints: list(trustPointSchema, [
      { icon: "GraduationCap", text: "Trusted by families in {city} & UAE" },
      { icon: "Users", text: "Experienced native Arabic teachers" },
      { icon: "ShieldCheck", text: "Safe, supportive and child-friendly" },
      { icon: "Globe", text: "Online classes from anywhere" },
    ]),
    stats: list(statSchema, [
      { icon: "Users", value: "3,500+", label: "Happy Students" },
      { icon: "User", value: "200+", label: "Expert Teachers" },
      { icon: "ShieldCheck", value: "25,000+", label: "Classes Delivered" },
      { icon: "Star", value: "4.9/5", label: "Parent Satisfaction" },
    ]),
  },
  { _id: false }
);

const familiesSchema = new Schema<LandingFamilies>(
  {
    show: { type: Boolean, default: true },
    badge: str("TRUSTED BY FAMILIES IN {city}"),
    titlePrefix: str("Why Families Choose"),
    titleHighlight: str("Arabic Classes in {city}"),
    leftIntro: str(
      "At Arabic Juniors, we provide high-quality online Arabic classes for children and school students in {city}. Our programs are designed to support the UAE curriculum, help with school homework and exams, and build strong Arabic language skills through a structured and engaging learning approach."
    ),
    benefitsBoxTitle: str("Key Benefits of Our Arabic Classes"),
    benefits: list(iconTitleDescriptionSchema, [
      { icon: "BookOpen", title: "UAE Curriculum Support", description: "Aligned with UAE MOE curriculum to help with school studies, homework and exams." },
      { icon: "Calendar", title: "Flexible Scheduling", description: "Choose class times that fit your family's routine, including weekdays and weekends." },
      { icon: "UserCheck", title: "Experienced Native Teachers", description: "Qualified, friendly and child-focused teachers with expertise in teaching Arabic to young learners." },
      { icon: "Users", title: "Personalized Learning Plans", description: "Customized lessons based on each student's level, goals and learning style." },
      { icon: "ShieldCheck", title: "Safe & Supportive Environment", description: "A positive and secure online learning space where students feel comfortable and motivated." },
      { icon: "BarChart3", title: "Regular Progress Updates", description: "Timely feedback and detailed progress reports to keep parents informed about their child's improvement." },
    ]),
    rightHeading: str("A Better Way to"),
    rightHeadingHighlight: str("Learn Arabic in {city}"),
    rightParagraphs: strings([
      "Choosing the right Arabic classes in {city} is an important decision for every parent. At Arabic Juniors, we focus on making Arabic learning simple, effective and enjoyable for children and school students. Our structured programs help students develop strong reading, writing, speaking and listening skills with the support of experienced native teachers.",
      "We understand that every student has different goals. Some need support with the UAE school curriculum, while others want to improve their overall Arabic language skills or build confidence in speaking. Our lessons are designed to meet these needs with clear guidance, step-by-step learning and regular practice.",
      "Our online classes use modern tools such as HD video, digital whiteboards and interactive activities, making learning engaging and effective. Students can ask questions, practise with their teacher and receive personalised attention in every session.",
      "Parents can stay updated with their child's progress through regular reports and feedback. We work closely with families to ensure that each student receives the right support, builds consistency and achieves steady improvement in their Arabic language journey.",
      "With flexible scheduling, individual attention and a focus on results, Arabic Juniors is a trusted choice for Arabic classes in {city}. We are proud to support families in raising confident students who can use Arabic with clarity and confidence in school and daily life.",
    ]),
    bannerItem1Title: str("Start Your Arabic Learning Journey Today"),
    bannerItem1Text: str(
      "Take the first step towards better Arabic language skills with a free trial class."
    ),
    bannerItem2Title: str("Trusted by {city} Families"),
    bannerItem2Text: str("A safe, high-quality and student-focused learning experience."),
    ...ctaPair("Contact Us", "/contact-us"),
  },
  { _id: false }
);

const trialLandingSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Free Trial Landing Page", required: true },
    slug: { type: String, default: "trial-benefits", unique: true },
    city: str(),

    // `default: () => ({})` makes a page saved before these sections existed
    // come back with the full default copy instead of an empty section.
    hero: { type: heroSchema, default: () => ({}) },
    curriculum: { type: curriculumSchema, default: () => ({}) },
    whyChoose: { type: whyChooseSchema, default: () => ({}) },
    advantage: { type: advantageSchema, default: () => ({}) },
    families: { type: familiesSchema, default: () => ({}) },

    // SEO Settings
    metaTitle: str("Arabic Classes & Arabic Tuition in {city} | Arabic Juniors"),
    metaDescription: str(
      "Join expert-led Arabic tuition online in {city} & UAE. Affordable one-to-one Arabic language classes for UAE students, schools & UAE curriculum. Book your class now."
    ),
    metaKeywords: str(
      "Arabic for kids {city}, UAE MOE curriculum, Arabic classes {city}, online Arabic tutor UAE, learn Arabic {city}, CBSE Arabic tuition"
    ),
    canonicalUrl: str(),
    ogImageUrl: str(),
    ogImagePublicId: str(),
    indexPage: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TrialLanding = mongoose.model<TrialLandingDocument>("TrialLanding", trialLandingSchema);
export default TrialLanding;
