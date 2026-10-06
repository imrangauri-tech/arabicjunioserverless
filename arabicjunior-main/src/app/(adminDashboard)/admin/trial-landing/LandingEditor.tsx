"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ExternalLink, Loader2, Save, Settings } from "lucide-react";
import FieldsEditor, { inputClass, labelClass } from "@/components/admin/FieldsEditor";
import MediaPicker from "@/components/admin/MediaPicker";
import { revalidateContent } from "@/lib/revalidateContent";
import type { TrialLandingPage } from "@/types/TrialLanding";
import { LANDING_SECTIONS, SEO_FIELDS } from "./landingFields";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type TabKey = "page" | (typeof LANDING_SECTIONS)[number]["key"] | "seo";

const TABS: { key: TabKey; label: string }[] = [
  { key: "page", label: "Page settings" },
  ...LANDING_SECTIONS.map((s) => ({ key: s.key as TabKey, label: s.label })),
  { key: "seo", label: "SEO" },
];

/** The admin preview of a stored image; a site-relative path needs no host. */
const previewUrl = (url?: string) => (url ? url : undefined);

export default function LandingEditor({
  pageId,
  token,
  onBack,
}: {
  pageId: string;
  token: string;
  onBack: () => void;
}) {
  const [page, setPage] = useState<TrialLandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabKey>("page");

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [ogFile, setOgFile] = useState<File | null>(null);
  const [removeHero, setRemoveHero] = useState(false);
  const [removeOg, setRemoveOg] = useState(false);
  // Bumped after a save so the pickers drop their local preview.
  const [pickerKey, setPickerKey] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/${pageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const result = await res.json().catch(() => null);
      if (!res.ok || !result?.data) throw new Error(result?.message || "Could not load the page");
      setPage(result.data);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Could not load the page");
    } finally {
      setLoading(false);
    }
  }, [pageId, token]);

  useEffect(() => {
    load();
  }, [load]);

  const pickImage = (setter: (f: File | null) => void, clearRemove: () => void) => (file: File | null) => {
    if (file && file.size > MAX_IMAGE_BYTES) {
      toast.error("Image is too large (maximum 5 MB)");
      return;
    }
    setter(file);
    if (file) clearRemove();
  };

  const handleSave = async () => {
    if (!page) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: page.title,
          slug: page.slug,
          city: page.city,
          hero: page.hero,
          curriculum: page.curriculum,
          whyChoose: page.whyChoose,
          advantage: page.advantage,
          families: page.families,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          metaKeywords: page.metaKeywords,
          canonicalUrl: page.canonicalUrl,
          indexPage: page.indexPage,
          removeHeroImage: removeHero && !heroFile,
          removeOgImage: removeOg && !ogFile,
        })
      );
      if (heroFile) formData.append("heroImage", heroFile);
      if (ogFile) formData.append("ogImage", ogFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/${pageId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const result = await res.json().catch(() => null);
      if (!res.ok) throw new Error(result?.message || "Could not save the page");

      setPage(result.data);
      setHeroFile(null);
      setOgFile(null);
      setRemoveHero(false);
      setRemoveOg(false);
      setPickerKey((k) => k + 1);
      await revalidateContent(token);
      toast.success("Landing page saved — it is live now.");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Could not save the page");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !page) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="mt-2 text-sm text-neutral-500">Loading landing page…</p>
      </div>
    );
  }

  const isDefault = page.slug === "trial-landing";
  const section = LANDING_SECTIONS.find((s) => s.key === tab);

  return (
    <div className="mx-auto w-full space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 border-b pb-5">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border bg-white p-2 text-neutral-500 shadow-sm transition-colors hover:bg-neutral-50"
          title="Back to list"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-800">
            <Settings className="h-7 w-7 text-orange-500" />
            Edit: <span className="truncate text-orange-500">{page.title}</span>
          </h1>
          <p className="mt-0.5 text-xs text-neutral-400">/{page.slug}</p>
        </div>
        <a
          href={`/${page.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
        >
          <ExternalLink size={15} /> View page
        </a>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
              tab === t.key
                ? "bg-orange-500 text-white shadow-sm"
                : "border bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl space-y-6 rounded-xl border border-neutral-200 bg-white p-5">
        {tab === "page" && (
          <div className="space-y-4">
            <label className="block">
              <span className={labelClass}>Page name (admin only)</span>
              <input
                className={inputClass}
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
              />
            </label>
            <label className="block">
              <span className={labelClass}>URL slug</span>
              <input
                className={inputClass}
                value={page.slug}
                disabled={isDefault}
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
              />
              <span className="mt-1 block text-xs text-neutral-500">
                {isDefault
                  ? "The default page always lives at /trial-landing."
                  : "Changing this changes the page's address; old links will stop working."}
              </span>
            </label>
            <label className="block">
              <span className={labelClass}>City</span>
              <input
                className={inputClass}
                value={page.city ?? ""}
                placeholder="Dubai"
                onChange={(e) => setPage({ ...page, city: e.target.value })}
              />
              <span className="mt-1 block text-xs text-neutral-500">
                Replaces {"{city}"} in every text on this page. Leave empty to use the
                slug (e.g. /abu-dhabi → Abu Dhabi).
              </span>
            </label>
          </div>
        )}

        {tab === "hero" && (
          <div className="space-y-2 border-b pb-6">
            <span className={labelClass}>Hero image</span>
            <MediaPicker
              key={`hero-${pickerKey}`}
              initialUrl={removeHero ? undefined : previewUrl(page.hero.imageUrl)}
              onSelect={(file) => {
                if (!file) {
                  setHeroFile(null);
                  setRemoveHero(true);
                  return;
                }
                pickImage(setHeroFile, () => setRemoveHero(false))(file);
              }}
              previewClassName="w-80 aspect-[16/10] rounded-xl object-cover border"
            />
            <p className="text-xs text-neutral-500">
              Landscape photo, about 1600×1000. Maximum 5 MB. Removing it restores the
              default photo.
            </p>
          </div>
        )}

        {section && (
          <FieldsEditor
            fields={section.fields}
            value={page[section.key] as unknown as Record<string, unknown>}
            onChange={(next) => setPage({ ...page, [section.key]: next } as TrialLandingPage)}
          />
        )}

        {tab === "seo" && (
          <>
            <FieldsEditor
              fields={SEO_FIELDS}
              value={page as unknown as Record<string, unknown>}
              onChange={(next) => setPage(next as unknown as TrialLandingPage)}
            />
            <div className="space-y-2 border-t pt-6">
              <span className={labelClass}>Social share image</span>
              <MediaPicker
                key={`og-${pickerKey}`}
                initialUrl={removeOg ? undefined : previewUrl(page.ogImageUrl)}
                onSelect={(file) => {
                  if (!file) {
                    setOgFile(null);
                    setRemoveOg(true);
                    return;
                  }
                  pickImage(setOgFile, () => setRemoveOg(false))(file);
                }}
                previewClassName="w-72 aspect-[1200/630] rounded-xl object-cover border"
              />
              <p className="text-xs text-neutral-500">
                1200×630 works best. Without one, the hero image is used.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="max-w-4xl">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
