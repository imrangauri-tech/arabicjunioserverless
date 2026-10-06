import express from "express";
import {
  getAllNewsletters,
  getNewsletters,
  subscribeNewsletter,
  deleteNewsletter,
  deleteManyNewsletters,
  showUnsubscribe,
  confirmUnsubscribe,
} from "../controllers/newsletterController";
import { authenticateAdmin } from "../middleware/authMiddleware";
import { verifyTurnstile } from "../middleware/turnstileMiddleware";

const router = express.Router();

// POST /newsletter/subscribe
router.post("/subscribe", verifyTurnstile, subscribeNewsletter);

// Public unsubscribe link from the welcome email. The link is signed, so it
// needs no login; GET only asks for confirmation, POST does the unsubscribe.
router.get("/unsubscribe", showUnsubscribe);
router.post("/unsubscribe", express.urlencoded({ extended: false }), confirmUnsubscribe);

router.get("/get", authenticateAdmin, getNewsletters);
router.get("/get/all", authenticateAdmin, getAllNewsletters);

// Bulk delete is registered before the :id route so "delete-many" is never
// mistaken for an id.
router.post("/delete-many", authenticateAdmin, express.json(), deleteManyNewsletters);
router.delete("/:id", authenticateAdmin, deleteNewsletter);

export default router;
