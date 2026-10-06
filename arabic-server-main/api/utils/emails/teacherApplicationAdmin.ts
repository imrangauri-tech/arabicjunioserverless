import { brandedEmail, ctaButton, esc, escMultiline, FONT } from "./brandedEmail";
import { gap, stripedTable, type Row } from "./confirmationParts";

/** Sent to the admin for every teacher application. */

export interface TeacherApplicationAdminEmail {
  applicantName: string;
  email: string;
  whatsapp: string;
  facebook: string;
  birth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  livesIn: string;
  address: string;
  occupation: string;
  education: string;
  teachingExperience: string;
  motherLanguage: string;
  otherLanguages: string;
  employmentDesired: string;
  expectedSalary: string;
  availableHours: string;
  interviewTime: string;
  foundUsVia: string;
  declaration: boolean | string;
  whyIdeal: string;
  introduction: string;
  /** e.g. "02 September 2026, 12:18 PM" (UAE time). */
  submittedAt: string;
}


const text = (value: unknown) => esc(value) || "—";

const link = (href: string, label: string) =>
  `<a href="${esc(href)}" style="color:#FB6238;text-decoration:none;word-break:break-word;">${esc(label)}</a>`;



const section = (title: string, inner: string) => `
<tr>
<td class="content-padding" style="padding-bottom:38px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">${title}</div>
${gap(10)}
${inner}
</td>
</tr>`;

/** On a phone each label sits above its value. */
const MOBILE_CSS = `
  .mobile-label,.mobile-value{display:block !important;width:100% !important;box-sizing:border-box !important;}
  .mobile-label{padding-bottom:0 !important;}
  .mobile-value{padding-top:2px !important;padding-bottom:12px !important;}
  .mobile-button,.mobile-button table,.mobile-button td{display:block !important;width:100% !important;}
  .mobile-button a{display:block !important;text-align:center !important;}`;

const isAgreed = (value: boolean | string) => value === true || String(value).toLowerCase() === "true";

export const teacherApplicationAdminEmail = (d: TeacherApplicationAdminEmail): string => {
  const phone = String(d.whatsapp ?? "").replace(/[^\d+]/g, "");

  const personal: Row[] = [
    ["Applicant", text(d.applicantName)],
    ["Email", d.email ? link(`mailto:${d.email}`, d.email) : "—"],
    ["WhatsApp", phone ? link(`tel:${phone}`, d.whatsapp) : "—"],
    ["Facebook", text(d.facebook)],
    ["Date of birth", text(d.birth)],
    ["Gender", text(d.gender)],
    ["Marital status", text(d.maritalStatus)],
    ["Nationality", text(d.nationality)],
    ["Lives in", text(d.livesIn)],
    ["Address", text(d.address)],
  ];

  const professional: Row[] = [
    ["Occupation", text(d.occupation)],
    ["Education", text(d.education)],
    ["Teaching experience", text(d.teachingExperience)],
    ["Mother language", text(d.motherLanguage)],
    ["Other languages", text(d.otherLanguages)],
    ["Employment desired", text(d.employmentDesired)],
    ["Expected salary", text(d.expectedSalary)],
    ["Available hours", text(d.availableHours)],
    ["Interview time", text(d.interviewTime)],
    ["Found us via", text(d.foundUsVia)],
    ["Declaration", isAgreed(d.declaration) ? "Agreed &#10003;" : "Not agreed"],
  ];

  const ownWords = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;overflow:hidden;">
<tr><td style="padding:20px 22px;background:#FFF8F5;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#FB6238;">Why they are an ideal candidate</div>
<div style="margin-top:6px;font-family:${FONT};font-size:14px;line-height:22px;color:#343C48;word-break:break-word;">${escMultiline(d.whyIdeal) || "—"}</div>
</td></tr>
<tr><td style="padding:20px 22px;background:#FFFFFF;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5F6875;">Introduction</div>
<div style="margin-top:6px;font-family:${FONT};font-size:14px;line-height:22px;color:#343C48;word-break:break-word;">${escMultiline(d.introduction) || "—"}</div>
</td></tr>
</table>`;

  const body = `
<!-- BADGE -->
<tr>
<td class="content-padding" style="padding-top:4px;padding-bottom:22px;">
<div style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;display:inline-block;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">New teacher application</div>
</td>
</tr>

${section("Contact &amp; personal", stripedTable(personal))}
${section("Professional", stripedTable(professional))}
${section("In their own words", ownWords)}

<!-- SUBMISSION INFO + REPLY -->
<tr>
<td class="content-padding" style="padding-bottom:28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:22px 22px 24px;">
<div style="font-family:${FONT};font-size:13px;line-height:21px;color:#B9C0CA;">This application was submitted on ${esc(d.submittedAt)} (GMT+4) through the Arabic Juniors website. You can reply directly to this email to contact the applicant.</div>
${
  d.email
    ? `${gap(16)}<div class="mobile-button">${ctaButton(`mailto:${d.email}`, "Reply to applicant")}</div>`
    : ""
}
</td>
</tr>
</table>
</td>
</tr>`;

  return brandedEmail({
    title: d.applicantName || "New teacher application",
    preheader: [d.applicantName, d.nationality, d.teachingExperience].filter(Boolean).join(" · "),
    body,
    extraCss: MOBILE_CSS,
  });
};
