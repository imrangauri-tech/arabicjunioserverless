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

/** Sent to the parent right after the free trial class form (/register). */

export interface TrialClassConfirmation {
  firstName: string;
  /** Already formatted, e.g. "20 October 2026". */
  trialDate: string;
  trialTime: string;
}

export const trialClassConfirmationEmail = (d: TrialClassConfirmation): string => {
  const firstName = esc(d.firstName?.trim()) || "there";
  const when = [esc(d.trialDate), esc(d.trialTime)].filter(Boolean).join(" at ");

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:6px;padding-bottom:38px;">
${confirmedPill("Trial Class Confirmed")}
${gap(18)}
${heroTitle("Your Arabic Trial Class<br>Is Confirmed")}
${gap(14)}
${bodyCopy(
  `Thank you, ${strong(firstName)}. We&rsquo;re excited to welcome your child to ${strong("Arabic Juniors")} for their free trial class.`
)}
</td>
</tr>

${detailsCard(
  "Your Class Details",
  [
    detailLine("&#128197;", "Date &amp; Time", when, "UAE Time &middot; GMT+4", "#5F6875"),
    detailLine(
      "&#127891;",
      "Class",
      "Free Arabic Trial Class",
      "Personalised online learning for your child",
      "#5F6875"
    ),
  ].join(detailDivider)
)}

${nextSteps(
  "Our team will contact you shortly to confirm the final class details and match your child with a suitable Arabic teacher.",
  [
    ["Confirm", "your trial class details."],
    ["Meet", "your child&rsquo;s Arabic teacher online."],
    ["Choose", "the right learning plan for your child."],
  ]
)}

${whatsappHelp(
  "Our team is happy to help you before the trial class.",
  "Hi *Arabic Juniors*,\nI’ve requested a free trial class for my child.\nPlease share the next steps. Thank you!"
)}`;

  return brandedEmail({
    title: "Your Free Trial Class Is Confirmed | Arabic Juniors",
    preheader: "Your free Arabic trial class with Arabic Juniors is confirmed.",
    body,
    extraCss: CONFIRMATION_MOBILE_CSS,
  });
};
