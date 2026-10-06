import React from "react";
import { notFound } from "next/navigation";
import LandingHeroSection from "./components/LandingHeroSection";
import LandingSchoolCurriculumSection from "./components/LandingSchoolCurriculumSection";
import LandingWhyChooseUsSection from "./components/LandingWhyChooseUsSection";
import LandingAdvantageSection from "./components/LandingAdvantageSection";
import LandingWhyFamiliesChooseSection from "./components/LandingWhyFamiliesChooseSection";
import { getLandingPage } from "./getLandingPage";

/**
 * City landing pages (/dubai, /sharjah, /trial-benefits …). Every word and image
 * comes from Admin → Trial & Landing Pages; a slug with no page there is a 404.
 */
export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getLandingPage(slug);

  if (result.status === "missing") notFound();
  if (result.status === "error") {
    // Thrown rather than rendered as a 404: during a regeneration Next keeps
    // serving the last good copy, so a brief API outage never reaches visitors.
    throw new Error(`Landing page "${slug}" could not be loaded`);
  }

  const { page } = result;

  return (
    <main className="min-h-screen bg-white">
      {/* 1st Section: Hero Section with Visuals & Bottom Trust Badges */}
      <LandingHeroSection data={page.hero} />

      {/* 2nd Section: School Curriculum Features & Bottom Action Card */}
      {page.curriculum.show && <LandingSchoolCurriculumSection data={page.curriculum} />}

      {/* 3rd Section: Why Choose Us Feature Cards & Orange CTA Card */}
      {page.whyChoose.show && <LandingWhyChooseUsSection data={page.whyChoose} />}

      {/* 4th Section: The Arabic Juniors Advantage (3-Column Layout & Stats Strip) */}
      {page.advantage.show && <LandingAdvantageSection data={page.advantage} />}

      {/* 5th Section: Why Families Choose Arabic Classes */}
      {page.families.show && <LandingWhyFamiliesChooseSection data={page.families} />}
    </main>
  );
}
