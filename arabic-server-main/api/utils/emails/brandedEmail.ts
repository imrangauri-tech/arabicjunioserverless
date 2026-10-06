/**
 * Shared frame for the branded admin notification emails (student
 * registration, contact message …): orange top bar, logo header, social icons
 * and footer. Each email supplies only its own body rows.
 *
 * Table-based, inline-styled HTML on purpose: email clients (Gmail, Outlook)
 * ignore most modern CSS, and the <style> block is only a progressive
 * enhancement for clients that honour media queries.
 */

export const SITE = "https://arabicjuniors.com";
export const FONT = "'Inter', Helvetica, sans-serif";

const LOGO =
  process.env.EMAIL_LOGO_URL ||
  "https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75";

/** Escapes anything that came from a visitor before it goes into the markup. */
export const esc = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Escaped, with the visitor's own line breaks kept. */
export const escMultiline = (value: unknown): string =>
  esc(value).replace(/\r\n|\r|\n/g, "<br />");

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/arabicjunior/", icon: "https://res.cloudinary.com/dromjx3rx/image/upload/v1790832048/instagram_1_zu9aw4.png" },
  { name: "Facebook", href: "https://www.facebook.com/arabicjuniors", icon: "https://res.cloudinary.com/dromjx3rx/image/upload/v1790832049/facebook_lmvmxt.png" },
  { name: "YouTube", href: "https://www.youtube.com/@ArabicJuniors", icon: "https://res.cloudinary.com/dromjx3rx/image/upload/v1790832048/youtube_otu8mr.png" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/arabicjuniors", icon: "https://res.cloudinary.com/dromjx3rx/image/upload/v1790832050/linkedin_odhn1y.png" },
  { name: "Pinterest", href: "https://www.pinterest.com/arabicjuniors/", icon: "https://res.cloudinary.com/dromjx3rx/image/upload/v1790832048/pinterest_zphnof.png" },
  { name: "TikTok", href: "https://www.tiktok.com/tag/arabicjuniors", icon: "https://res.cloudinary.com/dromjx3rx/image/upload/v1790832048/tik-tok_ncvrpj.png" },
];

/** An orange call-to-action button, safe in Outlook (the cell carries the colour). */
export const ctaButton = (href: string, label: string, className = ""): string => `
<table role="presentation" class="${className}" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate !important;">
<tr>
<td bgcolor="#FB6238" style="background:#FB6238;border-radius:10px;text-align:center;white-space:nowrap;">
<a href="${esc(href)}" target="_blank" class="cta-button-link" style="display:inline-block;padding:11px 18px;font-family:${FONT};font-size:12px;line-height:16px;font-weight:700;color:#FFFFFF !important;text-decoration:none;white-space:nowrap;">${esc(label)}</a>
</td>
</tr>
</table>`;

const DEFAULT_FOOTER_LINKS = [
  { label: "Privacy Policy", href: `${SITE}/privacy-policy` },
  { label: "Terms & Conditions", href: `${SITE}/terms-and-conditions` },
];

export const brandedEmail = ({
  title,
  preheader,
  body,
  extraCss = "",
  footerLinks = DEFAULT_FOOTER_LINKS,
}: {
  /** The <title> of the document. */
  title: string;
  /** Inbox preview text; escaped here. */
  preheader: string;
  /** The <tr> rows between the header and the social icons. */
  body: string;
  /** Email-specific mobile rules. */
  extraCss?: string;
  /** Links between "ArabicJuniors.com" and the copyright line. */
  footerLinks?: { label: string; href: string }[];
}): string => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(title)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
html,body{margin:0 !important;padding:0 !important;width:100% !important;background-color:#F5F6F8;}
body{font-family:${FONT};color:#181D24;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
table{border-collapse:collapse !important;border-spacing:0 !important;}
img{border:0;outline:none;text-decoration:none;display:block;}
a{text-decoration:none;}
.email-container{width:620px;max-width:620px;}
.content-padding{padding-left:44px;padding-right:44px;}
.social-icon{width:24px !important;height:24px !important;max-width:24px !important;max-height:24px !important;display:block !important;}
@media only screen and (max-width:650px){
  body{background:#FFFFFF !important;}
  .email-container{width:100% !important;max-width:100% !important;border-radius:0 !important;box-shadow:none !important;}
  .content-padding{padding-left:24px !important;padding-right:24px !important;}
  .hero-title{font-size:26px !important;line-height:34px !important;}
  .section-title{font-size:17px !important;line-height:25px !important;}
  .detail-label,.detail-value{word-break:break-word !important;}
  .mobile-footer{white-space:normal !important;}
  ${extraCss}
}
@media only screen and (max-width:420px){
  .content-padding{padding-left:20px !important;padding-right:20px !important;}
  .hero-title{font-size:24px !important;line-height:32px !important;}
}
.ExternalClass{width:100%;}
.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%;}
#outlook a{padding:0;}
</style>
</head>
<body>

<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#F5F6F8;">${esc(preheader)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#F5F6F8;">
<tr>
<td align="center" style="padding:30px 12px;">

<table role="presentation" class="email-container" width="620" cellpadding="0" cellspacing="0" border="0" style="width:620px;max-width:620px;background:#FFFFFF;border-radius:22px;overflow:hidden;box-shadow:0 8px 35px rgba(24,29,36,.07);">

<tr><td height="5" style="height:5px;background:#FB6238;font-size:0;line-height:0;">&nbsp;</td></tr>

<!-- HEADER -->
<tr>
<td class="content-padding" style="padding-top:28px;padding-bottom:24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="left" valign="middle">
<a href="${SITE}" target="_blank"><img src="${esc(LOGO)}" width="145" alt="Arabic Juniors" style="width:145px;max-width:145px;height:auto;"></a>
</td>
<td align="right" valign="middle" style="font-family:${FONT};font-size:10px;line-height:16px;color:#848D9B;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">Arabic Made Easy</td>
</tr>
</table>
</td>
</tr>

${body}

<!-- SOCIAL ICONS -->
<tr>
<td align="center" style="padding:0 20px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
<tr>
${SOCIALS.map(
  (s) =>
    `<td align="center" valign="middle" style="padding:0 4px;"><a href="${s.href}" target="_blank"><img class="social-icon" src="${s.icon}" width="24" height="24" alt="${s.name}"></a></td>`
).join("\n")}
</tr>
</table>
</td>
</tr>

<!-- FOOTER -->
<tr>
<td class="mobile-footer" align="center" style="border-top:1px solid #EEEEF2;padding:12px 20px;font-family:${FONT};font-size:9px;line-height:15px;color:#A4ABB5;">
<a href="${SITE}" target="_blank" style="color:#FB6238;font-weight:700;text-decoration:none;">ArabicJuniors.com</a>
${footerLinks
  .map(
    (link) =>
      `<span>&nbsp; · &nbsp;</span>\n<a href="${esc(link.href)}" target="_blank" style="color:#848D9B;text-decoration:none;">${esc(link.label)}</a>`
  )
  .join("\n")}
<span>&nbsp; · &nbsp;</span>
<span>© ${new Date().getFullYear()} Arabic Juniors. All rights reserved.</span>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`;
