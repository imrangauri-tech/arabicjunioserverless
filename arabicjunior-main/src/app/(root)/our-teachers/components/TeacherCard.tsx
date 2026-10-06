"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import type { Teacher } from "@/types/Teacher";
import Reveal from "@/components/Reveal";

interface TeacherCardProps {
  teachersData: Teacher[];
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teachersData }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const displayed = teachersData.slice(0, visibleCount);

  return (
    <React.Fragment>
      {displayed.map((teacher, cardIndex) => (
        <Reveal
          key={teacher._id}
          variant="rise"
          index={cardIndex % 6}
          step={90}
          aria-describedby="teacher-card"
          className="bg-white rounded-2xl flex flex-col gap-y-4 items-center justify-center p-11 shadow-sm hover-lift"
        >
          <div
            aria-describedby="image-wrapper"
            className="max-w-44 w-full rounded-full"
          >
            <Image
              src={teacher.image}
              width={256}
              height={256}
              alt={`${teacher.name} — Arabic Juniors teacher`}
              className="w-full rounded-full object-cover aspect-square"
            />
          </div>

          <div
            aria-describedby="card-middle"
            className="flex items-center justify-center flex-col gap-y-2"
          >
            <h4
              aria-describedby="teacher-name"
              className="text-2xl font-medium text-neutral-800 text-center"
            >
              {teacher.name}
            </h4>
            <p
              aria-describedby="profession"
              className="text-xl font-normal text-neutral-300 text-center"
            >
              {teacher.profession}
            </p>
          </div>

          {/* Opens the teacher's own profile page (/our-teachers/<slug>). */}
          <Button asChild variant={"outline"} className="rounded-md max-w-max">
            <Link href={`/our-teachers/${teacher.slug ?? ""}`}>View Details</Link>
          </Button>
        </Reveal>
      ))}
      {teachersData.length > visibleCount && (
        <Reveal variant="up" className="col-span-full flex justify-center mt-8">
          <Button
            onClick={() => setVisibleCount(teachersData.length)}
            className="rounded-full px-8 py-6 h-12 flex items-center justify-center bg-gradient-to-r from-[#FF60A8] to-[#FB6238] text-white hover:opacity-90 font-semibold shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            View All Teachers
          </Button>
        </Reveal>
      )}
    </React.Fragment>
  );
};

export default TeacherCard;
