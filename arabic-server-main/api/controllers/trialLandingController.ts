import { Request, Response } from "express";
import TrialLanding, { TrialLandingDocument } from "../models/trialLanding";
import { uploadBuffer, destroyQuietly, UploadedAsset } from "../utils/cloudinaryUpload";

/** The default landing page's URL: /trial-benefits. */
export const DEFAULT_SLUG = "trial-benefits";
/** Its previous URL. The frontend 301-redirects it; the record is renamed once. */
const LEGACY_DEFAULT_SLUG = "trial-landing";
const DEFAULT_HERO_IMAGE = "/hero-arabic-kid.jpg";

/** The editable sections, each stored as one nested object. */
const SECTION_KEYS = ["hero", "curriculum", "whyChoose", "advantage", "families"] as const;

const SEO_STRING_KEYS = [
  "metaTitle",
  "metaDescription",
  "metaKeywords",
  "canonicalUrl",
] as const;

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+|-+$/g, "");

/** "abu-dhabi" → "Abu Dhabi"; the default page is the Dubai page. */
export const cityFromSlug = (slug: string) =>
  !slug || slug === DEFAULT_SLUG || slug === LEGACY_DEFAULT_SLUG || slug === "landing"
    ? "Dubai"
    : slug
        .split("-")
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

/** Everything a page owns in Cloudinary, for clean-up on delete. */
const assetsOf = (page: TrialLandingDocument): UploadedAsset[] =>
  [page.hero?.imagePublicId, page.ogImagePublicId]
    .filter((id): id is string => Boolean(id))
    .map((public_id) => ({ public_id, secure_url: "", resource_type: "image" as const }));

/** The editor posts multipart with the content as one JSON string in `data`. */
const readPayload = (body: any): Record<string, any> => {
  if (typeof body?.data === "string") {
    try {
      const parsed = JSON.parse(body.data);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }
  return body && typeof body === "object" ? body : {};
};

/**
 * Makes sure the default page exists at DEFAULT_SLUG.
 *
 * When the default URL changed from /trial-landing to /trial-benefits, the
 * existing record — with everything the admin had written — is renamed rather
 * than replaced by a blank page. Only a database with neither gets a new one.
 */
const ensureDefaultPage = async (): Promise<TrialLandingDocument> => {
  const current = await TrialLanding.findOne({ slug: DEFAULT_SLUG });
  if (current) return current;

  const legacy = await TrialLanding.findOneAndUpdate(
    { slug: LEGACY_DEFAULT_SLUG },
    { $set: { slug: DEFAULT_SLUG } },
    { new: true }
  );
  if (legacy) return legacy;

  return TrialLanding.create({
    title: "Free Trial Landing Page",
    slug: DEFAULT_SLUG,
    city: cityFromSlug(DEFAULT_SLUG),
  });
};

// GET: Fetch trial landing page settings by slug (Public)
export const getTrialLandingSettings = async (req: Request, res: Response): Promise<any> => {
  try {
    const slugParam = req.params.slug || DEFAULT_SLUG;

    // The default page always exists, so /trial-benefits never 404s.
    const settings =
      slugParam === DEFAULT_SLUG
        ? await ensureDefaultPage()
        : await TrialLanding.findOne({ slug: slugParam });

    if (!settings) {
      return res.status(404).json({ success: false, message: "Landing page not found" });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching trial landing settings:", error);
    res.status(500).json({ success: false, message: "Failed to fetch trial landing settings" });
  }
};

// GET: List all trial landing pages (Admin Only)
export const listTrialLandings = async (_req: Request, res: Response): Promise<any> => {
  try {
    // So the admin list shows the default page under its current URL even
    // before anyone has visited it.
    await ensureDefaultPage();
    const list = await TrialLanding.find({}, "_id title slug city createdAt updatedAt").sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error listing trial landings:", error);
    res.status(500).json({ success: false, message: "Failed to list landing pages" });
  }
};

// GET: Fetch full settings by ID (Admin Only)
export const getTrialLandingById = async (req: Request, res: Response): Promise<any> => {
  try {
    const settings = await TrialLanding.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ success: false, message: "Landing page not found" });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching trial landing by ID:", error);
    res.status(500).json({ success: false, message: "Failed to fetch landing page settings" });
  }
};

// POST: Create a new trial landing page (Admin Only)
export const createTrialLanding = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, slug, city } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const targetSlug = slugify(slug || title);
    if (!targetSlug) {
      return res.status(400).json({ success: false, message: "Please enter a valid URL slug" });
    }

    const existing = await TrialLanding.findOne({ slug: targetSlug });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: `Slug "${targetSlug}" is already in use` });
    }

    const newPage = await TrialLanding.create({
      title: String(title).trim(),
      slug: targetSlug,
      city: (typeof city === "string" && city.trim()) || cityFromSlug(targetSlug),
    });

    res.status(201).json({
      success: true,
      message: "Landing page created successfully!",
      data: newPage,
    });
  } catch (error) {
    console.error("Error creating landing page:", error);
    res.status(500).json({ success: false, message: "Server error during landing page creation" });
  }
};

// PUT: Update specific trial landing page settings (Admin Only)
export const updateTrialLandingSettings = async (req: Request, res: Response): Promise<any> => {
  const uploaded: UploadedAsset[] = [];
  try {
    const settings = await TrialLanding.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ success: false, message: "Landing page not found" });
    }

    const payload = readPayload(req.body);

    if (typeof payload.title === "string" && payload.title.trim()) {
      settings.title = payload.title.trim();
    }

    if (typeof payload.slug === "string" && payload.slug.trim()) {
      const targetSlug = slugify(payload.slug);
      if (targetSlug && targetSlug !== settings.slug) {
        // The default page backs the /trial-benefits URL; renaming it would just
        // make the public route recreate a fresh copy.
        if (settings.slug === DEFAULT_SLUG) {
          return res
            .status(400)
            .json({ success: false, message: "The default page's URL cannot be changed" });
        }
        const existing = await TrialLanding.findOne({ slug: targetSlug });
        if (existing) {
          return res
            .status(400)
            .json({ success: false, message: `Slug "${targetSlug}" is already in use` });
        }
        settings.slug = targetSlug;
      }
    }

    if (typeof payload.city === "string") settings.city = payload.city.trim();

    for (const key of SECTION_KEYS) {
      const incoming = payload[key];
      if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) continue;

      const next = { ...incoming };
      // Image fields are owned by the upload handling below, never by the form.
      if (key === "hero") {
        delete next.imageUrl;
        delete next.imagePublicId;
      }
      const current = ((settings.get(key) as any)?.toObject?.() ?? {}) as Record<string, unknown>;
      settings.set(key, { ...current, ...next });
    }

    for (const key of SEO_STRING_KEYS) {
      if (typeof payload[key] === "string") settings.set(key, payload[key]);
    }
    if (payload.indexPage !== undefined) {
      settings.indexPage = payload.indexPage === true || payload.indexPage === "true";
    }

    // ---- Images -----------------------------------------------------------
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const replaced: UploadedAsset[] = [];

    const heroFile = files?.heroImage?.[0];
    if (heroFile) {
      const result = await uploadBuffer(heroFile, "trial-landing");
      uploaded.push(result);
      if (settings.hero.imagePublicId) {
        replaced.push({ public_id: settings.hero.imagePublicId, secure_url: "", resource_type: "image" });
      }
      settings.hero.imageUrl = result.secure_url;
      settings.hero.imagePublicId = result.public_id;
    } else if (payload.removeHeroImage === true) {
      if (settings.hero.imagePublicId) {
        replaced.push({ public_id: settings.hero.imagePublicId, secure_url: "", resource_type: "image" });
      }
      settings.hero.imageUrl = DEFAULT_HERO_IMAGE;
      settings.hero.imagePublicId = "";
    }

    const ogFile = files?.ogImage?.[0];
    if (ogFile) {
      const result = await uploadBuffer(ogFile, "trial-landing");
      uploaded.push(result);
      if (settings.ogImagePublicId) {
        replaced.push({ public_id: settings.ogImagePublicId, secure_url: "", resource_type: "image" });
      }
      settings.ogImageUrl = result.secure_url;
      settings.ogImagePublicId = result.public_id;
    } else if (payload.removeOgImage === true) {
      if (settings.ogImagePublicId) {
        replaced.push({ public_id: settings.ogImagePublicId, secure_url: "", resource_type: "image" });
      }
      settings.ogImageUrl = "";
      settings.ogImagePublicId = "";
    }

    await settings.save();

    // Old images are dropped only once the new ones are safely saved.
    await destroyQuietly(replaced);

    res.status(200).json({
      success: true,
      message: "Landing page updated successfully!",
      data: settings,
    });
  } catch (error: any) {
    await destroyQuietly(uploaded);
    console.error("Error updating trial landing settings:", error);
    const message =
      error?.name === "ValidationError" || error?.name === "CastError"
        ? error.message
        : "Server error during settings update";
    res.status(error?.name === "ValidationError" ? 400 : 500).json({ success: false, message });
  }
};

/**
 * POST: Delete several landing pages at once (Admin Only).
 *
 * The default /trial-benefits page is skipped rather than deleted, exactly as
 * the single delete refuses it. The response says how many were skipped so the
 * count on screen is never a surprise.
 */
export const deleteManyTrialLandings = async (req: Request, res: Response): Promise<any> => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No landing pages selected" });
    }

    if (ids.length > 200) {
      return res.status(400).json({
        success: false,
        message: "Please delete at most 200 landing pages at a time",
      });
    }

    const pages = await TrialLanding.find({ _id: { $in: ids } });
    const deletable = pages.filter((page) => page.slug !== DEFAULT_SLUG);
    const defaultsKept = pages.length - deletable.length;

    if (!deletable.length) {
      if (defaultsKept) {
        return res.status(400).json({
          success: false,
          message: "The default trial landing page cannot be deleted",
        });
      }
      return res.status(200).json({
        success: true,
        message: "0 landing page(s) deleted successfully!",
        deletedCount: 0,
        skipped: 0,
      });
    }

    const result = await TrialLanding.deleteMany({ _id: { $in: deletable.map((p) => p._id) } });
    await destroyQuietly(deletable.flatMap(assetsOf));

    res.status(200).json({
      success: true,
      message:
        `${result.deletedCount} landing page(s) deleted successfully!` +
        (defaultsKept ? " The default trial landing page was kept." : ""),
      deletedCount: result.deletedCount,
      skipped: defaultsKept,
    });
  } catch (error) {
    console.error("Error deleting landing pages:", error);
    res.status(500).json({ success: false, message: "Failed to delete the landing pages" });
  }
};

// DELETE: Delete specific trial landing page (Admin Only)
export const deleteTrialLanding = async (req: Request, res: Response): Promise<any> => {
  try {
    const settings = await TrialLanding.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ success: false, message: "Landing page not found" });
    }

    if (settings.slug === DEFAULT_SLUG) {
      return res
        .status(400)
        .json({ success: false, message: "Default trial landing page cannot be deleted" });
    }

    await settings.deleteOne();
    await destroyQuietly(assetsOf(settings));

    res.status(200).json({ success: true, message: "Landing page deleted successfully!" });
  } catch (error) {
    console.error("Error deleting landing page:", error);
    res.status(500).json({ success: false, message: "Server error during landing page deletion" });
  }
};
