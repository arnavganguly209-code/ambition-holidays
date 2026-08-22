"use client";

import { DEFAULT_CONTENT, type ExperienceCard, type ExperienceIcon, type SiteContent } from "@/lib/content-types";

const inputClass =
  "w-full rounded-md border border-white/15 bg-black/35 px-3 py-2 text-sm text-white outline-none focus:border-gold/50";

const ICON_OPTIONS: { id: ExperienceIcon; label: string }[] = [
  { id: "heli", label: "Helicopter" },
  { id: "lodge", label: "Lodge / bed" },
  { id: "culture", label: "Temple / culture" },
  { id: "flight", label: "Mountain peaks" },
  { id: "wellness", label: "Lotus / wellness" },
  { id: "wildlife", label: "Paw / wildlife" },
  { id: "custom", label: "Custom uploaded icon" },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </span>
      {children}
    </label>
  );
}

async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/orbit/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { url: string };
  return data.url;
}

type Props = {
  content: SiteContent;
  setContent: (next: SiteContent) => void;
  save: (next: SiteContent) => Promise<void>;
};

export default function OrbitExperiencesEditor({ content, setContent, save }: Props) {
  const experiences = content.experiences ?? DEFAULT_CONTENT.experiences;

  function patch(partial: Partial<SiteContent["experiences"]>) {
    setContent({ ...content, experiences: { ...experiences, ...partial } });
  }

  function updateCard(index: number, next: ExperienceCard) {
    const cards = [...experiences.cards];
    cards[index] = next;
    patch({ cards });
  }

  async function replaceImage(index: number, file: File) {
    const url = await uploadFile(file);
    const cards = [...experiences.cards];
    cards[index] = { ...cards[index], imageSrc: url };
    const next = { ...content, experiences: { ...experiences, cards } };
    setContent(next);
    await save(next);
  }

  async function replaceIcon(index: number, file: File) {
    const url = await uploadFile(file);
    const cards = [...experiences.cards];
    cards[index] = { ...cards[index], icon: "custom", iconSrc: url };
    const next = { ...content, experiences: { ...experiences, cards } };
    setContent(next);
    await save(next);
  }

  function moveCard(index: number, dir: -1 | 1) {
    const nextIndex = index + dir;
    if (nextIndex < 0 || nextIndex >= experiences.cards.length) return;
    const cards = [...experiences.cards];
    const [item] = cards.splice(index, 1);
    cards.splice(nextIndex, 0, item);
    patch({ cards });
  }

  return (
    <div className="space-y-8">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={experiences.visible}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        Show Signature Experiences section
      </label>

      <Field label="Eyebrow">
        <input
          className={inputClass}
          value={experiences.eyebrow}
          onChange={(e) => patch({ eyebrow: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Headline (white)">
          <input
            className={inputClass}
            value={experiences.headlineWhite}
            onChange={(e) => patch({ headlineWhite: e.target.value })}
          />
        </Field>
        <Field label="Headline (gold)">
          <input
            className={inputClass}
            value={experiences.headlineGold}
            onChange={(e) => patch({ headlineGold: e.target.value })}
          />
        </Field>
      </div>
      <Field label="Intro text">
        <textarea
          className={`${inputClass} min-h-24`}
          value={experiences.body}
          onChange={(e) => patch({ body: e.target.value })}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Bottom button label">
          <input
            className={inputClass}
            value={experiences.ctaLabel}
            onChange={(e) => patch({ ctaLabel: e.target.value })}
          />
        </Field>
        <Field label="Bottom button link">
          <input
            className={inputClass}
            value={experiences.ctaHref}
            onChange={(e) => patch({ ctaHref: e.target.value })}
          />
        </Field>
      </div>

      <div>
        <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/50">
          Experience boxes
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          {experiences.cards.map((card, index) => (
            <div key={card.id} className="space-y-3 rounded-lg border border-white/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-gold">Box {index + 1}</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="rounded border border-white/15 px-2 py-1 text-[0.65rem] text-white/70"
                    onClick={() => moveCard(index, -1)}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    className="rounded border border-white/15 px-2 py-1 text-[0.65rem] text-white/70"
                    onClick={() => moveCard(index, 1)}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    className="rounded border border-red-400/30 px-2 py-1 text-[0.65rem] text-red-200"
                    onClick={() =>
                      patch({ cards: experiences.cards.filter((_, i) => i !== index) })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.imageSrc} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <label className="inline-flex cursor-pointer rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold">
                Replace image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    await replaceImage(index, file);
                  }}
                />
              </label>
              <Field label="Image URL">
                <input
                  className={inputClass}
                  value={card.imageSrc}
                  onChange={(e) => updateCard(index, { ...card, imageSrc: e.target.value })}
                />
              </Field>
              <Field label="Title">
                <input
                  className={inputClass}
                  value={card.title}
                  onChange={(e) => updateCard(index, { ...card, title: e.target.value })}
                />
              </Field>
              <Field label="Description">
                <textarea
                  className={`${inputClass} min-h-20`}
                  value={card.body}
                  onChange={(e) => updateCard(index, { ...card, body: e.target.value })}
                />
              </Field>
              <Field label="Image alt text">
                <input
                  className={inputClass}
                  value={card.imageAlt}
                  onChange={(e) => updateCard(index, { ...card, imageAlt: e.target.value })}
                />
              </Field>
              <Field label="Learn More link">
                <input
                  className={inputClass}
                  value={card.href}
                  onChange={(e) => updateCard(index, { ...card, href: e.target.value })}
                />
              </Field>
              <Field label="Icon style">
                <select
                  className={inputClass}
                  value={card.icon}
                  onChange={(e) =>
                    updateCard(index, { ...card, icon: e.target.value as ExperienceIcon })
                  }
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="inline-flex cursor-pointer rounded-md border border-white/20 px-3 py-2 text-xs text-white/80">
                Upload custom icon
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = "";
                    if (!file) return;
                    await replaceIcon(index, file);
                  }}
                />
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 rounded-md border border-white/20 px-3 py-2 text-xs"
          onClick={() =>
            patch({
              cards: [
                ...experiences.cards,
                {
                  id: `exp-${Date.now()}`,
                  title: "New experience",
                  body: "Add a short description.",
                  imageSrc: DEFAULT_CONTENT.experiences.cards[0].imageSrc,
                  imageAlt: "Experience image",
                  icon: "heli",
                  href: "/luxury-treks",
                },
              ],
            })
          }
        >
          Add box
        </button>
      </div>
    </div>
  );
}
