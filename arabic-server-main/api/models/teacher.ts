import mongoose, { Schema, Document } from "mongoose";

export interface TeacherPhotoHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface TeacherPhilosophy {
  icon: string;
  title: string;
  paragraphs: string[];
}

export interface ITeacher extends Document {
  name: string;
  /** URL of the profile page: /our-teachers/<slug>. Generated from the name. */
  slug: string;
  profession: string;

  /** Square headshot. Used by every surface that shows this teacher. */
  image: string;
  imagePublicId?: string;

  /**
   * Optional full-length portrait for the About Us carousel, whose cards are
   * tall. A headshot still renders there, just smaller — this is the difference
   * between "acceptable" and "designed".
   */
  portrait?: string;
  portraitPublicId?: string;

  grade: string;
  experience: string;
  education: string;
  subject: string;
  shortDescription: string;
  rating: number;

  /** The homepage slider is a highlight reel, not the full roster. */
  showOnHomepage: boolean;

  // ---- Profile page (/our-teachers/<slug>) --------------------------------
  country: string;
  languages: string;
  /** Hero paragraph; falls back to shortDescription when empty. */
  bio: string;
  quote: string;
  photoBadge: string;
  photoTitle: string;
  photoTitleHighlight: string;
  photoHighlights: TeacherPhotoHighlight[];
  /** "About me" paragraph; falls back to shortDescription when empty. */
  aboutIntro: string;
  philosophies: TeacherPhilosophy[];

  status: "draft" | "published";
  order: number;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    profession: { type: String, required: true, trim: true, default: "Arabic Teacher" },

    image: { type: String, required: true },
    imagePublicId: { type: String },

    portrait: { type: String },
    portraitPublicId: { type: String },

    grade: { type: String, trim: true, default: "1-10" },
    experience: { type: String, trim: true, default: "" },
    education: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "Arabic" },
    shortDescription: { type: String, trim: true, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },

    showOnHomepage: { type: Boolean, default: true },

    country: { type: String, trim: true, default: "" },
    languages: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    quote: { type: String, trim: true, default: "" },
    photoBadge: { type: String, trim: true, default: "" },
    photoTitle: { type: String, trim: true, default: "" },
    photoTitleHighlight: { type: String, trim: true, default: "" },
    photoHighlights: {
      type: [
        new Schema<TeacherPhotoHighlight>(
          {
            icon: { type: String, trim: true, default: "Smile" },
            title: { type: String, trim: true, default: "" },
            description: { type: String, trim: true, default: "" },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
    aboutIntro: { type: String, trim: true, default: "" },
    philosophies: {
      type: [
        new Schema<TeacherPhilosophy>(
          {
            icon: { type: String, trim: true, default: "Lightbulb" },
            title: { type: String, trim: true, default: "" },
            paragraphs: { type: [String], default: [] },
          },
          { _id: false }
        ),
      ],
      default: [],
    },

    status: { type: String, enum: ["draft", "published"], default: "draft" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Serves both public queries: the full roster and the homepage subset.
TeacherSchema.index({ status: 1, order: 1, createdAt: -1 });
TeacherSchema.index({ status: 1, showOnHomepage: 1, order: 1 });
// Sparse: teachers saved before profile pages existed get theirs on first read.
TeacherSchema.index({ slug: 1 }, { unique: true, sparse: true });

const Teacher = mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default Teacher;
