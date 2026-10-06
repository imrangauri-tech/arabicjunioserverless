import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeacherHeroSection, { type TeacherHeroData } from "../components/TeacherHeroSection";
import TeacherAboutStorySection from "../components/TeacherAboutStorySection";
import TeachersCta from "../components/TeachersCta";
import { FaqSection } from "@/components/homepage";
import { REVALIDATE_SECONDS, fetchSettings } from "@/lib/contentApi";
import type { Teacher } from "@/types/Teacher";
import type { TeachersPageContent } from "@/types/TeachersPage";

type TeacherResult =
  | { status: "ok"; teacher: Teacher }
  | { status: "missing" }
  | { status: "error" };

/**
 * A 404 from the API (unknown or unpublished teacher) is a real 404; failing to
 * reach the API is not, or a sleeping server would de-index every profile.
 */
async function getTeacher(slug: string): Promise<TeacherResult> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return { status: "error" };

  try {
    const res = await fetch(`${base}/teachers/${encodeURIComponent(slug)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (res.status === 404) return { status: "missing" };
    if (!res.ok) return { status: "error" };
    const json = await res.json();
    return json?.data ? { status: "ok", teacher: json.data as Teacher } : { status: "missing" };
  } catch {
    return { status: "error" };
  }
}

/** Only the filled-in facts become spec cards; an empty field is not a "—" row. */
const buildSpecs = (teacher: Teacher): TeacherHeroData["specs"] =>
  [
    { icon: "GraduationCap", label: "Qualification", value: teacher.education },
    { icon: "Star", label: "Experience", value: teacher.experience },
    { icon: "MapPin", label: "Country", value: teacher.country },
    { icon: "BookOpen", label: "Teaches", value: teacher.subject },
    { icon: "Globe", label: "Languages", value: teacher.languages },
  ].filter((spec): spec is TeacherHeroData["specs"][number] => Boolean(spec.value?.trim()));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getTeacher(slug);
  if (result.status !== "ok") {
    return { title: "Our Arabic Teachers | Arabic Juniors" };
  }

  const { teacher } = result;
  const title = `${teacher.name} – ${teacher.profession} | Arabic Juniors`;
  const description = (teacher.bio || teacher.shortDescription || "").slice(0, 160);
  const url = `https://arabicjuniors.com/our-teachers/${teacher.slug ?? slug}`;
  const image = teacher.portrait || teacher.image;
  const ogImage = image?.startsWith("http") ? image : `https://arabicjuniors.com${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Arabic Juniors",
      type: "profile",
      images: image ? [{ url: ogImage, alt: teacher.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [ogImage] : undefined,
    },
  };
}

export default async function TeacherDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [result, pageContent] = await Promise.all([
    getTeacher(slug),
    fetchSettings<TeachersPageContent>("/teachers-page"),
  ]);

  if (result.status === "missing") notFound();
  if (result.status === "error") {
    // Thrown, not a 404: a regeneration keeps serving the last good copy.
    throw new Error(`Teacher profile "${slug}" could not be loaded`);
  }

  const { teacher } = result;
  const profile = pageContent?.profilePage;

  const hero: TeacherHeroData = {
    badge: profile?.badge ?? "OUR TEACHERS",
    salutation: profile?.salutation ?? "Meet",
    name: teacher.name,
    bio: teacher.bio || teacher.shortDescription || "",
    // The portrait is the tall photo this frame is shaped for.
    image: teacher.portrait || teacher.image,
    quote: teacher.quote || "",
    quoteAuthor: teacher.name,
    specs: buildSpecs(teacher),
    photoBadge: teacher.photoBadge || "",
    photoTitle: teacher.photoTitle || "",
    photoTitleHighlight: teacher.photoTitleHighlight || "",
    photoHighlights: teacher.photoHighlights ?? [],
  };

  const verified =
    profile && profile.verifiedShow !== false
      ? {
          badge: profile.verifiedBadge,
          title: profile.verifiedTitle,
          titleHighlight: profile.verifiedTitleHighlight,
          subtitle: profile.verifiedSubtitle,
          cards: profile.verifiedCards ?? [],
        }
      : null;

  const faqs = (profile?.faqs ?? []).map((faq, index) => ({
    key: `teacher-faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <main className="min-h-screen bg-white">
      {/* 1st Section: Hero Overview & Highlight Details */}
      <TeacherHeroSection data={hero} />

      {/* 2nd Section: About Me Story & Verified Teachers Trust Cards */}
      <TeacherAboutStorySection
        teacher={{
          label: profile?.aboutLabel ?? "ABOUT ME",
          salutation: profile?.salutation ?? "Meet",
          name: teacher.name,
          role: teacher.profession,
          introParagraph: teacher.aboutIntro || teacher.shortDescription || "",
          philosophies: teacher.philosophies ?? [],
        }}
        verified={verified}
      />

      {/* Action / Trial CTA */}
      {profile?.ctaShow !== false && (
        <TeachersCta
          heading={profile?.ctaHeading ?? ""}
          subtext={profile?.ctaSubtext ?? ""}
          buttonLabel={profile?.ctaButtonLabel ?? ""}
          buttonUrl={profile?.ctaButtonUrl || "/register"}
          className="pt-6 sm:pt-8 pb-2 sm:pb-3"
        />
      )}

      {/* FAQ */}
      {profile?.faqShow !== false && faqs.length > 0 && (
        <FaqSection faqData={faqs} className="pt-6 md:pt-10 pb-12" />
      )}
    </main>
  );
}
