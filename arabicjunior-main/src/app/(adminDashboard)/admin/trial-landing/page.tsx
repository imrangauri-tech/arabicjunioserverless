"use client";

import React, { useState, useEffect } from "react";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button-2";
import {
  Loader2,
  Settings,
  Plus,
  Trash,
  Compass,
  Copy,
  ExternalLink,
} from "lucide-react";
import LandingEditor from "./LandingEditor";
import { DEFAULT_LANDING_SLUG } from "@/lib/landing";

type LandingPageListItem = {
  _id: string;
  title: string;
  slug: string;
  city?: string;
  createdAt: string;
  updatedAt: string;
};

export default function TrialLandingAdminPage() {
  const { token } = useAuthAdmin();
  const [loadingList, setLoadingList] = useState(true);

  // List vs Edit Mode
  const [pagesList, setPagesList] = useState<LandingPageListItem[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openBulkDialog, setOpenBulkDialog] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Creation States
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newCity, setNewCity] = useState("");

  const fetchPagesList = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok && result.data) {
        // Deduplicate items by slug so multiple identical pages never render
        const uniquePages: LandingPageListItem[] = [];
        const seenSlugs = new Set<string>();
        for (const item of result.data) {
          if (!seenSlugs.has(item.slug)) {
            seenSlugs.add(item.slug);
            uniquePages.push(item);
          }
        }
        setPagesList(uniquePages);
      } else {
        toast.error("Failed to load landing pages list");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading landing pages list");
    } finally {
      setLoadingList(false);
    }
  };


  useEffect(() => {
    if (token) {
      fetchPagesList();
    }
  }, [token]);

  const handleCreatePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Page title is required");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          slug: newSlug.trim() || undefined,
          city: newCity.trim() || undefined,
        }),
      });

      const result = await res.json();
      if (res.ok && result.data) {
        toast.success("Landing page created successfully!");
        setNewTitle("");
        setNewSlug("");
        setNewCity("");
        setIsCreating(false);
        // Refresh list and jump to edit
        fetchPagesList();
        setSelectedPageId(result.data._id);
      } else {
        toast.error(result.message || "Failed to create landing page");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error creating landing page");
    }
  };

  /**
   * The live /trial-landing page cannot be deleted, exactly as the Delete button
   * on its row is disabled. Excluding it here means a select-all can never put
   * the admin in front of a confirmation that will silently skip a row.
   */
  const deletablePages = pagesList.filter((page) => page.slug !== DEFAULT_LANDING_SLUG);

  const toggleOne = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const allSelected =
    deletablePages.length > 0 && selectedIds.length === deletablePages.length;

  const toggleAll = () =>
    setSelectedIds(allSelected ? [] : deletablePages.map((page) => page._id));

  const selectedPages = pagesList.filter((page) => selectedIds.includes(page._id));

  const handleBulkDeletePages = async () => {
    if (!selectedIds.length || !token) return;

    setBulkDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/delete-many`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ids: selectedIds }),
        }
      );
      const result = await res.json().catch(() => null);
      if (!res.ok) throw new Error(result?.message || "Failed to delete");

      toast.success(result?.message || "Landing pages deleted");
      setSelectedIds([]);
      setOpenBulkDialog(false);
      fetchPagesList();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to delete the pages");
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleDeletePage = async (id: string, slugName: string) => {
    const defaultCount = pagesList.filter((p) => p.slug === DEFAULT_LANDING_SLUG).length;
    if (slugName === DEFAULT_LANDING_SLUG && defaultCount <= 1) {
      toast.error("Default trial landing page cannot be deleted");
      return;
    }

    if (!confirm("Are you sure you want to delete this landing page? All custom texts and uploaded illustrations will be deleted forever.")) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/trial-landing/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Landing page deleted successfully!");
        fetchPagesList();
      } else {
        toast.error(result.message || "Failed to delete landing page");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting page");
    }
  };

  const copyToClipboard = (slugText: string) => {
    const url = `${window.location.origin}/${slugText}`;
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };


  // 1. LIST OR HOMEPAGE BANNER VIEW
  if (!selectedPageId) {
    return (
      <div className="space-y-6 w-full mx-auto">
        
        {/* Main Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 flex items-center gap-2">
              <Compass className="h-8 w-8 text-orange-500 animate-spin-slow" />
              Trial & Landing Pages CMS
            </h1>
            <p className="text-neutral-500 mt-1">
              Create and manage custom sub-landing pages. The homepage trial banner is edited under Homepage Banner.
            </p>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-800">
              Dynamic Landing Pages
              <span className="ml-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 align-middle">
                {pagesList.length} total
              </span>
            </h2>
            {selectedIds.length > 0 && (
              <button
                onClick={() => setOpenBulkDialog(true)}
                className="ml-auto mr-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                <Trash size={16} /> Delete selected ({selectedIds.length})
              </button>
            )}
            <button
              onClick={() => setIsCreating(!isCreating)}
              className="flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-600 transition-colors shadow-sm whitespace-nowrap shrink-0 text-sm"
            >
              <Plus size={16} />
              Create Landing Page
            </button>
          </div>

          {/* Creation Box */}
          {isCreating && (
            <form onSubmit={handleCreatePageSubmit} className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4 max-w-2xl">
              <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                <Settings size={18} className="text-orange-500" />
                New Page Configurations
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Page Title / Name</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Dubai Summer Camp"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white text-black"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">Custom URL Slug (Optional)</label>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="e.g. dubai-summer (defaults to slugified title)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1">City (Optional)</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="e.g. Sharjah (defaults to the slug)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border rounded-lg text-neutral-500 hover:bg-neutral-50 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold flex items-center gap-1"
                >
                  <Plus size={16} /> Create Page
                </button>
              </div>
            </form>
          )}

          {/* Loading list */}
          {loadingList ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <p className="text-neutral-400 text-sm mt-2">Fetching landing pages list...</p>
            </div>
          ) : (
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    <th className="pl-6 pr-2 py-4 w-10">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        disabled={deletablePages.length === 0}
                        aria-label="Select all landing pages"
                        className="h-4 w-4 cursor-pointer accent-orange-500 disabled:cursor-not-allowed"
                      />
                    </th>
                    <th className="px-6 py-4">Page Title</th>
                    <th className="px-6 py-4">URL Route</th>
                    <th className="px-6 py-4">Date Created</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                  {pagesList.map((page) => (
                    <tr
                      key={page._id}
                      className={`transition-colors ${
                        selectedIds.includes(page._id)
                          ? "bg-orange-50/60"
                          : "hover:bg-neutral-50/50"
                      }`}
                    >
                      <td className="pl-6 pr-2 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(page._id)}
                          onChange={() => toggleOne(page._id)}
                          disabled={page.slug === DEFAULT_LANDING_SLUG}
                          aria-label={
                            page.slug === DEFAULT_LANDING_SLUG
                              ? "The default landing page cannot be deleted"
                              : `Select ${page.title}`
                          }
                          title={
                            page.slug === DEFAULT_LANDING_SLUG
                              ? "The default landing page cannot be deleted"
                              : undefined
                          }
                          className="h-4 w-4 cursor-pointer accent-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                        />
                      </td>
                      <td className="px-6 py-4 font-bold text-neutral-800">{page.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 px-2.5 py-1 rounded text-xs font-semibold text-slate-600 select-all border">
                            /{page.slug}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => copyToClipboard(page.slug)}
                            className="p-1 text-neutral-400 hover:text-orange-500 border rounded bg-white"
                            title="Copy Link"
                          >
                            <Copy size={13} />
                          </button>
                          
                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-neutral-400 hover:text-orange-500 border rounded bg-white"
                            title="Live Preview"
                          >
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-neutral-400">
                        {new Date(page.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedPageId(page._id);
                          }}
                          className="px-3.5 py-1.5 bg-orange-55 text-orange-600 border border-orange-200 hover:bg-orange-100 rounded-lg text-xs font-bold transition-all"
                        >
                          Edit Content
                        </button>
                        <button
                          disabled={page.slug === DEFAULT_LANDING_SLUG}
                          onClick={() => handleDeletePage(page._id, page.slug)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            page.slug === DEFAULT_LANDING_SLUG
                              ? "bg-neutral-55 text-neutral-300 border cursor-not-allowed"
                              : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                          }`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {pagesList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                        No custom landing pages found. Click the button to create your first page!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>


        {/* Bulk delete confirmation. Names the pages — each one is a live URL
            that may be linked from an advert. */}
        <Dialog open={openBulkDialog} onOpenChange={setOpenBulkDialog}>
          <DialogContent className="max-w-md bg-white text-black">
            <DialogHeader>
              <DialogTitle>
                Delete {selectedIds.length} landing page
                {selectedIds.length === 1 ? "" : "s"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-neutral-500">
                Their URLs will stop working and their images are deleted. This
                cannot be undone.
              </p>

              <ul className="max-h-40 overflow-y-auto rounded-lg bg-neutral-50 border p-3 text-xs">
                {selectedPages.slice(0, 20).map((page) => (
                  <li key={page._id} className="truncate">
                    {page.title} &mdash; /{page.slug}
                  </li>
                ))}
                {selectedPages.length > 20 && (
                  <li className="pt-1 font-semibold">
                    …and {selectedPages.length - 20} more
                  </li>
                )}
              </ul>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  disabled={bulkDeleting}
                  onClick={() => setOpenBulkDialog(false)}
                  className="text-black border"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleBulkDeletePages}
                  disabled={bulkDeleting}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  {bulkDeleting ? "Deleting…" : "Delete"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    );
  }

  // 2. PAGE EDITOR VIEW
  if (!token) return null;
  return (
    <LandingEditor
      pageId={selectedPageId}
      token={token}
      onBack={() => {
        setSelectedPageId(null);
        fetchPagesList();
      }}
    />
  );
}
