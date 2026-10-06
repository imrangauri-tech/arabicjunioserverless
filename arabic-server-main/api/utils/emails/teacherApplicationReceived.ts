import { brandedEmail, esc } from "./brandedEmail";
import {
  bodyCopy,
  CONFIRMATION_MOBILE_CSS,
  confirmedPill,
  darkNote,
  detailLine,
  detailsCard,
  gap,
  heroTitle,
  nextSteps,
  strong,
} from "./confirmationParts";

/** Sent to a teacher right after they submit the teacher application form. */

export const teacherApplicationReceivedEmail = ({ firstName }: { firstName: string }): string => {
  const name = esc(firstName?.trim()) || "there";

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:6px;padding-bottom:38px;">
${confirmedPill("Application Received")}
${gap(18)}
${heroTitle("Your Teacher Application<br>Has Been Received")}
${gap(14)}
${bodyCopy(
  `Thank you, ${strong(name)}. We appreciate your interest in joining ${strong("Arabic Juniors")} as a teacher.`
)}
</td>
</tr>

${detailsCard(
  "Application Status",
  detailLine(
    "&#128233;",
    "Status",
    "Application Successfully Received",
    "Our hiring team will now review your application",
    "#5F6875"
  )
)}

${nextSteps(
  "Our hiring team will carefully review your application and assess your qualifications, experience, and suitability for the teaching role.",
  [
    ["Application Review", "Our hiring team will review the information and documents you submitted."],
    ["Qualification Check", "We will assess whether your profile meets the requirements for the role."],
    [
      "Next Steps",
      "If your application meets our requirements, a member of our team will contact you regarding the next stage of the hiring process.",
    ],
  ],
  true
)}

${darkNote(
  "Thank you for your interest",
  "We appreciate the time and effort you have taken to apply to Arabic Juniors.",
  "Please wait for our hiring team to contact you if your application progresses to the next stage."
)}`;

  return brandedEmail({
    title: "Your Teacher Application Has Been Received | Arabic Juniors",
    preheader:
      "Your Arabic Juniors teacher application has been received. Our hiring team will review your application and contact you if your profile meets our requirements.",
    body,
    extraCss: CONFIRMATION_MOBILE_CSS,
  });
};
