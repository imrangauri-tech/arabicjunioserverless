import React from "react";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { LandingCurriculum } from "@/types/TrialLanding";
import { LandingIcon } from "./landingContent";

export default function LandingSchoolCurriculumSection({
  data,
}: {
  data: LandingCurriculum;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24 border-t border-neutral-100">

      {/* Decorative Dots and Accent Burst (Top Right) */}
      <div className="absolute top-8 right-6 pointer-events-none hidden md:block opacity-75">
        <div className="flex items-start gap-4">
          <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
            <pattern id="sec2-dot-grid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="2" fill="#FB6238" opacity="0.4" />
            </pattern>
            <rect width="64" height="48" fill="url(#sec2-dot-grid)" />
          </svg>
          <svg className="w-8 h-8 text-orange-500" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <line x1="8" y1="8" x2="16" y2="16" />
            <line x1="20" y1="6" x2="20" y2="14" />
            <line x1="26" y1="12" x2="20" y2="18" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ================= UPPER SECTION: Text & Features Grid ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Heading & Paragraphs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
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
                {data.title} <br />
                for <span className="text-orange-500">{data.titleHighlight}</span>
              </h2>

              {/* Orange Accent Line */}
              <div className="mt-3 h-1 w-14 rounded-full bg-orange-500" />

              {/* Paragraphs */}
              <div className="mt-5 space-y-3.5 text-sm sm:text-base text-neutral-600 leading-relaxed">
                {data.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Feature Cards Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {data.features.map((feat, index) => (
              <Reveal
                key={index}
                variant="rise"
                delay={100 + index * 60}
                className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-neutral-100 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 border border-orange-200 group-hover:scale-105 group-hover:bg-orange-100 transition-all duration-300 mt-0.5">
                  <LandingIcon name={feat.icon} />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-800 group-hover:text-orange-500 transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mt-1">
                    {feat.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

        {/* ================= BOTTOM BANNER ACTION CARD ================= */}
        {(data.bannerTitle || data.primaryCtaText || data.secondaryCtaText) && (
          <Reveal variant="rise" delay={200} className="mt-10 sm:mt-12">
            <div className="rounded-3xl bg-orange-100 border border-orange-200 p-5 sm:p-7 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs hover:shadow-sm transition-all duration-300">

              {/* Left side with Icon and Text */}
              <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-auto">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-orange-200 border border-orange-200">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
                </div>
                <div className="hidden sm:block h-10 w-[1.5px] bg-orange-200" />
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-800">
                    {data.bannerTitle}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-neutral-600 leading-snug mt-0.5">
                    {data.bannerSubtitle}
                  </p>
                </div>
              </div>

              {/* Right side with Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                {data.primaryCtaText && (
                  <Button
                    asChild
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-5 text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
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
                    className="rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-100 hover:text-orange-600 font-bold px-6 py-5 text-xs sm:text-sm transition-all duration-300"
                  >
                    <Link href={data.secondaryCtaUrl || "/pricing"} className="inline-flex items-center justify-center gap-2">
                      {data.secondaryCtaText}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </Button>
                )}
              </div>

            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}
