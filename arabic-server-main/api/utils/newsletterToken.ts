import crypto from "crypto";

/**
 * Signed unsubscribe links.
 *
 * The link carries the address and an HMAC of it, so only someone who received
 * the email can unsubscribe that address — a plain ?email= link would let
 * anyone unsubscribe anyone. Stateless: nothing to store, and old links keep
 * working.
 */

const secret = () => {
  const value = process.env.NEWSLETTER_SECRET || process.env.JWT_SECRET;
  if (!value) throw new Error("NEWSLETTER_SECRET or JWT_SECRET must be set");
  return value;
};

const normalise = (email: string) => String(email).trim().toLowerCase();

export const newsletterToken = (email: string): string =>
  crypto
    .createHmac("sha256", secret())
    .update(`newsletter-unsubscribe:${normalise(email)}`)
    .digest("hex")
    .slice(0, 32);

export const isValidNewsletterToken = (email: string, token: string): boolean => {
  if (!email || typeof token !== "string" || token.length !== 32) return false;
  const expected = Buffer.from(newsletterToken(email));
  const given = Buffer.from(token);
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
};

/** e.g. https://arabic-juniors-api.onrender.com/newsletter/unsubscribe?e=…&t=… */
export const unsubscribeUrl = (apiBase: string, email: string): string =>
  `${apiBase.replace(/\/$/, "")}/newsletter/unsubscribe?e=${encodeURIComponent(
    normalise(email)
  )}&t=${newsletterToken(email)}`;
