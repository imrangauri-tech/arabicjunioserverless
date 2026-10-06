"use client";

import React from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { ICON_NAMES, iconFor } from "@/lib/sectionIcons";

/**
 * Describes an editable content object field by field, so a content screen is
 * a list of definitions rather than hundreds of hand-wired inputs. Used by the
 * landing page editor and the teacher profile screens.
 */
export type FieldDef =
  | { kind: "text"; key: string; label: string; hint?: string; placeholder?: string }
  | { kind: "textarea"; key: string; label: string; hint?: string; rows?: number }
  | { kind: "toggle"; key: string; label: string; hint?: string }
  | { kind: "icon"; key: string; label?: string }
  | {
      kind: "lines";
      key: string;
      label: string;
      hint?: string;
      /** Noun for the add button, e.g. "paragraph". */
      itemLabel?: string;
      multiline?: boolean;
    }
  | {
      kind: "list";
      key: string;
      label: string;
      hint?: string;
      itemLabel: string;
      fields: FieldDef[];
      newItem: () => Record<string, unknown>;
      /** Which item field names the collapsed row; defaults to "title". */
      titleKey?: string;
    }
  | { kind: "row"; fields: FieldDef[] }
  | { kind: "heading"; label: string; hint?: string };

type Data = Record<string, any>;

export const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200";
export const labelClass = "mb-1 block text-sm font-medium text-neutral-700";
const hintClass = "mt-1 text-xs text-neutral-500";

const iconButton =
  "rounded-lg border border-neutral-200 p-1.5 text-neutral-500 hover:bg-neutral-50 disabled:opacity-40";

function move<T>(list: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function IconSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Preview = iconFor(value);
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
        <Preview className="h-4 w-4" />
      </span>
      <select className={inputClass} value={value || ""} onChange={(e) => onChange(e.target.value)}>
        {!ICON_NAMES.includes(value) && <option value={value}>{value || "Choose…"}</option>}
        {ICON_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

function LinesEditor({
  def,
  value,
  onChange,
}: {
  def: Extract<FieldDef, { kind: "lines" }>;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const noun = def.itemLabel ?? "line";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className={labelClass}>
          {def.label} <span className="text-neutral-400">({value.length})</span>
        </span>
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-1 text-xs hover:bg-neutral-50"
        >
          <Plus className="h-3.5 w-3.5" /> Add {noun}
        </button>
      </div>
      {def.hint && <p className={hintClass}>{def.hint}</p>}
      {value.map((line, index) => (
        <div key={index} className="flex items-start gap-2">
          {def.multiline === false ? (
            <input
              className={inputClass}
              value={line}
              onChange={(e) => onChange(value.map((l, i) => (i === index ? e.target.value : l)))}
            />
          ) : (
            <textarea
              rows={3}
              className={inputClass}
              value={line}
              onChange={(e) => onChange(value.map((l, i) => (i === index ? e.target.value : l)))}
            />
          )}
          <div className="flex flex-col gap-1">
            <button type="button" className={iconButton} disabled={index === 0} onClick={() => onChange(move(value, index, -1))} aria-label="Move up">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button type="button" className={iconButton} disabled={index === value.length - 1} onClick={() => onChange(move(value, index, 1))} aria-label="Move down">
              <ChevronDown className="h-4 w-4" />
            </button>
            <button type="button" className={`${iconButton} text-red-500 hover:bg-red-50`} onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label={`Remove ${noun}`}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListEditor({
  def,
  value,
  onChange,
}: {
  def: Extract<FieldDef, { kind: "list" }>;
  value: Data[];
  onChange: (v: Data[]) => void;
}) {
  const titleKey = def.titleKey ?? "title";
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className={labelClass}>
          {def.label} <span className="text-neutral-400">({value.length})</span>
        </span>
        <button
          type="button"
          onClick={() => onChange([...value, def.newItem()])}
          className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-1 text-xs hover:bg-neutral-50"
        >
          <Plus className="h-3.5 w-3.5" /> Add {def.itemLabel}
        </button>
      </div>
      {def.hint && <p className={hintClass}>{def.hint}</p>}
      {value.length === 0 && <p className="text-sm text-neutral-400">Nothing here yet — this part is hidden on the page.</p>}

      {value.map((item, index) => (
        <div key={index} className="rounded-lg border border-neutral-200 bg-neutral-50/40 p-3 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex-1 truncate text-sm font-semibold text-neutral-700">
              {index + 1}. {String(item?.[titleKey] ?? "") || `Untitled ${def.itemLabel}`}
            </span>
            <button type="button" className={iconButton} disabled={index === 0} onClick={() => onChange(move(value, index, -1))} aria-label="Move up">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button type="button" className={iconButton} disabled={index === value.length - 1} onClick={() => onChange(move(value, index, 1))} aria-label="Move down">
              <ChevronDown className="h-4 w-4" />
            </button>
            <button type="button" className={`${iconButton} text-red-500 hover:bg-red-50`} onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label={`Remove ${def.itemLabel}`}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <FieldsEditor
            fields={def.fields}
            value={item ?? {}}
            onChange={(next) => onChange(value.map((v, i) => (i === index ? next : v)))}
          />
        </div>
      ))}
    </div>
  );
}

export default function FieldsEditor({
  fields,
  value,
  onChange,
}: {
  fields: FieldDef[];
  value: Data;
  onChange: (next: Data) => void;
}) {
  const set = (key: string, v: unknown) => onChange({ ...value, [key]: v });

  const render = (def: FieldDef, index: number): React.ReactNode => {
    switch (def.kind) {
      case "heading":
        return (
          <div key={`h-${index}`} className="pt-2">
            <h3 className="text-sm font-bold text-neutral-800">{def.label}</h3>
            {def.hint && <p className={hintClass}>{def.hint}</p>}
          </div>
        );
      case "row":
        return (
          <div key={`r-${index}`} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {def.fields.map(render)}
          </div>
        );
      case "text":
        return (
          <label key={def.key} className="block">
            <span className={labelClass}>{def.label}</span>
            <input
              className={inputClass}
              value={value[def.key] ?? ""}
              placeholder={def.placeholder}
              onChange={(e) => set(def.key, e.target.value)}
            />
            {def.hint && <span className={`block ${hintClass}`}>{def.hint}</span>}
          </label>
        );
      case "textarea":
        return (
          <label key={def.key} className="block">
            <span className={labelClass}>{def.label}</span>
            <textarea
              rows={def.rows ?? 3}
              className={inputClass}
              value={value[def.key] ?? ""}
              onChange={(e) => set(def.key, e.target.value)}
            />
            {def.hint && <span className={`block ${hintClass}`}>{def.hint}</span>}
          </label>
        );
      case "toggle":
        return (
          <label key={def.key} className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-white p-3">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-orange-500"
              checked={value[def.key] !== false}
              onChange={(e) => set(def.key, e.target.checked)}
            />
            <span>
              <span className="block text-sm font-medium text-neutral-800">{def.label}</span>
              {def.hint && <span className={`block ${hintClass}`}>{def.hint}</span>}
            </span>
          </label>
        );
      case "icon":
        return (
          <div key={def.key} className="block">
            <span className={labelClass}>{def.label ?? "Icon"}</span>
            <IconSelect value={value[def.key] ?? ""} onChange={(v) => set(def.key, v)} />
          </div>
        );
      case "lines":
        return (
          <LinesEditor
            key={def.key}
            def={def}
            value={Array.isArray(value[def.key]) ? value[def.key] : []}
            onChange={(v) => set(def.key, v)}
          />
        );
      case "list":
        return (
          <ListEditor
            key={def.key}
            def={def}
            value={Array.isArray(value[def.key]) ? value[def.key] : []}
            onChange={(v) => set(def.key, v)}
          />
        );
    }
  };

  return <div className="space-y-4">{fields.map(render)}</div>;
}
