import { brandedEmail, ctaButton, esc, FONT } from "./brandedEmail";
import { bodyCopy, gap, heroTitle } from "./confirmationParts";

/** Sent to the admin when someone subscribes (or re-subscribes) to the newsletter. */

/** "06 October 2026, 04:22 PM (UAE)" — the time the team works in. */
const uaeTimestamp = (date = new Date()) =>
  `${date.toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })} (UAE)`;

const infoRow = (label: string, valueHtml: string, labelColour: string, last: boolean) => `
<tr>
<td style="padding:17px 20px;${last ? "" : "border-bottom:1px solid #F7DDD5;"}">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${labelColour};">${label}</div>
${gap(5)}
<div style="font-family:${FONT};font-size:14px;line-height:22px;font-weight:600;color:#181D24;word-break:break-word;">${valueHtml}</div>
</td>
</tr>`;

export const newsletterSubscriptionAdminEmail = ({
  email,
  resubscribed = false,
  submittedAt = new Date(),
}: {
  email: string;
  /** True when someone who had unsubscribed signed up again. */
  resubscribed?: boolean;
  submittedAt?: Date;
}): string => {
  const safeEmail = esc(email);

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:4px;padding-bottom:34px;">
<div style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;display:inline-block;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">Newsletter Subscription</div>
${gap(10)}
${heroTitle("New Newsletter<br>Subscription")}
${gap(14)}
${bodyCopy(
  resubscribed
    ? "A previous subscriber has subscribed to the Arabic Juniors newsletter again."
    : "A new visitor has subscribed to the Arabic Juniors newsletter."
)}
</td>
</tr>

<!-- SUBSCRIBER INFORMATION -->
<tr>
<td class="content-padding" style="padding-bottom:36px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">Subscriber Information</div>
${gap(10)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;overflow:hidden;">
${infoRow(
  "Email Address",
  `<a href="mailto:${safeEmail}" style="color:#181D24;text-decoration:none;word-break:break-word;">${safeEmail}</a>`,
  "#FB6238",
  false
)}
${infoRow("Submitted", esc(uaeTimestamp(submittedAt)), "#5F6875", true)}
</table>
</td>
</tr>

<!-- EMAIL SUBSCRIBER -->
<tr>
<td class="content-padding" style="padding-bottom:34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td align="center" style="padding:20px 22px;">
<div style="display:inline-block;">${ctaButton(`mailto:${email}`, "Email Subscriber")}</div>
</td>
</tr>
</table>
</td>
</tr>`;

  return brandedEmail({
    title: "New Newsletter Subscription",
    preheader: `New newsletter subscription received on Arabic Juniors: ${email}`,
    body,
    footerLinks: [],
  });
};
