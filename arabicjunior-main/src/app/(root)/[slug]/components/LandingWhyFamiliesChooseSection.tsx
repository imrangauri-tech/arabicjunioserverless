import React from "react";
import Link from "next/link";
import { Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { LandingFamilies } from "@/types/TrialLanding";
import { LandingIcon } from "./landingContent";

export default function LandingWhyFamiliesChooseSection({
  data,
}: {
  data: LandingFamilies;
}) {
  return (
    <section className="relative overflow-hidden bg-yellow-100 py-16 md:py-24 border-t border-neutral-100">

      {/* Top Right Radiant Rays Accent */}
      <div className="absolute top-6 right-6 pointer-events-none hidden md:block opacity-80">
        <svg className="w-10 h-10 text-orange-500" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          <line x1="10" y1="10" x2="18" y2="18" />
          <line x1="26" y1="6" x2="26" y2="16" />
          <line x1="34" y1="14" x2="26" y2="20" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ================= 2-COLUMN UPPER SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* ----- LEFT COLUMN: Benefits & Intro (6 cols) ----- */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <Reveal variant="rise" delay={50}>
              {/* Badge */}
              {data.badge && (
                <div className="inline-flex items-center">
                  <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600">
                    {data.badge}
                  </span>
                </div>
              )}

              {/* Main Heading */}
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-800 leading-[1.15]">
                {data.titlePrefix} <br />
                <span className="text-orange-500">{data.titleHighlight}</span>
              </h2>

              {/* Orange Accent Line */}
              <div className="mt-3 h-1 w-14 rounded-full bg-orange-500" />

              {/* Intro Text */}
              {data.leftIntro && (
                <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {data.leftIntro}
                </p>
              )}
            </Reveal>

            {/* Key Benefits Boxed Container */}
            {data.benefits.length > 0 && (
              <Reveal variant="rise" delay={120} className="mt-4">
                <div className="rounded-3xl bg-white border border-neutral-100 p-5 sm:p-6 shadow-xs">

                  {/* Box Title with Line */}
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-800">
                      {data.benefitsBoxTitle}
                    </h3>
                    <span className="h-[2px] w-8 rounded-full bg-orange-500" />
                  </div>

                  {/* Benefits Grid (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 border border-orange-200 mt-0.5">
                          <LandingIcon name={b.icon} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-sm sm:text-[15px] font-bold text-neutral-800 leading-snug">
                            {b.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-neutral-500 leading-snug mt-0.5">
                            {b.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </Reveal>
            )}
          </div>

          {/* ----- RIGHT COLUMN: "A Better Way to Learn Arabic" (6 cols) ----- */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <Reveal variant="rise" delay={100}>
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 leading-tight">
                {data.rightHeading} <span className="text-orange-500">{data.rightHeadingHighlight}</span>
              </h2>

              {/* Orange Accent Line */}
              <div className="mt-2.5 h-1 w-12 rounded-full bg-orange-500" />

              {/* Narrative Paragraphs */}
              <div className="mt-5 space-y-3.5 text-sm sm:text-[15px] text-neutral-600 leading-relaxed">
                {data.rightParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>

        </div>

        {/* ================= BOTTOM BANNER ACTION CARD ================= */}
        <Reveal variant="rise" delay={200} className="mt-10 sm:mt-12">
          <div className="rounded-2xl sm:rounded-3xl bg-orange-100 border border-orange-200 p-5 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">

            {/* Left 2 Value Proposition Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full lg:w-auto items-center">

              {/* Item 1 */}
              {data.bannerItem1Title && (
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-200 border border-orange-200">
                    <Calendar className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                      {data.bannerItem1Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-snug mt-0.5">
                      {data.bannerItem1Text}
                    </p>
                  </div>
                </div>
              )}

              {/* Item 2 */}
              {data.bannerItem2Title && (
                <div className="flex items-center gap-3.5 sm:border-l sm:border-orange-200 sm:pl-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-200 border border-orange-200">
                    <ShieldCheck className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                      {data.bannerItem2Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-snug mt-0.5">
                      {data.bannerItem2Text}
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              {data.primaryCtaText && (
                <Button
                  asChild
                  className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-5 text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Link href={data.primaryCtaUrl || "/register"} className="inline-flex items-center justify-center gap-2">
                    {data.primaryCtaText}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </Button>
              )}

              {data.secondaryCtaText && (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-2 border-orange-500 text-orange-500 hover:bg-orange-100 hover:text-orange-600 font-bold px-6 py-5 text-xs sm:text-sm transition-all"
                >
                  <Link href={data.secondaryCtaUrl || "/contact-us"} className="inline-flex items-center justify-center gap-2">
                    {data.secondaryCtaText}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </Button>
              )}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
