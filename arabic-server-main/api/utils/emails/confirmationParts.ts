import { ctaButton, esc, FONT } from "./brandedEmail";

/**
 * Building blocks shared by the emails a parent receives after a form
 * (enrolment confirmed, trial class confirmed): the details card, the
 * numbered "what happens next" steps and the WhatsApp help box.
 */

export const WHATSAPP_NUMBER = "971505344645";
export const WHATSAPP_DISPLAY = "+971 50 534 4645";

export const CONFIRMATION_MOBILE_CSS = `
  .body-copy{font-size:14px !important;line-height:23px !important;}
  .mobile-stack{display:block !important;width:100% !important;}
  .mobile-button{display:block !important;width:100% !important;margin-top:18px !important;padding-top:18px !important;}
  .mobile-button table{width:100% !important;}
  .mobile-button td{width:100% !important;}
  .mobile-button a{display:block !important;text-align:center !important;}`;

export const smallLabel = (text: string, colour = "#848D9B") =>
  `<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${colour};">${text}</div>`;

/** "✓ Something Confirmed" pill. `text` is trusted copy, not visitor input. */
export const confirmedPill = (text: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">&#10003; ${text}</td>
</tr>
</table>`;

export const heroTitle = (html: string) =>
  `<div class="hero-title" style="font-family:${FONT};font-size:31px;line-height:39px;font-weight:800;letter-spacing:-0.8px;color:#434343;">${html}</div>`;

export const bodyCopy = (html: string, margin = "0") =>
  `<p class="body-copy" style="margin:${margin};font-family:${FONT};font-size:14px;line-height:24px;color:#5F6875;">${html}</p>`;

export const strong = (html: string) => `<strong style="color:#181D24;font-weight:700;">${html}</strong>`;

export const gap = (px: number) =>
  `<div style="height:${px}px;line-height:${px}px;font-size:0;">&nbsp;</div>`;

/** One line of the details card: emoji, label, value, optional small note. */
export const detailLine = (
  icon: string,
  title: string,
  valueHtml: string,
  note = "",
  labelColour = "#848D9B"
) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td width="44" valign="top" style="font-size:20px;line-height:28px;">${icon}</td>
<td valign="top">
${smallLabel(title, labelColour)}
<div style="margin-top:3px;font-family:${FONT};font-size:15px;line-height:23px;font-weight:700;color:#181D24;">${valueHtml || "—"}</div>
${note ? `<div style="margin-top:2px;font-family:${FONT};font-size:11px;line-height:18px;color:#848D9B;">${note}</div>` : ""}
</td>
</tr>
</table>`;

export const detailDivider = `<div style="height:1px;background:#F0DCD5;margin:21px 0;line-height:1px;font-size:0;">&nbsp;</div>`;

/** The cream card wrapping detail lines. */
export const detailsCard = (heading: string, linesHtml: string) => `
<tr>
<td class="content-padding" style="padding-bottom:38px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;">
<tr>
<td style="padding:25px;">
${smallLabel(heading, "#FB6238")}
${gap(19)}
${linesHtml}
</td>
</tr>
</table>
</td>
</tr>`;

/** The site's three brand accents, in step order. */
const STEP_COLOURS = ["#FB6238", "#F5AE14", "#A6CF4A"];

/**
 * "What happens next?" with numbered steps; `steps` are [bold lead, rest].
 * `stacked` puts the lead on its own line, as a title over a description.
 */
export const nextSteps = (intro: string, steps: [string, string][], stacked = false) => `
<tr>
<td class="content-padding" style="padding-bottom:40px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">What happens next?</div>
${gap(9)}
${bodyCopy(intro, "0 0 22px")}
${steps
  .map(
    ([verb, rest], i) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td width="38" valign="top">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td width="26" height="26" align="center" valign="middle" style="width:26px;height:26px;background:${STEP_COLOURS[i % STEP_COLOURS.length]};border-radius:50%;color:#FFFFFF;font-family:${FONT};font-size:11px;line-height:26px;font-weight:700;">${i + 1}</td>
</tr>
</table>
</td>
<td valign="top" style="${i < steps.length - 1 ? "padding-bottom:18px;" : ""}font-family:${FONT};font-size:13px;line-height:22px;color:#343C48;">
${strong(verb)}${stacked ? "<br>" : " "}${rest}
</td>
</tr>
</table>`
  )
  .join("")}
</td>
</tr>`;

/** Dark box with a heading and two lines of text, and no button. */
export const darkNote = (title: string, text: string, smallPrint = "") => `
<tr>
<td class="content-padding" style="padding-bottom:38px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:25px 24px;">
<div style="font-family:${FONT};font-size:16px;line-height:25px;font-weight:800;color:#FFFFFF;">${esc(title)}</div>
<div style="margin-top:5px;font-family:${FONT};font-size:11px;line-height:20px;color:#B9C0CA;">${esc(text)}</div>
${smallPrint ? `<div style="margin-top:9px;font-family:${FONT};font-size:10px;line-height:18px;color:#848D9B;">${esc(smallPrint)}</div>` : ""}
</td>
</tr>
</table>
</td>
</tr>`;

/** Dark "Need help?" box with a WhatsApp button carrying a pre-filled message. */
export const whatsappHelp = (subtitle: string, prefilledMessage: string) => `
<tr>
<td class="content-padding" style="padding-bottom:38px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:25px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td class="mobile-stack" valign="middle" style="padding-right:12px;">
<div style="font-family:${FONT};font-size:16px;line-height:25px;font-weight:800;color:#FFFFFF;">Need help?</div>
<div style="margin-top:5px;font-family:${FONT};font-size:11px;line-height:20px;color:#B9C0CA;">${esc(subtitle)}</div>
<div style="margin-top:9px;font-family:${FONT};font-size:10px;line-height:18px;color:#848D9B;">WhatsApp &middot; ${WHATSAPP_DISPLAY}</div>
</td>
<td class="mobile-stack mobile-button" align="right" valign="middle" width="140">
${ctaButton(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledMessage)}`, "WhatsApp Us")}
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>`;

export type Row = [label: string, valueHtml: string];

/** Cream / white striped label–value table; the first label is orange. */
export const stripedTable = (rows: Row[]) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;overflow:hidden;">
${rows
  .map(([label, value], i) => {
    const bg = i % 2 === 0 ? "#FFF8F5" : "#FFFFFF";
    const colour = i === 0 ? "#FB6238" : "#5F6875";
    return `<tr>
<td class="mobile-label" width="38%" valign="top" style="padding:10px 18px;background:${bg};"><span style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${colour};">${esc(label)}</span></td>
<td class="mobile-value" width="62%" valign="top" style="padding:10px 18px;background:${bg};"><span style="font-family:${FONT};font-size:14px;line-height:22px;font-weight:600;color:#181D24;word-break:break-word;">${value}</span></td>
</tr>`;
  })
  .join("\n")}
</table>`;
