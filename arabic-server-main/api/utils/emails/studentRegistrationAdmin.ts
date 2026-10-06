import { brandedEmail, ctaButton, esc, FONT } from "./brandedEmail";

/** The email the admin receives for every new student registration. */

export interface StudentRegistrationAdminEmail {
  studentName: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  grade: string | number;
  school: string;
  curriculum: string;
  classType: string;
  packageName: string;
  /** Already formatted, e.g. "20 October 2026". */
  startDate: string;
  preferredTime: string;
  preferredDays: string;
}

/** One row of the details table; rows alternate white / light grey. */
const detailRow = (label: string, valueHtml: string, index: number): string => {
  const bg = index % 2 === 0 ? "#FFFFFF" : "#F8F9FB";
  return `
<tr>
<td width="38%" valign="top" style="padding:12px 8px 12px 18px;background:${bg};">
<span class="detail-label" style="font-family:${FONT};font-size:9px;line-height:15px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#848D9B;">${esc(label)}</span>
</td>
<td width="62%" valign="top" style="padding:12px 18px 12px 8px;background:${bg};">
${valueHtml}
</td>
</tr>`;
};

const valueText = (value: unknown): string =>
  `<span class="detail-value" style="font-family:${FONT};font-size:13px;line-height:21px;font-weight:600;color:#181D24;">${esc(value) || "—"}</span>`;

const valueLink = (href: string, text: string): string =>
  `<a href="${esc(href)}" class="detail-value" style="font-family:${FONT};font-size:13px;line-height:21px;font-weight:600;color:#181D24;text-decoration:none;">${esc(text)}</a>`;

const MOBILE_CSS = `
  .cta-text{display:block !important;width:100% !important;padding-right:0 !important;padding-bottom:15px !important;}
  .cta-button-cell{display:block !important;width:100% !important;text-align:left !important;}
  .cta-button-table{width:auto !important;}
  .cta-button-link{display:inline-block !important;}`;

export const studentRegistrationAdminEmail = (d: StudentRegistrationAdminEmail): string => {
  const phoneDigits = String(d.phone ?? "").replace(/[^\d+]/g, "");
  const whatsappDigits = phoneDigits.replace(/\D/g, "");
  const starts = [d.startDate, d.preferredTime].filter(Boolean).join(" · ");

  const rows: [string, string][] = [
    ["Student", valueText(d.studentName)],
    ["Email", d.email ? valueLink(`mailto:${d.email}`, d.email) : valueText("")],
    ["Phone", phoneDigits ? valueLink(`tel:${phoneDigits}`, d.phone) : valueText("")],
    ["Gender", valueText(d.gender)],
    ["City", valueText(d.city)],
    ["Grade", valueText(d.grade)],
    ["School", valueText(d.school)],
    ["Curriculum", valueText(d.curriculum)],
    ["Class Type", valueText(d.classType)],
    ["Package", valueText(d.packageName)],
    ["Start Date", valueText(d.startDate)],
    ["Preferred Time", valueText(d.preferredTime)],
    ["Preferred Days", valueText(d.preferredDays)],
  ];

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:28px;padding-bottom:30px;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:800;letter-spacing:.10em;text-transform:uppercase;color:#FB6238;">New Student Registration</div>
<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
<div class="hero-title" style="font-family:${FONT};font-size:30px;line-height:38px;font-weight:800;letter-spacing:-0.7px;color:#434343;">${esc(d.studentName)}</div>
<div style="height:11px;line-height:11px;font-size:0;">&nbsp;</div>
<p style="margin:0;font-family:${FONT};font-size:13px;line-height:22px;color:#68717D;">
A new student registration has been received through the Arabic Juniors website.
Please review the details below and follow up with the parent.
</p>
</td>
</tr>

<!-- PACKAGE SUMMARY -->
<tr>
<td class="content-padding" style="padding-bottom:28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:16px;">
<tr>
<td style="padding:20px 22px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="middle" style="padding-right:10px;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#FB6238;">Package</div>
<div style="margin-top:3px;font-family:${FONT};font-size:16px;line-height:24px;font-weight:800;color:#181D24;">${esc(d.packageName) || "—"}</div>
</td>
<td align="right" valign="middle">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#848D9B;">Starts</div>
<div style="margin-top:3px;font-family:${FONT};font-size:13px;line-height:21px;font-weight:700;color:#181D24;">${esc(starts) || "—"}</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>

<!-- STUDENT DETAILS -->
<tr>
<td class="content-padding" style="padding-bottom:34px;">
<div class="section-title" style="font-family:${FONT};font-size:18px;line-height:26px;font-weight:800;color:#434343;margin-bottom:14px;">Student Details</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border:1px solid #EEEEF2;border-radius:15px;overflow:hidden;">
${rows.map(([label, html], i) => detailRow(label, html, i)).join("")}
</table>
</td>
</tr>

<!-- WHATSAPP CTA -->
<tr>
<td class="content-padding" style="padding-bottom:36px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:16px;">
<tr>
<td style="padding:22px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td class="cta-text" valign="middle" style="padding-right:15px;">
<div style="font-family:${FONT};font-size:15px;line-height:21px;font-weight:700;color:#FFFFFF;">Follow Up With Parent</div>
<div style="margin-top:4px;font-family:${FONT};font-size:11px;line-height:17px;color:#B9C0CA;">Contact the parent to confirm the student's schedule and onboarding details.</div>
</td>
${
  whatsappDigits
    ? `<td class="cta-button-cell" align="right" valign="middle" width="130" style="width:130px;vertical-align:middle;">${ctaButton(
        `https://wa.me/${whatsappDigits}`,
        "WhatsApp Parent",
        "cta-button-table"
      )}</td>`
    : ""
}
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>`;

  return brandedEmail({
    title: "Student Registration — Arabic Juniors",
    preheader: `New student registration: ${d.studentName} · ${d.packageName}`,
    body,
    extraCss: MOBILE_CSS,
  });
};
