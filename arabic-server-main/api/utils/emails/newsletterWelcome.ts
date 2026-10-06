import { brandedEmail, ctaButton, esc, FONT, SITE } from "./brandedEmail";

/** Sent to a visitor right after they subscribe to the newsletter. */

const MOBILE_CSS = `
  .body-copy{font-size:14px !important;line-height:23px !important;}
  .mobile-button,.mobile-button table{display:block !important;width:100% !important;}
  .mobile-button a{display:block !important;text-align:center !important;}`;

const bodyCopy = (html: string) =>
  `<p class="body-copy" style="margin:0;font-family:${FONT};font-size:14px;line-height:24px;color:#5F6875;">${html}</p>`;

export const newsletterWelcomeEmail = ({
  firstName,
  unsubscribeUrl,
}: {
  /** The form only asks for an email, so this is usually empty. */
  firstName?: string;
  unsubscribeUrl: string;
}): string => {
  const name = firstName?.trim() ? esc(firstName.trim()) : "there";

  const body = `
<!-- HERO -->
<tr>
<td class="content-padding" style="padding-top:4px;padding-bottom:34px;">
<div style="background:#FFF1ED;color:#FB6238;padding:7px 13px;border-radius:50px;display:inline-block;font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;">Newsletter Subscription</div>
<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
<div class="hero-title" style="font-family:${FONT};font-size:31px;line-height:39px;font-weight:800;letter-spacing:-0.8px;color:#434343;">Welcome to<br>Arabic Juniors</div>
<div style="height:14px;line-height:14px;font-size:0;">&nbsp;</div>
${bodyCopy(`Hello <strong style="color:#181D24;">${name}</strong>,`)}
<div style="height:7px;line-height:7px;font-size:0;">&nbsp;</div>
${bodyCopy("Thank you for subscribing to the Arabic Juniors newsletter. We're happy to have you with us!")}
</td>
</tr>

<!-- WHAT YOU'LL RECEIVE -->
<tr>
<td class="content-padding" style="padding-bottom:34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#FFF8F5;border:1px solid #F7DDD5;border-radius:17px;">
<tr>
<td style="padding:22px;">
<div style="font-family:${FONT};font-size:10px;line-height:16px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#FB6238;">What you'll receive</div>
<div style="height:8px;line-height:8px;font-size:0;">&nbsp;</div>
<div style="font-family:${FONT};font-size:14px;line-height:23px;color:#5F6875;">You'll receive useful Arabic learning resources, educational tips, academy updates, special announcements and selected opportunities from Arabic Juniors.</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- STAY CONNECTED -->
<tr>
<td class="content-padding" style="padding-bottom:34px;">
<div class="section-title" style="font-family:${FONT};font-size:19px;line-height:27px;font-weight:800;color:#434343;">Stay connected</div>
<div style="height:10px;line-height:10px;font-size:0;">&nbsp;</div>
${bodyCopy("We look forward to sharing valuable content with you and supporting your Arabic learning journey.")}
</td>
</tr>

<!-- CTA -->
<tr>
<td class="content-padding" style="padding-bottom:34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#181D24;border-radius:17px;">
<tr>
<td style="padding:20px 22px;">
<div style="font-family:${FONT};font-size:13px;line-height:21px;color:#B9C0CA;">Ready to explore Arabic learning with us?</div>
<div style="height:13px;line-height:13px;font-size:0;">&nbsp;</div>
<div class="mobile-button">${ctaButton(SITE, "Explore Arabic Juniors")}</div>
</td>
</tr>
</table>
</td>
</tr>`;

  return brandedEmail({
    title: "Welcome to Arabic Juniors",
    preheader:
      "Welcome to the Arabic Juniors newsletter. Stay connected with useful Arabic learning resources, updates and opportunities.",
    body,
    extraCss: MOBILE_CSS,
    footerLinks: [{ label: "Unsubscribe", href: unsubscribeUrl }],
  });
};
