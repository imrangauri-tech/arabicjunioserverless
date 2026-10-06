import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { LandingWhyChoose } from "@/types/TrialLanding";
import { LandingIcon } from "./landingContent";

export default function LandingWhyChooseUsSection({
  data,
}: {
  data: LandingWhyChoose;
}) {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F2] py-16 md:py-24 border-t border-[#F0EAE3]">

      {/* Top Right Decorative Radiant Accent */}
      <div className="absolute top-6 right-6 pointer-events-none hidden md:block opacity-80">
        <svg className="w-10 h-10 text-[#FF5A1F]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          <line x1="10" y1="10" x2="18" y2="18" />
          <line x1="26" y1="6" x2="26" y2="16" />
          <line x1="34" y1="14" x2="26" y2="20" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ================= HEADER ================= */}
        <Reveal variant="rise" delay={50} className="max-w-4xl">
          {/* Badge */}
          {data.badge && (
            <div className="inline-flex items-center">
              <span className="rounded-full bg-[#FFEADC] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#E04B14]">
                {data.badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0D1B2A] tracking-tight leading-[1.15]">
            {data.titlePrefix} <span className="text-[#FF5A1F]">{data.titleHighlight1}</span> <br />
            <span className="text-[#FF5A1F]">{data.titleHighlight2}</span> {data.titleSuffix}
          </h2>

          {/* Orange Accent Line */}
          <div className="mt-3 h-1 w-14 rounded-full bg-[#FF5A1F]" />

          {/* Intro Description */}
          {data.introText && (
            <p className="mt-4 text-xs sm:text-[13.5px] text-[#4A5568] leading-relaxed max-w-3xl">
              {data.introText}
            </p>
          )}
        </Reveal>

        {/* ================= FEATURES GRID (2 COLS) ================= */}
        {data.features.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {data.features.map((feat, index) => (
              <Reveal
                key={index}
                variant="rise"
                delay={100 + index * 60}
                className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#EBE4DC] hover:border-[#FFD0BD] shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FFD5C0] group-hover:scale-105 group-hover:bg-[#FFEADC] transition-all duration-300 mt-0.5">
                  <LandingIcon name={feat.icon} />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-[#0D1B2A] tracking-tight group-hover:text-[#FF5A1F] transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mt-1">
                    {feat.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* ================= BOTTOM ORANGE CTA CARD ================= */}
        {(data.ctaTitle || data.primaryCtaText || data.secondaryCtaText) && (
          <Reveal variant="rise" delay={200} className="mt-10 sm:mt-12">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF5A1F] to-[#E04B14] p-6 sm:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">

              {/* Left with Star Icon and Description */}
              <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-auto">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#FF5A1F] shadow-md">
                  <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-[#FF5A1F] text-[#FF5A1F]" />
                </div>
                <div className="hidden sm:block h-12 w-[1.5px] bg-white/20" />
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight">
                    {data.ctaTitle}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed mt-1 max-w-2xl">
                    {data.ctaDescription}
                  </p>
                </div>
              </div>

              {/* Right with Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                {data.primaryCtaText && (
                  <Button
                    asChild
                    className="rounded-xl bg-[#FF7A45] hover:bg-[#E84F18] border border-white/30 text-white font-bold px-6 py-5 text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
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
                    className="rounded-xl bg-white hover:bg-white/95 text-[#FF5A1F] font-bold px-6 py-5 text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-[1.02]"
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
