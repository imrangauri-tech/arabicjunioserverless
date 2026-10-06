import type { FieldDef } from "@/components/admin/FieldsEditor";

/** Field definitions for each section of the city landing page editor. */

const CITY_HINT = "Write {city} anywhere to insert this page's city.";

const ctaFields = (): FieldDef[] => [
  {
    kind: "row",
    fields: [
      { kind: "text", key: "primaryCtaText", label: "Main button text", hint: "Leave empty to hide the button." },
      { kind: "text", key: "primaryCtaUrl", label: "Main button link", placeholder: "/register" },
    ],
  },
  {
    kind: "row",
    fields: [
      { kind: "text", key: "secondaryCtaText", label: "Second button text", hint: "Leave empty to hide the button." },
      { kind: "text", key: "secondaryCtaUrl", label: "Second button link", placeholder: "/pricing" },
    ],
  },
];

const iconTitleSubtitle = (key: string, label: string, itemLabel: string): FieldDef => ({
  kind: "list",
  key,
  label,
  itemLabel,
  newItem: () => ({ icon: "Sparkles", title: "", subtitle: "" }),
  fields: [
    { kind: "icon", key: "icon" },
    {
      kind: "row",
      fields: [
        { kind: "text", key: "title", label: "Title" },
        { kind: "text", key: "subtitle", label: "Sub text" },
      ],
    },
  ],
});

const iconTitleDescription = (key: string, label: string, itemLabel: string): FieldDef => ({
  kind: "list",
  key,
  label,
  itemLabel,
  newItem: () => ({ icon: "Sparkles", title: "", description: "" }),
  fields: [
    { kind: "icon", key: "icon" },
    { kind: "text", key: "title", label: "Title" },
    { kind: "textarea", key: "description", label: "Description", rows: 2 },
  ],
});

const show = (label: string): FieldDef => ({
  kind: "toggle",
  key: "show",
  label: `Show the "${label}" section on the page`,
});

export const LANDING_SECTIONS: {
  key: "hero" | "curriculum" | "whyChoose" | "advantage" | "families";
  label: string;
  fields: FieldDef[];
}[] = [
  {
    key: "hero",
    label: "1. Hero",
    fields: [
      { kind: "heading", label: "Top of the page", hint: CITY_HINT },
      { kind: "text", key: "badge", label: "Badge" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "titleLine1", label: "Heading – line 1" },
          { kind: "text", key: "titleLine2", label: "Heading – line 2" },
        ],
      },
      { kind: "text", key: "titleHighlight", label: "Heading – orange words (end of line 2)", placeholder: "{city}" },
      { kind: "text", key: "subheading", label: "Sub heading" },
      {
        kind: "textarea",
        key: "description",
        label: "Description",
        rows: 5,
        hint: "Wrap words in **double stars** to make them bold.",
      },
      ...ctaFields(),
      { kind: "text", key: "imageAlt", label: "Image description (alt text, for SEO)" },
      iconTitleSubtitle("floatingCards", "Small cards on the image", "card"),
      iconTitleSubtitle("bottomFeatures", "Feature strip under the hero", "feature"),
    ],
  },
  {
    key: "curriculum",
    label: "2. School Curriculum",
    fields: [
      show("School Curriculum"),
      { kind: "heading", label: "Heading", hint: CITY_HINT },
      { kind: "text", key: "badge", label: "Badge" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "title", label: "Heading – line 1" },
          { kind: "text", key: "titleHighlight", label: "Heading – orange words (after \"for\")" },
        ],
      },
      { kind: "lines", key: "paragraphs", label: "Paragraphs", itemLabel: "paragraph" },
      iconTitleDescription("features", "Feature cards", "card"),
      { kind: "heading", label: "Banner at the bottom" },
      { kind: "text", key: "bannerTitle", label: "Banner title" },
      { kind: "textarea", key: "bannerSubtitle", label: "Banner text", rows: 2 },
      ...ctaFields(),
    ],
  },
  {
    key: "whyChoose",
    label: "3. Why Choose Us",
    fields: [
      show("Why Choose Us"),
      { kind: "heading", label: "Heading", hint: CITY_HINT },
      { kind: "text", key: "badge", label: "Badge" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "titlePrefix", label: "Heading – start (dark)" },
          { kind: "text", key: "titleHighlight1", label: "Heading – orange words (line 1)" },
        ],
      },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "titleHighlight2", label: "Heading – orange words (line 2)" },
          { kind: "text", key: "titleSuffix", label: "Heading – end (dark)" },
        ],
      },
      { kind: "textarea", key: "introText", label: "Intro text", rows: 3 },
      iconTitleDescription("features", "Feature cards", "card"),
      { kind: "heading", label: "Orange banner at the bottom" },
      { kind: "text", key: "ctaTitle", label: "Banner title" },
      { kind: "textarea", key: "ctaDescription", label: "Banner text", rows: 3 },
      ...ctaFields(),
    ],
  },
  {
    key: "advantage",
    label: "4. Advantage",
    fields: [
      show("Arabic Juniors Advantage"),
      { kind: "heading", label: "Middle column", hint: CITY_HINT },
      { kind: "text", key: "badge", label: "Badge" },
      { kind: "text", key: "title", label: "Heading – line 1" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "titleHighlightPrefix", label: "Heading – line 2 (dark part)" },
          { kind: "text", key: "titleHighlight", label: "Heading – line 2 (orange part)" },
        ],
      },
      { kind: "lines", key: "paragraphs", label: "Paragraphs", itemLabel: "paragraph" },
      iconTitleDescription("pillars", "Small cards under the text", "card"),
      { kind: "heading", label: "Left column" },
      iconTitleSubtitle("leftFeatures", "Feature list", "feature"),
      { kind: "heading", label: "Right column card" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "sidebarLabel", label: "Small label" },
          { kind: "text", key: "sidebarTitle", label: "Title" },
        ],
      },
      { kind: "textarea", key: "sidebarText", label: "Text", rows: 3 },
      ...ctaFields(),
      {
        kind: "list",
        key: "trustPoints",
        label: "Trust points",
        itemLabel: "point",
        titleKey: "text",
        newItem: () => ({ icon: "CheckCircle2", text: "" }),
        fields: [
          {
            kind: "row",
            fields: [
              { kind: "icon", key: "icon" },
              { kind: "text", key: "text", label: "Text" },
            ],
          },
        ],
      },
      { kind: "heading", label: "Stats strip at the bottom" },
      {
        kind: "list",
        key: "stats",
        label: "Stats",
        itemLabel: "stat",
        titleKey: "label",
        newItem: () => ({ icon: "Users", value: "", label: "" }),
        fields: [
          { kind: "icon", key: "icon" },
          {
            kind: "row",
            fields: [
              { kind: "text", key: "value", label: "Number", placeholder: "3,500+" },
              { kind: "text", key: "label", label: "Label", placeholder: "Happy Students" },
            ],
          },
        ],
      },
    ],
  },
  {
    key: "families",
    label: "5. Why Families Choose",
    fields: [
      show("Why Families Choose"),
      { kind: "heading", label: "Left column", hint: CITY_HINT },
      { kind: "text", key: "badge", label: "Badge" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "titlePrefix", label: "Heading – line 1" },
          { kind: "text", key: "titleHighlight", label: "Heading – line 2 (orange)" },
        ],
      },
      { kind: "textarea", key: "leftIntro", label: "Intro text", rows: 3 },
      { kind: "text", key: "benefitsBoxTitle", label: "Benefits box title" },
      iconTitleDescription("benefits", "Benefits", "benefit"),
      { kind: "heading", label: "Right column" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "rightHeading", label: "Heading (dark)" },
          { kind: "text", key: "rightHeadingHighlight", label: "Heading (orange)" },
        ],
      },
      { kind: "lines", key: "rightParagraphs", label: "Paragraphs", itemLabel: "paragraph" },
      { kind: "heading", label: "Banner at the bottom" },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "bannerItem1Title", label: "Item 1 title" },
          { kind: "text", key: "bannerItem1Text", label: "Item 1 text" },
        ],
      },
      {
        kind: "row",
        fields: [
          { kind: "text", key: "bannerItem2Title", label: "Item 2 title" },
          { kind: "text", key: "bannerItem2Text", label: "Item 2 text" },
        ],
      },
      ...ctaFields(),
    ],
  },
];

export const SEO_FIELDS: FieldDef[] = [
  { kind: "heading", label: "Search engines & social sharing", hint: CITY_HINT },
  { kind: "text", key: "metaTitle", label: "Meta title" },
  { kind: "textarea", key: "metaDescription", label: "Meta description", rows: 3 },
  { kind: "text", key: "metaKeywords", label: "Keywords (comma separated)" },
  {
    kind: "text",
    key: "canonicalUrl",
    label: "Canonical URL (optional)",
    hint: "Leave empty to use this page's own URL.",
  },
  {
    kind: "toggle",
    key: "indexPage",
    label: "Allow search engines to index this page",
  },
];
