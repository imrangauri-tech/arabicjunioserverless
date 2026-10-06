import { Metadata } from "next";
import React from "react";
import { getLandingPage } from "./getLandingPage";
import { cityFromSlug } from "./components/landingContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug || "dubai";
  const city = cityFromSlug(slug);

  const defaultMeta: Metadata = {
    title: `Arabic Classes & Arabic Tuition in ${city} | Arabic Juniors`,
    description: `Join expert-led Arabic tuition online in ${city} & UAE. Affordable one-to-one Arabic language classes for UAE students, schools & UAE curriculum. Book your class now.`,
    alternates: {
      canonical: `https://arabicjuniors.com/${slug}`,
    },
    keywords: [
      `Arabic for kids ${city}`,
      "UAE MOE curriculum",
      `Arabic classes ${city}`,
      "online Arabic tutor UAE",
      `learn Arabic ${city}`,
      "CBSE Arabic tuition",
    ],
    openGraph: {
      title: `Arabic Classes & Arabic Tuition in ${city} | Arabic Juniors`,
      description: `Affordable Arabic tuition for students in ${city} & across UAE. Online classes available.`,
      url: `https://arabicjuniors.com/${slug}`,
      siteName: "Arabic Juniors",
      locale: "en_AE",
      type: "website",
      images: [
        {
          url: "https://arabicjuniors.com/hero-arabic-kid.jpg",
          width: 1200,
          height: 630,
          alt: `Arabic Classes in ${city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Arabic Classes & Arabic Tuition in ${city} | Arabic Juniors`,
      description: `Affordable Arabic tuition for students in ${city} & across UAE.`,
      images: ["https://arabicjuniors.com/hero-arabic-kid.jpg"],
    },
  };

  const result = await getLandingPage(slug);
  if (result.status !== "ok") return defaultMeta;
  const settings = result.page;

  const title = settings.metaTitle || settings.title || String(defaultMeta.title);
  const description =
    settings.metaDescription || settings.hero?.subheading || String(defaultMeta.description);
  const keywords = settings.metaKeywords
    ? settings.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
    : defaultMeta.keywords;

  const canonical = settings.canonicalUrl || `https://arabicjuniors.com/${slug}`;
  const rawOg = settings.ogImageUrl || settings.hero?.imageUrl || "/hero-arabic-kid.jpg";
  const ogImage = rawOg.startsWith("http") ? rawOg : `https://arabicjuniors.com${rawOg}`;
  const allowIndex = settings.indexPage !== false;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: {
      index: allowIndex,
      follow: allowIndex,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Arabic Juniors",
      locale: "en_AE",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: String(title) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function TrialLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
