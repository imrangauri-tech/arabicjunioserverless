import { brandedEmail, ctaButton, esc, escMultiline, FONT } from "./brandedEmail";
import { bodyCopy, gap, heroTitle, strong, WHATSAPP_NUMBER } from "./confirmationParts";

/**
 * Auto-reply to the visitor who filled in the contact form. Replies to it land
 * in the sender inbox (BREVO_VERIFIED_SENDER_EMAIL), which is why the email
 * can say "reply to this email".
 */

const MOBILE_CSS = `
  .body-copy{font-size:14px !important;line-height:23px !important;}
  .mobile-button,.mobile-button table,.mobile-button td{display:block !important;width:100% !important;}
  .mobile-button a{display:block !important;text-align:center !important;}`;

const WHATSAPP_TEXT = "Hi *Arabic Juniors*,\nI just sent a message through your website contact form.";

export const contactAcknowledgementEmail = ({
  fullName,
  message,
}: {
  fullName: string;
  message: string;
}): string => {
  const firstName = esc(String(fullName ?? "").trim().split(/\s+/)[0]) || "there";

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:4px;padding-bottom:34px;">
<div style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;display:inline-block;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">Message Received</div>
${gap(10)}
${heroTitle("Thank You for<br>Contacting Arabic Juniors")}
${gap(14)}
${bodyCopy(`Hello ${strong(firstName)},`)}
${gap(7)}
${bodyCopy(
  "Thank you for reaching out to Arabic Juniors. We have received your message and appreciate your interest in our Arabic learning programs."
)}
</td>
</tr>

<!-- WHAT HAPPENS NEXT -->
<tr>
<td class="content-padding" style="padding-bottom:36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;">
<tr>
<td style="padding:22px;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#FB6238;">What happens next?</div>
${gap(8)}
<div style="font-family:${FONT};font-size:14px;line-height:23px;color:#5F6875;">Our team will review your enquiry and get back to you as soon as possible. If we need any additional information, we will contact you directly.</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- YOUR MESSAGE -->
<tr>
<td class="content-padding" style="padding-bottom:30px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">Your message</div>
${gap(10)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#F8F9FA;border:1px solid #E7E9ED;border-radius:17px;">
<tr>
<td style="padding:20px;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#848D9B;">Your enquiry</div>
${gap(7)}
<div style="font-family:${FONT};font-size:14px;line-height:23px;color:#343C48;word-break:break-word;">${escMultiline(message) || "—"}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- CONTACT OPTIONS -->
<tr>
<td class="content-padding" style="padding-bottom:34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:20px 22px;">
<div style="font-family:${FONT};font-size:13px;line-height:21px;color:#B9C0CA;">Have a question? Reply to this email or message us on WhatsApp.</div>
${gap(13)}
<div class="mobile-button">${ctaButton(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    "Chat with Us on WhatsApp"
  )}</div>
</td>
</tr>
</table>
</td>
</tr>`;

  return brandedEmail({
    title: "Thank You for Contacting Arabic Juniors",
    preheader:
      "Thank you for contacting Arabic Juniors. We have received your message and our team will get back to you shortly.",
    body,
    extraCss: MOBILE_CSS,
  });
};
