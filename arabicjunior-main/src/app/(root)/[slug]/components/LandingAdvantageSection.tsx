import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { LandingAdvantage } from "@/types/TrialLanding";
import { LandingIcon } from "./landingContent";

export default function LandingAdvantageSection({
  data,
}: {
  data: LandingAdvantage;
}) {
  const hasLeft = data.leftFeatures.length > 0;

  return (
    <section className="relative overflow-hidden bg-[#FCF9F6] py-16 md:py-24 border-t border-[#F0EAE3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ================= 3-COLUMN MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-start">

          {/* ----- LEFT COLUMN: Features Stack (3 cols) ----- */}
          {hasLeft && (
            <div className="lg:col-span-3 flex flex-col space-y-3.5">
              {data.leftFeatures.map((feat, index) => (
                <Reveal
                  key={index}
                  variant="rise"
                  delay={50 + index * 50}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#EBE4DC] hover:border-[#FFD0BD] shadow-2xs hover:shadow-xs transition-all duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FFD5C0] mt-0.5">
                    <LandingIcon name={feat.icon} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-xs sm:text-[12.5px] font-bold text-[#0D1B2A] tracking-tight leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-[10.5px] sm:text-[11px] text-[#64748B] leading-snug mt-0.5">
                      {feat.subtitle}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* ----- CENTER COLUMN: Main Story & Mini Pillars (6 cols) ----- */}
          <div className={`${hasLeft ? "lg:col-span-6" : "lg:col-span-9"} flex flex-col space-y-5`}>
            <Reveal variant="rise" delay={100}>
              {/* Badge */}
              {data.badge && (
                <div className="inline-flex items-center">
                  <span className="rounded-full bg-[#FFEADC] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#E04B14]">
                    {data.badge}
                  </span>
                </div>
              )}

              {/* Heading */}
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0D1B2A] tracking-tight leading-[1.16]">
                {data.title} <br />
                {data.titleHighlightPrefix && (
                  <span className="text-[#0D1B2A]">{data.titleHighlightPrefix} </span>
                )}
                <span className="text-[#FF5A1F]">{data.titleHighlight}</span>
              </h2>

              {/* Orange Accent Line */}
              <div className="mt-3 h-1 w-14 rounded-full bg-[#FF5A1F]" />

              {/* Story Paragraphs */}
              <div className="mt-4 space-y-3 text-xs sm:text-[13px] text-[#4A5568] leading-relaxed">
                {data.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* Mini Pillar Cards */}
            {data.pillars.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#F0EAE3]">
                {data.pillars.map((pillar, idx) => (
                  <Reveal
                    key={idx}
                    variant="rise"
                    delay={200 + idx * 50}
                    className="flex flex-col items-start p-3 rounded-xl bg-white/70 border border-[#EBE4DC]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FFD5C0] mb-2">
                      <LandingIcon name={pillar.icon} className="w-4 h-4 text-[#FF5A1F]" />
                    </div>
                    <h4 className="text-xs font-bold text-[#0D1B2A] tracking-tight leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-[10.5px] text-[#64748B] leading-tight mt-1">
                      {pillar.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* ----- RIGHT COLUMN: Conversion Card & Trust Points (3 cols) ----- */}
          <div className="lg:col-span-3">
            <Reveal variant="rise" delay={150} className="relative rounded-3xl bg-white border border-[#EBE4DC] p-5 sm:p-6 shadow-xs">

              {/* Top Right Radiant Burst Accent */}
              <div className="absolute top-4 right-4 pointer-events-none">
                <svg className="w-6 h-6 text-[#FF5A1F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="6" y1="6" x2="12" y2="12" />
                  <line x1="18" y1="4" x2="18" y2="10" />
                </svg>
              </div>

              {/* Header Label */}
              {data.sidebarLabel && (
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FF5A1F]">
                  <span>—</span>
                  <span>{data.sidebarLabel}</span>
                </div>
              )}

              {/* Heading */}
              <h3 className="mt-1 text-xl sm:text-2xl font-black text-[#0D1B2A] leading-tight tracking-tight">
                {data.sidebarTitle}
              </h3>

              {/* Underline */}
              <div className="mt-2.5 h-1 w-12 rounded-full bg-[#FF5A1F]" />

              {/* Paragraph */}
              <p className="mt-3 text-xs sm:text-[12.5px] text-[#4A5568] leading-relaxed">
                {data.sidebarText}
              </p>

              {/* Dual CTA Buttons */}
              <div className="mt-5 flex flex-col space-y-2.5">
                {data.primaryCtaText && (
                  <Button
                    asChild
                    className="w-full rounded-xl bg-[#FF5A1F] hover:bg-[#E04B14] text-white font-bold py-5 text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
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
                    className="w-full rounded-xl border-2 border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FFF2EA] hover:text-[#E04B14] font-bold py-5 text-xs sm:text-sm transition-all"
                  >
                    <Link href={data.secondaryCtaUrl || "/pricing"} className="inline-flex items-center justify-center gap-2">
                      {data.secondaryCtaText}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Trust Checkmarks */}
              {data.trustPoints.length > 0 && (
                <div className="mt-6 flex flex-col space-y-2.5 pt-4 border-t border-[#F0EAE3]">
                  {data.trustPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-[#0D1B2A]">
                      <LandingIcon name={pt.icon} className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                      <span className="text-[11.5px] leading-tight">{pt.text}</span>
                    </div>
                  ))}
                </div>
              )}

            </Reveal>
          </div>

        </div>

        {/* ================= BOTTOM STATS STRIP ================= */}
        {data.stats.length > 0 && (
          <Reveal variant="rise" delay={200} className="mt-10 sm:mt-12">
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#EBE4DC] p-5 sm:p-7 shadow-xs">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                {data.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3.5 ${
                      idx !== 0 ? "md:border-l md:border-[#F0EAE3] md:pl-6" : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FFD5C0]">
                      <LandingIcon name={stat.icon} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl font-black text-[#0D1B2A] tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-xs sm:text-[13px] font-medium text-[#64748B]">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}
