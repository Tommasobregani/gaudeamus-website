"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { FilterTabs } from "@/components/brand/FilterTabs";
import { Playbill } from "@/components/brand/Playbill";
import type { EventEntry } from "@/content/events";
import type { Locale } from "@/lib/utils";

const kindLabels: Record<string, { en: string; it: string }> = {
  all: { en: "All", it: "Tutti" },
  production: { en: "Theatre", it: "Teatro" },
  workshop: { en: "Workshop", it: "Laboratorio" },
  gathering: { en: "Gathering", it: "Incontro" },
};

export function PlaybillCatalog({ events }: { events: EventEntry[] }) {
  const locale = useLocale() as Locale;
  const [kind, setKind] = useState<string>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: events.length };
    for (const e of events) c[e.kind] = (c[e.kind] ?? 0) + 1;
    return c;
  }, [events]);

  const options = useMemo(
    () =>
      ["all", "production", "workshop", "gathering"].map((v) => ({
        value: v,
        label: kindLabels[v][locale],
        count: counts[v] ?? 0,
      })),
    [counts, locale],
  );

  const filtered = kind === "all" ? events : events.filter((e) => e.kind === kind);

  return (
    <>
      <FilterTabs options={options} initial="all" onChange={setKind} />
      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {filtered.map((e, i) => (
          <Playbill key={e.slug} event={e} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-16 text-center font-[family-name:var(--font-body)] italic text-[color:var(--color-sepia-soft)]">
          {locale === "it"
            ? "Non c'è ancora nulla in questa sezione."
            : "Nothing here yet."}
        </p>
      )}
    </>
  );
}
