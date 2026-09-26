"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { 
  CheckCircle2, 
  Gift, 
  ArrowRight,
  ClipboardList,
  Monitor,
  UserCheck,
  HeartHandshake,
  BookOpen,
  PencilRuler,
  Tv,
  Hourglass,
  School,
  Target,
  Plus,
  Minus,
  HelpCircle,
  Loader2,
  Users,
  GraduationCap,
  MonitorPlay,
  MessagesSquare,
  Pencil,
  Headphones,
  Calendar,
  Video,
  BarChart3,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button-2";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

const localStatsItems = [
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
];

const localConfidenceCards = [
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
];

const localCurriculumBadges = [
  { name: "UAE MOE" },
  { name: "CBSE" },
  { name: "British" },
  { name: "IB" },
  { name: "American" },
];

const localCurriculumChecklist = [
  "Grade KG to 12",
  "Reading, Writing, Speaking & Grammar",
  "Textbook Support & Exam Preparation",
  "Personalized Learning Plans",
  "Regular Assessments & Progress Reports"
];

const localFlexibleFeatures = [
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
];

const renderCurriculumBadgeIcon = (name: string) => {
  const cleanName = (name || "").toLowerCase().trim();
  if (cleanName.includes("uae") || cleanName.includes("moe")) {
    return (
      <svg className="w-10 h-10 sm:w-11 sm:h-11 shadow-sm rounded-full" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" fill="#FFFFFF" stroke="#047857" strokeWidth="2"/>
        <circle cx="22" cy="22" r="18.5" fill="#F0FDF4"/>
        <path d="M14 20c1.5-4 5-7 8-7s6.5 3 8 7" stroke="#047857" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 22c0 5 4 10 9 10s9-5 9-10" stroke="#047857" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="18" y="16" width="3" height="12" fill="#DC2626"/>
        <rect x="21" y="16" width="5" height="4" fill="#047857"/>
        <rect x="21" y="20" width="5" height="4" fill="#FFFFFF"/>
        <rect x="21" y="24" width="5" height="4" fill="#1E293B"/>
      </svg>
    );
  }
  if (cleanName.includes("cbse")) {
    return (
      <svg className="w-10 h-10 sm:w-11 sm:h-11 shadow-sm rounded-full" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" fill="#FFFFFF" stroke="#059669" strokeWidth="2"/>
        <circle cx="22" cy="22" r="18" fill="#ECFDF5"/>
        <circle cx="22" cy="22" r="13" fill="#059669" opacity="0.1"/>
        <path d="M22 13v7m-4-3.5h8" stroke="#059669" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 26c2-1 4-1.5 6-1.5s4 .5 6 1.5l-6 4-6-4z" fill="#D97706"/>
        <circle cx="22" cy="20" r="2" fill="#DC2626"/>
      </svg>
    );
  }
  if (cleanName.includes("british") || cleanName.includes("uk") || cleanName.includes("cambridge")) {
    return (
      <svg className="w-10 h-10 sm:w-11 sm:h-11 shadow-sm rounded-full" viewBox="0 0 44 44">
        <defs>
          <clipPath id="uk-clip"><circle cx="22" cy="22" r="20"/></clipPath>
        </defs>
        <g clipPath="url(#uk-clip)">
          <rect width="44" height="44" fill="#012169"/>
          <path d="M0 0L44 44M44 0L0 44" stroke="#FFF" strokeWidth="6"/>
          <path d="M0 0L44 44M44 0L0 44" stroke="#C8102E" strokeWidth="3"/>
          <path d="M22 0V44M0 22H44" stroke="#FFF" strokeWidth="10"/>
          <path d="M22 0V44M0 22H44" stroke="#C8102E" strokeWidth="6"/>
        </g>
        <circle cx="22" cy="22" r="21" fill="none" stroke="#E2E8F0" strokeWidth="1.5"/>
      </svg>
    );
  }
  if (cleanName.includes("ib")) {
    return (
      <svg className="w-10 h-10 sm:w-11 sm:h-11 shadow-sm rounded-full" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="21" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2"/>
        <circle cx="22" cy="22" r="18.5" fill="#F0F9FF"/>
        <path d="M14 22a8 8 0 1016 0 8 8 0 00-16 0" stroke="#0284C7" strokeWidth="1.5"/>
        <path d="M14 22h16M22 14v16" stroke="#0284C7" strokeWidth="1.2" opacity="0.6"/>
        <text x="22" y="26" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="bold" fontFamily="serif">ib</text>
      </svg>
    );
  }
  if (cleanName.includes("american") || cleanName.includes("us")) {
    return (
      <svg className="w-10 h-10 sm:w-11 sm:h-11 shadow-sm rounded-full" viewBox="0 0 44 44">
        <defs>
          <clipPath id="us-clip"><circle cx="22" cy="22" r="20"/></clipPath>
        </defs>
        <g clipPath="url(#us-clip)">
          <rect width="44" height="44" fill="#FFF"/>
          <path d="M0 0h44v4H0zm0 8h44v4H0zm0 8h44v4H0zm0 8h44v4H0zm0 8h44v4H0zm0 8h44v4H0z" fill="#B22234"/>
          <rect width="20" height="24" fill="#3C3B6E"/>
          <circle cx="5" cy="5" r="1" fill="#FFF"/><circle cx="10" cy="5" r="1" fill="#FFF"/><circle cx="15" cy="5" r="1" fill="#FFF"/>
          <circle cx="7.5" cy="9" r="1" fill="#FFF"/><circle cx="12.5" cy="9" r="1" fill="#FFF"/>
          <circle cx="5" cy="13" r="1" fill="#FFF"/><circle cx="10" cy="13" r="1" fill="#FFF"/><circle cx="15" cy="13" r="1" fill="#FFF"/>
          <circle cx="7.5" cy="17" r="1" fill="#FFF"/><circle cx="12.5" cy="17" r="1" fill="#FFF"/>
        </g>
        <circle cx="22" cy="22" r="21" fill="none" stroke="#E2E8F0" strokeWidth="1.5"/>
      </svg>
    );
  }
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-700 shadow-sm">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};

const localMoreAboutFeatures = [
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
];

const localTestimonialsList = [
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
];

const localWhyTakeTrialItems = [
  {
    title: "Understand Their Level",
    titleColor: "text-[#0B46AD]",
    bgColor: "bg-[#EBF2FC]",
    borderColor: "border-[#D0E7FF]",
    iconColor: "text-[#0B46AD]",
    icon: "ClipboardList",
    desc: "We identify your child's current Arabic abilities."
  },
  {
    title: "Experience Our Classes",
    titleColor: "text-[#FB6238]",
    bgColor: "bg-[#FFF5F1]",
    borderColor: "border-[#FFD0BD]",
    iconColor: "text-[#FB6238]",
    icon: "Monitor",
    desc: "See how our interactive lessons work."
  },
  {
    title: "Meet a Teacher",
    titleColor: "text-[#00A389]",
    bgColor: "bg-[#E6F7F0]",
    borderColor: "border-[#A7E2CB]",
    iconColor: "text-[#00A389]",
    icon: "UserCheck",
    desc: "Meet an experienced Arabic teacher."
  },
  {
    title: "Get Parent Feedback",
    titleColor: "text-[#FFA800]",
    bgColor: "bg-[#FFFDF0]",
    borderColor: "border-[#FEEFD0]",
    iconColor: "text-[#FFA800]",
    icon: "HeartHandshake",
    desc: "Understand strengths and areas to improve."
  }
];

const processSteps = [
  {
    num: "01",
    numBg: "bg-[#3b82f6]",
    title: "Understand Your Child",
    description: "We learn about your child's grade, school curriculum, previous Arabic learning and current challenges.",
    illustration: (
      <svg className="w-[100px] h-[75px]" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 72c0-8 6-12 15-12s15 4 15 12" fill="#eab308" />
        <circle cx="30" cy="50" r="9" fill="#fed7aa" />
        <path d="M21 48c0-5 9-8 9-8s9 3 9 8" fill="#1e293b" />
        <path d="M27 49h6v1.5h-6z" fill="#f97316" />

        <path d="M45 72c0-8 6-12 15-12s15 4 15 12" fill="#f97316" />
        <circle cx="60" cy="50" r="9" fill="#fdba74" />
        <path d="M51 48c0-5 9-8 9-8s9 3 9 8" fill="#0f172a" />
        <path d="M57 49h6v1.5h-6z" fill="#3b82f6" />

        <rect x="22" y="6" width="36" height="22" rx="6" fill="#2563eb" />
        <path d="M30 28l-4 6v-6h4z" fill="#2563eb" />
        <circle cx="32" cy="17" r="2.5" fill="#ffffff" />
        <circle cx="40" cy="17" r="2.5" fill="#ffffff" />
        <circle cx="48" cy="17" r="2.5" fill="#ffffff" />
      </svg>
    )
  },
  {
    num: "02",
    numBg: "bg-[#fb6238]",
    title: "Assess Their Level",
    description: "The teacher evaluates key Arabic skills appropriate for their age and grade.",
    illustration: (
      <svg className="w-[80px] h-[80px]" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="12" width="36" height="56" rx="6" fill="#f8fafc" stroke="#0f766e" strokeWidth="3" />
        <rect x="32" y="6" width="16" height="10" rx="2" fill="#0f766e" />
        <circle cx="40" cy="11" r="2" fill="#ffffff" />
        <path d="M28 28l4 4 8-8" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="44" y1="30" x2="52" y2="30" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28 42l4 4 8-8" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="44" y1="44" x2="52" y2="44" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28 56l4 4 8-8" stroke="#0f766e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="44" y1="58" x2="52" y2="58" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    num: "03",
    numBg: "bg-[#ffa800]",
    title: "Experience Arabic Learning",
    description: "Your child participates in an interactive lesson designed around their level.",
    illustration: (
      <svg className="w-[100px] h-[75px]" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="10" width="72" height="46" rx="4" fill="#0f172a" />
        <rect x="18" y="14" width="64" height="38" fill="#1e293b" />
        <circle cx="50" cy="12" r="1" fill="#ef4444" />
        <circle cx="50" cy="27" r="7" fill="#fed7aa" />
        <path d="M50 20c-4 0-6 3-6 5s1 4 3 4 3-4 3-4" fill="#1e293b" />
        <path d="M38 52c0-8 8-10 12-10s12 2 12 10" fill="#0f766e" />
        <path d="M36 40c2 0 3-2 3-4s-1-4-3-4-3 2-3 4 1 4 3 4z" fill="#fed7aa" />
        <path d="M6 56h88l-6 10H12L6 56z" fill="#475569" />
        <rect x="36" y="60" width="28" height="3" rx="1.5" fill="#334155" />
      </svg>
    )
  },
  {
    num: "04",
    numBg: "bg-[#9333ea]",
    title: "Recommend Next Steps",
    description: "We share feedback and suggest the most suitable learning approach.",
    illustration: (
      <svg className="w-[80px] h-[80px]" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="32" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="3" />
        <circle cx="40" cy="40" r="22" stroke="#7e22ce" strokeWidth="3" fill="#ffffff" />
        <circle cx="40" cy="40" r="12" stroke="#7e22ce" strokeWidth="3" fill="#f3e8ff" />
        <circle cx="40" cy="40" r="5" fill="#7e22ce" />
        <line x1="60" y1="20" x2="43" y2="37" stroke="#7e22ce" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M62 14l6 6-4 4-6-6z" fill="#a855f7" />
        <path d="M62 14l-6-6M68 20l-6-6" stroke="#7e22ce" strokeWidth="2.5" />
      </svg>
    )
  }
];

const localChildAssessSkills = [
  {
    title: "Reading",
    textColor: "text-[#00A389]",
    desc: "Ability to read Arabic words and sentences.",
    bgColor: "bg-[#E6F7F0]",
    icon: "BookOpen",
  },
  {
    title: "Writing",
    textColor: "text-[#FB6238]",
    desc: "Letter formation, word writing and sentence writing.",
    bgColor: "bg-[#FFF5F1]",
    icon: "ClipboardList",
  },
  {
    title: "Speaking",
    textColor: "text-[#E05493]",
    desc: "Oral fluency and pronunciation.",
    bgColor: "bg-[#FDF2F8]",
    icon: "UserCheck",
  },
  {
    title: "Vocabulary",
    textColor: "text-[#0062FC]",
    desc: "Knowledge of words and expressions.",
    bgColor: "bg-[#EFF6FF]",
    icon: "HeartHandshake",
  },
  {
    title: "Listening",
    textColor: "text-[#FFA800]",
    desc: "Understanding spoken Arabic at their level.",
    bgColor: "bg-[#FFFDF0]",
    icon: "Gift",
  },
  {
    title: "Grammar",
    textColor: "text-[#EF4444]",
    desc: "Understanding grammar rules and structure.",
    bgColor: "bg-[#FFF0F0]",
    icon: "CheckCircle2",
  }
];

const localParentChooseCards = [
  {
    title: "Personalised Learning",
    desc: "Lessons adapted to your child's current ability.",
    icon: "PencilRuler",
    bgColor: "bg-[#FFF5F1]",
    borderColor: "border-[#FFD0BD]",
    iconColor: "text-[#FB6238]"
  },
  {
    title: "One-to-One Attention",
    desc: "Focused attention from the teacher in every class.",
    icon: "Tv",
    bgColor: "bg-[#E6F7F0]",
    borderColor: "border-[#A7E2CB]",
    iconColor: "text-[#00A389]"
  },
  {
    title: "Experienced Teachers",
    desc: "Teachers who understand how children learn.",
    icon: "UserCheck",
    bgColor: "bg-[#EBF2FC]",
    borderColor: "border-[#D0E7FF]",
    iconColor: "text-[#0B46AD]"
  },
  {
    title: "Interactive Classes",
    desc: "Engaging lessons that keep children involved.",
    icon: "Hourglass",
    bgColor: "bg-[#FFFDF0]",
    borderColor: "border-[#FEEFD0]",
    iconColor: "text-[#FFA800]"
  },
  {
    title: "School Support",
    desc: "Help with school curriculum, homework and exams.",
    icon: "School",
    bgColor: "bg-[#F5F3FF]",
    borderColor: "border-[#DDD6FE]",
    iconColor: "text-[#7C3AED]"
  },
  {
    title: "Clear Parent Feedback",
    desc: "Know your child's strengths and areas of improvement.",
    icon: "Target",
    bgColor: "bg-[#FFF0F0]",
    borderColor: "border-[#FECACA]",
    iconColor: "text-[#EF4444]"
  }
];

const localGettingStartedSteps = [
  {
    num: "1",
    numBg: "bg-[#0B46AD]",
    title: "Tell Us About Your Child",
    desc: "Fill in the short trial request form."
  },
  {
    num: "2",
    numBg: "bg-[#FB6238]",
    title: "We Arrange the Trial",
    desc: "We find a suitable teacher and convenient time."
  },
  {
    num: "3",
    numBg: "bg-[#FFA800]",
    title: "Your Child Attends the Trial",
    desc: "Join the online Arabic class and enjoy learning."
  },
  {
    num: "4",
    numBg: "bg-[#9333EA]",
    title: "Receive Feedback",
    desc: "We discuss your child's level and learning plan."
  }
];

const localChildRightBullets = [
  "Need help with Arabic at school",
  "Find Arabic reading or writing difficult",
  "Need help with grammar and vocabulary",
  "Want to improve speaking skills",
  "Need extra support before exams",
  "Are starting Arabic for the first time",
  "Want personalised one-to-one tuition"
];

const localFaqItems = [
  {
    question: "Is the trial class free?",
    answer: "Yes, the trial class is 100% free with no commitment required."
  },
  {
    question: "How long is the trial class?",
    answer: "The trial class is typically 30 to 45 minutes long, allowing the teacher to evaluate your child and conduct a mini-lesson."
  },
  {
    question: "Who can attend the trial?",
    answer: "The trial is for school-aged children (KG to Grade 6) who want to improve their school Arabic performance or start learning Arabic."
  },
  {
    question: "Is the trial one-to-one?",
    answer: "Yes, all our trial classes and regular classes are strictly 1-on-1 to ensure personalized attention."
  },
  {
    question: "Will you assess my child's Arabic level?",
    answer: "Yes, our teacher will evaluate your child's reading, writing, speaking, and listening skills during the session."
  },
  {
    question: "Do you support UAE school curricula?",
    answer: "Yes, we support all major school boards in the UAE, including UAE MOE, CBSE, British, IB, and American."
  },
  {
    question: "Do I have to enroll after the trial?",
    answer: "No, there is absolutely no obligation to enroll. The trial is for you to experience our classes first."
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "ClipboardList": return ClipboardList;
    case "Monitor": return Monitor;
    case "UserCheck": return UserCheck;
    case "HeartHandshake": return HeartHandshake;
    case "BookOpen": return BookOpen;
    case "Gift": return Gift;
    case "CheckCircle2": return CheckCircle2;
    case "PencilRuler": return PencilRuler;
    case "Tv": return Tv;
    case "Hourglass": return Hourglass;
    case "School": return School;
    case "Target": return Target;
    case "Users": return Users;
    case "GraduationCap": return GraduationCap;
    case "MonitorPlay": return MonitorPlay;
    case "MessagesSquare": return MessagesSquare;
    case "Pencil": return Pencil;
    case "Headphones": return Headphones;
    case "Calendar": return Calendar;
    case "Video": return Video;
    case "BarChart3": return BarChart3;
    default: return HelpCircle;
  }
};

const trialClassFeatures = [
  {
    title: "Understand Their Level",
    desc: "We identify your child’s current Arabic abilities.",
    titleColor: "#3972c9",
    bgColor: "#f2f7ff",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 19c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" fill="#4c7fd8" />
        <path d="M12 37c0-5.5 4.5-9 12-9s12 3.5 12 9" stroke="#4c7fd8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M11 16c1.933 0 3.5-1.567 3.5-3.5S12.933 9 11 9s-3.5 1.567-3.5 3.5S9.067 16 11 16z" fill="#4c7fd8" opacity="0.6" />
        <path d="M4 35c0-4 3.5-6.5 7-6.5" stroke="#4c7fd8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <path d="M37 16c1.933 0 3.5-1.567 3.5-3.5S38.933 9 37 9s-3.5 1.567-3.5 3.5S35.067 16 37 16z" fill="#4c7fd8" opacity="0.6" />
        <path d="M44 35c0-4-3.5-6.5-7-6.5" stroke="#4c7fd8" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  {
    title: "Experience Our Classes",
    desc: "See how our interactive lessons work.",
    titleColor: "#f15a24",
    bgColor: "#fff5ee",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="10" width="32" height="24" rx="3" stroke="#f15a24" strokeWidth="3" fill="#fff5ee" />
        <path d="M18 17h12" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 22h8" stroke="#f15a24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="31" cy="23" r="3" fill="#f15a24" />
        <path d="M16 34l-3 6" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
        <path d="M32 34l3 6" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 34v6" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Meet a Teacher",
    desc: "Meet an experienced Arabic teacher.",
    titleColor: "#397bc5",
    bgColor: "#effafa",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="15" r="6" fill="#239b9a" />
        <path d="M8 36c0-5 5-8 10-8s10 3 10 8" fill="#239b9a" />
        <path d="M34 10l1.2 2.5 2.8.4-2 2 1 2.8-3-1.5-3 1.5 1-2.8-2-2 2.8-.4z" fill="none" stroke="#239b9a" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M38 21l.8 1.7 1.9.3-1.4 1.3.7 1.9-2-1-2 1 .7-1.9-1.4-1.3 1.9-.3z" fill="none" stroke="#239b9a" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M32 29l.6 1.2 1.3.2-1 1 .5 1.3-1.4-.7-1.4.7.5-1.3-1-1 1.3-.2z" fill="none" stroke="#239b9a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "Get Parent Feedback",
    desc: "Understand strengths and areas to improve.",
    titleColor: "#f29b00",
    bgColor: "#fffaf0",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6c9.941 0 12 2.059 12 12s-2.059 12-12 12-12-2.059-12-12 2.059-12 12-12z" stroke="#f4a300" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        <path d="M19 28v11l5-3 5 3V28" stroke="#f4a300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="18" r="5" fill="#f4a300" />
      </svg>
    )
  }
];

export default function TrialLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const slugParam = unwrappedParams.slug;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState<number | null>(null);
  const [activeTestimonialPage, setActiveTestimonialPage] = useState<number>(0);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trial-landing/${slugParam}`);
        const result = await res.json();
        if (res.ok && result.data) {
          setSettings(result.data);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // If loading and it's not the default route, show loading
  if (loading && slugParam !== "trial-landing") {
    return (
      <div className="flex flex-col items-center justify-center py-24 min-h-[50vh] bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-neutral-500 text-sm mt-2 font-medium">Loading...</p>
      </div>
    );
  }

  // Once loaded, if the database slug doesn't match the current URL slug, trigger 404
  const dbSlug = settings?.slug || "trial-landing";
  if (!loading && dbSlug !== slugParam) {
    notFound();
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleBookClick = () => {
    router.push("/register");
  };

  // Fallback to defaults if settings are not loaded yet
  const heroBadgeText = settings?.heroBadgeText || "Free Trial Class";
  const heroHeading = settings?.heroHeading || "Discover Your Child's";
  const heroHeadingHighlight = settings?.heroHeadingHighlight || "Arabic";
  const heroSubheading = settings?.heroSubheading || "Start With a Free Trial Class";
  const heroDescription1 = settings?.heroDescription1 || "Not sure what level your child is at or what kind of Arabic support they need?";
  const heroDescription2 = settings?.heroDescription2 || "Let your child experience a personalized online Arabic class with one of our experienced teachers.";
  const heroBullets = settings?.heroBullets || [
    "Personalised Evaluation",
    "Live Interactive Lesson",
    "Parent Feedback",
    "UAE Curriculum Support"
  ];
  const heroCtaText = settings?.heroCtaText || "Book My Child's Free Trial";
  const heroCtaSubtext = settings?.heroCtaSubtext || "For UAE School Students | KG – Grade 6";
  const heroImageUrl = settings?.heroImageUrl || "/hero-student-new.jpg";

  const statsShow = settings?.statsShow !== false;
  const statsItems = settings?.statsItems && settings.statsItems.length > 0 ? settings.statsItems : localStatsItems;

  const confidenceShow = settings?.confidenceShow !== false;
  const confidenceBadge = settings?.confidenceBadge || "Why Choose Arabic Juniors?";
  const confidenceHeading = settings?.confidenceHeading || "Build Confidence.\nImprove Communication.";
  const confidenceDescription = settings?.confidenceDescription || "Our teaching approach focuses on real life communication rather than memorization. We help students improve speaking, reading, writing and listening through interactive lessons and customized Arabic study plans.";
  const confidenceCards = settings?.confidenceCards && settings.confidenceCards.length > 0 ? settings.confidenceCards : localConfidenceCards;

  const curriculumFlexShow = settings?.curriculumFlexShow !== false;
  const curriculumBadge = settings?.curriculumBadge || "UAE School Curriculum Expert";
  const curriculumHeading = settings?.curriculumHeading || "Aligned with UAE\nSchool Curriculum";
  const curriculumDescription = settings?.curriculumDescription || "We specialize in Arabic for UAE schools (MOE Curriculum) and also support students from CBSE, British, IB and American Curriculums.";
  const curriculumBadgesList = settings?.curriculumBadgesList && settings.curriculumBadgesList.length > 0 ? settings.curriculumBadgesList : localCurriculumBadges;
  const curriculumChecklist = settings?.curriculumChecklist && settings.curriculumChecklist.length > 0 ? settings.curriculumChecklist : localCurriculumChecklist;

  const flexibleBadge = settings?.flexibleBadge || "Flexible Learning";
  const flexibleHeading = settings?.flexibleHeading || "Learn Anytime, Anywhere";
  const flexibleDescription = settings?.flexibleDescription || "Our online Arabic classes are designed to fit your schedule. That's why we offer flexible learning options that make it easy to learn from your home and at your pace.";
  const flexibleFeatures = settings?.flexibleFeatures && settings.flexibleFeatures.length > 0 ? settings.flexibleFeatures : localFlexibleFeatures;
  const flexibleImageUrl = settings?.flexibleImageUrl || "/online_learning_girl.jpg";

  const moreAboutShow = settings?.moreAboutShow !== false;
  const moreAboutHeading = settings?.moreAboutHeading || "More About Arabic Juniors";
  const moreAboutFeatures = settings?.moreAboutFeatures && settings.moreAboutFeatures.length > 0 ? settings.moreAboutFeatures : localMoreAboutFeatures;
  const testimonialsHeading = settings?.testimonialsHeading || "What Parents Say About";
  const testimonialsHeadingHighlight = settings?.testimonialsHeadingHighlight || "Arabic Juniors";
  const testimonialsList = settings?.testimonialsList && settings.testimonialsList.length > 0 ? settings.testimonialsList : localTestimonialsList;

  const whySubheader = settings?.whySubheader || "Why Take a Trial?";
  const whyHeading = settings?.whyHeading || "Before You Enrol, See How Your Child Learns";
  const whyDescription = settings?.whyDescription || "Our trial class gives both parents and students an opportunity to experience our teaching approach before committing to a course.";
  const whyCards = settings?.whyCards || localWhyTakeTrialItems;

  const processSubheader = settings?.processSubheader || "What Happens During The Trial?";
  const processHeading = settings?.processHeading || "A Simple 4-Step Process";

  const assessSubheader = settings?.assessSubheader || "What Do We Assess?";
  const assessTitle = settings?.assessTitle || "A Trial Designed Around Your Child";
  const assessDescription = settings?.assessDescription || "We evaluate important Arabic skills to understand your child's current level.";
  const assessSkills = settings?.assessSkills || localChildAssessSkills;

  const curriculaSubheader = settings?.curriculaSubheader || "Arabic Support For UAE Curricula";
  const curriculaTitle = settings?.curriculaTitle || "We Support All Major UAE School Curricula";
  const curriculaDescription = settings?.curriculaDescription || "We tailor our classes to match your child's school requirements.";
  const curriculaBadges = settings?.curriculaBadges || ["UAE MOE", "CBSE", "British", "IB", "American"];
  const curriculaImageUrl = settings?.curriculaImageUrl || "/dubai-skyline.png";

  const chooseSubheader = settings?.chooseSubheader || "Why Parents Choose Our Trial";
  const chooseHeading = settings?.chooseHeading || "More Than Just a Demo Class";
  const chooseCards = settings?.chooseCards || localParentChooseCards;

  const onboardingSubheader = settings?.onboardingSubheader || "How It Works";
  const onboardingHeading = settings?.onboardingHeading || "Getting Started Is Easy";
  const onboardingSteps = settings?.onboardingSteps || localGettingStartedSteps;

  const suitabilitySubheader = settings?.suitabilitySubheader || "Who Is The Trial For?";
  const suitabilityTitle = settings?.suitabilityTitle || "Is This Right for Your Child?";
  const suitabilityDescription = settings?.suitabilityDescription || "Our trial class is ideal for UAE school students who:";
  const suitabilityBullets = settings?.suitabilityBullets || localChildRightBullets;
  const suitabilityImageUrl = settings?.suitabilityImageUrl || "/arabic-studies.png";

  const faqSubheader = settings?.faqSubheader || "Frequently Asked Questions";
  const faqTitle = settings?.faqTitle || "Frequently Asked Questions";
  const faqItems = settings?.faqItems || localFaqItems;

  const ctaHeading = settings?.ctaHeading || "Ready to See Your Child Grow in Arabic?";
  const ctaDescription = settings?.ctaDescription || "Give your child the opportunity to experience a personalized Arabic lesson with an experienced teacher.";
  const ctaButtonText = settings?.ctaButtonText || "Book a Free Trial Class Today";
  const ctaSubtext = settings?.ctaSubtext || "No long-term commitment. Discover the right learning approach for your child.";
  const ctaImageUrl = settings?.ctaImageUrl || "/female-teacher.png";

  return (
    <div className="min-h-screen bg-[#fffdfb] pb-0 font-sans">
      
      {/* Structured Data (JSON-LD) for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": settings?.metaTitle || "Free 1-on-1 Online Arabic Trial Class for UAE School Students",
              "description": settings?.metaDescription || "Interactive online Arabic trial class for UAE school children (KG to Grade 6). Aligned with UAE MOE, British, CBSE, IB, and American school curriculums.",
              "provider": {
                "@type": "EducationalOrganization",
                "name": "Arabic Juniors",
                "sameAs": "https://arabicjuniors.com"
              },
              "offers": {
                "@type": "Offer",
                "category": "FreeTrial",
                "price": "0",
                "priceCurrency": "AED",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "350",
                "bestRating": "5"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map((item: any) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://arabicjuniors.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Free Trial Class",
                  "item": `https://arabicjuniors.com/${slugParam}`
                }
              ]
            }
          ])
        }}
      />
      
      {/* 1. First Section: Hero
          Follows the approved mockup: a frameless cut-out subject resting on a
          soft blue blob, with Arabic letters floating around it. No card, no
          border, no drop shadow — the artwork sits directly on the page. */}
      <section className="pt-8 pb-[16px] md:pt-12 md:pb-[24px] lg:pt-16 lg:pb-[24px] relative overflow-hidden bg-white min-h-[500px] lg:min-h-[560px] flex items-center">
        
        {/* Desktop Image anchored flush to absolute right-0 top-0 bottom-0 with ZERO right space */}
        <Reveal variant="focus" delay={150} className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%] xl:w-[54%] z-0 pointer-events-none select-none">
          <Image
            src="/hero-student-new.jpg"
            alt="Smiling student learning Arabic online"
            fill
            className="object-cover object-left-center scale-[1.02] origin-right"
            priority
          />
        </Reveal>

        <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-32 mx-auto max-w-[1880px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 z-10">

              {/* Blue Badge with hover styling & pulsing icon */}
              <Reveal variant="down">
                <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0B46AD] to-[#1E62EC] text-white px-4 py-2 rounded-full text-[12.5px] sm:text-[13px] font-black uppercase tracking-[0.14em] shadow-sm border border-blue-400/20 hover:scale-[1.02] transition-transform duration-300 select-none">
                  <Gift size={15} className="text-[#FFC72C] fill-[#FFC72C] shrink-0 animate-pulse" />
                  {heroBadgeText}
                </div>
              </Reveal>

              {/* Headings */}
              <Reveal variant="up" delay={60} className="space-y-2">
                <h1 className="text-[38px] sm:text-[46px] lg:text-[52px] xl:text-[56px] font-black text-black leading-[1.06] tracking-[-0.025em]">
                  {heroHeading}<br />
                  <span className="bg-gradient-to-r from-[#FB6238] to-[#FF8159] bg-clip-text text-transparent">{heroHeadingHighlight}</span> Potential
                </h1>
                <h3 className="text-[22px] md:text-[27px] lg:text-[29px] font-bold text-[#FB6238] leading-snug">
                  {heroSubheading}
                </h3>
              </Reveal>

              {/* Description Paragraphs */}
              <Reveal variant="up" delay={120} className="text-slate-600 text-[16px] sm:text-[17px] leading-[1.65] space-y-3 max-w-[40rem] font-medium">
                {heroDescription1 && <p>{heroDescription1}</p>}
                {heroDescription2 && <p>{heroDescription2}</p>}
              </Reveal>

              {/* 2x2 Feature Checkmarks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[40rem] pt-1">
                {heroBullets.map((bullet: string, index: number) => (
                  <Reveal key={index} variant="up" index={index} step={60}>
                    <div className="flex items-center gap-3 p-2.5 px-3.5 rounded-2xl bg-white/80 border border-[#f0e6de] hover:border-[#FB6238]/40 hover:shadow-sm transition-all duration-200 group/item shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                      <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-tr from-[#0B46AD] to-[#3B82F6] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(59,130,246,0.35)] group-hover/item:scale-110 transition-transform duration-200">
                        <svg className="w-[13px] h-[13px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] sm:text-[15.5px] font-bold text-neutral-800 group-hover/item:text-neutral-900 transition-colors duration-150">{bullet}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* CTA Button & Grade Subtext */}
              <Reveal variant="up" delay={200} className="space-y-3 pt-2">
                <Button
                  suppressHydrationWarning
                  onClick={handleBookClick}
                  className="hover-shine group w-full sm:w-auto h-[56px] px-9 bg-gradient-to-r from-[#FB6238] via-[#FF6E48] to-[#FF8159] hover:from-[#E04E26] hover:to-[#FB6238] text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_28px_rgba(251,98,56,0.35)] hover:shadow-[0_14px_36px_rgba(251,98,56,0.48)] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 transition-all duration-300 text-[16.5px]"
                >
                  {heroCtaText}
                  <ArrowRight size={19} className="group-hover:translate-x-1.5 transition-transform duration-300 stroke-[2.5]" />
                </Button>
                <p className="text-[14px] font-bold text-neutral-500/90 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {heroCtaSubtext}
                </p>
              </Reveal>

            </div>

            {/* Mobile/Tablet Artwork Column */}
            <Reveal variant="focus" delay={150} className="lg:hidden relative w-full h-[360px] sm:h-[440px] select-none overflow-hidden">
              <Image
                src="/hero-student-new.jpg"
                alt="Smiling student learning Arabic online"
                fill
                className="object-cover object-right-bottom scale-[1.05] origin-right"
                priority
              />
            </Reveal>

          </div>
        </div>
      </section>

      {/* Stats Bar Section (Social Proof) */}
      {statsShow && (
        <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
          <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
            <Reveal variant="rise" className="bg-white border border-[#EBE3DC] rounded-[24px] p-6 sm:p-8 md:p-9 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_36px_-6px_rgba(251,98,56,0.06)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-neutral-200/70">
                {statsItems.map((stat: any, index: number) => {
                  const StatIcon = getIconComponent(stat.icon);
                  const paddingClass = index === 0 ? "lg:pr-8" : index === 3 ? "lg:pl-8" : "lg:px-8";
                  return (
                    <Reveal key={index} variant="up" index={index} step={80} className={`flex flex-col justify-start group cursor-default transition-all duration-300 hover:-translate-y-0.5 ${paddingClass}`}>
                      {/* Top Row: Icon + Value & Label */}
                      <div className="flex items-center gap-4 mb-2">
                        <div 
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: stat.bgColor || '#FFF2EE' }}
                        >
                          <StatIcon size={28} style={{ color: stat.color || '#FB6238' }} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <CountUp
                            value={stat.value}
                            className="text-[26px] sm:text-[28px] lg:text-[32px] font-black leading-none block font-sans tracking-tight"
                            style={{ color: stat.color || '#FB6238' }}
                          />
                          <h4 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#08265c] leading-tight mt-1.5 font-sans group-hover:text-[#FB6238] transition-colors">
                            {stat.label}
                          </h4>
                        </div>
                      </div>

                      {/* Accent Underline Dash */}
                      <div 
                        className="w-7 h-[3px] rounded-full mt-1.5 mb-3 shrink-0 transition-all duration-300 group-hover:w-12" 
                        style={{ backgroundColor: stat.color || '#FB6238' }}
                      />

                      {/* Description */}
                      <p className="text-[13.5px] sm:text-[14px] font-medium leading-[1.6] text-slate-600 font-sans">
                        {stat.desc}
                      </p>
                    </Reveal>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Build Confidence & Improve Communication Section */}
      {confidenceShow && (
        <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
          <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-4.5 items-stretch">
              
              {/* Left Card: Info & Title Box */}
              <Reveal variant="left" className="lg:col-span-4 h-full">
                <div className="h-full flex flex-col justify-center p-6 sm:p-8 bg-gradient-to-br from-white to-[#FFFDFB] border border-[#EBE3DC] rounded-[24px] shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)]">
                  {confidenceBadge && (
                    <div className="inline-flex items-center self-start bg-gradient-to-r from-[#FFF5F1] to-[#FFF0EA] text-[#FB6238] border border-[#FFD0BD] px-4 py-1.5 rounded-full text-[12px] sm:text-[12.5px] font-extrabold tracking-wide mb-3 shadow-[0_2px_8px_rgba(251,98,56,0.08)]">
                      {confidenceBadge}
                    </div>
                  )}
                  <h2 className="text-[26px] sm:text-[30px] lg:text-[32px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] mb-3 whitespace-pre-line font-sans">
                    {confidenceHeading}
                  </h2>
                  <p className="text-[14px] sm:text-[14.5px] font-medium leading-[1.6] text-slate-600 font-sans">
                    {confidenceDescription}
                  </p>
                </div>
              </Reveal>

              {/* 4 Skill Cards on the Right */}
              {confidenceCards.map((card: any, idx: number) => {
                const CardIcon = getIconComponent(card.icon);
                return (
                  <Reveal key={idx} variant="right" index={idx} step={70} className="lg:col-span-2 h-full">
                    <div
                      className="group h-full flex flex-col items-center text-center p-6 bg-white border border-[#EBE3DC] rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.12)] hover:-translate-y-1.5 transition-all duration-300 min-h-[220px] relative overflow-hidden"
                    >
                      {/* Top colored accent strip */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-70 group-hover:opacity-100 transition-opacity" 
                        style={{ backgroundColor: card.color || '#FB6238' }} 
                      />

                      {/* Circle Icon */}
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3.5 shadow-[0_3px_10px_rgba(0,0,0,0.03)] shrink-0 transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: card.bgColor || "#FFF2EE" }}
                      >
                        <CardIcon size={28} style={{ color: card.color || "#FB6238" }} />
                      </div>

                      {/* Arabic Word */}
                      <span
                        className="text-[20px] sm:text-[22px] font-bold block mb-0.5 leading-tight font-serif tracking-wide transition-transform duration-300 group-hover:scale-105"
                        style={{ color: card.color || "#FB6238" }}
                      >
                        {card.arabicWord}
                      </span>

                      {/* English Label */}
                      <h4 className="text-[16px] sm:text-[17px] font-black text-[#08265c] leading-tight mb-2 font-sans group-hover:text-[#FB6238] transition-colors">
                        {card.englishLabel}
                      </h4>

                      {/* Description */}
                      <p className="text-[13px] sm:text-[13.5px] font-medium leading-[1.5] text-slate-600 font-sans">
                        {card.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}

            </div>
          </div>
        </section>
      )}

      {/* Curriculum & Flexible Learning Section */}
      {curriculumFlexShow && (
        <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
          <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Double Card: UAE Curriculum (col 1) + Flexible Learning (col 2) */}
              <Reveal variant="left" className="lg:col-span-8 h-full">
                <div className="h-full bg-white border border-[#EBE3DC] rounded-[24px] p-6 sm:p-8 md:p-9 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative">
                  
                  {/* Column 1: UAE School Curriculum */}
                  <div className="flex flex-col justify-between md:pr-4">
                    <div>
                      {curriculumBadge && (
                        <div className="inline-flex items-center self-start bg-gradient-to-r from-[#FFF5F1] to-[#FFF0EA] text-[#FB6238] border border-[#FFD0BD] px-4 py-1.5 rounded-full text-[12px] sm:text-[12.5px] font-extrabold tracking-wide mb-3 shadow-[0_2px_8px_rgba(251,98,56,0.08)]">
                          {curriculumBadge}
                        </div>
                      )}
                      <h2 className="text-[24px] sm:text-[28px] font-bold text-[#08265c] leading-[1.18] tracking-[-0.4px] mb-3 whitespace-pre-line font-sans">
                        {curriculumHeading}
                      </h2>
                      <p className="text-[13.5px] sm:text-[14px] font-medium leading-[1.55] text-slate-600 mb-5 font-sans">
                        {curriculumDescription}
                      </p>

                      {/* Curricula Circular Badges Row */}
                      <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-6 py-2 px-1">
                        {curriculumBadgesList.map((badge: any, bIdx: number) => {
                          const bName = typeof badge === "string" ? badge : badge.name;
                          return (
                            <div key={bIdx} className="flex flex-col items-center text-center gap-1.5 group cursor-default">
                              <div className="transition-transform duration-200 group-hover:scale-110">
                                {renderCurriculumBadgeIcon(bName)}
                              </div>
                              <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-700 leading-tight">
                                {bName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Checklist Items */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100/90">
                      {curriculumChecklist.map((item: string, cIdx: number) => (
                        <div key={cIdx} className="flex items-start gap-2.5 p-1 rounded-lg hover:bg-slate-50/60 transition-colors">
                          <CheckCircle2 size={17} className="text-[#FB6238] shrink-0 mt-0.5" />
                          <span className="text-[13px] sm:text-[13.5px] font-semibold text-slate-700 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vertical Divider for desktop */}
                  <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#E8DFD7] to-transparent -translate-x-1/2" />

                  {/* Column 2: Flexible Learning */}
                  <div className="flex flex-col justify-between md:pl-4">
                    <div>
                      {flexibleBadge && (
                        <div className="inline-flex items-center self-start bg-gradient-to-r from-[#FFF5F1] to-[#FFF0EA] text-[#FB6238] border border-[#FFD0BD] px-4 py-1.5 rounded-full text-[12px] sm:text-[12.5px] font-extrabold tracking-wide mb-3 shadow-[0_2px_8px_rgba(251,98,56,0.08)]">
                          {flexibleBadge}
                        </div>
                      )}
                      <h2 className="text-[24px] sm:text-[28px] font-bold text-[#08265c] leading-[1.18] tracking-[-0.4px] mb-3 whitespace-pre-line font-sans">
                        {flexibleHeading}
                      </h2>
                      <p className="text-[13.5px] sm:text-[14px] font-medium leading-[1.55] text-slate-600 mb-5 font-sans">
                        {flexibleDescription}
                      </p>
                    </div>

                    {/* 4 Feature Rows */}
                    <div className="space-y-3">
                      {flexibleFeatures.map((feat: any, fIdx: number) => {
                        const FeatIcon = getIconComponent(feat.icon);
                        return (
                          <div
                            key={fIdx}
                            className="bg-white border border-[#EBE3DC] rounded-[16px] p-3 sm:p-3.5 flex items-center gap-3.5 hover:border-[#FB6238]/40 hover:shadow-sm hover:translate-x-0.5 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                          >
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                              style={{ backgroundColor: feat.bgColor || "#FFF2EE" }}
                            >
                              <FeatIcon size={22} style={{ color: feat.color || "#FB6238" }} />
                            </div>
                            <div>
                              <h4 className="text-[14px] sm:text-[14.5px] font-bold text-[#08265c] leading-snug">
                                {feat.title}
                              </h4>
                              <p className="text-[12px] sm:text-[12.5px] font-medium text-slate-500 leading-tight mt-0.5">
                                {feat.subtext}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </Reveal>

              {/* Right Card: Online Learning Girl with Speech Bubble */}
              <Reveal variant="right" delay={120} className="lg:col-span-4 h-full">
                <div className="h-full bg-gradient-to-b from-[#FFFDFB] to-white border border-[#EBE3DC] rounded-[24px] p-5 sm:p-6 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] lg:min-h-[440px]">
                  
                  {/* Floating Speech Bubble with Arabic Letters */}
                  <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md border border-[#E2E8F0] px-4 py-2 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center gap-2.5 select-none animate-float-slow">
                    <span className="text-[22px] font-black text-[#FB6238] font-serif leading-none">أ</span>
                    <span className="text-[22px] font-black text-[#7C3AED] font-serif leading-none">ب</span>
                    <span className="text-[22px] font-black text-[#0062FC] font-serif leading-none">ت</span>
                  </div>

                  {/* Student Artwork */}
                  <div className="relative w-full h-full min-h-[340px] flex items-center justify-center">
                    <Image
                      src={flexibleImageUrl || "/online_learning_girl.jpg"}
                      alt="Online Arabic Student"
                      fill
                      className="object-contain object-center rounded-xl"
                      priority
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
      )}

      {/* 2. Second Section: Why Take a Trial? */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <div className="w-[90%] max-w-[1250px] mx-auto p-6 sm:p-8 md:p-10 bg-white border border-[#EBE3DC] rounded-[24px] shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] relative z-10">
          
          {/* Top Label & Headings */}
          <Reveal variant="up" className="space-y-2 mb-6">
            <div className="text-[13px] sm:text-[14px] font-black text-[#FB6238] uppercase tracking-[0.08em] font-sans flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FB6238]" />
              {whySubheader}
            </div>

            <h2 className="text-[28px] md:text-[34px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] whitespace-pre-line font-sans">
              {whyHeading}
            </h2>

            <p className="text-[15px] sm:text-[16px] font-medium leading-[1.6] text-slate-600 max-w-[46rem] font-sans">
              {whyDescription}
            </p>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {whyCards.map((card: any, index: number) => {
              const CardIcon = getIconComponent(card.icon);
              return (
                <Reveal key={index} variant="up" index={index} step={80} className="h-full">
                  <div 
                    className="group h-full bg-white border border-[#EBE3DC] rounded-[22px] min-h-[250px] p-6 text-center flex flex-col items-center justify-start hover:-translate-y-1.5 hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.12)] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                  >
                    {/* Icon Circle */}
                    <div className={`w-[72px] h-[72px] rounded-2xl ${card.bgColor || 'bg-[#FFF5F1]'} border ${card.borderColor || 'border-[#FFD0BD]'} ${card.iconColor || 'text-[#FB6238]'} flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(0,0,0,0.03)] shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                      <CardIcon size={34} />
                    </div>

                    {/* Card Title */}
                    <h4 className="text-[17.5px] sm:text-[18px] font-bold leading-snug mb-2 font-sans text-center group-hover:text-[#FB6238] transition-colors">
                      <span className={card.titleColor || 'text-[#08265c]'}>{card.title}</span>
                    </h4>

                    {/* Card Description */}
                    <p className="text-[14px] sm:text-[14.5px] font-medium leading-[1.55] text-slate-600 font-sans text-center">
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Third Section: A Simple 4-Step Process */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
          
          {/* Header Description */}
          <Reveal variant="up" className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-[13px] sm:text-[14px] font-black tracking-[0.08em] text-[#FB6238] uppercase font-sans inline-block">
              {processSubheader}
            </span>
            <h2 className="text-[28px] md:text-[34px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] font-sans">
              {processHeading}
            </h2>
          </Reveal>

          {/* Steps Timeline Box */}
          <Reveal variant="rise" className="bg-white border border-[#EBE3DC] rounded-[24px] p-[0px_24px_36px] shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] relative z-10">
            
            {/* Horizontal Timeline Connector (Desktop only) */}
            <div className="absolute top-0 left-[12.5%] right-[12.5%] w-[75%] h-[3px] hidden lg:block bg-gradient-to-r from-[#0B46AD] via-[#FB6238] to-[#9333EA] -z-10 shadow-sm" />
            
            {/* Intermediate Concentric Connection Loops */}
            <div className="absolute top-0 left-[25%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#FB6238] bg-white hidden lg:flex items-center justify-center shadow-sm z-30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0B46AD]" />
            </div>
            <div className="absolute top-0 left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#FFA800] bg-white hidden lg:flex items-center justify-center shadow-sm z-30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FB6238]" />
            </div>
            <div className="absolute top-0 left-[75%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#9333EA] bg-white hidden lg:flex items-center justify-center shadow-sm z-30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFA800]" />
            </div>

            {/* Steps Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-neutral-200/80">
              {processSteps.map((step, index) => {
                return (
                  <Reveal key={index} variant="up" index={index} step={90} className="flex flex-col items-center text-center relative pt-12 pb-4 px-4 min-h-[330px] group cursor-pointer">
                    
                    {/* Number Badge */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] rounded-2xl ${step.numBg} text-white font-black flex items-center justify-center text-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] shrink-0 ring-4 ring-white z-20 transition-all duration-300 group-hover:scale-110`}>
                      {step.num}
                    </div>

                    {/* Step Title */}
                    <h4 className="text-[17.5px] sm:text-[18px] font-bold text-[#08265c] mb-2 mt-4 text-center font-sans">
                      {step.title}
                    </h4>

                    {/* Step Description */}
                    <p className="text-[14.5px] sm:text-[15px] font-medium leading-[1.55] text-slate-600 mb-6 text-center max-w-[240px] font-sans">
                      {step.description}
                    </p>

                    {/* Illustration at the bottom */}
                    <div className="mt-auto w-24 h-24 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                      {step.illustration}
                    </div>

                  </Reveal>
                );
              })}
            </div>

          </Reveal>

        </div>
      </section>

      {/* 4. Fourth Section: Side-by-Side Dual Values (Assessments & Curricula) */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Left Card: A Trial Designed Around Your Child */}
            <Reveal variant="left" className="h-full">
              <div className="h-full border border-[#EBE3DC] rounded-[24px] p-7 md:p-10 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] bg-white hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.1)] transition-all duration-300">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Side: Header Text */}
                  <div className="lg:col-span-6 space-y-2 text-left lg:max-w-[320px]">
                    <span className="text-[13px] sm:text-[14px] font-black tracking-[0.08em] text-[#FB6238] uppercase font-sans inline-block">
                      {assessSubheader}
                    </span>
                    <h3 className="text-[24px] md:text-[28px] font-bold text-[#08265c] leading-tight font-sans">
                      {assessTitle}
                    </h3>
                    <p className="text-slate-600 text-[14px] leading-relaxed font-medium font-sans">
                      {assessDescription}
                    </p>
                  </div>

                  {/* Right Side: Radial Skills Diagram */}
                  <div className="lg:col-span-6 relative w-[420px] h-[390px] mx-auto lg:mx-0 lg:-ml-40 flex items-center justify-center scale-90 sm:scale-100 lg:scale-[0.92] xl:scale-[0.98] 2xl:scale-100 origin-center py-4 lg:mt-24 shrink-0">
                    {/* Center Hub */}
                    <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-[#fffdfb] bg-white shadow-[0_4px_16px_rgba(8,38,92,0.08)] flex flex-col items-center justify-center z-10 text-center select-none pointer-events-none">
                      <span className="text-[11px] sm:text-[13px] font-black text-[#08265c] uppercase leading-tight max-w-[60px] tracking-wide">YOUR CHILD</span>
                    </div>

                    {/* Connecting Vector Lines */}
                    <svg className="absolute inset-0 w-full h-full text-slate-200/80 -z-0 pointer-events-none" viewBox="0 0 100 100">
                      <line x1="50" y1="50" x2="50" y2="12" stroke="#15803d" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="50" y1="50" x2="85" y2="30" stroke="#c2410c" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="50" y1="50" x2="85" y2="70" stroke="#be123c" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="50" y1="50" x2="50" y2="88" stroke="#0f172a" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="50" y1="50" x2="15" y2="70" stroke="#1d4ed8" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="50" y1="50" x2="15" y2="30" stroke="#e11d48" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                    </svg>

                    {/* Hub 1: Reading (Top) */}
                    <div className="absolute top-[0%] left-1/2 -translate-x-1/2 w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-[#00A389]/40 bg-white shadow-sm flex flex-col items-center justify-center p-1.5 px-3 text-center">
                      <svg className="w-9 h-9 sm:w-[38px] sm:h-[38px] mb-0.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="6" width="24" height="20" rx="3" fill="#e8f8f2" stroke="#15803d" strokeWidth="2" />
                        <path d="M16 6v20" stroke="#15803d" strokeWidth="1.5" strokeDasharray="2 2" />
                        <circle cx="10" cy="12" r="2" fill="#15803d" />
                        <line x1="14" y1="12" x2="22" y2="12" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="10" cy="18" r="2" fill="#15803d" />
                        <line x1="14" y1="18" x2="20" y2="18" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
                        <path d="M24 16l2 2 4-4" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[12.5px] sm:text-[14px] font-black text-[#15803d] leading-tight">Reading</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-[1.25] mt-0.5 select-none">Ability to read words & sentences</span>
                    </div>

                    {/* Hub 2: Writing (Top Right) */}
                    <div className="absolute top-[18%] right-[0%] w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-[#f97316]/40 bg-white shadow-sm flex flex-col items-center justify-center p-1.5 px-3 text-center">
                      <svg className="w-9 h-9 sm:w-[38px] sm:h-[38px] mb-0.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
                        <path d="M12 20h8" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 16l3-7 3 7H13z" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M22 10l-3 3" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[12.5px] sm:text-[14px] font-black text-[#c2410c] leading-tight">Writing</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-[1.25] mt-0.5 select-none">Letter & word formation</span>
                    </div>

                    {/* Hub 3: Speaking (Bottom Right) */}
                    <div className="absolute bottom-[18%] right-[0%] w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-[#ef4444]/40 bg-white shadow-sm flex flex-col items-center justify-center p-1.5 px-3 text-center">
                      <svg className="w-9 h-9 sm:w-[38px] sm:h-[38px] mb-0.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#fff5f5" stroke="#e11d48" strokeWidth="2" />
                        <path d="M12 18c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                        <path d="M17 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#e11d48" />
                        <path d="M24 14c1 0 2 1 2 2s-1 2-2 2" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[12.5px] sm:text-[14px] font-black text-[#be123c] leading-tight">Speaking</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-[1.25] mt-0.5 select-none">Confidence in communication</span>
                    </div>

                    {/* Hub 4: Vocabulary (Bottom) */}
                    <div className="absolute bottom-[0%] left-1/2 -translate-x-1/2 w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-[#0f172a]/20 bg-white shadow-sm flex flex-col items-center justify-center p-1.5 px-3 text-center">
                      <svg className="w-9 h-9 sm:w-[38px] sm:h-[38px] mb-0.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="6" width="20" height="20" rx="3" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                        <rect x="10" y="10" width="12" height="12" rx="1.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
                        <path d="M13 14h6M13 18h4" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[12.5px] sm:text-[14px] font-black text-[#0f172a] leading-tight">Vocabulary</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-[1.25] mt-0.5 select-none">Words & expressions</span>
                    </div>

                    {/* Hub 5: Listening (Bottom Left) */}
                    <div className="absolute bottom-[18%] left-[0%] w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-[#3b82f6]/40 bg-white shadow-sm flex flex-col items-center justify-center p-1.5 px-3 text-center">
                      <svg className="w-9 h-9 sm:w-[38px] sm:h-[38px] mb-0.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
                        <path d="M10 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                        <rect x="8" y="15" width="4" height="6" rx="1.5" fill="#2563eb" />
                        <rect x="20" y="15" width="4" height="6" rx="1.5" fill="#2563eb" />
                      </svg>
                      <span className="text-[12.5px] sm:text-[14px] font-black text-[#1d4ed8] leading-tight">Listening</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-[1.25] mt-0.5 select-none">Understanding spoken Arabic</span>
                    </div>

                    {/* Hub 6: Grammar (Top Left) */}
                    <div className="absolute top-[18%] left-[0%] w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full border border-[#ec4899]/40 bg-white shadow-sm flex flex-col items-center justify-center p-1.5 px-3 text-center">
                      <svg className="w-9 h-9 sm:w-[38px] sm:h-[38px] mb-0.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
                        <path d="M11 13h10M11 17h10M11 21h6" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />
                        <rect x="17" y="19" width="4" height="4" rx="1" fill="#db2777" />
                      </svg>
                      <span className="text-[12.5px] sm:text-[14px] font-black text-[#e11d48] leading-tight">Grammar</span>
                      <span className="text-[10px] sm:text-[11px] text-slate-700 font-bold leading-[1.25] mt-0.5 select-none">Sentence structures</span>
                    </div>
                  </div>

                </div>
              </div>
            </Reveal>

            {/* Right Card: We Support All Major UAE School Curricula */}
            <Reveal variant="right" className="h-full">
              <div className="h-full border border-[#EBE3DC] rounded-[24px] p-7 md:p-10 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] flex flex-col justify-between bg-white hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.1)] transition-all duration-300 relative overflow-hidden min-h-[460px]">
                
                {/* Top Header & Badges Container */}
                <div className="space-y-5 z-10 relative">
                  {/* Card Header */}
                  <div className="space-y-2">
                    <span className="text-[13px] sm:text-[14px] font-black tracking-[0.08em] text-[#FB6238] uppercase font-sans inline-block">
                      {curriculaSubheader}
                    </span>
                    <h3 className="text-[24px] md:text-[28px] font-bold text-[#08265c] leading-tight font-sans">
                      {curriculaTitle}
                    </h3>
                    <p className="text-slate-600 text-[14px] leading-relaxed font-medium font-sans">
                      {curriculaDescription}
                    </p>
                  </div>

                  {/* Curriculum Badges Row */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 md:gap-3 pt-1">
                    {curriculaBadges.map((badge: string, idx: number) => {
                      const badgeBgs = ["bg-[#0B46AD]", "bg-[#FB6238]", "bg-[#0062FC]", "bg-[#7C3AED]", "bg-[#EF4444]"];
                      const selectedBg = badgeBgs[idx % badgeBgs.length];
                      return (
                        <span 
                          key={idx} 
                          className={`px-5 py-2.5 md:px-6 md:py-2.5 ${selectedBg} text-white text-[14px] md:text-[15px] font-bold rounded-2xl tracking-normal shadow-sm hover:scale-105 transition-all duration-300 select-none cursor-default shrink-0`}
                        >
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Dubai Skyline Image Illustration locked to absolute bottom */}
                <div className="absolute bottom-0 left-0 right-0 w-full select-none pointer-events-none z-0 h-[220px] md:h-[260px] overflow-hidden">
                  <Image
                    src={curriculaImageUrl}
                    alt="Dubai Skyline Illustration"
                    fill
                    className="object-cover object-bottom scale-[1.05] origin-bottom"
                    priority
                  />
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 5. Fifth Section: More Than Just a Demo Class (6 Value Cards Grid) */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <div className="w-[90%] max-w-[1250px] mx-auto p-6 sm:p-8 md:p-10 bg-white border border-[#EBE3DC] rounded-[24px] shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] relative z-10">
          
          {/* Top Label & Main Heading */}
          <Reveal variant="up" className="text-center mb-8">
            <div className="text-[13px] sm:text-[14px] font-black text-[#FB6238] uppercase tracking-[0.08em] mb-2 font-sans">
              {chooseSubheader}
            </div>

            <h2 className="text-[28px] md:text-[34px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] font-sans">
              {chooseHeading}
            </h2>
          </Reveal>

          {/* Cards 6-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {chooseCards.map((card: any, index: number) => {
              const CardIcon = getIconComponent(card.icon);
              return (
                <Reveal key={index} variant="up" index={index} step={60} className="h-full">
                  <div 
                    className="group h-full bg-gradient-to-b from-[#FFFDFB] to-white border border-[#EBE3DC] rounded-[22px] p-5 text-center flex flex-col items-center justify-start min-h-[270px] hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.12)] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    {/* Icon Circle */}
                    <div className={`w-[64px] h-[64px] rounded-2xl ${card.bgColor || 'bg-[#FFF5F1]'} border ${card.borderColor || 'border-[#FFD0BD]'} ${card.iconColor || 'text-[#FB6238]'} flex items-center justify-center mb-4 shadow-[0_4px_14px_rgba(0,0,0,0.03)] shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                      <CardIcon size={32} />
                    </div>

                    {/* Card Title */}
                    <h4 className="text-[17px] sm:text-[18px] font-bold text-[#08265c] leading-snug mb-2 font-sans text-center group-hover:text-[#FB6238] transition-colors">
                      {card.title}
                    </h4>

                    {/* Card Description / Subheading */}
                    <p className="text-[13.5px] sm:text-[14px] text-slate-600 leading-[1.55] font-medium font-sans text-center">
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Sixth Section: Getting Started Is Easy (4-Step Onboarding Timeline) */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <div className="w-[90%] max-w-[1250px] mx-auto p-6 sm:p-8 md:p-10 bg-white border border-[#EBE3DC] rounded-[24px] shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] relative z-10">
          
          {/* Header Description */}
          <Reveal variant="up" className="text-center max-w-3xl mx-auto mb-8">
            <div className="text-[13px] sm:text-[14px] font-black tracking-[0.08em] text-[#FB6238] uppercase mb-1.5 font-sans">
              {onboardingSubheader}
            </div>
            <h2 className="text-[28px] md:text-[34px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] font-sans">
              {onboardingHeading}
            </h2>
          </Reveal>

          {/* 4 Steps Row with Arrow Connectors */}
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4 lg:gap-3 max-w-full mx-auto">
            {onboardingSteps.map((step: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  
                  {/* Step Card */}
                  <Reveal variant="up" index={index} step={80} className="flex-1 w-full h-full">
                    <div className="group h-full bg-white border border-[#EBE3DC] rounded-[22px] p-6 text-center flex flex-col items-center justify-start min-h-[220px] hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.12)] hover:-translate-y-1.5 transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                      
                      {/* Circle Badge */}
                      <div className={`w-12 h-12 rounded-2xl ${step.numBg || 'bg-[#0B46AD]'} text-white font-black flex items-center justify-center text-[18px] shadow-[0_4px_12px_rgba(11,70,173,0.25)] shrink-0 mb-4 transition-transform duration-300 group-hover:scale-110`}>
                        {step.num}
                      </div>

                      {/* Step Title & Description */}
                      <div className="space-y-2">
                        <h4 className="text-[17px] sm:text-[18px] font-bold text-[#08265c] leading-snug font-sans text-center group-hover:text-[#FB6238] transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-[14px] sm:text-[14.5px] font-medium text-slate-600 leading-[1.55] font-sans text-center">
                          {step.desc}
                        </p>
                      </div>

                    </div>
                  </Reveal>

                  {/* Connecting Arrow */}
                  {index < onboardingSteps.length - 1 && (
                    <div className="text-[#FB6238] shrink-0 my-3 lg:my-0 flex items-center justify-center px-1">
                      <ArrowRight size={22} className="hidden lg:block stroke-[2.5]" />
                      <svg className="w-6 h-6 lg:hidden animate-bounce text-[#FB6238]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
                      </svg>
                    </div>
                  )}

                </React.Fragment>
              );
            })}
          </div>

        </div>
      </section>

      {/* More About Arabic Juniors & What Parents Say Section */}
      {moreAboutShow && (
        <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
          <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
            
            {/* Section Centered Heading */}
            <Reveal variant="up">
              <h2 className="text-center text-[28px] sm:text-[34px] font-bold text-[#08265c] leading-tight mb-8 sm:mb-10 tracking-[-0.5px] font-sans">
                {moreAboutHeading}
              </h2>
            </Reveal>

            {/* Grid 2 Columns: Features (Left) & Parent Reviews (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: 6 Feature rows */}
              <Reveal variant="left" className="lg:col-span-7 h-full">
                <div className="h-full bg-white border border-[#EBE3DC] rounded-[24px] p-6 sm:p-8 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                  <div className="divide-y divide-slate-100">
                    {moreAboutFeatures.map((feat: any, fIdx: number) => {
                      const FeatIcon = getIconComponent(feat.icon);
                      const isExpanded = expandedFeatureIndex === fIdx;
                      return (
                        <div key={fIdx} className="py-3.5 first:pt-0 last:pb-0 transition-all">
                          <div 
                            onClick={() => setExpandedFeatureIndex(isExpanded ? null : fIdx)}
                            className="flex items-center gap-3.5 sm:gap-4 cursor-pointer group hover:bg-orange-50/20 p-1.5 rounded-xl transition-colors"
                          >
                            {/* Circle Icon */}
                            <div 
                              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105"
                              style={{ backgroundColor: feat.bgColor || "#EBF4FF" }}
                            >
                              <FeatIcon size={24} style={{ color: feat.color || "#0062FC" }} />
                            </div>

                            {/* Content Text */}
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#08265c] leading-snug group-hover:text-[#FB6238] transition-colors">
                                {feat.title}
                              </h4>
                              <p className="text-[13px] sm:text-[13.5px] font-medium text-slate-500 leading-relaxed mt-0.5">
                                {feat.description}
                              </p>
                            </div>

                            {/* Action Plus Button */}
                            <button
                              type="button"
                              suppressHydrationWarning
                              className={`w-6 h-6 rounded-full border border-[#FB6238] flex items-center justify-center shrink-0 transition-all duration-200 ${
                                isExpanded 
                                  ? "bg-[#FB6238] text-white rotate-45" 
                                  : "text-[#FB6238] hover:bg-[#FB6238] hover:text-white"
                              }`}
                              aria-label="Toggle details"
                            >
                              <Plus size={14} strokeWidth={2.5} />
                            </button>
                          </div>

                          {/* Expandable details */}
                          {isExpanded && (
                            <div className="pl-16 pr-8 pt-2.5 text-[13px] text-slate-600 leading-relaxed animate-fadeIn">
                              <p className="bg-[#FFFDFB] border border-orange-100/80 rounded-2xl p-3.5 text-slate-600 shadow-sm">
                                {feat.detailedText || feat.description}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Parent Reviews */}
              <Reveal variant="right" className="lg:col-span-5 h-full">
                <div className="h-full bg-white border border-[#EBE3DC] rounded-[24px] p-6 sm:p-8 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                  <div>
                    {/* Reviews Heading */}
                    <h3 className="text-[22px] sm:text-[25px] font-bold text-[#08265c] leading-tight mb-5 tracking-[-0.4px] font-sans">
                      {testimonialsHeading} <span className="text-[#FB6238]">{testimonialsHeadingHighlight}</span>
                    </h3>

                    {/* Testimonial Cards */}
                    <div className="space-y-3.5">
                      {testimonialsList.map((review: any, rIdx: number) => (
                        <div 
                          key={rIdx}
                          className="bg-[#FAFBFC] border border-[#EBE3DC] rounded-[20px] p-4.5 sm:p-5 flex items-start gap-4 hover:border-[#FB6238]/40 hover:bg-[#FFFDFC] hover:shadow-sm transition-all duration-200"
                        >
                          {/* Avatar */}
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] relative bg-slate-100">
                            <Image
                              src={review.avatarUrl || "/parent_fatima.jpg"}
                              alt={review.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>

                          {/* Review Content */}
                          <div className="flex-1 min-w-0">
                            {/* 5 Stars */}
                            <div className="flex items-center gap-1 mb-1.5">
                              {[...Array(review.rating || 5)].map((_, s) => (
                                <Star key={s} size={15} className="fill-[#F59E0B] text-[#F59E0B]" />
                              ))}
                            </div>

                            {/* Quote */}
                            <p className="text-[13px] sm:text-[13.5px] font-medium text-slate-700 leading-relaxed mb-2 font-sans">
                              &quot;{review.quote}&quot;
                            </p>

                            {/* Author & City */}
                            <div className="text-[12.5px] font-bold text-slate-900 leading-tight">
                              — {review.name}
                            </div>
                            <div className="text-[11.5px] font-medium text-slate-500 leading-tight mt-0.5">
                              {review.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Pagination Dots matching screenshot */}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    {[0, 1, 2].map((dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setActiveTestimonialPage(dotIdx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeTestimonialPage === dotIdx
                            ? "bg-[#FB6238] w-7"
                            : "bg-slate-300 hover:bg-slate-400 w-2.5"
                        }`}
                        aria-label={`Slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                </div>
              </Reveal>

            </div>

          </div>
        </section>
      )}

      {/* 7. Seventh Section: Side-by-Side Right Child Audience & FAQ Accordion */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <div className="w-[90%] max-w-[1250px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Card: Is This Right for Your Child? */}
            <Reveal variant="left" className="lg:col-span-6 h-full">
              <div className="h-full border border-[#EBE3DC] rounded-[24px] p-7 md:p-9 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] bg-white hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.1)] transition-all duration-300 relative overflow-hidden flex flex-col justify-center min-h-[480px]">
                
                <div className="space-y-4 z-10 relative max-w-[62%] sm:max-w-[58%] my-auto">
                  {/* Card Header */}
                  <div className="space-y-2">
                    <div className="text-[13px] sm:text-[14px] font-black tracking-[0.08em] text-[#FB6238] uppercase font-sans">
                      {suitabilitySubheader}
                    </div>
                    <h3 className="text-[28px] md:text-[34px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] font-sans">
                      {suitabilityTitle}
                    </h3>
                    <p className="text-slate-600 text-[14.5px] sm:text-[15px] leading-[1.55] font-medium font-sans">
                      {suitabilityDescription}
                    </p>
                  </div>

                  {/* Orange Checkmarks Bullet List */}
                  <div className="space-y-2.5 pt-1">
                    {suitabilityBullets.map((bullet: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="w-[22px] h-[22px] rounded-full bg-[#FB6238] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(251,98,56,0.35)]">
                          <svg className="w-[12px] h-[12px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[13.5px] sm:text-[14.5px] font-bold text-neutral-800 leading-tight font-sans">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right-Side Student Artwork centered vertically */}
                <div className="absolute right-0 top-0 bottom-0 w-[46%] sm:w-[48%] pointer-events-none select-none overflow-hidden z-0 flex items-center justify-end">
                  <div className="relative w-full h-full z-10">
                    <Image
                      src="/suitability_girl_student.jpg"
                      alt="Happy child student holding books"
                      fill
                      className="object-contain object-right scale-[1.05] origin-right"
                      priority
                    />
                  </div>
                </div>

              </div>
            </Reveal>

            {/* Right Card: Frequently Asked Questions Accordion */}
            <Reveal variant="right" className="lg:col-span-6 h-full">
              <div className="h-full border border-[#EBE3DC] rounded-[24px] p-7 md:p-9 shadow-[0_6px_24px_-4px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.02)] bg-white hover:border-[#FB6238]/40 hover:shadow-[0_12px_32px_-6px_rgba(251,98,56,0.1)] transition-all duration-300 flex flex-col justify-between min-h-[480px]">
                
                <div>
                  {/* Card Header */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[13px] sm:text-[14px] font-black tracking-[0.08em] text-[#FB6238] uppercase font-sans">
                      {faqSubheader}
                    </div>
                    <h3 className="text-[28px] md:text-[34px] font-bold text-[#08265c] leading-[1.15] tracking-[-0.5px] font-sans">
                      {faqTitle}
                    </h3>
                  </div>

                  {/* Accordion Questions List */}
                  <div className="space-y-2.5">
                    {faqItems.map((item: any, index: number) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div 
                          key={index}
                          className={`bg-white border transition-all duration-300 rounded-[16px] overflow-hidden ${
                            isOpen 
                              ? "border-[#FB6238]/60 shadow-[0_4px_16px_rgba(251,98,56,0.08)] bg-gradient-to-r from-orange-50/20 to-transparent" 
                              : "border-[#EBE3DC] hover:border-[#FB6238]/30 shadow-[0_1px_4px_rgba(0,0,0,0.015)]"
                          }`}
                        >
                          {/* Accordion Trigger Button */}
                          <button
                            type="button"
                            suppressHydrationWarning
                            onClick={() => toggleFaq(index)}
                            className="w-full flex items-center justify-between text-left p-[14px_20px] gap-4 group select-none"
                          >
                            <span className="text-[14.5px] sm:text-[15.5px] font-bold text-[#08265c] font-sans leading-tight group-hover:text-[#FB6238] transition-colors">
                              {item.question}
                            </span>
                            <div className={`shrink-0 transition-transform duration-300 font-bold text-[18px] ${
                              isOpen ? "text-[#FB6238] rotate-180" : "text-slate-400 group-hover:text-[#FB6238]"
                            }`}>
                              {isOpen ? <Minus size={18} className="stroke-[2.5]" /> : <Plus size={18} className="stroke-[2.5]" />}
                            </div>
                          </button>

                          {/* Accordion Answer Content */}
                          <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? "max-h-[160px] opacity-100 px-5 pb-4" : "max-h-0 opacity-0"
                            }`}
                          >
                            <p className="text-[13.5px] sm:text-[14px] text-slate-600 leading-[1.6] font-medium font-sans border-t border-orange-100/60 pt-3">
                              {item.answer}
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 8. Eighth Section: Bottom Conversion CTA Banner */}
      <section className="py-[16px] md:py-[24px] bg-[#fffdfb] relative select-none">
        <Reveal variant="rise" className="w-[90%] max-w-[1250px] mx-auto relative z-10">
          <div className="bg-gradient-to-r from-[#0C1E45] via-[#1B3472] to-[#142A5C] rounded-[26px] p-7 sm:p-9 md:p-10 text-white relative overflow-hidden shadow-[0_14px_40px_rgba(15,35,82,0.22)] border border-blue-400/20 flex flex-col lg:flex-row items-center justify-between gap-6 min-h-[170px] md:min-h-[190px]">
            
            {/* Background Floating Arabic Letters with floating animation */}
            <span className="absolute top-3 left-10 text-white/10 text-4xl font-bold pointer-events-none select-none z-0 animate-float-slow">
              ن
            </span>
            <span className="absolute top-1/3 right-12 text-white/10 text-4xl font-bold pointer-events-none select-none z-0 animate-float-slow" style={{ animationDelay: '1.5s' }}>
              ذ
            </span>
            <span className="absolute bottom-4 right-6 text-white/10 text-5xl font-bold pointer-events-none select-none z-0 animate-float-slow" style={{ animationDelay: '2.5s' }}>
              ن
            </span>

            {/* Left Side: Female Arabic Teacher with Headphones and Laptop */}
            <Reveal variant="left" delay={100} className="flex-shrink-0 relative w-44 h-36 md:w-56 md:h-44 lg:w-64 lg:h-48 z-10 select-none pointer-events-none flex items-end justify-start">
              <Image
                src="/female-teacher.png"
                alt="Friendly Arabic teacher behind laptop"
                fill
                className="object-contain object-left-bottom"
                priority
              />
            </Reveal>

            {/* Center: CTA Texts */}
            <Reveal variant="up" delay={150} className="space-y-2 text-center lg:text-left flex-1 max-w-xl z-10">
              <h3 className="text-[24px] md:text-[30px] lg:text-[32px] font-bold text-white leading-tight font-sans">
                {ctaHeading}
              </h3>
              <p className="text-[#dbeafe] text-[13.5px] md:text-[14.5px] font-medium leading-relaxed font-sans max-w-[440px]">
                {ctaDescription}
              </p>
            </Reveal>

            {/* Right Side: CTA Button & Commitment Subtext */}
            <Reveal variant="scale" delay={200} className="flex flex-col items-center lg:items-end gap-2.5 shrink-0 z-10 w-full lg:w-auto max-w-md">
              <Button 
                suppressHydrationWarning
                onClick={handleBookClick}
                className="hover-shine w-full sm:w-auto h-[54px] px-9 bg-gradient-to-r from-[#FB6238] via-[#FF6E48] to-[#FF8159] hover:from-[#E04E26] hover:to-[#FB6238] text-white font-extrabold rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_8px_24px_rgba(251,98,56,0.45)] hover:shadow-[0_12px_32px_rgba(251,98,56,0.6)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-[15.5px] sm:text-[16.5px]"
              >
                {ctaButtonText}
                <ArrowRight size={19} className="stroke-[2.5]" />
              </Button>
              <span className="text-[12px] sm:text-[13px] text-[#dbeafe]/90 text-center lg:text-right font-medium leading-normal font-sans">
                No long-term commitment. Discover the right learning approach for your child.
              </span>
            </Reveal>

          </div>
        </Reveal>
      </section>

    </div>
  );
}
