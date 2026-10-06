import { brandedEmail, ctaButton, esc, escMultiline, FONT } from "./brandedEmail";

/** The email the admin receives for every contact-form message. */

export interface ContactMessageAdminEmail {
  fullName: string;
  email: string;
  purpose: string;
  message: string;
}

/** Rows alternate cream / white; the first label is orange, as in the design. */
const detailRow = (label: string, valueHtml: string, index: number, top = false): string => {
  const bg = index % 2 === 0 ? "#FFF8F5" : "#FFFFFF";
  const labelColour = index === 0 ? "#FB6238" : "#5F6875";
  const valign = top ? ` valign="top"` : "";
  return `
<tr>
<td class="mobile-label"${valign} width="34%" style="padding:11px 18px;background:${bg};">
<span class="detail-label" style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${labelColour};">${esc(label)}</span>
</td>
<td class="mobile-value"${valign} width="66%" style="padding:11px 18px;background:${bg};">
${valueHtml}
</td>
</tr>`;
};

const value = (html: string, weight = 600): string =>
  `<span class="detail-value" style="font-family:${FONT};font-size:14px;line-height:22px;font-weight:${weight};color:#181D24;">${html || "—"}</span>`;

/** On a phone the label sits above its value instead of beside it. */
const MOBILE_CSS = `
  .mobile-stack,.mobile-stack tbody,.mobile-stack tr,.mobile-stack td{display:block !important;width:100% !important;box-sizing:border-box !important;}
  .mobile-value{padding-top:2px !important;padding-bottom:12px !important;}
  .mobile-label{padding-bottom:0 !important;}`;

export const contactMessageAdminEmail = (d: ContactMessageAdminEmail): string => {
  const email = String(d.email ?? "").trim();
  const purpose = d.purpose || "General enquiry";

  const body = `
<!-- TITLE -->
<tr>
<td class="content-padding" style="padding-top:4px;padding-bottom:30px;">
<div style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;display:inline-block;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">New contact message</div>
<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
<div class="hero-title" style="font-family:${FONT};font-size:31px;line-height:39px;font-weight:800;letter-spacing:-.8px;color:#434343;">${esc(d.fullName)}</div>
</td>
</tr>

<!-- CONTACT DETAILS -->
<tr>
<td class="content-padding" style="padding-bottom:36px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">Contact details</div>
<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
<table role="presentation" class="mobile-stack" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;overflow:hidden;">
${detailRow("Name", value(esc(d.fullName)), 0)}
${detailRow(
  "Email",
  value(email ? `<a href="mailto:${esc(email)}" style="color:#FB6238;text-decoration:none;">${esc(email)}</a>` : ""),
  1
)}
${detailRow("Purpose", value(esc(purpose)), 2)}
${detailRow("Message", value(escMultiline(d.message), 500), 3, true)}
</table>
</td>
</tr>

<!-- REPLY -->
${
  email
    ? `<tr>
<td class="content-padding" style="padding-bottom:28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:18px 22px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle" style="font-family:${FONT};font-size:12px;line-height:18px;color:#848D9B;padding-right:15px;">Reply directly to the sender.</td>
<td align="right" valign="middle" width="155" style="width:155px;">
<div style="float:right;">${ctaButton(`mailto:${email}`, "Reply to Sender")}</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>`
    : ""
}

<!-- SUBMISSION NOTE -->
<tr>
<td class="content-padding" style="padding-bottom:24px;">
<div style="font-family:${FONT};font-size:10px;line-height:17px;color:#9AA1AB;text-align:center;">Submitted through the contact form on ArabicJuniors.com.</div>
</td>
</tr>`;

  return brandedEmail({
    title: "New contact message",
    preheader: `${d.fullName} — ${purpose}`,
    body,
    extraCss: MOBILE_CSS,
  });
};
