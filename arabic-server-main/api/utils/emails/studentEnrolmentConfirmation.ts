import { brandedEmail, esc } from "./brandedEmail";
import {
  bodyCopy,
  CONFIRMATION_MOBILE_CSS,
  confirmedPill,
  detailDivider,
  detailLine,
  detailsCard,
  gap,
  heroTitle,
  nextSteps,
  strong,
  whatsappHelp,
} from "./confirmationParts";

/** Sent to the parent/student right after the student registration form. */

export interface StudentEnrolmentConfirmation {
  firstName: string;
  /** As chosen on the form, e.g. "Premium - AED 400". */
  packageLabel: string;
  monthlyHours?: number | string;
  preferredDays: string;
  /** Already formatted, e.g. "20 October 2026". */
  startDate: string;
  preferredTime: string;
}

/** "Premium - AED 400" → { name: "Premium", price: "AED 400" }. */
const splitPackage = (label: string) => {
  const [name, ...rest] = String(label ?? "").split(/\s+-\s+/);
  return { name: name?.trim() || label, price: rest.join(" - ").trim() };
};

export const studentEnrolmentConfirmationEmail = (d: StudentEnrolmentConfirmation): string => {
  const pkg = splitPackage(d.packageLabel);
  const hours =
    d.monthlyHours !== undefined && d.monthlyHours !== "" ? `${esc(d.monthlyHours)} hours per month` : "";
  const begins = [esc(d.startDate), esc(d.preferredTime)].filter(Boolean).join(" at ");
  const firstName = esc(d.firstName?.trim()) || "there";

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:6px;padding-bottom:38px;">
${confirmedPill("Enrolment Confirmed")}
${gap(18)}
${heroTitle("Welcome to Arabic Juniors")}
${gap(14)}
${bodyCopy(
  `Welcome, ${strong(firstName)}. We&rsquo;re delighted to have you joining ${strong("Arabic Juniors")}. Your enrolment has been successfully confirmed.`
)}
</td>
</tr>

${detailsCard(
  "Your Enrolment Details",
  [
    detailLine("&#127891;", "Package", esc(pkg.name), esc(pkg.price)),
    hours ? detailLine("&#9201;&#65039;", "Monthly Hours", hours) : "",
    detailLine("&#128197;", "Preferred Days", esc(d.preferredDays)),
    detailLine("&#128640;", "Classes Begin", begins, "UAE Time &middot; GMT+4"),
  ]
    .filter(Boolean)
    .join(detailDivider)
)}

${nextSteps("Our team will contact you shortly to confirm your teacher, joining details and final weekly schedule.", [
  ["Confirm", "your class schedule and teacher details."],
  ["Meet", "your Arabic teacher and receive your joining details."],
  ["Start", "your Arabic learning journey with Arabic Juniors."],
])}

${whatsappHelp(
  "Our team is happy to help you with your classes.",
  "Hi *Arabic Juniors*,\nMy child is now enrolled.\nPlease share the next steps and class details. Thank you!"
)}`;

  return brandedEmail({
    title: "You're Enrolled — Arabic Juniors",
    preheader: "Welcome to Arabic Juniors. Your enrolment is confirmed.",
    body,
    extraCss: CONFIRMATION_MOBILE_CSS,
  });
};
