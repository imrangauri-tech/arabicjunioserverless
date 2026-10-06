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

export interface Teacher {
  _id: string;
  name: string;
  profession: string;

  /**
   * Either a path inside public/ (the teachers that predate the admin screen)
   * or a full Cloudinary URL. next/image accepts both.
   */
  image: string;
  imagePublicId?: string;

  /** Full-length photo for the About Us carousel; falls back to `image`. */
  portrait?: string;
  portraitPublicId?: string;

  grade: string;
  experience: string;
  education: string;
  subject: string;
  shortDescription: string;
  rating: number;

  showOnHomepage: boolean;

  /** Profile page URL: /our-teachers/<slug>. Absent only on very old records. */
  slug?: string;

  // ---- Profile page fields; all optional, empty ones are simply not shown ----
  country?: string;
  languages?: string;
  /** Hero paragraph; shortDescription is used when empty. */
  bio?: string;
  quote?: string;
  photoBadge?: string;
  photoTitle?: string;
  photoTitleHighlight?: string;
  photoHighlights?: TeacherPhotoHighlight[];
  /** "About me" paragraph; shortDescription is used when empty. */
  aboutIntro?: string;
  philosophies?: TeacherPhilosophy[];
  status: "draft" | "published";
  order: number;
  createdAt: string;
  updatedAt: string;
}
