import mongoose, { Document, Types } from "mongoose";

export interface TrialLandingDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;

  // Hero Section
  heroBadgeText: string;
  heroHeading: string;
  heroHeadingHighlight: string;
  heroSubheading: string;
  heroDescription1: string;
  heroDescription2: string;
  heroBullets: string[];
  heroCtaText: string;
  heroCtaSubtext: string;
  heroImageUrl: string;
  heroImagePublicId: string;

  // Stats Section
  statsShow: boolean;
  statsItems: Array<{
    key: string;
    value: string;
    label: string;
    desc: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
  }>;

  // Confidence & Communication Section
  confidenceShow: boolean;
  confidenceBadge: string;
  confidenceHeading: string;
  confidenceDescription: string;
  confidenceCards: Array<{
    arabicWord: string;
    englishLabel: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor?: string;
    icon: string;
  }>;

  // Curriculum & Flexible Learning Section
  curriculumFlexShow: boolean;
  curriculumBadge: string;
  curriculumHeading: string;
  curriculumDescription: string;
  curriculumBadgesList: Array<{ name: string; }>;
  curriculumChecklist: string[];

  flexibleBadge: string;
  flexibleHeading: string;
  flexibleDescription: string;
  flexibleFeatures: Array<{
    title: string;
    subtext: string;
    icon: string;
    color: string;
    bgColor: string;
  }>;

  flexibleImageUrl: string;
  flexibleImagePublicId: string;

  // More About Arabic Juniors & Testimonials Section
  moreAboutShow: boolean;
  moreAboutHeading: string;
  moreAboutFeatures: Array<{
    title: string;
    description: string;
    detailedText?: string;
    icon: string;
    color: string;
    bgColor: string;
  }>;
  testimonialsHeading: string;
  testimonialsHeadingHighlight: string;
  testimonialsList: Array<{
    name: string;
    role: string;
    quote: string;
    rating: number;
    avatarUrl: string;
    avatarPublicId?: string;
  }>;

  // Why Section
  whySubheader: string;
  whyHeading: string;
  whyDescription: string;
  whyCards: Array<{
    title: string;
    desc: string;
    titleColor: string;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    icon: string;
  }>;

  // Process Section
  processSubheader: string;
  processHeading: string;

  // Skills Section
  assessSubheader: string;
  assessTitle: string;
  assessDescription: string;
  assessSkills: Array<{
    title: string;
    desc: string;
    textColor: string;
    bgColor: string;
    icon: string;
  }>;

  // Curricula Section
  curriculaSubheader: string;
  curriculaTitle: string;
  curriculaDescription: string;
  curriculaBadges: string[];
  curriculaImageUrl: string;
  curriculaImagePublicId: string;

  // Choose Section
  chooseSubheader: string;
  chooseHeading: string;
  chooseCards: Array<{
    title: string;
    desc: string;
    icon: string;
    bgColor: string;
    borderColor: string;
    iconColor: string;
  }>;

  // Onboarding Section
  onboardingSubheader: string;
  onboardingHeading: string;
  onboardingSteps: Array<{
    num: string;
    title: string;
    desc: string;
    numBg: string;
  }>;

  // Suitability Section
  suitabilitySubheader: string;
  suitabilityTitle: string;
  suitabilityDescription: string;
  suitabilityBullets: string[];
  suitabilityImageUrl: string;
  suitabilityImagePublicId: string;

  // FAQ Section
  faqSubheader: string;
  faqTitle: string;
  faqItems: Array<{
    question: string;
    answer: string;
  }>;

  // CTA Section
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaSubtext: string;
  ctaImageUrl: string;
  ctaImagePublicId: string;

  // SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogImageUrl: string;
  ogImagePublicId: string;
  indexPage: boolean;
}

const trialLandingSchema = new mongoose.Schema(
  {
    title: { type: String, default: "Free Trial Landing Page", required: true },
    slug: { type: String, default: "trial-landing", unique: true },
    // Hero Section
    heroBadgeText: { type: String, default: "Free Trial Class" },
    heroHeading: { type: String, default: "Discover Your Child's" },
    heroHeadingHighlight: { type: String, default: "Arabic" },
    heroSubheading: { type: String, default: "Start With a Free Trial Class" },
    heroDescription1: { type: String, default: "Not sure what level your child is at or what kind of Arabic support they need?" },
    heroDescription2: { type: String, default: "Let your child experience a personalized online Arabic class with one of our experienced teachers." },
    heroBullets: { 
      type: [String], 
      default: [
        "Personalised Evaluation",
        "Live Interactive Lesson",
        "Parent Feedback",
        "UAE Curriculum Support"
      ] 
    },
    heroCtaText: { type: String, default: "Book My Child's Free Trial" },
    heroCtaSubtext: { type: String, default: "For UAE School Students | KG – Grade 6" },
    heroImageUrl: { type: String, default: "/free_trial_landing_student.png" },
    heroImagePublicId: { type: String, default: "" },

    // Stats Section
    statsShow: { type: Boolean, default: true },
    statsItems: {
      type: [
        {
          key: String,
          value: String,
          label: String,
          desc: String,
          color: String,
          bgColor: String,
          borderColor: String,
          icon: String,
        }
      ],
      default: [
        {
          key: "students",
          value: "3,500+",
          label: "Happy Students",
          desc: "Students from different schools learning Arabic with confidence.",
          color: "#FB6238",
          bgColor: "#FFF2EE",
          borderColor: "#FFD0BD",
          icon: "Users"
        },
        {
          key: "teachers",
          value: "200+",
          label: "Expert Teachers",
          desc: "Qualified and experienced Arabic teachers dedicated to your success.",
          color: "#7C3AED",
          bgColor: "#F3EEFF",
          borderColor: "#DDD6FE",
          icon: "GraduationCap"
        },
        {
          key: "classes",
          value: "25,000+",
          label: "Classes Conducted",
          desc: "Interactive live classes delivered with engaging and effective methods.",
          color: "#0062FC",
          bgColor: "#EBF4FF",
          borderColor: "#BFDBFE",
          icon: "MonitorPlay"
        },
        {
          key: "schools",
          value: "50+",
          label: "Students from Schools",
          desc: "Students from various schools across the UAE and beyond.",
          color: "#E05493",
          bgColor: "#FDF0F6",
          borderColor: "#FBCFE8",
          icon: "School"
        }
      ]
    },

    // Confidence & Communication Section
    confidenceShow: { type: Boolean, default: true },
    confidenceBadge: { type: String, default: "Why Choose Arabic Juniors?" },
    confidenceHeading: { type: String, default: "Build Confidence.\nImprove Communication." },
    confidenceDescription: {
      type: String,
      default: "Our teaching approach focuses on real life communication rather than memorization. We help students improve speaking, reading, writing and listening through interactive lessons and customized Arabic study plans."
    },
    confidenceCards: {
      type: [
        {
          arabicWord: String,
          englishLabel: String,
          description: String,
          color: String,
          bgColor: String,
          borderColor: String,
          icon: String,
        }
      ],
      default: [
        {
          arabicWord: "تحدّث",
          englishLabel: "Speak",
          description: "Improve speaking skills through real conversations",
          color: "#FB6238",
          bgColor: "#FFF2EE",
          borderColor: "#FFD0BD",
          icon: "MessagesSquare"
        },
        {
          arabicWord: "أقرأ",
          englishLabel: "Read",
          description: "Enhance reading skills step by step with themed texts",
          color: "#EA580C",
          bgColor: "#FFF7ED",
          borderColor: "#FED7AA",
          icon: "BookOpen"
        },
        {
          arabicWord: "اكتب",
          englishLabel: "Write",
          description: "Build strong writing skills with fun practice",
          color: "#7C3AED",
          bgColor: "#F3EEFF",
          borderColor: "#DDD6FE",
          icon: "Pencil"
        },
        {
          arabicWord: "استمع",
          englishLabel: "Listen",
          description: "Develop listening skills with audio practice",
          color: "#E05493",
          bgColor: "#FDF0F6",
          borderColor: "#FBCFE8",
          icon: "Headphones"
        }
      ]
    },

    // Curriculum & Flexible Learning Section
    curriculumFlexShow: { type: Boolean, default: true },
    curriculumBadge: { type: String, default: "UAE School Curriculum Expert" },
    curriculumHeading: { type: String, default: "Aligned with UAE\nSchool Curriculum" },
    curriculumDescription: {
      type: String,
      default: "We specialize in Arabic for UAE schools (MOE Curriculum) and also support students from CBSE, British, IB and American Curriculums."
    },
    curriculumBadgesList: {
      type: [{ name: String }],
      default: [
        { name: "UAE MOE" },
        { name: "CBSE" },
        { name: "British" },
        { name: "IB" },
        { name: "American" }
      ]
    },
    curriculumChecklist: {
      type: [String],
      default: [
        "Grade KG to 12",
        "Reading, Writing, Speaking & Grammar",
        "Textbook Support & Exam Preparation",
        "Personalized Learning Plans",
        "Regular Assessments & Progress Reports"
      ]
    },

    flexibleBadge: { type: String, default: "Flexible Learning" },
    flexibleHeading: { type: String, default: "Learn Anytime, Anywhere" },
    flexibleDescription: {
      type: String,
      default: "Our online Arabic classes are designed to fit your schedule. That's why we offer flexible learning options that make it easy to learn from your home and at your pace."
    },
    flexibleFeatures: {
      type: [
        {
          title: String,
          subtext: String,
          icon: String,
          color: String,
          bgColor: String
        }
      ],
      default: [
        {
          title: "Flexible Class Scheduling",
          subtext: "Choose timings that fit your routine",
          icon: "Calendar",
          color: "#FB6238",
          bgColor: "#FFF2EE"
        },
        {
          title: "One-to-One & Group Classes",
          subtext: "Select the learning style that suits you",
          icon: "Users",
          color: "#7C3AED",
          bgColor: "#F3EEFF"
        },
        {
          title: "Live Interactive Classes",
          subtext: "Learn with live teachers using fun methods",
          icon: "Video",
          color: "#E05493",
          bgColor: "#FDF0F6"
        },
        {
          title: "Progress Tracking",
          subtext: "Regular feedback and progress updates",
          icon: "BarChart3",
          color: "#0062FC",
          bgColor: "#EBF4FF"
        }
      ]
    },
    flexibleImageUrl: { type: String, default: "/online_learning_girl.jpg" },
    flexibleImagePublicId: { type: String, default: "" },

    // More About Arabic Juniors & Testimonials Section
    moreAboutShow: { type: Boolean, default: true },
    moreAboutHeading: { type: String, default: "More About Arabic Juniors" },
    moreAboutFeatures: {
      type: [
        {
          title: { type: String, default: "" },
          description: { type: String, default: "" },
          detailedText: { type: String, default: "" },
          icon: { type: String, default: "GraduationCap" },
          color: { type: String, default: "#0062FC" },
          bgColor: { type: String, default: "#EBF4FF" },
        }
      ],
      default: [
        {
          title: "Native & Experienced Arabic Teachers",
          description: "Learn from native and certified Arabic teachers with proven teaching experience.",
          detailedText: "Our certified native teachers are specialists in early childhood and school Arabic education, ensuring natural pronunciation, fluency, and deep cultural appreciation.",
          icon: "GraduationCap",
          color: "#0062FC",
          bgColor: "#EBF4FF"
        },
        {
          title: "One-to-One Attention",
          description: "We ensure personalized attention to help every student excel.",
          detailedText: "Every child learns at their own pace. Dedicated 1-on-1 interaction allows our tutors to adapt lessons instantly to your child's unique learning needs.",
          icon: "Users",
          color: "#7C3AED",
          bgColor: "#F3EEFF"
        },
        {
          title: "Arabic Classes for Kids",
          description: "Fun and engaging classes specially designed for kids with age-appropriate activities and materials.",
          detailedText: "We turn Arabic lessons into an exciting adventure with interactive digital whiteboards, gamified vocabulary quizzes, and cheerful storytelling.",
          icon: "Monitor",
          color: "#00A389",
          bgColor: "#E6F7F0"
        },
        {
          title: "Arabic Courses for Beginners",
          description: "Step-by-step courses that build a strong foundation in Arabic for absolute beginners.",
          detailedText: "Starting from alphabet sounds and letter connections to full conversational confidence, structured step-by-step guidance ensures steady mastery.",
          icon: "School",
          color: "#E05493",
          bgColor: "#FDF0F6"
        },
        {
          title: "Flexible Online Arabic Classes",
          description: "Choose class timings that suit your schedule with morning, evening or weekend slots.",
          detailedText: "Select class hours that blend smoothly with school routines, extra-curriculars, and family life with simple rescheduling options.",
          icon: "MonitorPlay",
          color: "#0062FC",
          bgColor: "#EBF4FF"
        },
        {
          title: "Continuous Learning & Progress Support",
          description: "We are always here to support students and parents at every step of the journey.",
          detailedText: "Receive regular feedback reports, teacher guidance, exam preparation help, and school curriculum alignment checks throughout the term.",
          icon: "HeartHandshake",
          color: "#FB6238",
          bgColor: "#FFF2EE"
        }
      ]
    },
    testimonialsHeading: { type: String, default: "What Parents Say About" },
    testimonialsHeadingHighlight: { type: String, default: "Arabic Juniors" },
    testimonialsList: {
      type: [
        {
          name: { type: String, default: "" },
          role: { type: String, default: "" },
          quote: { type: String, default: "" },
          rating: { type: Number, default: 5 },
          avatarUrl: { type: String, default: "" },
          avatarPublicId: { type: String, default: "" },
        }
      ],
      default: [
        {
          name: "Fatima Al Mansoori",
          role: "Parent, Dubai",
          quote: "Arabic Juniors has been a wonderful experience for my son. His reading and speaking skills improved a lot!",
          rating: 5,
          avatarUrl: "/parent_fatima.jpg"
        },
        {
          name: "Ahmed Khan",
          role: "Parent, Sharjah",
          quote: "The teachers are very supportive and the classes are interactive. Highly recommended!",
          rating: 5,
          avatarUrl: "/parent_ahmed.jpg"
        },
        {
          name: "Sara Mohamed",
          role: "Parent, Abu Dhabi",
          quote: "Flexible timings and personalized support helped my daughter achieve excellent results.",
          rating: 5,
          avatarUrl: "/parent_sara.jpg"
        }
      ]
    },

    // Why Section
    whySubheader: { type: String, default: "Why Take a Trial?" },
    whyHeading: { type: String, default: "Before You Enrol, See How Your Child Learns" },
    whyDescription: { type: String, default: "Our trial class gives both parents and students an opportunity to experience our teaching approach before committing to a course." },
    whyCards: {
      type: [
        {
          title: String,
          desc: String,
          titleColor: String,
          bgColor: String,
          borderColor: String,
          iconColor: String,
          icon: String
        }
      ],
      default: [
        {
          title: "Understand Their Level",
          desc: "We identify your child's current Arabic abilities.",
          titleColor: "text-[#0B46AD]",
          bgColor: "bg-[#EBF2FC]",
          borderColor: "border-[#D0E7FF]",
          iconColor: "text-[#0B46AD]",
          icon: "ClipboardList"
        },
        {
          title: "Experience Our Classes",
          desc: "See how our interactive lessons work.",
          titleColor: "text-[#FB6238]",
          bgColor: "bg-[#FFF5F1]",
          borderColor: "border-[#FFD0BD]",
          iconColor: "text-[#FB6238]",
          icon: "Monitor"
        },
        {
          title: "Meet a Teacher",
          desc: "Meet an experienced Arabic teacher.",
          titleColor: "text-[#00A389]",
          bgColor: "bg-[#E6F7F0]",
          borderColor: "border-[#A7E2CB]",
          iconColor: "text-[#00A389]",
          icon: "UserCheck"
        },
        {
          title: "Get Parent Feedback",
          desc: "Understand strengths and areas to improve.",
          titleColor: "text-[#FFA800]",
          bgColor: "bg-[#FFFDF0]",
          borderColor: "border-[#FEEFD0]",
          iconColor: "text-[#FFA800]",
          icon: "HeartHandshake"
        }
      ]
    },

    // Process Section
    processSubheader: { type: String, default: "What Happens During The Trial?" },
    processHeading: { type: String, default: "A Simple 4-Step Process" },

    // Skills Section
    assessSubheader: { type: String, default: "What Do We Assess?" },
    assessTitle: { type: String, default: "A Trial Designed Around Your Child" },
    assessDescription: { type: String, default: "We evaluate important Arabic skills to understand your child's current level." },
    assessSkills: {
      type: [
        {
          title: String,
          desc: String,
          textColor: String,
          bgColor: String,
          icon: String
        }
      ],
      default: [
        { title: "Reading", desc: "Ability to read Arabic words and sentences.", textColor: "text-[#00A389]", bgColor: "bg-[#E6F7F0]", icon: "BookOpen" },
        { title: "Writing", desc: "Letter formation, word writing and sentence writing.", textColor: "text-[#FB6238]", bgColor: "bg-[#FFF5F1]", icon: "ClipboardList" },
        { title: "Speaking", desc: "Oral fluency and pronunciation.", textColor: "text-[#E05493]", bgColor: "bg-[#FDF2F8]", icon: "UserCheck" },
        { title: "Vocabulary", desc: "Knowledge of words and expressions.", textColor: "text-[#0062FC]", bgColor: "bg-[#EFF6FF]", icon: "HeartHandshake" },
        { title: "Listening", desc: "Understanding spoken Arabic at their level.", textColor: "text-[#FFA800]", bgColor: "bg-[#FFFDF0]", icon: "Gift" },
        { title: "Grammar", desc: "Understanding grammar rules and structure.", textColor: "text-[#EF4444]", bgColor: "bg-[#FFF0F0]", icon: "CheckCircle2" }
      ]
    },

    // Curricula Section
    curriculaSubheader: { type: String, default: "Arabic Support For UAE Curricula" },
    curriculaTitle: { type: String, default: "We Support All Major UAE School Curricula" },
    curriculaDescription: { type: String, default: "We tailor our classes to match your child's school requirements." },
    curriculaBadges: { type: [String], default: ["UAE MOE", "CBSE", "British", "IB", "American"] },
    curriculaImageUrl: { type: String, default: "/dubai-skyline.png" },
    curriculaImagePublicId: { type: String, default: "" },

    // Choose Section
    chooseSubheader: { type: String, default: "Why Parents Choose Our Trial" },
    chooseHeading: { type: String, default: "More Than Just a Demo Class" },
    chooseCards: {
      type: [
        {
          title: String,
          desc: String,
          icon: String,
          bgColor: String,
          borderColor: String,
          iconColor: String
        }
      ],
      default: [
        { title: "Personalised Learning", desc: "Lessons adapted to your child's current ability.", icon: "PencilRuler", bgColor: "bg-[#FFF5F1]", borderColor: "border-[#FFD0BD]", iconColor: "text-[#FB6238]" },
        { title: "One-to-One Attention", desc: "Focused attention from the teacher in every class.", icon: "Tv", bgColor: "bg-[#E6F7F0]", borderColor: "border-[#A7E2CB]", iconColor: "text-[#00A389]" },
        { title: "Experienced Teachers", desc: "Teachers who understand how children learn.", icon: "UserCheck", bgColor: "bg-[#EBF2FC]", borderColor: "border-[#D0E7FF]", iconColor: "text-[#0B46AD]" },
        { title: "Interactive Classes", desc: "Engaging lessons that keep children involved.", icon: "Hourglass", bgColor: "bg-[#FFFDF0]", borderColor: "border-[#FEEFD0]", iconColor: "text-[#FFA800]" },
        { title: "School Support", desc: "Help with school curriculum, homework and exams.", icon: "School", bgColor: "bg-[#F5F3FF]", borderColor: "border-[#DDD6FE]", iconColor: "text-[#7C3AED]" },
        { title: "Clear Parent Feedback", desc: "Know your child's strengths and areas of improvement.", icon: "Target", bgColor: "bg-[#FFF0F0]", borderColor: "border-[#FECACA]", iconColor: "text-[#EF4444]" }
      ]
    },

    // Onboarding Section
    onboardingSubheader: { type: String, default: "How It Works" },
    onboardingHeading: { type: String, default: "Getting Started Is Easy" },
    onboardingSteps: {
      type: [
        {
          num: String,
          title: String,
          desc: String,
          numBg: String
        }
      ],
      default: [
        { num: "1", title: "Tell Us About Your Child", desc: "Fill in the short trial request form.", numBg: "bg-[#0B46AD]" },
        { num: "2", title: "We Arrange the Trial", desc: "We find a suitable teacher and convenient time.", numBg: "bg-[#FB6238]" },
        { num: "3", title: "Your Child Attends the Trial", desc: "Join the online Arabic class and enjoy learning.", numBg: "bg-[#FFA800]" },
        { num: "4", title: "Receive Feedback", desc: "We discuss your child's level and learning plan.", numBg: "bg-[#9333EA]" }
      ]
    },

    // Suitability Section
    suitabilitySubheader: { type: String, default: "Who Is The Trial For?" },
    suitabilityTitle: { type: String, default: "Is This Right for Your Child?" },
    suitabilityDescription: { type: String, default: "Our trial class is ideal for UAE school students who:" },
    suitabilityBullets: {
      type: [String],
      default: [
        "Need help with Arabic at school",
        "Find Arabic reading or writing difficult",
        "Need help with grammar and vocabulary",
        "Want to improve speaking skills",
        "Need extra support before exams",
        "Are starting Arabic for the first time",
        "Want personalised one-to-one tuition"
      ]
    },
    suitabilityImageUrl: { type: String, default: "/arabic-studies.png" },
    suitabilityImagePublicId: { type: String, default: "" },

    // FAQ Section
    faqSubheader: { type: String, default: "Frequently Asked Questions" },
    faqTitle: { type: String, default: "Frequently Asked Questions" },
    faqItems: {
      type: [
        {
          question: String,
          answer: String
        }
      ],
      default: [
        { question: "Is the trial class free?", answer: "Yes, the trial class is 100% free with no commitment required." },
        { question: "How long is the trial class?", answer: "The trial class is typically 30 to 45 minutes long, allowing the teacher to evaluate your child and conduct a mini-lesson." },
        { question: "Who can attend the trial?", answer: "The trial is for school-aged children (KG to Grade 6) who want to improve their school Arabic performance or start learning Arabic." },
        { question: "Is the trial one-to-one?", answer: "Yes, all our trial classes and regular classes are strictly 1-on-1 to ensure personalized attention." },
        { question: "Will you assess my child's Arabic level?", answer: "Yes, our teacher will evaluate your child's reading, writing, speaking, and listening skills during the session." },
        { question: "Do you support UAE school curricula?", answer: "Yes, we support all major school boards in the UAE, including UAE MOE, CBSE, British, IB, and American." },
        { question: "Do I have to enroll after the trial?", answer: "No, there is absolutely no obligation to enroll. The trial is for you to experience our classes first." }
      ]
    },

    // CTA Section
    ctaHeading: { type: String, default: "Ready to See Your Child Grow in Arabic?" },
    ctaDescription: { type: String, default: "Give your child the opportunity to experience a personalized Arabic lesson with an experienced teacher." },
    ctaButtonText: { type: String, default: "Book a Free Trial Class Today" },
    ctaSubtext: { type: String, default: "No long-term commitment. Discover the right learning approach for your child." },
    ctaImageUrl: { type: String, default: "/female-teacher.png" },
    ctaImagePublicId: { type: String, default: "" },

    // SEO Settings
    metaTitle: { 
      type: String, 
      default: "Arabic for UAE School Students | Free 1-on-1 Trial Class | Arabic Juniors" 
    },
    metaDescription: { 
      type: String, 
      default: "Book a free 1-on-1 Arabic trial class for UAE school students (KG to Grade 6). Aligned with UAE MOE, British, CBSE, IB, and American school curriculums." 
    },
    metaKeywords: { 
      type: String, 
      default: "Arabic for kids, UAE MOE curriculum, Arabic classes Dubai, online Arabic tutor UAE, learn Arabic Dubai, CBSE Arabic tuition" 
    },
    canonicalUrl: { type: String, default: "" },
    ogImageUrl: { type: String, default: "/hero-student-new.jpg" },
    ogImagePublicId: { type: String, default: "" },
    indexPage: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const TrialLanding = mongoose.model<TrialLandingDocument>("TrialLanding", trialLandingSchema);
export default TrialLanding;
