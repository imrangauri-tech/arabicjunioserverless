"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MoveLeft, Save, Star } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input-2";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button-2";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Loader from "@/components/loader";
import useAuthAdmin from "@/hooks/useAuthAdmin";
import { revalidateContent } from "@/lib/revalidateContent";
import MediaPicker from "@/components/admin/MediaPicker";
import FieldsEditor, { type FieldDef } from "@/components/admin/FieldsEditor";
import type { Teacher, TeacherPhilosophy, TeacherPhotoHighlight } from "@/types/Teacher";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

const teacherSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(60, "Name should not exceed 60 characters."),
    profession: z.string().min(2, "Required.").max(40, "Should not exceed 40 characters."),
    grade: z.string().max(30).optional(),
    experience: z.string().max(40).optional(),
    education: z.string().max(120).optional(),
    subject: z.string().max(60).optional(),
    shortDescription: z
      .string()
      .max(600, "Description should not exceed 600 characters.")
      .optional(),
    rating: z.coerce.number().min(1).max(5),
    order: z.coerce.number().int().min(0, "Order cannot be negative."),
    status: z.enum(["draft", "published"]),
    showOnHomepage: z.boolean(),

    // Profile page (/our-teachers/<slug>)
    slug: z
      .string()
      .max(80)
      .regex(/^[a-z0-9-]*$/, "Use lowercase letters, numbers and hyphens only.")
      .optional(),
    country: z.string().max(60).optional(),
    languages: z.string().max(120).optional(),
    bio: z.string().max(1200).optional(),
    quote: z.string().max(400).optional(),
    photoBadge: z.string().max(60).optional(),
    photoTitle: z.string().max(80).optional(),
    photoTitleHighlight: z.string().max(80).optional(),
    aboutIntro: z.string().max(2000).optional(),

    photo: z.any().optional(),
    portrait: z.any().optional(),

    // Set in edit mode so the photo check knows one already exists.
    hasExistingPhoto: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!isFile(data.photo) && !data.hasExistingPhoto) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["photo"],
        message: "A photo is required.",
      });
    }

    for (const key of ["photo", "portrait"] as const) {
      const value = data[key];
      if (isFile(value) && value.size > MAX_IMAGE_BYTES) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: "Image is too large (maximum 5 MB).",
        });
      }
    }
  });

type TeacherFormData = z.infer<typeof teacherSchema>;

const PROFILE_TEXT_KEYS = [
  "country",
  "languages",
  "bio",
  "quote",
  "photoBadge",
  "photoTitle",
  "photoTitleHighlight",
  "aboutIntro",
] as const;

const PHOTO_HIGHLIGHT_FIELDS: FieldDef[] = [
  {
    kind: "list",
    key: "items",
    label: "Highlights next to the photo",
    itemLabel: "highlight",
    hint: "Shown in the right-hand column of the profile hero. Leave empty to hide that column.",
    newItem: () => ({ icon: "Smile", title: "", description: "" }),
    fields: [
      { kind: "icon", key: "icon" },
      { kind: "text", key: "title", label: "Title" },
      { kind: "textarea", key: "description", label: "Description", rows: 2 },
    ],
  },
];

const PHILOSOPHY_FIELDS: FieldDef[] = [
  {
    kind: "list",
    key: "items",
    label: "Teaching story blocks (numbered 01, 02 …)",
    itemLabel: "block",
    newItem: () => ({ icon: "Lightbulb", title: "", paragraphs: [""] }),
    fields: [
      { kind: "icon", key: "icon" },
      { kind: "text", key: "title", label: "Title" },
      { kind: "lines", key: "paragraphs", label: "Paragraphs", itemLabel: "paragraph" },
    ],
  },
];

export default function TeacherForm({ teacher }: { teacher?: Teacher }) {
  const router = useRouter();
  const { token } = useAuthAdmin();
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = Boolean(teacher);

  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      name: teacher?.name ?? "",
      profession: teacher?.profession ?? "Arabic Teacher",
      grade: teacher?.grade ?? "1-10",
      experience: teacher?.experience ?? "",
      education: teacher?.education ?? "",
      subject: teacher?.subject ?? "Arabic",
      shortDescription: teacher?.shortDescription ?? "",
      rating: teacher?.rating ?? 5,
      order: teacher?.order ?? 0,
      status: teacher?.status ?? "draft",
      showOnHomepage: teacher?.showOnHomepage ?? true,
      hasExistingPhoto: Boolean(teacher?.image),
      slug: teacher?.slug ?? "",
      country: teacher?.country ?? "",
      languages: teacher?.languages ?? "",
      bio: teacher?.bio ?? "",
      quote: teacher?.quote ?? "",
      photoBadge: teacher?.photoBadge ?? "",
      photoTitle: teacher?.photoTitle ?? "",
      photoTitleHighlight: teacher?.photoTitleHighlight ?? "",
      aboutIntro: teacher?.aboutIntro ?? "",
    },
  });

  // Lists live outside react-hook-form: they are edited by FieldsEditor and
  // posted as JSON, which is all the API needs.
  const [photoHighlights, setPhotoHighlights] = useState<TeacherPhotoHighlight[]>(
    teacher?.photoHighlights ?? []
  );
  const [philosophies, setPhilosophies] = useState<TeacherPhilosophy[]>(
    teacher?.philosophies ?? []
  );

  const onSubmit = async (data: TeacherFormData) => {
    if (!token) {
      toast.error("Your session has expired. Please sign in again.");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Saving teacher...", { id: "teacher-save" });

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("profession", data.profession);
      formData.append("grade", data.grade ?? "");
      formData.append("experience", data.experience ?? "");
      formData.append("education", data.education ?? "");
      formData.append("subject", data.subject ?? "");
      formData.append("shortDescription", data.shortDescription ?? "");
      formData.append("rating", String(data.rating));
      formData.append("order", String(data.order));
      formData.append("status", data.status);
      formData.append("showOnHomepage", String(data.showOnHomepage));

      // Empty slug means "generate it from the name" on the server.
      formData.append("slug", data.slug ?? "");
      for (const key of PROFILE_TEXT_KEYS) formData.append(key, data[key] ?? "");
      formData.append("photoHighlights", JSON.stringify(photoHighlights));
      formData.append("philosophies", JSON.stringify(philosophies));

      if (isFile(data.photo)) formData.append("photo", data.photo);
      if (isFile(data.portrait)) formData.append("portrait", data.portrait);

      const url = isEdit
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/teachers/${teacher?._id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/teachers`;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json().catch(() => ({}));
      // The API says exactly what was wrong; a generic message would leave the
      // admin guessing.
      if (!res.ok) throw new Error(json?.message || "Failed to save teacher");

      await revalidateContent(token);

      toast.success(isEdit ? "Teacher updated!" : "Teacher added!", { id: "teacher-save" });
      router.push("/admin/teachers");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
        { id: "teacher-save" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Button variant="link" size="icon" type="button" onClick={() => router.back()}>
              <MoveLeft />
            </Button>
            <h3 className="text-2xl font-semibold flex-1">
              {isEdit ? "Edit teacher" : "Add teacher"}
            </h3>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-9 w-36 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-[120px] flex items-center gap-2"
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex gap-2 items-center">
                  <Loader noPadding />
                  Saving...
                </div>
              ) : (
                <>
                  <Save size={16} /> Save
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Rafat Sayed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Arabic Teacher" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Grades taught</FormLabel>
                  <FormControl>
                    <Input placeholder="1-10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="5+ Years exp." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Education</FormLabel>
                  <FormControl>
                    <Input placeholder="B.Ed., Master’s in Arabic study" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Arabic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">About this teacher</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="A couple of sentences about their teaching style and experience."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Shown in the View Details popup and under the About Us carousel card.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Rating</FormLabel>
                  <FormControl>
                    <Select
                      value={String(field.value)}
                      onValueChange={(v) => field.onChange(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["5", "4.9", "4.8", "4.5", "4"].map((n) => (
                          <SelectItem key={n} value={n}>
                            <span className="flex items-center gap-1">
                              {n}
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Display order</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} {...field} />
                  </FormControl>
                  <FormDescription>Lower numbers appear first.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="showOnHomepage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4">
                <div className="space-y-0.5 pr-4">
                  <FormLabel className="text-base">Show on the homepage</FormLabel>
                  <FormDescription>
                    The homepage slider is a highlight reel. Turn this off to keep a
                    teacher on the Teachers page and About Us only.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Photo</FormLabel>
                  <MediaPicker
                    initialUrl={teacher?.image}
                    onSelect={field.onChange}
                    previewClassName="w-40 h-40 rounded-full object-cover border"
                  />
                  <FormDescription>
                    A square headshot. Shown as a circle everywhere. Maximum 5 MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portrait"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Full-length photo <span className="text-neutral-400">(optional)</span>
                  </FormLabel>
                  <MediaPicker
                    initialUrl={teacher?.portrait}
                    onSelect={field.onChange}
                    previewClassName="w-32 h-44 rounded-xl object-contain border bg-yellow-50"
                  />
                  <FormDescription>
                    Used by the tall cards in the About Us carousel and the profile
                    page. Without it, the headshot is used instead.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ---------------- Profile page ---------------- */}
          <div className="space-y-6 rounded-xl border p-5">
            <div>
              <h4 className="text-lg font-semibold">Profile page</h4>
              <p className="text-sm text-neutral-500">
                The teacher&apos;s own page, opened from &ldquo;View Full Profile&rdquo;.
                Qualification, experience and subject above are reused there. Empty
                fields are simply left off the page.
              </p>
            </div>

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Profile URL</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-neutral-500 shrink-0">/our-teachers/</span>
                      <Input placeholder="generated from the name" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Leave empty to generate it from the name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(
                [
                  ["country", "Country", "Egypt"],
                  ["languages", "Languages", "Arabic (Native), English (Fluent)"],
                ] as const
              ).map(([name, label, placeholder]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {(
              [
                ["bio", "Intro paragraph (top of the page)", "Uses “About this teacher” when empty.", 4],
                ["quote", "Quote under the photo", "A sentence in the teacher’s own words.", 2],
              ] as const
            ).map(([name, label, description, rows]) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">{label}</FormLabel>
                    <FormControl>
                      <Textarea rows={rows} {...field} />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(
                [
                  ["photoBadge", "Photo column badge", "ABOUT HER PHOTO"],
                  ["photoTitle", "Photo column heading", "A Friendly, Supportive"],
                  ["photoTitleHighlight", "Heading (orange part)", "and Professional Teacher"],
                ] as const
              ).map(([name, label, placeholder]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FieldsEditor
              fields={PHOTO_HIGHLIGHT_FIELDS}
              value={{ items: photoHighlights }}
              onChange={(next) => setPhotoHighlights(next.items as TeacherPhotoHighlight[])}
            />

            <FormField
              control={form.control}
              name="aboutIntro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">&ldquo;About me&rdquo; paragraph</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormDescription>Uses &ldquo;About this teacher&rdquo; when empty.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FieldsEditor
              fields={PHILOSOPHY_FIELDS}
              value={{ items: philosophies }}
              onChange={(next) => setPhilosophies(next.items as TeacherPhilosophy[])}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
