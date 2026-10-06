import { Request, Response } from "express";
import Newsletter, { NewsletterAction } from "../models/newsletter";
import { sendEmailToAdmin } from "../utils/sendEmailToAdmin";
import { sendEmail } from "../utils/email";
import { newsletterSubscriptionAdminEmail } from "../utils/emails/newsletterSubscriptionAdmin";
import { escapeRegex } from "../utils/escapeRegex";
import { newsletterWelcomeEmail } from "../utils/emails/newsletterWelcome";
import { isValidNewsletterToken, unsubscribeUrl } from "../utils/newsletterToken";
import { esc } from "../utils/emails/brandedEmail";

/**
 * Where this API is reachable from the outside, for links inside emails.
 * Behind Render's proxy `trust proxy` is set, so req.protocol is https.
 */
const publicApiBase = (req: Request) =>
    process.env.PUBLIC_API_URL || `${req.protocol}://${req.get("host")}`;

const findByEmail = (email: string) =>
    Newsletter.findOne({ email: new RegExp(`^${escapeRegex(email)}$`, "i") });

/** Sends the welcome email; a failure is logged, never shown to the visitor. */
const sendWelcome = async (req: Request, email: string) => {
    try {
        await sendEmail({
            toEmail: email,
            toName: "",
            subject: "Welcome to Arabic Juniors",
            htmlContent: newsletterWelcomeEmail({
                unsubscribeUrl: unsubscribeUrl(publicApiBase(req), email),
            }),
        });
    } catch (err) {
        console.error("Newsletter welcome email failed (non-blocking):", err);
    }
};

const notifyAdmin = async (email: string, resubscribed: boolean) => {
    try {
        await sendEmailToAdmin({
            subject: resubscribed
                ? `Newsletter re-subscription: ${email}`
                : `New newsletter subscription: ${email}`,
            htmlContent: newsletterSubscriptionAdminEmail({ email, resubscribed }),
            replyTo: { email },
        });
    } catch (err) {
        console.error("Newsletter admin notification failed (non-blocking):", err);
    }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (req: Request, res: Response): Promise<any> => {
    try {
        const email = String(req.body?.email ?? "").trim().toLowerCase();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        const existing = await findByEmail(email);

        // Already on the list: say so instead of the duplicate-key error that
        // used to surface as "Failed to subscribe".
        if (existing && existing.action_taken !== NewsletterAction.UNSUBSCRIBED) {
            return res.status(200).json({ message: "You're already subscribed to our newsletter!" });
        }

        if (existing) {
            existing.action_taken = NewsletterAction.SUBSCRIBED;
            existing.action_date = new Date();
            await existing.save();
        } else {
            await Newsletter.create({ email });
        }

        // The subscription is saved; email trouble must not turn it into an error.
        await sendWelcome(req, email);
        await notifyAdmin(email, Boolean(existing));

        res.status(201).json({ message: "Subscribed to newsletter successfully!" });
    } catch (error: any) {
        console.error("Newsletter Subscribe Error:", error);
        res.status(500).json({ message: "Failed to subscribe" });
    }
};

/** A small branded page for the unsubscribe flow (this is a page, not an email). */
const unsubscribePage = (heading: string, message: string, formHtml = ""): string => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>${esc(heading)} — Arabic Juniors</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F5F6F8;font-family:'Inter',Helvetica,sans-serif;color:#434343;padding:16px;box-sizing:border-box}
.card{background:#fff;max-width:440px;width:100%;border-radius:22px;overflow:hidden;box-shadow:0 8px 35px rgba(24,29,36,.07);text-align:center}
.bar{height:5px;background:#FB6238}
.inner{padding:32px 28px}
img{width:140px;height:auto;margin:0 auto 22px;display:block}
h1{font-size:24px;line-height:32px;font-weight:800;margin:0 0 10px}
p{font-size:14px;line-height:23px;color:#5F6875;margin:0 0 22px}
button,a.btn{display:inline-block;border:0;cursor:pointer;background:#FB6238;color:#fff;font:700 14px 'Inter',Helvetica,sans-serif;padding:12px 22px;border-radius:10px;text-decoration:none}
a.link{display:block;margin-top:14px;font-size:13px;color:#848D9B;text-decoration:none}
</style>
</head>
<body>
<div class="card"><div class="bar"></div><div class="inner">
<img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&amp;w=384&amp;q=75" alt="Arabic Juniors">
<h1>${esc(heading)}</h1>
<p>${message}</p>
${formHtml}
<a class="link" href="https://arabicjuniors.com">Back to ArabicJuniors.com</a>
</div></div>
</body>
</html>`;

/**
 * helmet's default policy blocks images from other origins, which hid the logo.
 * These pages get their own tight policy: no scripts at all, the logo and
 * Google Fonts allowed, and the form may only post back to this API.
 */
const sendPage = (res: Response, status: number, html: string) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
    );
    res.status(status).type("html").send(html);
};

const readUnsubscribeParams = (req: Request) => ({
    email: String((req.query.e ?? req.body?.e) || "").trim().toLowerCase(),
    token: String((req.query.t ?? req.body?.t) || ""),
});

/**
 * GET: shows a confirmation button rather than unsubscribing straight away.
 * Mail security scanners open every link in an email; a GET that acted on
 * its own would unsubscribe people who never clicked anything.
 */
export const showUnsubscribe = async (req: Request, res: Response) => {
    const { email, token } = readUnsubscribeParams(req);
    if (!isValidNewsletterToken(email, token)) {
        sendPage(res, 400, unsubscribePage("Link not valid", "This unsubscribe link is incomplete or has been changed. Please use the link from your email."));
        return;
    }

    sendPage(
        res,
        200,
        unsubscribePage(
            "Unsubscribe from our newsletter?",
            `<strong>${esc(email)}</strong> will no longer receive the Arabic Juniors newsletter.`,
            `<form method="POST" action="unsubscribe">
<input type="hidden" name="e" value="${esc(email)}">
<input type="hidden" name="t" value="${esc(token)}">
<button type="submit">Yes, unsubscribe me</button>
</form>`
        )
    );
};

/** POST: performs the unsubscribe. */
export const confirmUnsubscribe = async (req: Request, res: Response) => {
    const { email, token } = readUnsubscribeParams(req);
    if (!isValidNewsletterToken(email, token)) {
        sendPage(res, 400, unsubscribePage("Link not valid", "This unsubscribe link is incomplete or has been changed. Please use the link from your email."));
        return;
    }

    try {
        const subscriber = await findByEmail(email);
        if (subscriber && subscriber.action_taken !== NewsletterAction.UNSUBSCRIBED) {
            subscriber.action_taken = NewsletterAction.UNSUBSCRIBED;
            subscriber.action_date = new Date();
            await subscriber.save();
        }
        sendPage(
            res,
            200,
            unsubscribePage(
                "You've been unsubscribed",
                "You won't receive the Arabic Juniors newsletter any more. You can subscribe again anytime from our website."
            )
        );
    } catch (error) {
        console.error("Newsletter unsubscribe error:", error);
        sendPage(res, 500, unsubscribePage("Something went wrong", "Please try again in a moment."));
    }
};

// Get newsletters with pagination and filter
export const getNewsletters = async (req: Request, res: Response) => {
    try {
        let { page = "1", limit = "10", startDate, endDate } = req.query;

        const pageNumber = parseInt(page as string, 10) || 1;
        const pageSize = parseInt(limit as string, 10) || 10;

        // Build search filter
        let filter: any = {};

        if (startDate || endDate) {
            filter.createdAt = {}
            if (startDate) filter.createdAt.$gte = new Date(startDate as string)
            if (endDate) filter.createdAt.$lte = new Date(endDate as string)
        }

        // Count total documents
        const total = await Newsletter.countDocuments(filter);

        // Fetch paginated newsletters
        const newsletters = await Newsletter.find(filter)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        res.status(200).json({
            status: "success",
            data: newsletters,
            pagination: {
                total,
                page: pageNumber,
                limit: pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (error) {
        console.error("Error fetching newsletters:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch newsletters",
            error,
        });
    }
};

// Get All newsletters (for export, no pagination)
export const getAllNewsletters = async (req: Request, res: Response) => {
    try {
        let { startDate, endDate } = req.query;
        let filter: any = {};

        if (startDate || endDate) {
            filter.createdAt = {}
            if (startDate) filter.createdAt.$gte = new Date(startDate as string)
            if (endDate) filter.createdAt.$lte = new Date(endDate as string)
        }

        const users = await Newsletter.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            status: "success",
            data: users,
            total: users.length,
        });
    } catch (error) {
        console.error("Error fetching all newsletters:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch all newsletters",
            error,
        });
    }
};
// Delete a single subscriber
export const deleteNewsletter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const removed = await Newsletter.findByIdAndDelete(id);

        if (!removed) {
            res.status(404).json({ status: "error", message: "Subscriber not found" });
            return;
        }

        res.status(200).json({ status: "success", message: "Subscriber deleted" });
    } catch (error) {
        console.error("Error deleting newsletter subscriber:", error);
        res.status(500).json({ status: "error", message: "Failed to delete the subscriber" });
    }
};

/**
 * Delete several subscribers at once.
 *
 * A POST rather than a DELETE because the ids travel in the body, and a request
 * body on DELETE is poorly supported by proxies and some HTTP clients.
 */
export const deleteManyNewsletters = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({ status: "error", message: "No subscribers selected" });
            return;
        }

        // Guard against a runaway request wiping the list in one call. The admin
        // screen sends at most one page of rows, so this is far above normal use.
        if (ids.length > 500) {
            res.status(400).json({ status: "error", message: "Too many at once. Select up to 500." });
            return;
        }

        const result = await Newsletter.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            status: "success",
            message: `${result.deletedCount} subscriber(s) deleted`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting newsletter subscribers:", error);
        res.status(500).json({ status: "error", message: "Failed to delete the subscribers" });
    }
};
