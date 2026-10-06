/**
 * Fills the profile-page fields (/our-teachers/<slug>) for the teachers that
 * existed before profile pages did, so every "View Details" opens a complete
 * page instead of a half-empty one.
 *
 * Run:   pnpm seed-teacher-profiles
 *
 * Safe to re-run: it only writes a field that is still empty, so anything an
 * admin has typed in Admin → Teachers is never overwritten.
 *
 * The copy is written from each teacher's own record (experience, education,
 * description) and avoids personal facts the database does not hold — country
 * is left empty for an admin to fill in.
 */
import "dotenv/config";
import mongoose from "mongoose";
import Teacher from "../api/models/teacher";

interface ProfileCopy {
  quote: string;
  aboutIntro: string;
  /** What this teacher's lessons lean towards; varies the story blocks. */
  focus: string;
}

/** Per-teacher wording, keyed by name. */
const COPY: Record<string, ProfileCopy> = {
  "Rafat Sayed": {
    quote:
      "Every child can enjoy Arabic when lessons feel like a conversation, not a chore.",
    aboutIntro:
      "Rafat Sayed has spent more than five years helping students from Grades 1 to 10 build real confidence in Arabic. Lessons combine clear grammar explanations with reading and writing practice, using interactive online tools that keep young learners engaged from the first minute to the last.",
    focus: "grammar, reading and writing",
  },
  "Mohommad Taha": {
    quote:
      "When a student understands why a rule works, they never forget it.",
    aboutIntro:
      "Mohommad Taha is a qualified Arabic tutor with a deep understanding of the UAE Ministry of Education standards. Teaching students from primary to secondary level, every online session is personalised so each learner moves forward at the right pace and with a clear plan.",
    focus: "UAE MOE curriculum and exam preparation",
  },
  "Rawan Hossam": {
    quote:
      "Strong foundations make every new chapter of Arabic easier and more enjoyable.",
    aboutIntro:
      "With more than eight years of experience, Rawan Hossam teaches Arabic to students from Grades 1 to 10 and focuses on building strong language skills aligned with UAE school requirements. One-to-one online support means every lesson is shaped around the student in front of the screen.",
    focus: "one-to-one support and core language skills",
  },
  "Samara Youssef": {
    quote:
      "Native or non-native, every student deserves lessons that meet them where they are.",
    aboutIntro:
      "Samara Youssef is a certified Arabic educator with a proven record of helping school-aged learners excel. Familiar with UAE curriculum structures, lessons are adapted for both native and non-native Arabic speakers so every student can follow, practise and progress.",
    focus: "native and non-native learners",
  },
  "Eptehal Elgendy": {
    quote:
      "The right pace makes all the difference — I plan every lesson around the student.",
    aboutIntro:
      "Eptehal Elgendy is a dedicated online Arabic teacher with experience across British and MOE curriculum schools in the UAE. Each session is tailored to the student's level and pace, helping learners from Grades 1 to 10 keep up with school and grow beyond it.",
    focus: "British and MOE curriculum support",
  },
  "Narmeen Saeed": {
    quote:
      "Reading opens the door to everything else in Arabic — I love watching students walk through it.",
    aboutIntro:
      "Narmeen Saeed is a native Arabic speaker with several years of online tutoring experience for UAE-based students. Lessons focus on improving academic performance in reading, comprehension and written expression, with steady practice that builds confidence at every grade level.",
    focus: "reading, comprehension and written expression",
  },
  "Abdullah Soliman": {
    quote:
      "Speaking comes first — once students start talking, everything else follows.",
    aboutIntro:
      "Abdullah Soliman is an experienced Arabic tutor who helps students excel in speaking, writing and reading. Every lesson is personalised, combining conversation practice with structured exercises so students see clear progress week after week.",
    focus: "speaking, writing and reading",
  },
  "Hassan Ibrahim": {
    quote:
      "Patience and structure turn difficult Arabic lessons into small, achievable steps.",
    aboutIntro:
      "Hassan Ibrahim is a dedicated Arabic teacher supporting students across UAE school curricula. Patient, well-structured online lessons break each topic into manageable steps, so students stay motivated and keep moving forward.",
    focus: "patient, structured curriculum support",
  },
};

const firstName = (name: string) => name.trim().split(/\s+/)[0];

/** The five qualities shown next to the portrait. */
const photoHighlights = (name: string) => [
  {
    icon: "Smile",
    title: "Warm & Encouraging",
    description: `${firstName(name)} creates a friendly, welcoming space where students feel comfortable to ask questions.`,
  },
  {
    icon: "Heart",
    title: "Approachable",
    description: "Kind and patient with every learner, so even shy students quickly feel at ease.",
  },
  {
    icon: "UserCheck",
    title: "Professional",
    description: "Well-prepared lessons, punctual classes and clear communication with parents.",
  },
  {
    icon: "BookOpen",
    title: "Curriculum Focused",
    description: "Lessons follow the student's school curriculum, homework and upcoming exams.",
  },
  {
    icon: "Target",
    title: "Focused & Dedicated",
    description: "Genuinely invested in each student's progress and celebrates every milestone.",
  },
];

const philosophies = (
  name: string,
  copy: ProfileCopy,
  education: string,
  experience: string
) => {
  const years = experience.replace(/\s*exp\.?$/i, "").trim().toLowerCase();
  const background = education
    ? `${firstName(name)}'s teaching is built on a solid academic foundation — ${education}${years ? ` — and ${years} of teaching experience` : ""}.`
    : `${firstName(name)}'s teaching is built on a solid understanding of the Arabic language and of how children learn it best.`;

  return [
  {
    icon: "Lightbulb",
    title: "Student-Centred Learning Approach",
    paragraphs: [
      `For ${firstName(name)}, the most rewarding part of teaching is seeing a student's confidence grow — reading a passage fluently for the first time, or answering a question in full Arabic sentences.`,
      `Lessons are structured, interactive and built around ${copy.focus}, balancing challenge and support so every student is encouraged to reach their full potential.`,
    ],
  },
  {
    icon: "GraduationCap",
    title: "Strong Academic Background",
    paragraphs: [
      background,
      "That background, combined with familiarity with UAE school requirements, means lessons stay closely aligned with what students need in class and in their exams.",
    ],
  },
  ];
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);

  const teachers = await Teacher.find();
  let updated = 0;

  for (const teacher of teachers) {
    const copy = COPY[teacher.name];
    if (!copy) {
      console.log(`- ${teacher.name}: no copy written for this teacher, skipped`);
      continue;
    }

    const filled: string[] = [];
    const fill = <K extends keyof typeof teacher>(key: K, value: (typeof teacher)[K]) => {
      const current = teacher[key] as unknown;
      const empty = Array.isArray(current) ? current.length === 0 : !current;
      if (!empty) return;
      teacher.set(key as string, value);
      filled.push(String(key));
    };

    fill("languages", "Arabic, English");
    fill("quote", copy.quote);
    fill("photoBadge", `ABOUT ${firstName(teacher.name).toUpperCase()}`);
    fill("photoTitle", "A Friendly, Supportive");
    fill("photoTitleHighlight", "and Professional Teacher");
    fill("photoHighlights", photoHighlights(teacher.name));
    fill("aboutIntro", copy.aboutIntro);
    fill("philosophies", philosophies(teacher.name, copy, teacher.education, teacher.experience));

    if (filled.length) {
      await teacher.save();
      updated++;
      console.log(`✓ ${teacher.name}: ${filled.join(", ")}`);
    } else {
      console.log(`- ${teacher.name}: already complete`);
    }
  }

  console.log(`\nDone. ${updated} teacher(s) updated.`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
