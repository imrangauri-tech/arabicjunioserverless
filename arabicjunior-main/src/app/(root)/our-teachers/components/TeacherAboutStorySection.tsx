import React from "react";
import Reveal from "@/components/Reveal";
import { iconFor } from "@/lib/sectionIcons";

export interface TeacherAboutData {
  label: string;
  salutation: string;
  name: string;
  role: string;
  introParagraph: string;
  philosophies: { icon: string; title: string; paragraphs: string[] }[];
}

export interface VerifiedTeachersData {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  cards: { icon: string; title: string; description: string }[];
}

const Icon = ({ name, className }: { name: string; className: string }) => {
  const Component = iconFor(name, "CheckCircle2");
  return <Component className={className} />;
};

/**
 * "About me" for one teacher on the left, and the trust cards shared by every
 * profile on the right. Either half may be absent; the other then spans the row.
 */
export default function TeacherAboutStorySection({
  teacher,
  verified,
}: {
  teacher: TeacherAboutData;
  verified: VerifiedTeachersData | null;
}) {
  const hasStory = Boolean(teacher.introParagraph) || teacher.philosophies.length > 0;
  if (!hasStory && !verified) return null;

  const span = hasStory && verified ? "lg:col-span-6" : "lg:col-span-12";

  return (
    <section className="relative overflow-hidden bg-[#FAFAF8] py-16 md:py-24 border-t border-[#F0EBE6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* ================= LEFT COLUMN: About Me / Teacher Story ================= */}
          {hasStory && (
            <div className={`${span} flex flex-col space-y-7`}>
              <Reveal variant="rise">
                {/* Header Label with Line */}
                {teacher.label && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
                      {teacher.label}
                    </span>
                    <span className="h-[2px] w-8 rounded-full bg-[#FF5A1F]" />
                  </div>
                )}

                {/* Main Heading */}
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D1B2A] tracking-tight">
                  {teacher.salutation} <span className="text-[#FF5A1F]">{teacher.name}</span>
                </h2>

                {/* Subheading Role */}
                {teacher.role && (
                  <p className="mt-2 text-lg sm:text-xl font-medium text-[#1E293B]">
                    {teacher.role}
                  </p>
                )}

                {/* Intro Story Paragraph */}
                {teacher.introParagraph && (
                  <p className="mt-4 text-sm sm:text-base font-normal text-[#4A5568] leading-relaxed">
                    {teacher.introParagraph}
                  </p>
                )}
              </Reveal>

              {/* Philosophy Blocks (01, 02 …) */}
              {teacher.philosophies.length > 0 && (
                <div className="flex flex-col space-y-7 pt-2">
                  {teacher.philosophies.map((item, index) => (
                    <Reveal
                      key={index}
                      variant="rise"
                      delay={100 + index * 100}
                      className="flex flex-col space-y-3"
                    >
                      {/* Title Bar with Badges */}
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFEADC] text-xs sm:text-sm font-bold text-[#FF5A1F]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FFD5C0]">
                          <Icon name={item.icon} className="w-5 h-5 text-[#FF5A1F]" />
                        </div>
                        <div className="border-l-2 border-[#0D1B2A] pl-3 py-0.5">
                          <h3 className="text-base sm:text-lg font-bold text-[#0D1B2A] tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* Paragraphs */}
                      <div className="space-y-2.5 pl-1 text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                        {item.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= RIGHT COLUMN: Verified Teachers Trust Cards ================= */}
          {verified && (
            <div className={`${span} flex flex-col space-y-6 relative`}>

              {/* Top Right Decorative Dot Grid */}
              <div className="absolute -top-6 -right-2 pointer-events-none hidden sm:block opacity-60">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <pattern id="dot-grid-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="2" fill="#FF5A1F" />
                  </pattern>
                  <rect width="60" height="60" fill="url(#dot-grid-pattern)" />
                </svg>
              </div>

              <Reveal variant="rise" delay={150}>
                {/* Header Label with Line */}
                {verified.badge && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
                      {verified.badge}
                    </span>
                    <span className="h-[2px] w-8 rounded-full bg-[#FF5A1F]" />
                  </div>
                )}

                {/* Main Heading */}
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D1B2A] tracking-tight leading-snug">
                  {verified.title} <br />
                  <span className="text-[#FF5A1F]">{verified.titleHighlight}</span>
                </h2>

                {/* Subtext */}
                {verified.subtitle && (
                  <p className="mt-3 text-xs sm:text-sm text-[#4A5568] leading-relaxed max-w-xl">
                    {verified.subtitle}
                  </p>
                )}
              </Reveal>

              {/* Feature Cards Stack */}
              <div className="flex flex-col space-y-4 pt-2">
                {verified.cards.map((card, index) => (
                  <Reveal
                    key={index}
                    variant="rise"
                    delay={200 + index * 70}
                    className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#EBE4DC] hover:border-[#FFD0BD] shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF5EE] border border-[#FFD5C0] group-hover:scale-105 group-hover:bg-[#FFEADC] transition-all duration-300">
                      <Icon name={card.icon} className="w-6 h-6 text-[#FF5A1F]" />
                    </div>
                    <div className="flex flex-col space-y-1 min-w-0 border-l border-[#F0E6DD] pl-4 py-0.5">
                      <h3 className="text-sm sm:text-base font-bold text-[#0D1B2A] tracking-tight group-hover:text-[#FF5A1F] transition-colors duration-200">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#4A5568] leading-relaxed">
                        {card.description}
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
