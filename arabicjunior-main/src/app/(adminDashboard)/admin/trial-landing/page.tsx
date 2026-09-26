"use client";

import React, { useState, useEffect } from "react";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button-2";
import { 
  Loader2, 
  Save, 
  Settings, 
  BookOpen, 
  HelpCircle, 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Trash, 
  Compass, 
  UserCheck, 
  FileText,
  BadgeAlert,
  ArrowRight,
  ArrowLeft,
  Copy,
  ExternalLink,
  Layers,
  LayoutGrid,
  Sparkles,
  BarChart2,
  Star,
  MessageCircle,
  Globe,
  Share2
} from "lucide-react";

type StatCardItem = {
  key?: string;
  value: string;
  label: string;
  desc: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  icon: string;
};

type ConfidenceCardItem = {
  arabicWord: string;
  englishLabel: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor?: string;
  icon: string;
};

type FlexibleFeatureItem = {
  title: string;
  subtext: string;
  icon: string;
  color: string;
  bgColor: string;
};

type MoreAboutFeatureItem = {
  title: string;
  description: string;
  detailedText?: string;
  icon: string;
  color: string;
  bgColor: string;
};

type TestimonialReviewItem = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  avatarPublicId?: string;
};

type WhyCardItem = {
  title: string;
  desc: string;
  titleColor: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  icon: string;
};

type AssessSkillItem = {
  title: string;
  desc: string;
  textColor: string;
  bgColor: string;
  icon: string;
};

type ChooseCardItem = {
  title: string;
  desc: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
};

type OnboardingStepItem = {
  num: string;
  title: string;
  desc: string;
  numBg: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type LandingPageListItem = {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export default function TrialLandingAdminPage() {
  const { token } = useAuthAdmin();
  const [loadingList, setLoadingList] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // List vs Edit Mode
  const [pagesList, setPagesList] = useState<LandingPageListItem[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openBulkDialog, setOpenBulkDialog] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Creation States
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  // Editor Tabs for Dynamic Page Edit
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "confidence" | "curriculumFlex" | "moreAbout" | "why" | "onboarding" | "skills" | "choose" | "faq" | "cta" | "seo">("hero");

  // Page Editor States
  const [pageTitle, setPageTitle] = useState("");
  const [slug, setSlug] = useState("");

  // Stats Section State
  const [statsShow, setStatsShow] = useState(true);
  const [statsItems, setStatsItems] = useState<StatCardItem[]>([]);

  // Confidence Section State
  const [confidenceShow, setConfidenceShow] = useState(true);
  const [confidenceBadge, setConfidenceBadge] = useState("");
  const [confidenceHeading, setConfidenceHeading] = useState("");
  const [confidenceDescription, setConfidenceDescription] = useState("");
  const [confidenceCards, setConfidenceCards] = useState<ConfidenceCardItem[]>([]);

  // Curriculum & Flexible Learning Section State
  const [curriculumFlexShow, setCurriculumFlexShow] = useState(true);
  const [curriculumBadge, setCurriculumBadge] = useState("");
  const [curriculumHeading, setCurriculumHeading] = useState("");
  const [curriculumDescription, setCurriculumDescription] = useState("");
  const [curriculumBadgesList, setCurriculumBadgesList] = useState<string[]>([]);
  const [curriculumChecklist, setCurriculumChecklist] = useState<string[]>([]);

  const [flexibleBadge, setFlexibleBadge] = useState("");
  const [flexibleHeading, setFlexibleHeading] = useState("");
  const [flexibleDescription, setFlexibleDescription] = useState("");
  const [flexibleFeatures, setFlexibleFeatures] = useState<FlexibleFeatureItem[]>([]);

  const [flexibleImageUrl, setFlexibleImageUrl] = useState("");
  const [flexibleImageFile, setFlexibleImageFile] = useState<File | null>(null);
  const [flexibleImagePreview, setFlexibleImagePreview] = useState("");

  // More About Arabic Juniors & Testimonials State
  const [moreAboutShow, setMoreAboutShow] = useState(true);
  const [moreAboutHeading, setMoreAboutHeading] = useState("");
  const [moreAboutFeatures, setMoreAboutFeatures] = useState<MoreAboutFeatureItem[]>([]);

  const [testimonialsHeading, setTestimonialsHeading] = useState("");
  const [testimonialsHeadingHighlight, setTestimonialsHeadingHighlight] = useState("");
  const [testimonialsList, setTestimonialsList] = useState<TestimonialReviewItem[]>([]);

  // Hero Section State
  const [heroBadgeText, setHeroBadgeText] = useState("");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroHeadingHighlight, setHeroHeadingHighlight] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [heroDescription1, setHeroDescription1] = useState("");
  const [heroDescription2, setHeroDescription2] = useState("");
  const [heroBullets, setHeroBullets] = useState<string[]>([]);
  const [heroCtaText, setHeroCtaText] = useState("");
  const [heroCtaSubtext, setHeroCtaSubtext] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState("");

  // Why Section State
  const [whySubheader, setWhySubheader] = useState("");
  const [whyHeading, setWhyHeading] = useState("");
  const [whyDescription, setWhyDescription] = useState("");
  const [whyCards, setWhyCards] = useState<WhyCardItem[]>([]);

  // Process Section State
  const [processSubheader, setProcessSubheader] = useState("");
  const [processHeading, setProcessHeading] = useState("");

  // Skills & Curricula State
  const [assessSubheader, setAssessSubheader] = useState("");
  const [assessTitle, setAssessTitle] = useState("");
  const [assessDescription, setAssessDescription] = useState("");
  const [assessSkills, setAssessSkills] = useState<AssessSkillItem[]>([]);
  
  const [curriculaSubheader, setCurriculaSubheader] = useState("");
  const [curriculaTitle, setCurriculaTitle] = useState("");
  const [curriculaDescription, setCurriculaDescription] = useState("");
  const [curriculaBadges, setCurriculaBadges] = useState<string[]>([]);
  const [curriculaImageUrl, setCurriculaImageUrl] = useState("");
  const [curriculaImageFile, setCurriculaImageFile] = useState<File | null>(null);
  const [curriculaImagePreview, setCurriculaImagePreview] = useState("");

  // Choose Cards State
  const [chooseSubheader, setChooseSubheader] = useState("");
  const [chooseHeading, setChooseHeading] = useState("");
  const [chooseCards, setChooseCards] = useState<ChooseCardItem[]>([]);

  // Onboarding Steps State
  const [onboardingSubheader, setOnboardingSubheader] = useState("");
  const [onboardingHeading, setOnboardingHeading] = useState("");
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStepItem[]>([]);

  // Suitability State
  const [suitabilitySubheader, setSuitabilitySubheader] = useState("");
  const [suitabilityTitle, setSuitabilityTitle] = useState("");
  const [suitabilityDescription, setSuitabilityDescription] = useState("");
  const [suitabilityBullets, setSuitabilityBullets] = useState<string[]>([]);
  const [suitabilityImageUrl, setSuitabilityImageUrl] = useState("");
  const [suitabilityImageFile, setSuitabilityImageFile] = useState<File | null>(null);
  const [suitabilityImagePreview, setSuitabilityImagePreview] = useState("");

  // FAQs State
  const [faqSubheader, setFaqSubheader] = useState("");
  const [faqTitle, setFaqTitle] = useState("");
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  // CTA State
  const [ctaHeading, setCtaHeading] = useState("");
  const [ctaDescription, setCtaDescription] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [ctaSubtext, setCtaSubtext] = useState("");
  const [ctaImageUrl, setCtaImageUrl] = useState("");
  const [ctaImageFile, setCtaImageFile] = useState<File | null>(null);
  const [ctaImagePreview, setCtaImagePreview] = useState("");

  // SEO & Social Meta States
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [indexPage, setIndexPage] = useState(true);
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState("");

  const fetchPagesList = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok && result.data) {
        // Deduplicate items by slug so multiple identical pages never render
        const uniquePages: LandingPageListItem[] = [];
        const seenSlugs = new Set<string>();
        for (const item of result.data) {
          if (!seenSlugs.has(item.slug)) {
            seenSlugs.add(item.slug);
            uniquePages.push(item);
          }
        }
        setPagesList(uniquePages);
      } else {
        toast.error("Failed to load landing pages list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading landing pages list");
    } finally {
      setLoadingList(false);
    }
  };

  const fetchPageSettings = async (id: string) => {
    setLoadingPage(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok && result.data) {
        const d = result.data;
        
        setPageTitle(d.title || "");
        setSlug(d.slug || "");

        // Hero
        setHeroBadgeText(d.heroBadgeText || "");
        setHeroHeading(d.heroHeading || "");
        setHeroHeadingHighlight(d.heroHeadingHighlight || "");
        setHeroSubheading(d.heroSubheading || "");
        setHeroDescription1(d.heroDescription1 || "");
        setHeroDescription2(d.heroDescription2 || "");
        setHeroBullets(d.heroBullets || []);
        setHeroCtaText(d.heroCtaText || "");
        setHeroCtaSubtext(d.heroCtaSubtext || "");
        setHeroImageUrl(d.heroImageUrl || "");
        setHeroImagePreview(d.heroImageUrl || "");

        // Stats
        setStatsShow(d.statsShow !== false);
        setStatsItems(d.statsItems && d.statsItems.length > 0 ? d.statsItems : [
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
        ]);

        // Confidence
        setConfidenceShow(d.confidenceShow !== false);
        setConfidenceBadge(d.confidenceBadge || "Why Choose Arabic Juniors?");
        setConfidenceHeading(d.confidenceHeading || "Build Confidence.\nImprove Communication.");
        setConfidenceDescription(d.confidenceDescription || "Our teaching approach focuses on real life communication rather than memorization. We help students improve speaking, reading, writing and listening through interactive lessons and customized Arabic study plans.");
        setConfidenceCards(d.confidenceCards && d.confidenceCards.length > 0 ? d.confidenceCards : [
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
        ]);

        // Curriculum & Flexibility
        setCurriculumFlexShow(d.curriculumFlexShow !== false);
        setCurriculumBadge(d.curriculumBadge || "UAE School Curriculum Expert");
        setCurriculumHeading(d.curriculumHeading || "Aligned with UAE School Curriculum");
        setCurriculumDescription(d.curriculumDescription || "We specialize in Arabic for UAE schools (MOE Curriculum) and also support students from CBSE, British, IB and American Curriculums.");
        setCurriculumBadgesList(
          d.curriculumBadgesList && d.curriculumBadgesList.length > 0
            ? d.curriculumBadgesList.map((b: any) => typeof b === "string" ? b : b.name)
            : ["UAE MOE", "CBSE", "British", "IB", "American"]
        );
        setCurriculumChecklist(
          d.curriculumChecklist && d.curriculumChecklist.length > 0
            ? d.curriculumChecklist
            : [
                "Grade KG to 12",
                "Reading, Writing, Speaking & Grammar",
                "Textbook Support & Exam Preparation",
                "Personalized Learning Plans",
                "Regular Assessments & Progress Reports"
              ]
        );

        setFlexibleBadge(d.flexibleBadge || "Flexible Learning");
        setFlexibleHeading(d.flexibleHeading || "Learn Anytime, Anywhere");
        setFlexibleDescription(d.flexibleDescription || "Our online Arabic classes are designed to fit your schedule. That's why we offer flexible learning options that make it easy to learn from your home and at your pace.");
        setFlexibleFeatures(
          d.flexibleFeatures && d.flexibleFeatures.length > 0
            ? d.flexibleFeatures
            : [
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
        );

        setFlexibleImageUrl(d.flexibleImageUrl || "/online_learning_girl.jpg");
        setFlexibleImagePreview(d.flexibleImageUrl || "/online_learning_girl.jpg");
        setFlexibleImageFile(null);

        // More About & Testimonials
        setMoreAboutShow(d.moreAboutShow !== false);
        setMoreAboutHeading(d.moreAboutHeading || "More About Arabic Juniors");
        setMoreAboutFeatures(
          d.moreAboutFeatures && d.moreAboutFeatures.length > 0
            ? d.moreAboutFeatures
            : [
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
        );
        setTestimonialsHeading(d.testimonialsHeading || "What Parents Say About");
        setTestimonialsHeadingHighlight(d.testimonialsHeadingHighlight || "Arabic Juniors");
        setTestimonialsList(
          d.testimonialsList && d.testimonialsList.length > 0
            ? d.testimonialsList
            : [
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
        );

        // Why
        setWhySubheader(d.whySubheader || "");
        setWhyHeading(d.whyHeading || "");
        setWhyDescription(d.whyDescription || "");
        setWhyCards(d.whyCards || []);

        // Process
        setProcessSubheader(d.processSubheader || "");
        setProcessHeading(d.processHeading || "");

        // Skills
        setAssessSubheader(d.assessSubheader || "");
        setAssessTitle(d.assessTitle || "");
        setAssessDescription(d.assessDescription || "");
        setAssessSkills(d.assessSkills || []);

        // Curricula
        setCurriculaSubheader(d.curriculaSubheader || "");
        setCurriculaTitle(d.curriculaTitle || "");
        setCurriculaDescription(d.curriculaDescription || "");
        setCurriculaBadges(d.curriculaBadges || []);
        setCurriculaImageUrl(d.curriculaImageUrl || "");
        setCurriculaImagePreview(d.curriculaImageUrl || "");

        // Choose Cards
        setChooseSubheader(d.chooseSubheader || "");
        setChooseHeading(d.chooseHeading || "");
        setChooseCards(d.chooseCards || []);

        // Onboarding Steps
        setOnboardingSubheader(d.onboardingSubheader || "");
        setOnboardingHeading(d.onboardingHeading || "");
        setOnboardingSteps(d.onboardingSteps || []);

        // Suitability
        setSuitabilitySubheader(d.suitabilitySubheader || "");
        setSuitabilityTitle(d.suitabilityTitle || "");
        setSuitabilityDescription(d.suitabilityDescription || "");
        setSuitabilityBullets(d.suitabilityBullets || []);
        setSuitabilityImageUrl(d.suitabilityImageUrl || "");
        setSuitabilityImagePreview(d.suitabilityImageUrl || "");

        // FAQ
        setFaqSubheader(d.faqSubheader || "");
        setFaqTitle(d.faqTitle || "");
        setFaqItems(d.faqItems || []);

        // CTA
        setCtaHeading(d.ctaHeading || "");
        setCtaDescription(d.ctaDescription || "");
        setCtaButtonText(d.ctaButtonText || "");
        setCtaSubtext(d.ctaSubtext || "");
        setCtaImageUrl(d.ctaImageUrl || "");
        setCtaImagePreview(d.ctaImageUrl || "");

        // SEO & Social Meta
        setMetaTitle(d.metaTitle || "");
        setMetaDescription(d.metaDescription || "");
        setMetaKeywords(d.metaKeywords || "");
        setCanonicalUrl(d.canonicalUrl || "");
        setIndexPage(d.indexPage !== false);
        setOgImageUrl(d.ogImageUrl || "");
        setOgImagePreview(d.ogImageUrl || "");

      } else {
        toast.error("Failed to load landing page settings.");
        setSelectedPageId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading page settings.");
      setSelectedPageId(null);
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPagesList();
    }
  }, [token]);

  const handleCreatePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Page title is required");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          slug: newSlug.trim() || undefined,
        }),
      });

      const result = await res.json();
      if (res.ok && result.data) {
        toast.success("Landing page created successfully!");
        setNewTitle("");
        setNewSlug("");
        setIsCreating(false);
        // Refresh list and jump to edit
        fetchPagesList();
        setSelectedPageId(result.data._id);
        fetchPageSettings(result.data._id);
      } else {
        toast.error(result.message || "Failed to create landing page");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating landing page");
    }
  };

  /**
   * The live /trial-landing page cannot be deleted, exactly as the Delete button
   * on its row is disabled. Excluding it here means a select-all can never put
   * the admin in front of a confirmation that will silently skip a row.
   */
  const deletablePages = pagesList.filter((page) => page.slug !== "trial-landing");

  const toggleOne = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const allSelected =
    deletablePages.length > 0 && selectedIds.length === deletablePages.length;

  const toggleAll = () =>
    setSelectedIds(allSelected ? [] : deletablePages.map((page) => page._id));

  const selectedPages = pagesList.filter((page) => selectedIds.includes(page._id));

  const handleBulkDeletePages = async () => {
    if (!selectedIds.length || !token) return;

    setBulkDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/delete-many`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ids: selectedIds }),
        }
      );
      const result = await res.json().catch(() => null);
      if (!res.ok) throw new Error(result?.message || "Failed to delete");

      toast.success(result?.message || "Landing pages deleted");
      setSelectedIds([]);
      setOpenBulkDialog(false);
      fetchPagesList();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to delete the pages");
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleDeletePage = async (id: string, slugName: string) => {
    const defaultCount = pagesList.filter((p) => p.slug === "trial-landing").length;
    if (slugName === "trial-landing" && defaultCount <= 1) {
      toast.error("Default trial landing page cannot be deleted");
      return;
    }

    if (!confirm("Are you sure you want to delete this landing page? All custom texts and uploaded illustrations will be deleted forever.")) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Landing page deleted successfully!");
        fetchPagesList();
      } else {
        toast.error(result.message || "Failed to delete landing page");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting page");
    }
  };

  const handleStatItemChange = (idx: number, field: keyof StatCardItem, val: string) => {
    const next = [...statsItems];
    next[idx] = { ...next[idx], [field]: val };
    setStatsItems(next);
  };

  const addStatItem = () => {
    setStatsItems([
      ...statsItems,
      {
        key: `stat-${statsItems.length + 1}`,
        value: "100+",
        label: "New Metric",
        desc: "Description of this metric.",
        color: "#FB6238",
        bgColor: "#FFF2EE",
        borderColor: "#FFD0BD",
        icon: "Users"
      }
    ]);
  };

  const removeStatItem = (idx: number) => {
    setStatsItems(statsItems.filter((_, i) => i !== idx));
  };

  const handleConfidenceCardChange = (idx: number, field: keyof ConfidenceCardItem, val: string) => {
    const next = [...confidenceCards];
    next[idx] = { ...next[idx], [field]: val };
    setConfidenceCards(next);
  };

  const addConfidenceCard = () => {
    setConfidenceCards([
      ...confidenceCards,
      {
        arabicWord: "تحدث",
        englishLabel: "Skill",
        description: "Description of this skill.",
        color: "#FB6238",
        bgColor: "#FFF2EE",
        borderColor: "#FFD0BD",
        icon: "MessagesSquare"
      }
    ]);
  };

  const removeConfidenceCard = (idx: number) => {
    setConfidenceCards(confidenceCards.filter((_, i) => i !== idx));
  };

  const handleChecklistChange = (idx: number, val: string) => {
    const next = [...curriculumChecklist];
    next[idx] = val;
    setCurriculumChecklist(next);
  };

  const addChecklistItem = () => {
    setCurriculumChecklist([...curriculumChecklist, ""]);
  };

  const removeChecklistItem = (idx: number) => {
    setCurriculumChecklist(curriculumChecklist.filter((_, i) => i !== idx));
  };

  const handleFlexibleFeatureChange = (idx: number, field: keyof FlexibleFeatureItem, val: string) => {
    const next = [...flexibleFeatures];
    next[idx] = { ...next[idx], [field]: val };
    setFlexibleFeatures(next);
  };

  const addFlexibleFeature = () => {
    setFlexibleFeatures([
      ...flexibleFeatures,
      {
        title: "New Feature",
        subtext: "Feature details",
        icon: "Calendar",
        color: "#FB6238",
        bgColor: "#FFF2EE"
      }
    ]);
  };

  const removeFlexibleFeature = (idx: number) => {
    setFlexibleFeatures(flexibleFeatures.filter((_, i) => i !== idx));
  };

  const handleFlexibleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFlexibleImageFile(e.target.files[0]);
      setFlexibleImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleMoreAboutFeatureChange = (idx: number, field: keyof MoreAboutFeatureItem, val: string) => {
    const next = [...moreAboutFeatures];
    next[idx] = { ...next[idx], [field]: val };
    setMoreAboutFeatures(next);
  };

  const addMoreAboutFeature = () => {
    setMoreAboutFeatures([
      ...moreAboutFeatures,
      {
        title: "New Feature Title",
        description: "Short feature description.",
        detailedText: "Detailed explanation when expanded.",
        icon: "GraduationCap",
        color: "#0062FC",
        bgColor: "#EBF4FF"
      }
    ]);
  };

  const removeMoreAboutFeature = (idx: number) => {
    setMoreAboutFeatures(moreAboutFeatures.filter((_, i) => i !== idx));
  };

  const handleTestimonialChange = (idx: number, field: keyof TestimonialReviewItem, val: any) => {
    const next = [...testimonialsList];
    next[idx] = { ...next[idx], [field]: val };
    setTestimonialsList(next);
  };

  const addTestimonial = () => {
    setTestimonialsList([
      ...testimonialsList,
      {
        name: "Parent Name",
        role: "Parent, Dubai",
        quote: "Our child loved learning Arabic with Arabic Juniors!",
        rating: 5,
        avatarUrl: "/parent_fatima.jpg"
      }
    ]);
  };

  const removeTestimonial = (idx: number) => {
    setTestimonialsList(testimonialsList.filter((_, i) => i !== idx));
  };

  const handleHeroBulletChange = (idx: number, val: string) => {
    const next = [...heroBullets];
    next[idx] = val;
    setHeroBullets(next);
  };

  const handleWhyCardChange = (idx: number, field: keyof WhyCardItem, val: string) => {
    const next = [...whyCards];
    next[idx] = { ...next[idx], [field]: val };
    setWhyCards(next);
  };

  const handleSkillChange = (idx: number, field: keyof AssessSkillItem, val: string) => {
    const next = [...assessSkills];
    next[idx] = { ...next[idx], [field]: val };
    setAssessSkills(next);
  };

  const handleChooseCardChange = (idx: number, field: keyof ChooseCardItem, val: string) => {
    const next = [...chooseCards];
    next[idx] = { ...next[idx], [field]: val };
    setChooseCards(next);
  };

  const handleOnboardingStepChange = (idx: number, field: keyof OnboardingStepItem, val: string) => {
    const next = [...onboardingSteps];
    next[idx] = { ...next[idx], [field]: val };
    setOnboardingSteps(next);
  };

  // Add / remove for the repeatable blocks. New entries copy the colour and
  // icon settings of the last row so a fresh card looks like the rest instead
  // of landing unstyled.
  const addHeroBullet = () => setHeroBullets((p) => [...p, ""]);
  const removeHeroBullet = (idx: number) =>
    setHeroBullets((p) => p.filter((_, i) => i !== idx));

  const addWhyCard = () =>
    setWhyCards((p) => [
      ...p,
      {
        title: "",
        desc: "",
        titleColor: p[p.length - 1]?.titleColor || "text-neutral-900",
        bgColor: p[p.length - 1]?.bgColor || "bg-white",
        borderColor: p[p.length - 1]?.borderColor || "border-neutral-200",
        iconColor: p[p.length - 1]?.iconColor || "text-orange-500",
        icon: p[p.length - 1]?.icon || "Star",
      },
    ]);
  const removeWhyCard = (idx: number) =>
    setWhyCards((p) => p.filter((_, i) => i !== idx));

  const addChooseCard = () =>
    setChooseCards((p) => [
      ...p,
      {
        title: "",
        desc: "",
        icon: p[p.length - 1]?.icon || "Star",
        bgColor: p[p.length - 1]?.bgColor || "bg-white",
        borderColor: p[p.length - 1]?.borderColor || "border-neutral-200",
        iconColor: p[p.length - 1]?.iconColor || "text-orange-500",
      },
    ]);
  const removeChooseCard = (idx: number) =>
    setChooseCards((p) => p.filter((_, i) => i !== idx));

  const addAssessSkill = () =>
    setAssessSkills((p) => [
      ...p,
      {
        title: "",
        desc: "",
        textColor: p[p.length - 1]?.textColor || "text-neutral-900",
        bgColor: p[p.length - 1]?.bgColor || "bg-white",
        icon: p[p.length - 1]?.icon || "Star",
      },
    ]);
  const removeAssessSkill = (idx: number) =>
    setAssessSkills((p) => p.filter((_, i) => i !== idx));

  const addOnboardingStep = () =>
    setOnboardingSteps((p) => [
      ...p,
      {
        num: String(p.length + 1).padStart(2, "0"),
        title: "",
        desc: "",
        numBg: p[p.length - 1]?.numBg || "bg-orange-500",
      },
    ]);
  const removeOnboardingStep = (idx: number) =>
    setOnboardingSteps((p) => p.filter((_, i) => i !== idx));

  const handleSuitabilityBulletChange = (idx: number, val: string) => {
    const next = [...suitabilityBullets];
    next[idx] = val;
    setSuitabilityBullets(next);
  };

  const addSuitabilityBullet = () => {
    setSuitabilityBullets([...suitabilityBullets, ""]);
  };

  const removeSuitabilityBullet = (idx: number) => {
    setSuitabilityBullets(suitabilityBullets.filter((_, i) => i !== idx));
  };

  const handleFaqChange = (idx: number, field: keyof FaqItem, val: string) => {
    const next = [...faqItems];
    next[idx] = { ...next[idx], [field]: val };
    setFaqItems(next);
  };

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  };

  const removeFaqItem = (idx: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== idx));
  };

  const copyToClipboard = (slugText: string) => {
    const url = `${window.location.origin}/${slugText}`;
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPageId) return;
    setSaving(true);

    try {
      const formData = new FormData();
      
      // Page Meta
      formData.append("title", pageTitle);
      formData.append("slug", slug);

      // Hero fields
      formData.append("heroBadgeText", heroBadgeText);
      formData.append("heroHeading", heroHeading);
      formData.append("heroHeadingHighlight", heroHeadingHighlight);
      formData.append("heroSubheading", heroSubheading);
      formData.append("heroDescription1", heroDescription1);
      formData.append("heroDescription2", heroDescription2);
      formData.append("heroBullets", JSON.stringify(heroBullets.filter(b => b.trim() !== "")));
      formData.append("heroCtaText", heroCtaText);
      formData.append("heroCtaSubtext", heroCtaSubtext);

      // Stats fields
      formData.append("statsShow", String(statsShow));
      formData.append("statsItems", JSON.stringify(statsItems));

      // Confidence fields
      formData.append("confidenceShow", String(confidenceShow));
      formData.append("confidenceBadge", confidenceBadge);
      formData.append("confidenceHeading", confidenceHeading);
      formData.append("confidenceDescription", confidenceDescription);
      formData.append("confidenceCards", JSON.stringify(confidenceCards));

      // Curriculum & Flexible Learning fields
      formData.append("curriculumFlexShow", String(curriculumFlexShow));
      formData.append("curriculumBadge", curriculumBadge);
      formData.append("curriculumHeading", curriculumHeading);
      formData.append("curriculumDescription", curriculumDescription);
      formData.append(
        "curriculumBadgesList",
        JSON.stringify(curriculumBadgesList.filter(b => b.trim() !== "").map(name => ({ name })))
      );
      formData.append(
        "curriculumChecklist",
        JSON.stringify(curriculumChecklist.filter(c => c.trim() !== ""))
      );

      formData.append("flexibleBadge", flexibleBadge);
      formData.append("flexibleHeading", flexibleHeading);
      formData.append("flexibleDescription", flexibleDescription);
      formData.append("flexibleFeatures", JSON.stringify(flexibleFeatures));

      // More About & Testimonials fields
      formData.append("moreAboutShow", String(moreAboutShow));
      formData.append("moreAboutHeading", moreAboutHeading);
      formData.append("moreAboutFeatures", JSON.stringify(moreAboutFeatures));
      formData.append("testimonialsHeading", testimonialsHeading);
      formData.append("testimonialsHeadingHighlight", testimonialsHeadingHighlight);
      formData.append("testimonialsList", JSON.stringify(testimonialsList));

      // Why fields
      formData.append("whySubheader", whySubheader);
      formData.append("whyHeading", whyHeading);
      formData.append("whyDescription", whyDescription);
      formData.append("whyCards", JSON.stringify(whyCards));

      // Process fields
      formData.append("processSubheader", processSubheader);
      formData.append("processHeading", processHeading);

      // Skills & curricula
      formData.append("assessSubheader", assessSubheader);
      formData.append("assessTitle", assessTitle);
      formData.append("assessDescription", assessDescription);
      formData.append("assessSkills", JSON.stringify(assessSkills));
      
      formData.append("curriculaSubheader", curriculaSubheader);
      formData.append("curriculaTitle", curriculaTitle);
      formData.append("curriculaDescription", curriculaDescription);
      formData.append("curriculaBadges", JSON.stringify(curriculaBadges));

      // Choose Cards
      formData.append("chooseSubheader", chooseSubheader);
      formData.append("chooseHeading", chooseHeading);
      formData.append("chooseCards", JSON.stringify(chooseCards));

      // Onboarding Steps
      formData.append("onboardingSubheader", onboardingSubheader);
      formData.append("onboardingHeading", onboardingHeading);
      formData.append("onboardingSteps", JSON.stringify(onboardingSteps));

      // Suitability fields
      formData.append("suitabilitySubheader", suitabilitySubheader);
      formData.append("suitabilityTitle", suitabilityTitle);
      formData.append("suitabilityDescription", suitabilityDescription);
      formData.append("suitabilityBullets", JSON.stringify(suitabilityBullets.filter(b => b.trim() !== "")));

      // FAQ fields
      formData.append("faqSubheader", faqSubheader);
      formData.append("faqTitle", faqTitle);
      formData.append("faqItems", JSON.stringify(faqItems.filter(f => f.question.trim() !== "")));

      // CTA fields
      formData.append("ctaHeading", ctaHeading);
      formData.append("ctaDescription", ctaDescription);
      formData.append("ctaButtonText", ctaButtonText);
      formData.append("ctaSubtext", ctaSubtext);

      // SEO & Social Meta fields
      formData.append("metaTitle", metaTitle);
      formData.append("metaDescription", metaDescription);
      formData.append("metaKeywords", metaKeywords);
      formData.append("canonicalUrl", canonicalUrl);
      formData.append("indexPage", String(indexPage));

      // Images
      if (heroImageFile) formData.append("heroImage", heroImageFile);
      if (suitabilityImageFile) formData.append("suitabilityImage", suitabilityImageFile);
      if (ctaImageFile) formData.append("ctaImage", ctaImageFile);
      if (curriculaImageFile) formData.append("curriculaImage", curriculaImageFile);
      if (flexibleImageFile) formData.append("flexibleImage", flexibleImageFile);
      if (ogImageFile) formData.append("ogImage", ogImageFile);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/${selectedPageId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "Landing page updated successfully!");
        setHeroImageFile(null);
        setSuitabilityImageFile(null);
        setCtaImageFile(null);
        setCurriculaImageFile(null);
        setFlexibleImageFile(null);
        setOgImageFile(null);
        fetchPageSettings(selectedPageId);
      } else {
        toast.error(result.message || "Failed to save settings updates.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during settings update.");
    } finally {
      setSaving(false);
    }
  };

  // 1. LIST OR HOMEPAGE BANNER VIEW
  if (!selectedPageId) {
    return (
      <div className="space-y-6 w-full mx-auto">
        
        {/* Main Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 flex items-center gap-2">
              <Compass className="h-8 w-8 text-orange-500 animate-spin-slow" />
              Trial & Landing Pages CMS
            </h1>
            <p className="text-neutral-500 mt-1">
              Create and manage custom sub-landing pages. The homepage trial banner is edited under Homepage Banner.
            </p>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-800">
              Dynamic Landing Pages
              <span className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 align-middle">
                {pagesList.length} total
              </span>
            </h2>
            {selectedIds.length > 0 && (
              <button
                onClick={() => setOpenBulkDialog(true)}
                className="ml-auto mr-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                <Trash size={16} /> Delete selected ({selectedIds.length})
              </button>
            )}
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm whitespace-nowrap shrink-0 text-sm"
            >
              <Plus size={16} />
              Create Landing Page
            </button>
          </div>

          {/* Creation Box */}
          {isCreating && (
            <form onSubmit={handleCreatePageSubmit} className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
              <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                <Settings size={18} className="text-orange-500" />
                New Page Configurations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Page Title / Name</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Dubai Summer Camp"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white text-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Custom URL Slug (Optional)</label>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="e.g. dubai-summer (defaults to slugified title)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border rounded-lg text-neutral-500 hover:bg-neutral-50 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold flex items-center gap-1"
                >
                  <Plus size={16} /> Create Page
                </button>
              </div>
            </form>
          )}

          {/* Loading list */}
          {loadingList ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <p className="text-neutral-400 text-sm mt-2">Fetching landing pages list...</p>
            </div>
          ) : (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="pl-6 pr-2 py-4 w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        disabled={deletablePages.length === 0}
                        aria-label="Select all landing pages"
                        className="h-4 w-4 cursor-pointer accent-orange-500 disabled:cursor-not-allowed"
                      />
                    </th>
                    <th className="px-6 py-4">Page Title</th>
                    <th className="px-6 py-4">URL Route</th>
                    <th className="px-6 py-4">Date Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                  {pagesList.map((page) => (
                    <tr
                      key={page._id}
                      className={`transition-colors ${
                        selectedIds.includes(page._id)
                          ? "bg-orange-50/60"
                          : "hover:bg-neutral-50/50"
                      }`}
                    >
                      <td className="pl-6 pr-2 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(page._id)}
                          onChange={() => toggleOne(page._id)}
                          disabled={page.slug === "trial-landing"}
                          aria-label={
                            page.slug === "trial-landing"
                              ? "The default landing page cannot be deleted"
                              : `Select ${page.title}`
                          }
                          title={
                            page.slug === "trial-landing"
                              ? "The default landing page cannot be deleted"
                              : undefined
                          }
                          className="h-4 w-4 cursor-pointer accent-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                        />
                      </td>
                      <td className="px-6 py-4 font-bold text-neutral-800">{page.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 px-2.5 py-1 rounded text-xs font-semibold text-slate-600 select-all border">
                            /{page.slug}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => copyToClipboard(page.slug)}
                            className="p-1 text-neutral-400 hover:text-orange-500 border rounded bg-white"
                            title="Copy Link"
                          >
                            <Copy size={13} />
                          </button>
                          
                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-neutral-400 hover:text-orange-500 border rounded bg-white"
                            title="Live Preview"
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-neutral-400">
                        {new Date(page.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedPageId(page._id);
                            fetchPageSettings(page._id);
                          }}
                          className="px-3.5 py-1.5 bg-orange-55 text-orange-600 border border-orange-200 hover:bg-orange-100 rounded-lg text-xs font-bold transition-all"
                        >
                          Edit Content
                        </button>
                        <button
                          disabled={page.slug === "trial-landing"}
                          onClick={() => handleDeletePage(page._id, page.slug)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            page.slug === "trial-landing"
                              ? "bg-neutral-55 text-neutral-300 border cursor-not-allowed"
                              : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          }`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {pagesList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-neutral-400">
                        No custom landing pages found. Click the button to create your first page!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>


        {/* Bulk delete confirmation. Names the pages — each one is a live URL
            that may be linked from an advert. */}
        <Dialog open={openBulkDialog} onOpenChange={setOpenBulkDialog}>
          <DialogContent className="max-w-md bg-white text-black">
            <DialogHeader>
              <DialogTitle>
                Delete {selectedIds.length} landing page
                {selectedIds.length === 1 ? "" : "s"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-neutral-500">
                Their URLs will stop working and their images are deleted. This
                cannot be undone.
              </p>

              <ul className="max-h-40 overflow-y-auto rounded-lg bg-neutral-50 border p-3 text-xs">
                {selectedPages.slice(0, 20).map((page) => (
                  <li key={page._id} className="truncate">
                    {page.title} &mdash; /{page.slug}
                  </li>
                ))}
                {selectedPages.length > 20 && (
                  <li className="pt-1 font-semibold">
                    …and {selectedPages.length - 20} more
                  </li>
                )}
              </ul>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  disabled={bulkDeleting}
                  onClick={() => setOpenBulkDialog(false)}
                  className="text-black border"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleBulkDeletePages}
                  disabled={bulkDeleting}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  {bulkDeleting ? "Deleting…" : "Delete"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    );
  }

  // 2. DYNAMIC PAGE EDITOR VIEW
  if (loadingPage) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="text-neutral-500 text-sm mt-2">Fetching landing page configurations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full mx-auto pb-20">
      
      {/* Header Info */}
      <div className="flex items-center gap-4 border-b pb-5">
        <button
          type="button"
          onClick={() => {
            setSelectedPageId(null);
            fetchPagesList();
          }}
          className="p-2 border rounded-lg text-neutral-500 hover:bg-neutral-50 bg-white shadow-sm transition-colors"
          title="Back to List"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-800 flex items-center gap-2">
            <Settings className="h-7 w-7 text-orange-500" />
            Edit Landing Page: <span className="text-orange-500">{pageTitle}</span>
          </h1>
          <p className="text-neutral-400 text-xs mt-0.5">
            Database Document ID: <code className="bg-slate-100 px-1 border rounded">{selectedPageId}</code>
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        <button
          onClick={() => setActiveTab("hero")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "hero" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <Compass size={15} />
          1. Hero Section
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "stats" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <BarChart2 size={15} />
          2. Stats Bar
        </button>
        <button
          onClick={() => setActiveTab("confidence")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "confidence" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <Sparkles size={15} />
          3. Build Confidence
        </button>
        <button
          onClick={() => setActiveTab("curriculumFlex")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "curriculumFlex" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <BookOpen size={15} />
          4. Curriculum & Flexibility
        </button>
        <button
          onClick={() => setActiveTab("moreAbout")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "moreAbout" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <MessageCircle size={15} />
          5. More About & Reviews
        </button>
        <button
          onClick={() => setActiveTab("why")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "why" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <FileText size={15} />
          6. Why Take a Trial
        </button>
        <button
          onClick={() => setActiveTab("onboarding")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "onboarding" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <Layers size={15} />
          7. How It Works (4 Steps)
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "skills" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <BookOpen size={15} />
          8. Assessments & Curricula
        </button>
        <button
          onClick={() => setActiveTab("choose")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "choose" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <LayoutGrid size={15} />
          9. Why Parents Choose Us
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "faq" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <HelpCircle size={15} />
          10. Audience & FAQs
        </button>
        <button
          onClick={() => setActiveTab("cta")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "cta" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <UserCheck size={15} />
          11. Bottom CTA Banner
        </button>
        <button
          onClick={() => setActiveTab("seo")}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === "seo" ? "bg-orange-500 text-white shadow-sm" : "bg-white border text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          <Globe size={15} />
          12. SEO & Social Meta
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-8">
        
        {/* TAB 1: HERO SECTION */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              
              <div className="bg-orange-50/30 border border-orange-100 rounded-lg p-4 space-y-3 mb-4">
                <h4 className="text-sm font-bold text-orange-800">Landing Page URL Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Page Title / Identification</label>
                    <input
                      type="text"
                      required
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      placeholder="e.g. Dubai Summer Camp"
                      className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500/20 bg-white text-black font-semibold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">URL path (Page Slug)</label>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-neutral-400 font-medium select-none">
                        {typeof window !== "undefined" ? window.location.origin : ""}/
                      </span>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. trial-landing"
                        className="flex-1 px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500/20 bg-white text-black font-semibold text-sm"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-500 block leading-relaxed">
                  Changing the Page Slug automatically updates the web URL immediately. The landing page matches the custom path prefix and falls back to a 404 handler on old paths.
                </span>
              </div>

              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Hero Text & Slogans</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Hero Badge Text</label>
                  <input
                    type="text"
                    value={heroBadgeText}
                    onChange={(e) => setHeroBadgeText(e.target.value)}
                    placeholder="e.g. Free Trial Class"
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Hero Heading (Pre-Highlight)</label>
                  <input
                    type="text"
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    placeholder="e.g. Discover Your Child's"
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Highlight Text (Orange word)</label>
                  <input
                    type="text"
                    value={heroHeadingHighlight}
                    onChange={(e) => setHeroHeadingHighlight(e.target.value)}
                    placeholder="e.g. Arabic"
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Hero Subtitle</label>
                  <input
                    type="text"
                    value={heroSubheading}
                    onChange={(e) => setHeroSubheading(e.target.value)}
                    placeholder="e.g. Start With a Free Trial Class"
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description Paragraph 1</label>
                  <textarea
                    value={heroDescription1}
                    onChange={(e) => setHeroDescription1(e.target.value)}
                    rows={3}
                    placeholder="Provide details..."
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description Paragraph 2</label>
                  <textarea
                    value={heroDescription2}
                    onChange={(e) => setHeroDescription2(e.target.value)}
                    rows={3}
                    placeholder="Provide details..."
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors bg-white text-black"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Hero Illustration & Checklist</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Hero Student Graphic</label>
                  <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center relative">
                    <input
                      type="file"
                      id="hero-image-file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setHeroImageFile(e.target.files[0]);
                          setHeroImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="hero-image-file" className="cursor-pointer text-center group">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-orange-500 group-hover:underline">Choose New Image</span>
                    </label>
                    {heroImagePreview && (
                      <div className="mt-4 w-32 h-32 bg-slate-50 rounded border flex items-center justify-center p-1 relative">
                        <img src={heroImagePreview} alt="Hero Preview" className="max-w-full max-h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => { setHeroImageFile(null); setHeroImagePreview(heroImageUrl || ""); }}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 text-[10px] hover:bg-red-600 font-bold px-1.5"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="block text-sm font-medium text-neutral-700">
                    Checklist Bullet points ({heroBullets.length})
                  </span>
                  {heroBullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-400">#{idx + 1}</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => handleHeroBulletChange(idx, e.target.value)}
                        placeholder="Bullet text..."
                        className="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-orange-500/20 text-xs bg-white text-black"
                      />
                      <button
                        type="button"
                        onClick={() => removeHeroBullet(idx)}
                        aria-label={`Remove bullet ${idx + 1}`}
                        className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 border rounded-lg transition-colors shrink-0"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHeroBullet}
                    className="mt-1 text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Bullet
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Hero CTA Button Label</label>
                  <input
                    type="text"
                    value={heroCtaText}
                    onChange={(e) => setHeroCtaText(e.target.value)}
                    placeholder="Book My Child's Free Trial"
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Hero CTA Subtext</label>
                  <input
                    type="text"
                    value={heroCtaSubtext}
                    onChange={(e) => setHeroCtaSubtext(e.target.value)}
                    placeholder="For UAE School Students | KG – Grade 6"
                    className="w-full px-3.5 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 bg-white text-black"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STATS BAR SECTION */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                    <BarChart2 className="text-orange-500" size={20} />
                    Social Proof / Stats Bar Section
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Display key metrics (students, teachers, classes, schools) directly below the hero section.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={statsShow}
                    onChange={(e) => setStatsShow(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4"
                  />
                  <span className="text-xs font-bold text-neutral-700">Show Section on Page</span>
                </label>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-bold text-neutral-700">
                    Stats Metrics ({statsItems.length} cards)
                  </label>
                  <button
                    type="button"
                    onClick={addStatItem}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-bold rounded-lg transition-colors border border-orange-200"
                  >
                    <Plus size={14} /> Add Metric
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {statsItems.map((item, idx) => (
                    <div key={idx} className="p-4 border rounded-xl bg-neutral-50/50 space-y-3 relative">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-bold text-neutral-700">Metric #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeStatItem(idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove Metric"
                        >
                          <Trash size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1">Value (Count)</label>
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleStatItemChange(idx, "value", e.target.value)}
                            placeholder="e.g. 3,500+"
                            className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1">Title / Label</label>
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => handleStatItemChange(idx, "label", e.target.value)}
                            placeholder="e.g. Happy Students"
                            className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={item.desc}
                          onChange={(e) => handleStatItemChange(idx, "desc", e.target.value)}
                          placeholder="e.g. Students from different schools learning Arabic with confidence."
                          className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white text-black resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Accent Color</label>
                          <input
                            type="text"
                            value={item.color || "#FB6238"}
                            onChange={(e) => handleStatItemChange(idx, "color", e.target.value)}
                            placeholder="#FB6238"
                            className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Icon BG</label>
                          <input
                            type="text"
                            value={item.bgColor || "#FFF2EE"}
                            onChange={(e) => handleStatItemChange(idx, "bgColor", e.target.value)}
                            placeholder="#FFF2EE"
                            className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Icon</label>
                          <select
                            value={item.icon || "Users"}
                            onChange={(e) => handleStatItemChange(idx, "icon", e.target.value)}
                            className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                          >
                            <option value="Users">Users (Students)</option>
                            <option value="GraduationCap">Graduation Cap (Teachers)</option>
                            <option value="MonitorPlay">Monitor Play (Classes)</option>
                            <option value="School">School / Building</option>
                            <option value="BookOpen">Book Open</option>
                            <option value="Target">Target</option>
                            <option value="Gift">Gift</option>
                            <option value="CheckCircle2">Check Circle</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: CONFIDENCE & COMMUNICATION SECTION */}
        {activeTab === "confidence" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                    <Sparkles className="text-orange-500" size={20} />
                    Build Confidence & Communication (4 Core Skills)
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Showcase your communication-first methodology and the 4 core Arabic skills (Speak, Read, Write, Listen).
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={confidenceShow}
                    onChange={(e) => setConfidenceShow(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4"
                  />
                  <span className="text-xs font-bold text-neutral-700">Show Section on Page</span>
                </label>
              </div>

              {/* Left Column Settings (Intro card) */}
              <div className="bg-orange-50/20 border border-orange-100 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-orange-800">Intro Card Content (Left Column)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={confidenceBadge}
                      onChange={(e) => setConfidenceBadge(e.target.value)}
                      placeholder="Why Choose Arabic Juniors?"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Heading (use Enter for new line)</label>
                    <input
                      type="text"
                      value={confidenceHeading}
                      onChange={(e) => setConfidenceHeading(e.target.value)}
                      placeholder="Build Confidence.\nImprove Communication."
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={confidenceDescription}
                    onChange={(e) => setConfidenceDescription(e.target.value)}
                    placeholder="Our teaching approach focuses on real life communication rather than memorization..."
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black resize-none"
                  />
                </div>
              </div>

              {/* Skill Cards */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-bold text-neutral-700">
                    Skill Cards ({confidenceCards.length} cards)
                  </label>
                  <button
                    type="button"
                    onClick={addConfidenceCard}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-bold rounded-lg transition-colors border border-orange-200"
                  >
                    <Plus size={14} /> Add Skill Card
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {confidenceCards.map((card, idx) => (
                    <div key={idx} className="p-4 border rounded-xl bg-neutral-50/50 space-y-3 relative">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-xs font-bold text-neutral-700">Card #{idx + 1}: {card.englishLabel}</span>
                        <button
                          type="button"
                          onClick={() => removeConfidenceCard(idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Remove Card"
                        >
                          <Trash size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1">Arabic Word (Top)</label>
                          <input
                            type="text"
                            value={card.arabicWord}
                            onChange={(e) => handleConfidenceCardChange(idx, "arabicWord", e.target.value)}
                            placeholder="تحدّث"
                            className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-600 mb-1">English Label (Bottom)</label>
                          <input
                            type="text"
                            value={card.englishLabel}
                            onChange={(e) => handleConfidenceCardChange(idx, "englishLabel", e.target.value)}
                            placeholder="Speak"
                            className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white text-black"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-600 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) => handleConfidenceCardChange(idx, "description", e.target.value)}
                          placeholder="Improve speaking skills through real conversations"
                          className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white text-black resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Accent Color</label>
                          <input
                            type="text"
                            value={card.color || "#FB6238"}
                            onChange={(e) => handleConfidenceCardChange(idx, "color", e.target.value)}
                            placeholder="#FB6238"
                            className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Icon BG</label>
                          <input
                            type="text"
                            value={card.bgColor || "#FFF2EE"}
                            onChange={(e) => handleConfidenceCardChange(idx, "bgColor", e.target.value)}
                            placeholder="#FFF2EE"
                            className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Icon</label>
                          <select
                            value={card.icon || "MessagesSquare"}
                            onChange={(e) => handleConfidenceCardChange(idx, "icon", e.target.value)}
                            className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                          >
                            <option value="MessagesSquare">Chat / Speech (Speak)</option>
                            <option value="BookOpen">Book Open (Read)</option>
                            <option value="Pencil">Pencil (Write)</option>
                            <option value="Headphones">Headphones (Listen)</option>
                            <option value="Users">Users</option>
                            <option value="GraduationCap">Graduation Cap</option>
                            <option value="School">School</option>
                            <option value="Target">Target</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: CURRICULUM & FLEXIBILITY SECTION */}
        {activeTab === "curriculumFlex" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
              
              {/* Header & Toggle */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                    <BookOpen className="text-orange-500" size={20} />
                    Curriculum Alignment & Flexible Learning Section
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Manage UAE & International Curriculums, Feature Checklist, Flexible Learning Benefits, and Student Graphic.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={curriculumFlexShow}
                    onChange={(e) => setCurriculumFlexShow(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4"
                  />
                  <span className="text-xs font-bold text-neutral-700">Show Section on Page</span>
                </label>
              </div>

              {/* Two Column Grid for Curriculum vs Flexible Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Column 1: Curriculum Settings */}
                <div className="bg-orange-50/20 border border-orange-100 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-orange-800 flex items-center gap-1.5">
                    <Sparkles size={16} /> UAE Curriculum Box (Left Part)
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Badge Pill</label>
                      <input
                        type="text"
                        value={curriculumBadge}
                        onChange={(e) => setCurriculumBadge(e.target.value)}
                        placeholder="UAE School Curriculum Expert"
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Heading</label>
                      <input
                        type="text"
                        value={curriculumHeading}
                        onChange={(e) => setCurriculumHeading(e.target.value)}
                        placeholder="Aligned with UAE School Curriculum"
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={curriculumDescription}
                      onChange={(e) => setCurriculumDescription(e.target.value)}
                      placeholder="We specialize in Arabic for UAE schools..."
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Curriculum Badges / Emblems (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={curriculumBadgesList.join(", ")}
                      onChange={(e) =>
                        setCurriculumBadgesList(
                          e.target.value
                            .split(",")
                            .map((b) => b.trim())
                            .filter(Boolean)
                        )
                      }
                      placeholder="UAE MOE, CBSE, British, IB, American"
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                    />
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      Supports: UAE MOE, CBSE, British, IB, American (automatically renders matching circular emblems)
                    </span>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-3 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-neutral-700">
                        Checklist Bullet Points ({curriculumChecklist.length})
                      </label>
                      <button
                        type="button"
                        onClick={addChecklistItem}
                        className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-bold rounded-lg border border-orange-200"
                      >
                        <Plus size={13} /> Add Item
                      </button>
                    </div>

                    <div className="space-y-2">
                      {curriculumChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-xs font-bold text-orange-500">✓</span>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handleChecklistChange(idx, e.target.value)}
                            placeholder="e.g. Grade KG to 12"
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-black"
                          />
                          <button
                            type="button"
                            onClick={() => removeChecklistItem(idx)}
                            className="text-red-400 hover:text-red-600 p-1"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column 2: Flexible Learning Settings */}
                <div className="bg-neutral-50/60 border rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                    <Layers size={16} className="text-purple-600" /> Flexible Learning Benefits (Middle Part)
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Badge Pill</label>
                      <input
                        type="text"
                        value={flexibleBadge}
                        onChange={(e) => setFlexibleBadge(e.target.value)}
                        placeholder="Flexible Learning"
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Heading</label>
                      <input
                        type="text"
                        value={flexibleHeading}
                        onChange={(e) => setFlexibleHeading(e.target.value)}
                        placeholder="Learn Anytime, Anywhere"
                        className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={flexibleDescription}
                      onChange={(e) => setFlexibleDescription(e.target.value)}
                      placeholder="Our online Arabic classes are designed to fit your schedule..."
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black resize-none"
                    />
                  </div>

                  {/* Feature Rows */}
                  <div className="space-y-3 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-neutral-700">
                        Feature Benefit Cards ({flexibleFeatures.length})
                      </label>
                      <button
                        type="button"
                        onClick={addFlexibleFeature}
                        className="flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 hover:bg-purple-100 text-xs font-bold rounded-lg border border-purple-200"
                      >
                        <Plus size={13} /> Add Feature
                      </button>
                    </div>

                    <div className="space-y-3">
                      {flexibleFeatures.map((feat, idx) => (
                        <div key={idx} className="p-3.5 border rounded-lg bg-white space-y-2.5 relative">
                          <div className="flex items-center justify-between border-b pb-1.5">
                            <span className="text-xs font-bold text-neutral-700">Feature #{idx + 1}: {feat.title}</span>
                            <button
                              type="button"
                              onClick={() => removeFlexibleFeature(idx)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <Trash size={13} />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Title</label>
                              <input
                                type="text"
                                value={feat.title}
                                onChange={(e) => handleFlexibleFeatureChange(idx, "title", e.target.value)}
                                placeholder="Flexible Class Scheduling"
                                className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Subtext</label>
                              <input
                                type="text"
                                value={feat.subtext}
                                onChange={(e) => handleFlexibleFeatureChange(idx, "subtext", e.target.value)}
                                placeholder="Choose timings that fit your routine"
                                className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Icon</label>
                              <select
                                value={feat.icon || "Calendar"}
                                onChange={(e) => handleFlexibleFeatureChange(idx, "icon", e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                              >
                                <option value="Calendar">Calendar</option>
                                <option value="Users">Users</option>
                                <option value="Video">Video / Live</option>
                                <option value="BarChart3">Bar Chart / Progress</option>
                                <option value="GraduationCap">Graduation Cap</option>
                                <option value="School">School</option>
                                <option value="MessagesSquare">Chat</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Color</label>
                              <input
                                type="text"
                                value={feat.color || "#FB6238"}
                                onChange={(e) => handleFlexibleFeatureChange(idx, "color", e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Background</label>
                              <input
                                type="text"
                                value={feat.bgColor || "#FFF2EE"}
                                onChange={(e) => handleFlexibleFeatureChange(idx, "bgColor", e.target.value)}
                                className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Graphic / Image Upload Card */}
              <div className="bg-slate-50/50 border rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                  <ImageIcon size={16} className="text-blue-600" /> Student Graphic / Artwork (Right Part)
                </h4>
                <p className="text-xs text-neutral-500">
                  Upload a custom artwork or photograph for the right student card. By default, the high-res 3D student girl illustration is used.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center relative w-full sm:w-64 bg-white">
                    <input
                      type="file"
                      id="flexible-image-file"
                      onChange={handleFlexibleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="flexible-image-file" className="cursor-pointer text-center group">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-orange-500 group-hover:underline">Choose New Image</span>
                    </label>
                  </div>

                  {flexibleImagePreview && (
                    <div className="w-36 h-36 bg-white rounded-xl border p-2 relative flex items-center justify-center shadow-sm">
                      <img
                        src={flexibleImagePreview}
                        alt="Curriculum Preview"
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                      {flexibleImageFile && (
                        <button
                          type="button"
                          onClick={() => {
                            setFlexibleImageFile(null);
                            setFlexibleImagePreview(flexibleImageUrl || "/online_learning_girl.jpg");
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 text-[10px] hover:bg-red-600 font-bold px-1.5 shadow"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: MORE ABOUT ARABIC JUNIORS & REVIEWS */}
        {activeTab === "moreAbout" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
              
              {/* Header & Toggle */}
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                    <MessageCircle className="text-orange-500" size={20} />
                    More About Arabic Juniors & Parent Reviews
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1">
                    Manage the 6 feature highlights (with expandable details) and parent testimonial review cards with star ratings.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer bg-neutral-50 hover:bg-neutral-100 px-3 py-1.5 rounded-lg border">
                  <input
                    type="checkbox"
                    checked={moreAboutShow}
                    onChange={(e) => setMoreAboutShow(e.target.checked)}
                    className="rounded text-orange-500 focus:ring-orange-500 h-4 w-4"
                  />
                  <span className="text-xs font-bold text-neutral-700">Show Section on Page</span>
                </label>
              </div>

              {/* Section Centered Heading */}
              <div className="bg-orange-50/20 border border-orange-100 rounded-xl p-4">
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Main Section Heading (Centered Top)
                </label>
                <input
                  type="text"
                  value={moreAboutHeading}
                  onChange={(e) => setMoreAboutHeading(e.target.value)}
                  placeholder="More About Arabic Juniors"
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white text-black font-semibold"
                />
              </div>

              {/* Two Column Grid: Features List (Left) & Testimonials (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Column 1: Feature Highlights (Left Card) */}
                <div className="bg-neutral-50/60 border rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                      <Sparkles size={16} className="text-orange-500" />
                      Feature Highlights ({moreAboutFeatures.length})
                    </h4>
                    <button
                      type="button"
                      onClick={addMoreAboutFeature}
                      className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-600 hover:bg-orange-100 text-xs font-bold rounded-lg border border-orange-200"
                    >
                      <Plus size={13} /> Add Feature
                    </button>
                  </div>

                  <div className="space-y-3.5 max-h-[700px] overflow-y-auto pr-1">
                    {moreAboutFeatures.map((feat, idx) => (
                      <div key={idx} className="p-3.5 border rounded-lg bg-white space-y-2.5 relative shadow-sm">
                        <div className="flex items-center justify-between border-b pb-1.5">
                          <span className="text-xs font-bold text-neutral-700">Feature #{idx + 1}: {feat.title}</span>
                          <button
                            type="button"
                            onClick={() => removeMoreAboutFeature(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash size={13} />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Title</label>
                          <input
                            type="text"
                            value={feat.title}
                            onChange={(e) => handleMoreAboutFeatureChange(idx, "title", e.target.value)}
                            placeholder="Native & Experienced Arabic Teachers"
                            className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Short Summary</label>
                          <textarea
                            rows={2}
                            value={feat.description}
                            onChange={(e) => handleMoreAboutFeatureChange(idx, "description", e.target.value)}
                            placeholder="Learn from native and certified Arabic teachers..."
                            className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Expanded Detail (When (+) clicked)</label>
                          <textarea
                            rows={2}
                            value={feat.detailedText || ""}
                            onChange={(e) => handleMoreAboutFeatureChange(idx, "detailedText", e.target.value)}
                            placeholder="Additional details shown when student clicks plus button..."
                            className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Icon</label>
                            <select
                              value={feat.icon || "GraduationCap"}
                              onChange={(e) => handleMoreAboutFeatureChange(idx, "icon", e.target.value)}
                              className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                            >
                              <option value="GraduationCap">Graduation Cap</option>
                              <option value="Users">Users (1-to-1)</option>
                              <option value="Monitor">Monitor (Kids)</option>
                              <option value="School">School / Courses</option>
                              <option value="MonitorPlay">Monitor Play / Online</option>
                              <option value="HeartHandshake">Heart Handshake / Support</option>
                              <option value="BookOpen">Book Open</option>
                              <option value="Calendar">Calendar</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Color</label>
                            <input
                              type="text"
                              value={feat.color || "#0062FC"}
                              onChange={(e) => handleMoreAboutFeatureChange(idx, "color", e.target.value)}
                              placeholder="#0062FC"
                              className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Background</label>
                            <input
                              type="text"
                              value={feat.bgColor || "#EBF4FF"}
                              onChange={(e) => handleMoreAboutFeatureChange(idx, "bgColor", e.target.value)}
                              placeholder="#EBF4FF"
                              className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                            />
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

                {/* Column 2: Parent Reviews (Right Card) */}
                <div className="bg-neutral-50/60 border rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      Parent Testimonials ({testimonialsList.length})
                    </h4>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="flex items-center gap-1 px-2.5 py-1 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 text-xs font-bold rounded-lg border border-yellow-200"
                    >
                      <Plus size={13} /> Add Review
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Heading Prefix</label>
                      <input
                        type="text"
                        value={testimonialsHeading}
                        onChange={(e) => setTestimonialsHeading(e.target.value)}
                        placeholder="What Parents Say About"
                        className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">Highlight Word (Orange)</label>
                      <input
                        type="text"
                        value={testimonialsHeadingHighlight}
                        onChange={(e) => setTestimonialsHeadingHighlight(e.target.value)}
                        placeholder="Arabic Juniors"
                        className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-black"
                      />
                    </div>
                  </div>

                  <div className="space-y-3.5 max-h-[700px] overflow-y-auto pr-1">
                    {testimonialsList.map((item, idx) => (
                      <div key={idx} className="p-3.5 border rounded-lg bg-white space-y-2.5 relative shadow-sm">
                        <div className="flex items-center justify-between border-b pb-1.5">
                          <span className="text-xs font-bold text-neutral-700">Review #{idx + 1}: {item.name}</span>
                          <button
                            type="button"
                            onClick={() => removeTestimonial(idx)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash size={13} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Parent Name</label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleTestimonialChange(idx, "name", e.target.value)}
                              placeholder="Fatima Al Mansoori"
                              className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Role / City</label>
                            <input
                              type="text"
                              value={item.role}
                              onChange={(e) => handleTestimonialChange(idx, "role", e.target.value)}
                              placeholder="Parent, Dubai"
                              className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Review Quote</label>
                          <textarea
                            rows={2}
                            value={item.quote}
                            onChange={(e) => handleTestimonialChange(idx, "quote", e.target.value)}
                            placeholder="Arabic Juniors has been a wonderful experience..."
                            className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2 items-center">
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Star Rating</label>
                            <select
                              value={item.rating || 5}
                              onChange={(e) => handleTestimonialChange(idx, "rating", Number(e.target.value))}
                              className="w-full px-2 py-1 border rounded text-xs bg-white text-black"
                            >
                              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                              <option value={3}>⭐⭐⭐ (3 Stars)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-neutral-600 mb-0.5">Avatar Image URL</label>
                            <input
                              type="text"
                              value={item.avatarUrl || ""}
                              onChange={(e) => handleTestimonialChange(idx, "avatarUrl", e.target.value)}
                              placeholder="/parent_fatima.jpg"
                              className="w-full px-2.5 py-1 border rounded text-xs bg-white text-black"
                            />
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: VALUE PROPOSITIONS */}
        {activeTab === "why" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Why Take a Trial (Section 2) Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={whySubheader}
                    onChange={(e) => setWhySubheader(e.target.value)}
                    placeholder="Why Take a Trial?"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Main Title Heading</label>
                  <input
                    type="text"
                    value={whyHeading}
                    onChange={(e) => setWhyHeading(e.target.value)}
                    placeholder="Before You Enrol..."
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Section Description</label>
                <textarea
                  value={whyDescription}
                  onChange={(e) => setWhyDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 pl-1">
                <h3 className="text-lg font-semibold text-neutral-800">Cards Value Proposition Configuration ({whyCards.length})</h3>
                <button
                  type="button"
                  onClick={addWhyCard}
                  className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Card
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {whyCards.map((card, idx) => (
                  <div key={idx} className="bg-white border rounded-xl shadow-sm p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Card #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeWhyCard(idx)}
                        aria-label={`Remove card ${idx + 1}`}
                        className="p-1 text-red-500 hover:text-white hover:bg-red-500 border rounded-lg transition-colors shrink-0"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleWhyCardChange(idx, "title", e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Description</label>
                      <textarea
                        value={card.desc}
                        onChange={(e) => handleWhyCardChange(idx, "desc", e.target.value)}
                        rows={3}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Card Icon</label>
                      <select
                        value={card.icon || "FileText"}
                        onChange={(e) => handleWhyCardChange(idx, "icon", e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black font-medium"
                      >
                        <option value="FileText">📄 FileText (Document)</option>
                        <option value="Monitor">💻 Monitor (Laptop/Computer)</option>
                        <option value="UserCheck">👤 UserCheck (Teacher/Person)</option>
                        <option value="HeartHandshake">🤝 HeartHandshake (Feedback)</option>
                        <option value="BookOpen">📖 BookOpen (Reading)</option>
                        <option value="Edit">✏️ Edit (Writing)</option>
                        <option value="Mic">🎙️ Mic (Speaking)</option>
                        <option value="Headphones">🎧 Headphones (Listening)</option>
                        <option value="Brain">🧠 Brain (Knowledge)</option>
                        <option value="Sparkles">✨ Sparkles (Evaluation)</option>
                        <option value="CheckCircle">✅ CheckCircle (Success)</option>
                        <option value="GraduationCap">🎓 GraduationCap (Education)</option>
                        <option value="Award">🏆 Award (Achievement)</option>
                        <option value="Star">⭐ Star (Rating)</option>
                        <option value="Target">🎯 Target (Goal)</option>
                        <option value="Clock">⏰ Clock (Time)</option>
                        <option value="ShieldCheck">🛡️ ShieldCheck (Trust)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">What Happens During The Trial (Section 3) Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={processSubheader}
                    onChange={(e) => setProcessSubheader(e.target.value)}
                    placeholder="What Happens During The Trial?"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Process Main Title Heading</label>
                  <input
                    type="text"
                    value={processHeading}
                    onChange={(e) => setProcessHeading(e.target.value)}
                    placeholder="A Simple 4-Step Process"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: WHY PARENTS CHOOSE US (SECTION 5) */}
        {activeTab === "choose" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">More Than Just a Demo (Section 5) Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={chooseSubheader}
                    onChange={(e) => setChooseSubheader(e.target.value)}
                    placeholder="Why Parents Choose Our Trial"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Main Title Heading</label>
                  <input
                    type="text"
                    value={chooseHeading}
                    onChange={(e) => setChooseHeading(e.target.value)}
                    placeholder="More Than Just a Demo Class"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 pl-1">
                <h3 className="text-lg font-semibold text-neutral-800">Cards Value Grid Configuration ({chooseCards.length})</h3>
                <button
                  type="button"
                  onClick={addChooseCard}
                  className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Card
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {chooseCards.map((card, idx) => (
                  <div key={idx} className="bg-white border rounded-xl shadow-sm p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Choose Card #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeChooseCard(idx)}
                        aria-label={`Remove card ${idx + 1}`}
                        className="p-1 text-red-500 hover:text-white hover:bg-red-500 border rounded-lg transition-colors shrink-0"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleChooseCardChange(idx, "title", e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Description</label>
                      <textarea
                        value={card.desc}
                        onChange={(e) => handleChooseCardChange(idx, "desc", e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Card Icon</label>
                      <select
                        value={card.icon || "BookOpen"}
                        onChange={(e) => handleChooseCardChange(idx, "icon", e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black font-medium"
                      >
                        <option value="BookOpen">📖 BookOpen (Reading)</option>
                        <option value="FileText">📄 FileText (Document)</option>
                        <option value="Monitor">💻 Monitor (Laptop/Computer)</option>
                        <option value="UserCheck">👤 UserCheck (Teacher/Person)</option>
                        <option value="HeartHandshake">🤝 HeartHandshake (Feedback)</option>
                        <option value="Edit">✏️ Edit (Writing)</option>
                        <option value="Mic">🎙️ Mic (Speaking)</option>
                        <option value="Headphones">🎧 Headphones (Listening)</option>
                        <option value="Brain">🧠 Brain (Knowledge)</option>
                        <option value="Sparkles">✨ Sparkles (Evaluation)</option>
                        <option value="CheckCircle">✅ CheckCircle (Success)</option>
                        <option value="GraduationCap">🎓 GraduationCap (Education)</option>
                        <option value="Award">🏆 Award (Achievement)</option>
                        <option value="Star">⭐ Star (Rating)</option>
                        <option value="Target">🎯 Target (Goal)</option>
                        <option value="Clock">⏰ Clock (Time)</option>
                        <option value="ShieldCheck">🛡️ ShieldCheck (Trust)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HOW IT WORKS (4 STEPS TIMELINE) */}
        {activeTab === "onboarding" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Getting Started Is Easy (Section 6) Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={onboardingSubheader}
                    onChange={(e) => setOnboardingSubheader(e.target.value)}
                    placeholder="How It Works"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Main Title Heading</label>
                  <input
                    type="text"
                    value={onboardingHeading}
                    onChange={(e) => setOnboardingHeading(e.target.value)}
                    placeholder="Getting Started Is Easy"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 pl-1">
                <h3 className="text-lg font-semibold text-neutral-800">Step Cards Configuration ({onboardingSteps.length})</h3>
                <button
                  type="button"
                  onClick={addOnboardingStep}
                  className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Step
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {onboardingSteps.map((step, idx) => (
                  <div key={idx} className="bg-white border rounded-xl shadow-sm p-5 space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Step #{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-full bg-blue-600">Circle #{step.num}</span>
                        <button
                        type="button"
                        onClick={() => removeOnboardingStep(idx)}
                        aria-label={`Remove step ${idx + 1}`}
                        className="p-1 text-red-500 hover:text-white hover:bg-red-500 border rounded-lg transition-colors shrink-0"
                      >
                        <Trash size={13} />
                      </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Step Title</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleOnboardingStepChange(idx, "title", e.target.value)}
                        className="w-full px-2.5 py-1.5 border rounded-lg text-xs bg-white text-black font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Step Description</label>
                      <textarea
                        value={step.desc}
                        onChange={(e) => handleOnboardingStepChange(idx, "desc", e.target.value)}
                        rows={3}
                        className="w-full px-2.5 py-1.5 border rounded-lg text-xs bg-white text-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ASSESSMENTS & CURRICULA */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Skills Evaluation (Section 4) Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={assessSubheader}
                    onChange={(e) => setAssessSubheader(e.target.value)}
                    placeholder="What Do We Assess?"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Main Title Heading</label>
                  <input
                    type="text"
                    value={assessTitle}
                    onChange={(e) => setAssessTitle(e.target.value)}
                    placeholder="A Trial Designed Around Your Child"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Section Description</label>
                <textarea
                  value={assessDescription}
                  onChange={(e) => setAssessDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 pl-1">
                <h3 className="text-lg font-semibold text-neutral-800">Radial skills Hub Detail ({assessSkills.length})</h3>
                <button
                  type="button"
                  onClick={addAssessSkill}
                  className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add Skill
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assessSkills.map((skill, idx) => (
                  <div key={idx} className="bg-white border rounded-xl shadow-sm p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Skill #{idx + 1}: {skill.title}</span>
                      <button
                        type="button"
                        onClick={() => removeAssessSkill(idx)}
                        aria-label={`Remove skill ${idx + 1}`}
                        className="p-1 text-red-500 hover:text-white hover:bg-red-500 border rounded-lg transition-colors shrink-0"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={skill.title}
                        onChange={(e) => handleSkillChange(idx, "title", e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Description</label>
                      <textarea
                        value={skill.desc}
                        onChange={(e) => handleSkillChange(idx, "desc", e.target.value)}
                        rows={2}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1">Skill Icon</label>
                      <select
                        value={skill.icon || "BookOpen"}
                        onChange={(e) => handleSkillChange(idx, "icon", e.target.value)}
                        className="w-full px-2 py-1.5 border rounded-lg text-xs bg-white text-black font-medium"
                      >
                        <option value="BookOpen">📖 BookOpen (Reading)</option>
                        <option value="Edit">✏️ Edit (Writing)</option>
                        <option value="Mic">🎙️ Mic (Speaking)</option>
                        <option value="Headphones">🎧 Headphones (Listening)</option>
                        <option value="Brain">🧠 Brain (Grammar/Vocabulary)</option>
                        <option value="Sparkles">✨ Sparkles (Evaluation)</option>
                        <option value="CheckCircle">✅ CheckCircle (Assessment)</option>
                        <option value="GraduationCap">🎓 GraduationCap (Education)</option>
                        <option value="Award">🏆 Award (Achievement)</option>
                        <option value="Star">⭐ Star (Rating)</option>
                        <option value="Target">🎯 Target (Goal)</option>
                        <option value="Clock">⏰ Clock (Time)</option>
                        <option value="ShieldCheck">🛡️ ShieldCheck (Trust)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">UAE School Curricula Badges Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={curriculaSubheader}
                    onChange={(e) => setCurriculaSubheader(e.target.value)}
                    placeholder="Arabic Support For UAE Curricula"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Main Title Heading</label>
                  <input
                    type="text"
                    value={curriculaTitle}
                    onChange={(e) => setCurriculaTitle(e.target.value)}
                    placeholder="We Support All Major UAE School Curricula"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Curricula Description</label>
                <textarea
                  value={curriculaDescription}
                  onChange={(e) => setCurriculaDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">School Board Badges (Comma-separated list)</label>
                <input
                  type="text"
                  value={curriculaBadges.join(", ")}
                  onChange={(e) => setCurriculaBadges(e.target.value.split(",").map(b => b.trim()).filter(Boolean))}
                  placeholder="UAE MOE, CBSE, British, IB, American"
                  className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                />
                <span className="text-xs text-neutral-400 mt-1 block">Separate badges using a comma (e.g. CBSE, IB, UAE MOE)</span>
              </div>

              {/* Curricula Skyline Image Uploader */}
              <div className="pt-4 border-t space-y-3">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5 font-semibold">UAE Curricula Bottom Image (Dubai Skyline Illustration)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center relative">
                    <input
                      type="file"
                      id="curricula-image-file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setCurriculaImageFile(e.target.files[0]);
                          setCurriculaImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="curricula-image-file" className="cursor-pointer text-center group">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-orange-500 group-hover:underline">Choose New Image</span>
                    </label>
                    {curriculaImagePreview && (
                      <div className="mt-4 w-44 h-24 bg-slate-50 rounded border flex items-center justify-center p-1 relative overflow-hidden">
                        <img src={curriculaImagePreview} alt="Skyline Preview" className="max-w-full max-h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => { setCurriculaImageFile(null); setCurriculaImagePreview(curriculaImageUrl || ""); }}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 text-[10px] hover:bg-red-600 font-bold px-1.5 z-10"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 leading-relaxed">
                    This image represents the Dubai Skyline illustration at the bottom of the UAE Curricula card in Section 4. Upload any new PNG/JPG/SVG graphic to change this image.
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: AUDIENCE & FAQS */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Suitability Checklist & Student Image</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange Subheader</label>
                  <input
                    type="text"
                    value={suitabilitySubheader}
                    onChange={(e) => setSuitabilitySubheader(e.target.value)}
                    placeholder="Who Is The Trial For?"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black mb-4"
                  />
                  
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Title Heading</label>
                  <input
                    type="text"
                    value={suitabilityTitle}
                    onChange={(e) => setSuitabilityTitle(e.target.value)}
                    placeholder="Is This Right for Your Child?"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black mb-4"
                  />

                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">List Description</label>
                  <input
                    type="text"
                    value={suitabilityDescription}
                    onChange={(e) => setSuitabilityDescription(e.target.value)}
                    placeholder="Our trial class is ideal for UAE school students who:"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Checklist Suitability Bullets</label>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                    {suitabilityBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleSuitabilityBulletChange(idx, e.target.value)}
                          className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-black"
                        />
                        <button
                          type="button"
                          onClick={() => removeSuitabilityBullet(idx)}
                          className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 border rounded-lg transition-colors shrink-0"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addSuitabilityBullet}
                    className="mt-3 text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Checklist Item
                  </button>
                </div>
              </div>

              <div className="border-t pt-5">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Student Portrait Graphic (Suitability Card Base)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center relative">
                    <input
                      type="file"
                      id="suitability-image-file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setSuitabilityImageFile(e.target.files[0]);
                          setSuitabilityImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="suitability-image-file" className="cursor-pointer text-center group">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-orange-500 group-hover:underline">Choose New Image</span>
                    </label>
                    {suitabilityImagePreview && (
                      <div className="mt-4 w-32 h-32 bg-slate-50 rounded border flex items-center justify-center p-1 relative">
                        <img src={suitabilityImagePreview} alt="Suitability Preview" className="max-w-full max-h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => { setSuitabilityImageFile(null); setSuitabilityImagePreview(suitabilityImageUrl || ""); }}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 text-[10px] hover:bg-red-600 font-bold px-1.5"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 leading-normal">
                    This image is aligned to the bottom right of the child suitability card. Transparent background PNG illustration is recommended. Defaults to the child reading books illustration.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Frequently Asked Questions Editor</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">FAQ Orange Subheader</label>
                  <input
                    type="text"
                    value={faqSubheader}
                    onChange={(e) => setFaqSubheader(e.target.value)}
                    placeholder="Frequently Asked Questions"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">FAQ Main Title Heading</label>
                  <input
                    type="text"
                    value={faqTitle}
                    onChange={(e) => setFaqTitle(e.target.value)}
                    placeholder="Frequently Asked Questions"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-3 border-t">
                <span className="block text-sm font-medium text-neutral-700">FAQ Question & Answer Pairs ({faqItems.length})</span>
                <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                  {faqItems.map((item, idx) => (
                    <div key={idx} className="bg-neutral-50/50 p-4 border rounded-lg space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => removeFaqItem(idx)}
                        className="absolute top-2 right-2 p-1.5 text-neutral-400 hover:text-red-500 hover:bg-neutral-100 border rounded-lg transition-colors"
                      >
                        <Trash size={14} />
                      </button>
                      
                      <div className="grid grid-cols-1 gap-2 pr-6">
                        <div>
                          <label className="block text-xs font-bold text-neutral-500 mb-1">Question #{idx + 1}</label>
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                            placeholder="Enter question..."
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-black font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-500 mb-1">Answer</label>
                          <textarea
                            value={item.answer}
                            onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                            placeholder="Enter answer..."
                            rows={2}
                            className="w-full px-3 py-1.5 border rounded-lg text-xs bg-white text-black"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addFaqItem}
                  className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
                >
                  <Plus size={14} /> Add FAQ Question
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: CTA BANNER */}
        {activeTab === "cta" && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
              <h3 className="text-lg font-semibold text-neutral-800 border-b pb-2">Final Call to Action Banner</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Banner Main Heading</label>
                  <input
                    type="text"
                    value={ctaHeading}
                    onChange={(e) => setCtaHeading(e.target.value)}
                    placeholder="Ready to See Your Child Grow..."
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Banner Description</label>
                  <textarea
                    value={ctaDescription}
                    onChange={(e) => setCtaDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Orange CTA Button Label</label>
                  <input
                    type="text"
                    value={ctaButtonText}
                    onChange={(e) => setCtaButtonText(e.target.value)}
                    placeholder="Book a Free Trial Class Today"
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">CTA Button Subtext</label>
                  <input
                    type="text"
                    value={ctaSubtext}
                    onChange={(e) => setCtaSubtext(e.target.value)}
                    placeholder="No long-term commitment..."
                    className="w-full px-3.5 py-2 border rounded-lg bg-white text-black"
                  />
                </div>
              </div>

              <div className="border-t pt-5">
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Teacher Illustration (CTA Banner Left Side)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="border border-dashed rounded-lg p-5 flex flex-col items-center justify-center relative">
                    <input
                      type="file"
                      id="cta-image-file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setCtaImageFile(e.target.files[0]);
                          setCtaImagePreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="cta-image-file" className="cursor-pointer text-center group">
                      <Upload className="h-8 w-8 text-neutral-400 group-hover:text-orange-500 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-orange-500 group-hover:underline">Choose New Image</span>
                    </label>
                    {ctaImagePreview && (
                      <div className="mt-4 w-32 h-32 bg-slate-50 rounded border flex items-center justify-center p-1 relative">
                        <img src={ctaImagePreview} alt="CTA Preview" className="max-w-full max-h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => { setCtaImageFile(null); setCtaImagePreview(ctaImageUrl || ""); }}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 text-[10px] hover:bg-red-600 font-bold px-1.5"
                        >
                          Reset
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 leading-normal">
                    This image is aligned to the left of the banner, surrounded by floating purple letters. Transparent background PNG illustration is recommended. Defaults to the female hijab teacher avatar.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: SEO & SOCIAL META */}
        {activeTab === "seo" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header info */}
            <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-orange-500 text-white rounded-lg shadow-sm">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800">
                    Search Engine Optimization (SEO) & Social Sharing
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Configure Google search preview, indexing permissions, meta tags, and Open Graph previews for WhatsApp, Facebook, LinkedIn and Twitter.
                  </p>
                </div>
              </div>
            </div>

            {/* Google SERP Live Preview Box */}
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="text-xs font-semibold text-neutral-500 ml-2">Google Search Live SERP Preview</span>
                </div>
                <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium border border-blue-100">
                  Desktop & Mobile Preview
                </span>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-lg border border-slate-200/80 space-y-1.5 font-sans">
                {/* Domain & Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">
                    AJ
                  </div>
                  <span className="font-medium text-neutral-700">Arabic Juniors</span>
                  <span className="text-neutral-400">›</span>
                  <span className="text-neutral-500 truncate max-w-xs">
                    https://arabicjuniors.com/{slug || "trial-landing"}
                  </span>
                </div>

                {/* Search Title */}
                <h4 className="text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                  {metaTitle || pageTitle || "Book Free Arabic Trial Class | Arabic Juniors"}
                </h4>

                {/* Search Description */}
                <p className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                  {metaDescription ||
                    "Book a 100% Free Live 1-on-1 Arabic Trial Class for Kids & Teens. Master speaking, reading, writing & school curriculum with native certified teachers."}
                </p>

                {/* Rich Snippet Preview */}
                <div className="flex items-center gap-3 pt-1 text-xs text-neutral-500">
                  <span className="text-amber-500 font-semibold flex items-center gap-1">
                    ★★★★★ <span className="text-neutral-700 font-normal">Rating: 4.9 · 1,500+ reviews</span>
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Free (AED 0)</span>
                </div>
              </div>
            </div>

            {/* Core SEO Meta Form */}
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
              <h4 className="text-base font-bold text-neutral-800 flex items-center gap-2">
                <FileText size={18} className="text-orange-500" />
                Meta Tags & Robots Indexing
              </h4>

              <div className="space-y-4">
                {/* Meta Title */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-semibold text-neutral-700">
                      SEO Meta Title
                    </label>
                    <span className={`text-xs font-mono ${metaTitle.length > 60 ? "text-amber-600 font-bold" : "text-neutral-400"}`}>
                      {metaTitle.length}/60 characters {metaTitle.length > 60 && "(Recommended max 60)"}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="e.g. Book Free Arabic Trial Class | Arabic Juniors"
                    className="w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-neutral-900 bg-white"
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    Appears in browser tabs and as the primary title in search engine results. Leave blank to fallback to default page title.
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-semibold text-neutral-700">
                      SEO Meta Description
                    </label>
                    <span className={`text-xs font-mono ${metaDescription.length > 160 ? "text-amber-600 font-bold" : "text-neutral-400"}`}>
                      {metaDescription.length}/160 characters {metaDescription.length > 160 && "(Recommended max 160)"}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="e.g. Book a 100% Free Live 1-on-1 Arabic Trial Class for Kids & Teens. Master speaking, reading, writing & school curriculum with native certified teachers."
                    className="w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-neutral-900 bg-white leading-relaxed"
                  />
                  <p className="text-xs text-neutral-400 mt-1">
                    Brief summary displayed under the link in search results. Compelling descriptions improve click-through rates.
                  </p>
                </div>

                {/* Keywords & Canonical */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Meta Keywords (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      placeholder="arabic for kids, online tutor dubai, learn arabic uae"
                      className="w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-neutral-900 bg-white"
                    />
                    <p className="text-xs text-neutral-400 mt-1">
                      Key search terms relevant to this specific landing page.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Canonical URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder={`https://arabicjuniors.com/${slug || "trial-landing"}`}
                      className="w-full px-3.5 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-neutral-900 bg-white"
                    />
                    <p className="text-xs text-neutral-400 mt-1">
                      Leave blank to auto-use current page URL as canonical reference.
                    </p>
                  </div>
                </div>

                {/* Robots Indexing Toggle */}
                <div className="pt-3 border-t">
                  <label className="flex items-center gap-3 cursor-pointer p-3.5 rounded-lg border bg-neutral-50/60 hover:bg-neutral-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={indexPage}
                      onChange={(e) => setIndexPage(e.target.checked)}
                      className="h-5 w-5 text-orange-500 rounded border-neutral-300 focus:ring-orange-400"
                    />
                    <div>
                      <span className="text-sm font-semibold text-neutral-800 block">
                        Allow Search Engines to Index this Page (index, follow)
                      </span>
                      <span className="text-xs text-neutral-500">
                        {indexPage 
                          ? "✓ Active: Google, Bing and other search engines are permitted to index and rank this page." 
                          : "✕ Noindex: Search engines are instructed NOT to index this page (robots: noindex, nofollow)."}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Social Share & Open Graph Card */}
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h4 className="text-base font-bold text-neutral-800 flex items-center gap-2">
                  <Share2 size={18} className="text-orange-500" />
                  Social Media & WhatsApp Card (Open Graph)
                </h4>
                <span className="text-xs text-neutral-400">Preview 1200 x 630</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Upload Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Social Share Image (OG Image)
                    </label>
                    <div className="border-2 border-dashed border-neutral-200 hover:border-orange-400 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors">
                      <input
                        type="file"
                        id="og-image-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setOgImageFile(e.target.files[0]);
                            setOgImagePreview(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                      <label htmlFor="og-image-upload" className="cursor-pointer group flex flex-col items-center">
                        <div className="p-3 bg-orange-50 text-orange-500 rounded-full group-hover:scale-105 transition-transform mb-2">
                          <Upload className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-bold text-neutral-800 group-hover:text-orange-600">
                          Upload Custom Social Banner
                        </span>
                        <span className="text-[11px] text-neutral-400 mt-1">
                          Recommended: 1200 × 630 px (PNG, JPG, WebP)
                        </span>
                      </label>
                    </div>
                  </div>

                  {ogImagePreview && (
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border">
                      <span className="text-xs text-neutral-600 font-medium truncate max-w-xs">
                        {ogImageFile ? `File: ${ogImageFile.name}` : "Current Active Image"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setOgImageFile(null);
                          setOgImagePreview(ogImageUrl || "");
                        }}
                        className="text-xs font-bold text-red-600 hover:text-red-700 px-2 py-1 rounded bg-red-50 border border-red-200"
                      >
                        Reset
                      </button>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 leading-relaxed">
                    <p className="font-semibold mb-1">💡 What is Open Graph?</p>
                    When parents or staff share this page link on <strong>WhatsApp, Facebook, Twitter, iMessage, or LinkedIn</strong>, this custom image and text appears automatically as the link preview card.
                  </div>
                </div>

                {/* Social Card Live Preview */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                    WhatsApp & Social Card Preview
                  </label>
                  <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-sm bg-neutral-50">
                    <div className="aspect-[1.91/1] w-full bg-slate-100 overflow-hidden relative flex items-center justify-center">
                      {ogImagePreview ? (
                        <img
                          src={ogImagePreview}
                          alt="Open Graph Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 flex flex-col items-center justify-center text-white p-6 text-center">
                          <span className="text-2xl font-black tracking-tight mb-1">Arabic Juniors</span>
                          <span className="text-sm font-semibold opacity-95">Free 1-on-1 Trial Class</span>
                          <span className="text-xs opacity-75 mt-2">Default Social Banner</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-white border-t space-y-1">
                      <p className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">
                        ARABICJUNIORS.COM
                      </p>
                      <h5 className="text-sm font-bold text-neutral-900 line-clamp-1">
                        {metaTitle || pageTitle || "Book Free Arabic Trial Class | Arabic Juniors"}
                      </h5>
                      <p className="text-xs text-neutral-500 line-clamp-2">
                        {metaDescription ||
                          "Book a 100% Free Live 1-on-1 Arabic Trial Class for Kids & Teens. Master speaking, reading, writing & school curriculum."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Save bar */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 py-3 px-8 rounded-lg text-white font-medium bg-gradient-to-r from-[#FF60A8] to-[#FB6238] hover:from-[#e05493] hover:to-[#e05731] disabled:opacity-50 transition-all shadow-md"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving Trial Settings...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Landing Settings
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
