import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  try {
    const res = await fetch(`${baseUrl}/trial-landing/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        title: "Arabic for UAE School Students | Free 1-on-1 Trial Class | Arabic Juniors",
        description: "Book a free 1-on-1 Arabic trial class for UAE school students (KG to Grade 6). Aligned with UAE MOE, British, CBSE, IB, and American school curriculums.",
      };
    }

    const data = await res.json();
    const settings = data?.data;

    const title = settings?.metaTitle || settings?.title || "Arabic for UAE School Students | Free 1-on-1 Trial Class | Arabic Juniors";
    const description = settings?.metaDescription || settings?.heroSubheading || "Book a free 1-on-1 Arabic trial class for UAE school students (KG to Grade 6). Aligned with UAE MOE, British, CBSE, IB, and American school curriculums.";
    const keywords = settings?.metaKeywords
      ? settings.metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean)
      : [
          "Arabic for kids",
          "UAE MOE curriculum",
          "Arabic classes Dubai",
          "online Arabic tutor UAE",
          "learn Arabic Dubai",
          "CBSE Arabic tuition"
        ];
    
    const canonical = settings?.canonicalUrl || `https://arabicjuniors.com/${slug}`;
    const rawOg = settings?.ogImageUrl || settings?.heroImageUrl || "/hero-student-new.jpg";
    const ogImage = rawOg.startsWith("http") ? rawOg : `https://arabicjuniors.com${rawOg}`;
    const allowIndex = settings?.indexPage !== false;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      robots: {
        index: allowIndex,
        follow: allowIndex,
        googleBot: {
          index: allowIndex,
          follow: allowIndex,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Arabic Juniors",
        locale: "en_AE",
        type: "website",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "Arabic for UAE School Students | Free 1-on-1 Trial Class | Arabic Juniors",
      description: "Book a free 1-on-1 Arabic trial class for UAE school students (KG to Grade 6). Aligned with UAE MOE, British, CBSE, IB, and American school curriculums.",
    };
  }
}

export default async function TrialLandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
