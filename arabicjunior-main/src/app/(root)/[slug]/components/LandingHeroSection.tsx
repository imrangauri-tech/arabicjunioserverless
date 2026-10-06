import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { LandingHero } from "@/types/TrialLanding";
import { LandingIcon, RichText } from "./landingContent";

export default function LandingHeroSection({ data }: { data: LandingHero }) {
  const heroImage = data.imageUrl || "/hero-arabic-kid.jpg";

  return (
    <section className="relative overflow-hidden bg-yellow-100 pt-8 sm:pt-12 md:pt-14 pb-10">
      {/* Background Soft Ambient Blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-100/60 via-orange-100/40 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-tl from-orange-100/50 via-orange-100/30 to-transparent blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ================= HERO TOP GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column Content (6 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
            <Reveal variant="rise" delay={50}>
              {/* Pill Badge */}
              {data.badge && (
                <div className="inline-flex items-center">
                  <span className="rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-600">
                    {data.badge}
                  </span>
                </div>
              )}

              {/* Main Heading */}
              <h1 className="mt-3 text-3xl sm:text-5xl xl:text-[50px] font-bold text-neutral-800 leading-[1.14]">
                {data.titleLine1} <br />
                {data.titleLine2} <span className="text-orange-500">{data.titleHighlight}</span>
              </h1>

              {/* Subheading */}
              {data.subheading && (
                <h2 className="mt-3.5 text-base sm:text-lg lg:text-xl font-bold text-neutral-800 leading-snug">
                  {data.subheading}
                </h2>
              )}

              {/* Description Body */}
              {data.description && (
                <div className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
                  <p>
                    <RichText text={data.description} />
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                {data.primaryCtaText && (
                  <Button
                    asChild
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-6 text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
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
                    className="rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-100 hover:text-orange-600 font-bold px-7 py-6 text-sm sm:text-base transition-all duration-300"
                  >
                    <Link href={data.secondaryCtaUrl || "/pricing"} className="inline-flex items-center justify-center gap-2">
                      {data.secondaryCtaText}
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </Link>
                  </Button>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Hero Visual with Organic Curved Mask & Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <Reveal variant="scale" delay={150} className="w-full relative">

              {/* Organic Soft Shape Behind Photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 via-orange-100 to-transparent rounded-[2.5rem] sm:rounded-[3rem] -z-10 transform translate-x-2 translate-y-2" />

              {/* Image Container with Organic Rounded Corners */}
              <div className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[2.75rem] shadow-xl border-4 border-white aspect-[16/10] sm:aspect-[16/10] bg-orange-100">
                <Image
                  src={heroImage}
                  alt={data.imageAlt || "Student learning Arabic online with Arabic Juniors"}
                  fill
                  priority
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>

              {/* Stack of Floating Spec Cards on Top Right */}
              {data.floatingCards.length > 0 && (
                <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 flex flex-col space-y-2 z-20 max-w-[190px] sm:max-w-[220px]">
                  {data.floatingCards.map((card, index) => (
                    <Reveal
                      key={index}
                      variant="rise"
                      delay={250 + index * 70}
                      className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-orange-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
                    >
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 border border-orange-200">
                        <LandingIcon name={card.icon} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10.5px] sm:text-[11.5px] font-bold text-neutral-800 leading-snug">
                          {card.title}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 truncate">
                          {card.subtitle}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}

            </Reveal>
          </div>

        </div>

        {/* ================= BOTTOM STRIP / TRUST BAR ================= */}
        {data.bottomFeatures.length > 0 && (
          <div className="mt-10 sm:mt-14 pt-6 border-t border-neutral-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {data.bottomFeatures.map((item, index) => (
                <Reveal
                  key={index}
                  variant="rise"
                  delay={200 + index * 60}
                  className="group flex items-start gap-3 p-3 rounded-2xl bg-white border border-neutral-100 hover:border-orange-300 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 border border-orange-200 group-hover:scale-105 group-hover:bg-orange-100 transition-all duration-300 mt-0.5">
                    <LandingIcon name={item.icon} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm sm:text-[15px] font-bold text-neutral-800 group-hover:text-orange-500 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-snug mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
