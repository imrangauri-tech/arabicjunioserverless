import React from "react";
import { Check } from "lucide-react";

/**
 * Turns a chatbot reply into readable blocks.
 *
 * Replies come from two places — the AI model, which writes light markdown,
 * and the built-in answers, which are the website's own data as plain lines
 * ("Individual:", "- Starter: AED 200 — includes …"). Both used to show as one
 * grey wall of text. This recognises the few shapes they actually use; anything
 * else stays a plain paragraph, so an unexpected reply never looks broken.
 *
 * Everything is rendered as React text, never as HTML, so nothing in a reply
 * can inject markup.
 */

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** [label](/path) links; only site paths and http(s) become clickable. */
const renderLinks = (text: string, keyBase: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  LINK.lastIndex = 0;

  while ((match = LINK.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const href = match[2];
    const safe = /^(\/|https?:\/\/)/i.test(href);
    nodes.push(
      safe ? (
        <a
          key={`${keyBase}-l${i++}`}
          href={href}
          target={href.startsWith("/") ? undefined : "_blank"}
          rel="noreferrer"
          className="font-semibold text-orange-500 underline underline-offset-2"
        >
          {match[1]}
        </a>
      ) : (
        match[1]
      )
    );
    last = LINK.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

/** **bold** and links within one line. */
export const renderInline = (text: string, keyBase = "i"): React.ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*)/g).flatMap((part, index) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4
      ? [
          <strong key={`${keyBase}-b${index}`} className="font-semibold text-neutral-800">
            {renderLinks(part.slice(2, -2), `${keyBase}-b${index}`)}
          </strong>,
        ]
      : renderLinks(part, `${keyBase}-t${index}`)
  );

/** "Starter: AED 200 — includes A, B, C" — a pricing plan line. */
const PLAN = /^(.{1,40}?):\s*((?:AED|USD|\$|£|€)\s*[\d,.]+(?:\s*\/\s*\w+)?)\s*(?:[—–-]\s*includes\s+(.+))?$/i;
/** "Label: rest" with a short label. */
const LABELLED = /^([^:]{1,40}):\s+(.+)$/;

type Block =
  | { kind: "heading"; text: string }
  | { kind: "para"; text: string }
  | { kind: "note"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "numbers"; items: string[] }
  | { kind: "qa"; q: string; a: string };

const parse = (text: string): Block[] => {
  const blocks: Block[] = [];
  const lines = text.replace(/\r/g, "").split("\n");

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) continue;

    const bullet = line.match(/^(?:[-*•])\s+(.*)$/);
    const number = line.match(/^\d+[.)]\s+(.*)$/);
    const heading = line.match(/^#{1,4}\s+(.*)$/);

    if (bullet) {
      const prev = blocks[blocks.length - 1];
      if (prev?.kind === "bullets") prev.items.push(bullet[1]);
      else blocks.push({ kind: "bullets", items: [bullet[1]] });
    } else if (number) {
      const prev = blocks[blocks.length - 1];
      if (prev?.kind === "numbers") prev.items.push(number[1]);
      else blocks.push({ kind: "numbers", items: [number[1]] });
    } else if (heading) {
      blocks.push({ kind: "heading", text: heading[1].replace(/:$/, "") });
    } else if (/^Q:\s*/i.test(line) && /^A:\s*/i.test(lines[i + 1]?.trim() ?? "")) {
      blocks.push({
        kind: "qa",
        q: line.replace(/^Q:\s*/i, ""),
        a: lines[i + 1].trim().replace(/^A:\s*/i, ""),
      });
      i++;
    } else if (/^notes?:/i.test(line)) {
      blocks.push({ kind: "note", text: line.replace(/^notes?:\s*/i, "") });
    } else if (line.endsWith(":") && line.length <= 40 && !/[.!?]/.test(line)) {
      // A short label like "Individual:"; a sentence that merely ends in a
      // colon ("Great question! Here is how:") stays a paragraph.
      blocks.push({ kind: "heading", text: line.slice(0, -1) });
    } else {
      blocks.push({ kind: "para", text: line });
    }
  }
  return blocks;
};

const PlanCard = ({ title, price, features }: { title: string; price: string; features: string[] }) => (
  <div className="rounded-xl border border-orange-200 bg-white p-2.5 shadow-sm">
    <div className="flex items-center justify-between gap-2">
      <span className="font-bold text-neutral-800">{title}</span>
      <span className="shrink-0 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-600">
        {price}
      </span>
    </div>
    {features.length > 0 && (
      <ul className="mt-2 space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-1.5 text-xs leading-snug text-neutral-600">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" strokeWidth={3} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const BulletItem = ({ text, keyBase }: { text: string; keyBase: string }) => {
  const plan = text.match(PLAN);
  if (plan) {
    const features = (plan[3] ?? "")
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean);
    return <PlanCard title={plan[1].trim()} price={plan[2].trim()} features={features} />;
  }

  const labelled = text.match(LABELLED);
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
      <span>
        {labelled ? (
          <>
            <strong className="font-semibold text-neutral-800">{labelled[1]}:</strong>{" "}
            {renderInline(labelled[2], keyBase)}
          </>
        ) : (
          renderInline(text, keyBase)
        )}
      </span>
    </div>
  );
};

export default function ChatMessageContent({ text }: { text: string }) {
  const blocks = parse(text);

  // A one-line reply needs none of the structure below.
  if (blocks.length <= 1 && blocks[0]?.kind === "para") {
    return <>{renderInline(blocks[0].text, "s")}</>;
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        switch (block.kind) {
          case "heading":
            return (
              <p key={key} className="pt-0.5 text-[13px] font-bold text-orange-600">
                {renderInline(block.text, key)}
              </p>
            );
          case "note":
            return (
              <p key={key} className="rounded-lg bg-yellow-100 px-2.5 py-1.5 text-xs text-neutral-600">
                {renderInline(block.text, key)}
              </p>
            );
          case "qa":
            return (
              <div key={key}>
                <p className="font-semibold text-neutral-800">{renderInline(block.q, `${key}q`)}</p>
                <p className="mt-0.5 text-neutral-600">{renderInline(block.a, `${key}a`)}</p>
              </div>
            );
          case "bullets":
            return (
              <div key={key} className="space-y-1.5">
                {block.items.map((item, i) => (
                  <BulletItem key={i} text={item} keyBase={`${key}-${i}`} />
                ))}
              </div>
            );
          case "numbers":
            return (
              <ol key={key} className="space-y-1.5">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-600">
                      {i + 1}
                    </span>
                    <span>{renderInline(item, `${key}-${i}`)}</span>
                  </li>
                ))}
              </ol>
            );
          default:
            return (
              <p key={key} className="leading-relaxed">
                {renderInline(block.text, key)}
              </p>
            );
        }
      })}
    </div>
  );
}
