import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { iconFor } from "@/lib/sectionIcons";

export interface TeacherHeroData {
  badge: string;
  salutation: string;
  name: string;
  bio: string;
  image: string;
  quote: string;
  quoteAuthor: string;
  specs: { icon: string; label: string; value: string }[];
  photoBadge: string;
  photoTitle: string;
  photoTitleHighlight: string;
  photoHighlights: { icon: string; title: string; description: string }[];
}

const Icon = ({ name }: { name: string }) => {
  const Component = iconFor(name, "Star");
  return <Component className="w-5 h-5 text-[#FF5A1F]" />;
};

export default function TeacherHeroSection({ data }: { data: TeacherHeroData }) {
  // The right-hand column only exists when the admin filled it in; without it
  // the other two columns share the full width instead of leaving a gap.
  const hasPhotoColumn =
    data.photoHighlights.length > 0 || Boolean(data.photoTitle || data.photoTitleHighlight);
  const sideSpan = hasPhotoColumn ? "lg:col-span-4" : "lg:col-span-6";

  return (
    <section className="relative overflow-hidden bg-[#FCF9F6] py-12 md:py-20 lg:py-24">
      {/* Background Organic Ambient Blobs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#FFE8DC]/60 via-[#FFF4ED]/40 to-transparent blur-3xl -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-[#FFF2EA]/80 via-[#FFEADC]/40 to-transparent blur-2xl -z-10" />
      <div className="pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-[#FFE8DC]/50 via-[#FFF7F2]/40 to-transparent blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* ================= LEFT COLUMN: Bio & Specs ================= */}
          <div className={`${sideSpan} flex flex-col justify-center space-y-6`}>
            <Reveal variant="rise" delay={50}>
              {/* Badge */}
              {data.badge && (
                <div className="inline-flex items-center">
                  <span className="rounded-full bg-[#FFEADC] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF5A1F]">
                    {data.badge}
                  </span>
                </div>
              )}

              {/* Main Heading */}
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#0D1B2A] tracking-tight leading-[1.15]">
                {data.salutation && (
                  <>
                    {data.salutation} <br />
                  </>
                )}
                <span className="text-[#FF5A1F]">{data.name}</span>
              </h1>

              {/* Bio Paragraph */}
              {data.bio && (
                <p className="mt-4 text-sm sm:text-base font-normal text-[#4A5568] leading-relaxed">
                  {data.bio}
                </p>
              )}
            </Reveal>

            {/* Spec Cards List */}
            {data.specs.length > 0 && (
              <div className="flex flex-col space-y-3.5 pt-2">
                {data.specs.map((spec, index) => (
                  <Reveal
                    key={index}
                    variant="rise"
                    delay={100 + index * 60}
                    className="group flex items-center gap-4 p-3 rounded-2xl bg-[#FFF7F2]/70 hover:bg-[#FFF2EA] border border-[#FFE7DB]/80 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE7DB] border border-[#FFD5C0] group-hover:scale-105 transition-transform duration-300">
                      <Icon name={spec.icon} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-[#0D1B2A] tracking-tight">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-[13px] font-medium text-[#4A5568] truncate sm:whitespace-normal">
                        {spec.value}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* ================= CENTER COLUMN: Portrait & Quote ================= */}
          <div className={`${sideSpan} flex flex-col items-center justify-center relative`}>
            <Reveal variant="scale" delay={150} className="w-full max-w-[380px] lg:max-w-none relative">

              {/* Playful Burst/Rays Accent (Top Right) */}
              <div className="absolute -top-6 -right-3 sm:-top-8 sm:-right-4 z-20 pointer-events-none">
                <svg
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#FF5A1F]"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                >
                  <line x1="24" y1="6" x2="24" y2="14" />
                  <line x1="38" y1="12" x2="32" y2="18" />
                  <line x1="42" y1="26" x2="34" y2="26" />
                </svg>
              </div>

              {/* Organic Soft Shape Behind Photo */}
              <div className="absolute inset-0 -m-4 sm:-m-6 bg-gradient-to-tr from-[#FFEADB] via-[#FFF3EB] to-transparent rounded-[3rem] -z-10 transform -rotate-1" />

              {/* Main Portrait Frame */}
              <div className="relative overflow-hidden rounded-[2.25rem] sm:rounded-[2.75rem] shadow-xl border-4 border-white aspect-[3.6/4.6] bg-gradient-to-b from-orange-100/50 to-orange-50">
                <Image
                  src={data.image}
                  alt={data.name}
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 380px"
                />
              </div>

              {/* Floating Quote Card */}
              {data.quote && (
                <div className="relative -mt-12 sm:-mt-14 mx-3 sm:mx-4 z-10 rounded-2xl sm:rounded-3xl bg-[#FFF6EE]/95 backdrop-blur-md border border-[#FFE2D2] p-4 sm:p-5 shadow-lg">
                  <div className="flex items-start gap-3">
                    <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#FF5A1F] shrink-0 fill-[#FF5A1F]/20 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-[13px] italic font-medium text-[#1E293B] leading-relaxed">
                        &ldquo;{data.quote}&rdquo;
                      </p>
                      {data.quoteAuthor && (
                        <p className="mt-2 text-right text-xs font-bold text-[#FF5A1F]">
                          — {data.quoteAuthor}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          </div>

          {/* ================= RIGHT COLUMN: About the Photo ================= */}
          {hasPhotoColumn && (
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
              <Reveal variant="rise" delay={200}>
                {/* Badge */}
                {data.photoBadge && (
                  <div className="inline-flex items-center">
                    <span className="rounded-full bg-[#FFEADC] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF5A1F]">
                      {data.photoBadge}
                    </span>
                  </div>
                )}

                {/* Heading */}
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0D1B2A] tracking-tight leading-tight">
                  {data.photoTitle} <br />
                  <span className="text-[#FF5A1F]">{data.photoTitleHighlight}</span>
                </h2>

                {/* Orange Underline Divider */}
                <div className="mt-3 h-1 w-14 rounded-full bg-[#FF5A1F]" />
              </Reveal>

              {/* Persona Highlight Items List */}
              <div className="flex flex-col space-y-4 pt-1">
                {data.photoHighlights.map((item, index) => (
                  <Reveal
                    key={index}
                    variant="rise"
                    delay={250 + index * 60}
                    className="flex items-start gap-3.5 group"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] border-2 border-[#FF7A45]/40 text-[#FF5A1F] group-hover:border-[#FF5A1F] group-hover:bg-[#FFEADC] transition-all duration-300 mt-0.5">
                      <Icon name={item.icon} />
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#0D1B2A] tracking-tight group-hover:text-[#FF5A1F] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#4A5568] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
