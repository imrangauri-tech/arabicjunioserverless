import mongoose, { Schema, Document } from "mongoose";

/** A card in "Why Choose Our Arabic Teachers". */
export interface TeachersPageCard {
  title: string;
  description: string;
  /** Name of a lucide icon; the page maps it to the real component. */
  icon: string;
  /** Palette name, not a CSS class — the page owns the colours. */
  iconTheme: string;
  order: number;
}

/** A numbered step in "Our Teaching Methodology". */
export interface TeachersPageStep {
  title: string;
  description: string;
  icon: string;
  iconTheme: string;
  order: number;
}

/** One of the small icon + label items in the strip under the hero. */
export interface TeachersPageHighlight {
  title: string;
  icon: string;
  iconTheme: string;
  order: number;
}

export interface TeachersPageDocument extends Document {
  heroBadge: string;
  heroHeading: string;
  /** Second line of the hero heading, shown in orange. */
  heroHeadingHighlight: string;
  heroSubtitle: string;
  heroPrimaryLabel: string;
  heroPrimaryUrl: string;
  heroSecondaryLabel: string;
  heroSecondaryUrl: string;

  highlights: TeachersPageHighlight[];

  /** Heading above the tutor grid. */
  heading: string;
  /** SEO copy shown directly under that heading. */
  introLines: string[];

  whyChooseHeading: string;
  /** Words shown in orange at the end of the heading, as the rest of the site does. */
  whyChooseHeadingHighlight: string;
  whyChooseSubheading: string;
  whyChooseCards: TeachersPageCard[];

  methodologyHeading: string;
  methodologyHeadingHighlight: string;
  methodologySubheading: string;
  methodologySteps: TeachersPageStep[];

  ctaHeading: string;
  ctaSubtext: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
  /** Lets an admin take the banner off the page without deleting its copy. */
  ctaEnabled: boolean;

  /**
   * True once the sections have been filled with their starting copy.
   *
   * Without it the seeding would run on every read, and a field an admin
   * deliberately cleared — a button they wanted hidden, say — would silently
   * come back on the next page load.
   */
  sectionsSeeded: boolean;

  /** Copy shared by every teacher profile page (/our-teachers/<slug>). */
  profilePage: TeacherProfilePageContent;
}

export interface TeacherProfilePageContent {
  badge: string;
  /** Word before the teacher's name in the heading, e.g. "Meet". */
  salutation: string;
  aboutLabel: string;
  verifiedShow: boolean;
  verifiedBadge: string;
  verifiedTitle: string;
  verifiedTitleHighlight: string;
  verifiedSubtitle: string;
  verifiedCards: { icon: string; title: string; description: string }[];
  ctaShow: boolean;
  ctaHeading: string;
  ctaSubtext: string;
  ctaButtonLabel: string;
  ctaButtonUrl: string;
  faqShow: boolean;
  faqs: { question: string; answer: string }[];
}

const cardSchema = new Schema<TeachersPageCard>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "GraduationCap", trim: true },
    iconTheme: { type: String, default: "green", trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const stepSchema = new Schema<TeachersPageStep>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "ClipboardList", trim: true },
    iconTheme: { type: String, default: "orange", trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const highlightSchema = new Schema<TeachersPageHighlight>(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, default: "UserCheck", trim: true },
    iconTheme: { type: String, default: "orange", trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const s = (value = "") => ({ type: String, default: value, trim: true });

const profilePageSchema = new Schema<TeacherProfilePageContent>(
  {
    badge: s("OUR TEACHERS"),
    salutation: s("Meet"),
    aboutLabel: s("ABOUT ME"),
    verifiedShow: { type: Boolean, default: true },
    verifiedBadge: s("OUR VERIFIED TEACHERS"),
    verifiedTitle: s("Dedicated. Experienced."),
    verifiedTitleHighlight: s("Committed to Your Child's Success."),
    verifiedSubtitle: s(
      "Our teachers are carefully selected to provide high-quality Arabic and Quran education in a safe, engaging, and supportive environment."
    ),
    verifiedCards: {
      type: [
        new Schema(
          { icon: s("Award"), title: s(), description: s() },
          { _id: false }
        ),
      ],
      default: () => [
        {
          icon: "Award",
          title: "Qualified & Certified",
          description:
            "All our teachers are verified professionals with recognized qualifications in Arabic language and Quran teaching.",
        },
        {
          icon: "BookOpen",
          title: "Comprehensive Islamic Education",
          description:
            "Our teachers are experienced in teaching Arabic language, Fiqh (Islamic jurisprudence), Tafseer, Tajweed and Islamic history, tailored to each student's level and goals.",
        },
        {
          icon: "Users",
          title: "Male & Female Teachers",
          description:
            "We offer both male and female Arabic and Quran teachers, so you can choose the best fit for your child's needs and comfort.",
        },
        {
          icon: "ShieldCheck",
          title: "Carefully Vetted Hiring Process",
          description:
            "Every teacher goes through a rigorous selection process, including interviews, qualification checks, and background verification, ensuring a safe and high-quality learning experience for your child.",
        },
      ],
    },
    ctaShow: { type: Boolean, default: true },
    ctaHeading: s("Start Learning with Expert Arabic Teachers"),
    ctaSubtext: s(
      "Book a 1-on-1 free trial session today and experience personalized Arabic education."
    ),
    ctaButtonLabel: s("Book a Free Trial"),
    ctaButtonUrl: s("/register"),
    faqShow: { type: Boolean, default: true },
    faqs: {
      type: [new Schema({ question: s(), answer: s() }, { _id: false })],
      default: () => [
        {
          question: "Can I book a trial class with this teacher?",
          answer: "Yes! You can select your preferred teacher when booking your free trial session.",
        },
        {
          question: "What are the available class timings?",
          answer:
            "Our teachers offer flexible morning, afternoon, and weekend slots tailored to your child's schedule.",
        },
        {
          question: "Does the teacher cover the UAE Ministry of Education curriculum?",
          answer:
            "Yes, all our Arabic teachers specialize in UAE MOE, British, American, IB, and CBSE Arabic curricula.",
        },
      ],
    },
  },
  { _id: false }
);

const teachersPageSchema = new Schema<TeachersPageDocument>(
  {
    heroBadge: { type: String, default: "", trim: true },
    heroHeading: { type: String, default: "", trim: true },
    heroHeadingHighlight: { type: String, default: "", trim: true },
    heroSubtitle: { type: String, default: "", trim: true },
    heroPrimaryLabel: { type: String, default: "", trim: true },
    heroPrimaryUrl: { type: String, default: "/register", trim: true },
    heroSecondaryLabel: { type: String, default: "", trim: true },
    heroSecondaryUrl: { type: String, default: "/pricing", trim: true },

    highlights: { type: [highlightSchema], default: [] },

    heading: { type: String, default: "Meet our dynamic team or tutors" },
    introLines: { type: [String], default: [] },

    whyChooseHeading: { type: String, default: "", trim: true },
    whyChooseHeadingHighlight: { type: String, default: "", trim: true },
    whyChooseSubheading: { type: String, default: "", trim: true },
    whyChooseCards: { type: [cardSchema], default: [] },

    methodologyHeading: { type: String, default: "", trim: true },
    methodologyHeadingHighlight: { type: String, default: "", trim: true },
    methodologySubheading: { type: String, default: "", trim: true },
    methodologySteps: { type: [stepSchema], default: [] },

    ctaHeading: { type: String, default: "", trim: true },
    ctaSubtext: { type: String, default: "", trim: true },
    ctaButtonLabel: { type: String, default: "", trim: true },
    ctaButtonUrl: { type: String, default: "/register", trim: true },
    ctaEnabled: { type: Boolean, default: true },
    sectionsSeeded: { type: Boolean, default: false },
    // Default `{}` fills a document saved before profile pages existed with
    // the starting copy, so live profile pages never render empty.
    profilePage: { type: profilePageSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model<TeachersPageDocument>(
  "TeachersPage",
  teachersPageSchema
);
