import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { sendEmail } from "../utils/email";
import { sendEmailToAdmin } from "../utils/sendEmailToAdmin";
import { studentRegistrationAdminEmail } from "../utils/emails/studentRegistrationAdmin";
import { studentEnrolmentConfirmationEmail } from "../utils/emails/studentEnrolmentConfirmation";
import { trialClassConfirmationEmail } from "../utils/emails/trialClassConfirmation";
import { teacherApplicationReceivedEmail } from "../utils/emails/teacherApplicationReceived";
import { teacherApplicationAdminEmail } from "../utils/emails/teacherApplicationAdmin";
import { trialRequestAdminEmail, type TrialClientInfo } from "../utils/emails/trialRequestAdmin";
import {
  emailLayout,
  detailTable,
  callout,
  button,
  paragraph,
  heading,
  spacer,
  mailLink,
  telLink,
  nl2br,
  type DetailRow,
} from "../utils/emailTemplate";
import {
  StudentRegistrationFormTypes,
  TeacherRegistrationTypes,
  TrialRegFormTypes,
} from "../types";

/**
 * Every message goes through the shared layout in utils/emailTemplate, so the
 * customer confirmations and the internal notifications finally look like they
 * come from the same company. The admin notifications in particular used to be
 * a bare <h2> and a bullet list.
 */

const TIME_ZONE = "Asia/Dubai"; // the audience and the office are both GMT+4

/**
 * Dates are formatted in UAE time everywhere.
 *
 * This was not consistent before: the customer's confirmation ran `format()`
 * on the raw value, which uses the server's own zone — UTC on Render — while
 * the admin's copy of the same booking ran it through `toZonedTime`. A class
 * booked late in the evening therefore showed one date to the parent and the
 * next day's date to the office.
 */
const uaeDate = (value: Date | string | null | undefined): string => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return format(toZonedTime(d, TIME_ZONE), "dd MMMM yyyy");
};

const uaeNow = (): string =>
  format(toZonedTime(new Date(), TIME_ZONE), "dd MMMM yyyy, hh:mm a");

const fullName = (first?: string, last?: string): string =>
  [first, last].filter(Boolean).join(" ").trim();

const titleCase = (s?: string): string =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

/** Common tail on every internal notification. */
const adminFooterNote = (submittedAt: string) =>
  `Submitted ${submittedAt} (GMT+4) through the Arabic Juniors website. Reply directly to this email to reach the applicant.`;

// ---------------------------------------------------------------------------
// Customer-facing
// ---------------------------------------------------------------------------

export const sendWelcomeEmail = async (firstName: string, email: string) => {
  const subject = "Welcome to Arabic Juniors";

  const html = emailLayout({
    preheader: "Your Arabic Juniors account is ready.",
    eyebrow: "Welcome",
    title: `Hi ${firstName}, welcome aboard`,
    accent: "orange",
    content: `
      ${paragraph("Thank you for registering with Arabic Juniors. We're glad to have you with us.")}
      ${paragraph("You can browse our teachers, pricing and free trial class from your account at any time.")}
      ${spacer(6)}
      ${button({ label: "Visit Arabic Juniors", url: "https://arabicjuniors.com" })}
      ${spacer(10)}
    `,
    footerNote: "If you did not create this account, you can ignore this email.",
  });

  await sendEmail({ toEmail: email, toName: firstName, subject, htmlContent: html });
};

export const sendTrialSessionEmailToUser = async ({
  classStartDate,
  classStartTime,
  email,
  firstName,
}: TrialRegFormTypes) => {
  const subject = "Your free trial class is confirmed — Arabic Juniors";

  // Branded template (utils/emails/trialClassConfirmation.ts).
  const html = trialClassConfirmationEmail({
    firstName: firstName || "",
    trialDate: uaeDate(classStartDate),
    trialTime: classStartTime || "",
  });

  await sendEmail({ toEmail: email, toName: firstName, subject, htmlContent: html });
};

export const sendTeacherRegistrationReplyEmail = async ({
  email,
  first_name,
}: TeacherRegistrationTypes) => {
  const subject = "Your teacher application has been received — Arabic Juniors";

  // Branded template (utils/emails/teacherApplicationReceived.ts).
  const html = teacherApplicationReceivedEmail({ firstName: first_name || "" });

  await sendEmail({ toEmail: email, toName: first_name, subject, htmlContent: html });
};

interface StudentRegConfEmailParams {
  email: string;
  firstName: string;
  lastName: string;
  selectedPackage: string;
  preferredDays: string[];
  classStartDate: Date;
  classStartTime: string;
  monthlyHours: number;
  gender: "male" | "female";
}

export const sendStudentRegConfirmationEmail = async ({
  email,
  firstName,
  lastName,
  classStartDate,
  classStartTime,
  preferredDays,
  selectedPackage,
  monthlyHours,
}: StudentRegConfEmailParams) => {
  const subject = "You're enrolled — Arabic Juniors";

  // Branded template (utils/emails/studentEnrolmentConfirmation.ts).
  const html = studentEnrolmentConfirmationEmail({
    firstName: firstName || "",
    packageLabel: selectedPackage || "",
    monthlyHours,
    preferredDays: preferredDays?.join(", ") || "",
    startDate: uaeDate(classStartDate),
    preferredTime: classStartTime || "",
  });

  return await sendEmail({
    toEmail: email,
    toName: fullName(firstName, lastName),
    subject,
    htmlContent: html,
  });
};

// ---------------------------------------------------------------------------
// Internal notifications
// ---------------------------------------------------------------------------

export const sendStudentRegNotifToAdmin = async ({
  class_grade,
  class_start_date,
  class_type,
  curriculum,
  email,
  first_name,
  last_name,
  phone_number,
  preferred_days,
  preferred_time,
  pricing_package,
  school_name,
  gender,
  city,
}: StudentRegistrationFormTypes) => {
  const name = fullName(first_name, last_name);
  const subject = `Student registration: ${name}`;

  // Its own branded template (utils/emails/studentRegistrationAdmin.ts), not
  // the shared notification layout.
  const html = studentRegistrationAdminEmail({
    studentName: name,
    email,
    phone: phone_number,
    gender: titleCase(gender),
    city: city || "",
    grade: class_grade,
    school: school_name,
    curriculum,
    classType: titleCase(class_type),
    packageName: pricing_package || "",
    startDate: uaeDate(class_start_date),
    preferredTime: preferred_time || "",
    preferredDays: preferred_days?.join(", ") || "",
  });

  // Reply goes straight to the person who filled in the form.
  return await sendEmailToAdmin({ subject, htmlContent: html, replyTo: email ? { email, name } : undefined });
};

export const sendTrialEmailToAdmin = async (
  {
    classStartDate,
    classStartTime,
    email,
    firstName,
    lastName,
    grade,
    howFindUs,
    howManyJoin,
    phoneNumber,
    preferredTeacher,
    gender,
    city,
  }: TrialRegFormTypes,
  /** Browser + IP details captured with the submission (buildClientInfo). */
  clientInfo?: TrialClientInfo
) => {
  const name = fullName(firstName, lastName);
  const subject = "Trial request: " + name;

  // Branded template (utils/emails/trialRequestAdmin.ts).
  const html = trialRequestAdminEmail({
    name,
    email,
    phone: phoneNumber,
    gender: titleCase(gender),
    city: city || "",
    grade,
    studentsJoining: String(howManyJoin ?? ""),
    preferredTeacher: titleCase(preferredTeacher),
    foundUsVia: howFindUs,
    classStartDate,
    classStartTime,
    clientInfo,
  });

  // Reply goes straight to the person who filled in the form.
  return await sendEmailToAdmin({ subject, htmlContent: html, replyTo: email ? { email, name } : undefined });
};

export const sendTeacherRegToAdmin = async ({
  address,
  birth,
  declaration,
  education,
  email,
  employment_desire,
  expected_salary,
  fb_id,
  first_name,
  gender,
  how_find_us,
  introduce_yourself,
  last_name,
  materials_status,
  mother_lang,
  nationality,
  occupation,
  preferred_interview_time,
  teaching_experience,
  what_make_ideal,
  where_live,
  work_hours,
  other_langs,
  whatsapp_number,
}: TeacherRegistrationTypes) => {
  const name = fullName(first_name, last_name);
  const subject = `Teacher application: ${name}`;

  // Branded template (utils/emails/teacherApplicationAdmin.ts).
  const html = teacherApplicationAdminEmail({
    applicantName: name,
    email,
    whatsapp: whatsapp_number || "",
    facebook: fb_id || "",
    birth,
    gender: titleCase(gender),
    // The form field is misnamed: it holds marital status (Married / Unmarried).
    maritalStatus: materials_status,
    nationality,
    livesIn: where_live,
    address,
    occupation,
    education,
    teachingExperience: teaching_experience,
    motherLanguage: mother_lang,
    otherLanguages: Array.isArray(other_langs) ? other_langs.join(", ") : String(other_langs ?? ""),
    employmentDesired: employment_desire,
    expectedSalary: String(expected_salary ?? ""),
    availableHours: String(work_hours ?? ""),
    interviewTime: preferred_interview_time,
    foundUsVia: how_find_us,
    declaration,
    whyIdeal: what_make_ideal,
    introduction: introduce_yourself,
    submittedAt: uaeNow(),
  });

  // Reply goes straight to the person who filled in the form.
  return await sendEmailToAdmin({ subject, htmlContent: html, replyTo: email ? { email, name } : undefined });
};
