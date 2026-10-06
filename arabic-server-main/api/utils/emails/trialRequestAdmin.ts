import { brandedEmail, ctaButton, esc, FONT } from "./brandedEmail";
import { gap, heroTitle, stripedTable, type Row } from "./confirmationParts";

/** Sent to the admin for every free trial request (/register). */

/** What the browser and the IP lookup reported; every field is untrusted text. */
export interface TrialClientInfo {
  ipAddress?: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  ipTimezone?: string;
  deviceType?: string;
  operatingSystem?: string;
  browser?: string;
  screenSize?: string;
  pageUrl?: string;
}

export interface TrialRequestAdminEmail {
  name: string;
  email: string;
  phone: string;
  gender: string;
  city: string;
  grade: string | number;
  studentsJoining: string;
  preferredTeacher: string;
  foundUsVia: string;
  /** The date the parent picked (a UAE calendar date). */
  classStartDate: Date | string | undefined;
  /** "01:00 PM", in UAE time. */
  classStartTime: string;
  clientInfo?: TrialClientInfo;
}

const UAE_TZ = "Asia/Dubai";

/**
 * The requested slot as one instant: the form's date and "hh:mm AM/PM" are UAE
 * wall-clock time, and the UAE (GMT+4) has no daylight saving.
 */
const slotInstant = (date: Date | string | undefined, time: string): Date | null => {
  if (!date || !time) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  const m = String(time).trim().match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])?$/);
  if (!m) return null;

  // The calendar day as the UAE sees it, whatever time zone produced `date`.
  const [y, mo, day] = new Intl.DateTimeFormat("en-CA", {
    timeZone: UAE_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(d)
    .split("-")
    .map(Number);

  let hours = Number(m[1]) % 12;
  if (m[3] && m[3].toLowerCase() === "pm") hours += 12;
  if (!m[3]) hours = Number(m[1]);
  return new Date(Date.UTC(y, mo - 1, day, hours - 4, Number(m[2])));
};

const formatIn = (instant: Date, timeZone: string, withDate = false) => {
  try {
    return instant.toLocaleString("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      ...(withDate ? { day: "2-digit", month: "long", year: "numeric" } : {}),
    });
  } catch {
    return ""; // an unknown time-zone name from the browser
  }
};

/** Same day as the UAE slot? If not, add the date so "09:30 am" is not misread. */
const timeWithDayHint = (instant: Date, timeZone: string) => {
  const dayIn = (tz: string) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(instant);
  try {
    const time = formatIn(instant, timeZone);
    return dayIn(timeZone) === dayIn(UAE_TZ)
      ? time
      : `${time}, ${instant.toLocaleDateString("en-GB", { timeZone, day: "2-digit", month: "short" })}`;
  } catch {
    return "";
  }
};

const text = (value: unknown) => esc(value) || "—";
const link = (href: string, label: string) =>
  `<a href="${esc(href)}" style="color:#5F6875;text-decoration:none;word-break:break-word;">${esc(label)}</a>`;

/** A titled panel of "label: value" lines (schedule, telemetry). */
const panel = (
  title: string,
  rows: [string, string, string?][],
  tone: "warm" | "grey"
) => {
  const warm = tone === "warm";
  return `
<tr>
<td class="content-padding" style="padding-bottom:24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:${warm ? "#FFF8F5" : "#F8F9FA"};border:1px solid ${warm ? "#F7DDD5" : "#DDE1E6"};${warm ? "border-left:5px solid #FB6238;" : ""}border-radius:16px;overflow:hidden;">
<tr>
<td style="padding:15px 18px 12px;${warm ? "" : "background:#F1F3F5;"}border-bottom:1px solid ${warm ? "#F7DDD5" : "#DDE1E6"};">
<div style="font-family:${FONT};font-size:14px;line-height:21px;font-weight:800;color:#181D24;">${title}</div>
</td>
</tr>
<tr>
<td style="padding:12px 18px 14px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${rows
  .map(
    ([label, value, colour], i) => `<tr>
<td class="mobile-label" width="40%" valign="top" style="padding:7px 0;${i < rows.length - 1 && warm ? "border-bottom:1px solid #F0E4DF;" : ""}font-family:${FONT};font-size:13px;line-height:20px;font-weight:600;color:#5F6875;">${label}</td>
<td class="mobile-value" width="60%" valign="top" style="padding:7px 0;${i < rows.length - 1 && warm ? "border-bottom:1px solid #F0E4DF;" : ""}font-family:${FONT};font-size:13px;line-height:20px;font-weight:700;color:${colour || "#181D24"};word-break:break-word;">${value}</td>
</tr>`
  )
  .join("\n")}
</table>
</td>
</tr>
</table>
</td>
</tr>`;
};

const MOBILE_CSS = `
  .mobile-label,.mobile-value{display:block !important;width:100% !important;box-sizing:border-box !important;}
  .mobile-label{padding-bottom:0 !important;border-bottom:0 !important;}
  .mobile-value{padding-top:2px !important;padding-bottom:12px !important;}
  .mobile-stack{display:block !important;width:100% !important;padding-right:0 !important;}
  .mobile-button{display:block !important;width:100% !important;padding-top:14px !important;text-align:left !important;}
  .mobile-button table{float:none !important;}`;

export const trialRequestAdminEmail = (d: TrialRequestAdminEmail): string => {
  const ci = d.clientInfo ?? {};
  const instant = slotInstant(d.classStartDate, d.classStartTime);
  const slotText = instant ? formatIn(instant, UAE_TZ, true) : [d.classStartTime].filter(Boolean).join("");
  const phoneDigits = String(d.phone ?? "").replace(/[^\d+]/g, "");
  const waDigits = phoneDigits.replace(/\D/g, "");

  const details: Row[] = [
    ["Name", text(d.name)],
    ["Email", d.email ? link(`mailto:${d.email}`, d.email) : "—"],
    ["Phone", phoneDigits ? link(`tel:${phoneDigits}`, d.phone) : "—"],
    ["Gender", text(d.gender)],
    ["City", text(d.city)],
    ["Grade", text(d.grade)],
    ["Students joining", text(d.studentsJoining)],
    ["Preferred teacher", text(d.preferredTeacher)],
    ["Found us via", text(d.foundUsVia)],
  ];

  // The student's own zone: what the browser reported, else the IP lookup's.
  const studentTz = (ci.timezone || ci.ipTimezone || "").trim();
  const schedule: [string, string, string?][] = [];
  if (instant) {
    if (studentTz) {
      const local = timeWithDayHint(instant, studentTz);
      if (local) schedule.push(["&#128100; Student's local time", `${esc(local)} (${esc(studentTz)})`]);
    }
    schedule.push(["&#127466;&#127468; Egypt (Cairo tutor)", `${esc(timeWithDayHint(instant, "Africa/Cairo"))} (Cairo)`, "#FB6238"]);
    schedule.push(["&#127470;&#127475; India (operations)", `${esc(timeWithDayHint(instant, "Asia/Kolkata"))} (IST)`, "#FB6238"]);
  }

  const location = [ci.city, ci.region, ci.country].filter((v) => v && String(v).trim()).join(", ");
  const device = [ci.deviceType, ci.operatingSystem].filter((v) => v && String(v).trim()).join(" &bull; ");
  const telemetry: [string, string, string?][] = (
    [
      ["&#127760; IP address", text(ci.ipAddress)],
      ["&#128205; Location", location ? esc(location) : ""],
      ["&#9201;&#65039; Timezone", esc(studentTz)],
      ["&#128187; Device &amp; OS", device ? esc(device).replace(/&amp;bull;/g, "&bull;") : ""],
      ["&#127760; Browser", esc(ci.browser)],
      ["&#128421;&#65039; Screen size", esc(ci.screenSize)],
      ["&#128279; Submitted from", esc(ci.pageUrl)],
    ] as [string, string][]
  ).filter(([, value]) => value && value !== "—");

  const body = `
<!-- TITLE -->
<tr>
<td class="content-padding" style="padding-top:4px;padding-bottom:22px;">
<div style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;display:inline-block;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">New trial request</div>
${gap(10)}
${heroTitle(esc(d.name) || "New trial request")}
</td>
</tr>

<!-- TRIAL SLOT -->
<tr>
<td class="content-padding" style="padding-bottom:38px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;">
<tr>
<td style="padding:18px 20px;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#FB6238;">Requested trial slot</div>
<div style="margin-top:5px;font-family:${FONT};font-size:16px;line-height:24px;font-weight:700;color:#181D24;">${esc(slotText) || "Not given"}</div>
<div style="margin-top:3px;font-family:${FONT};font-size:12px;line-height:19px;color:#5F6875;">UAE time (GMT+4)</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- STUDENT DETAILS -->
<tr>
<td class="content-padding" style="padding-bottom:38px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">Student details</div>
${gap(10)}
${stripedTable(details)}
</td>
</tr>

<!-- WHATSAPP -->
${
  waDigits
    ? `<tr>
<td class="content-padding" style="padding-bottom:24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:18px 22px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td class="mobile-stack" valign="middle" style="font-family:${FONT};font-size:13px;line-height:19px;color:#B9C0CA;padding-right:15px;">Connect with the parent directly via WhatsApp.</td>
<td class="mobile-button" align="right" valign="middle" width="210" style="width:210px;">${ctaButton(
        `https://wa.me/${waDigits}`,
        "Chat with Parent on WhatsApp"
      )}</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>`
    : ""
}

${schedule.length ? panel("&#9200; MULTI-TIMEZONE CLASS SCHEDULE", schedule, "warm") : ""}
${telemetry.length ? panel("&#128269; VISITOR TELEMETRY &amp; GEOLOCATION", telemetry, "grey") : ""}`;

  return brandedEmail({
    title: `Trial request: ${d.name}`,
    preheader: [d.name, d.grade ? `Grade ${d.grade}` : "", slotText].filter(Boolean).join(" · "),
    body,
    extraCss: MOBILE_CSS,
  });
};
