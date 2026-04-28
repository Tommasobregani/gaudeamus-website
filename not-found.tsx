import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Fregio } from "@/components/brand/Fregio";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-site grid min-h-[78vh] place-items-center py-24">
      <div className="mx-auto max-w-[58ch] text-center">
        <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] uppercase tracking-[0.32em] text-[color:var(--color-pompeiano)]">
          {t("eyebrow")}
        </p>

        <div
          aria-hidden
          className="mt-10 select-none bodoni-italic leading-[0.82] text-[clamp(8rem,22vw,18rem)]"
          style={{ color: "var(--color-pompeiano)", opacity: 0.14 }}
        >
          404
        </div>

        <h1 className="-mt-[0.55em] bodoni-italic leading-[0.95] text-[clamp(2.6rem,6.4vw,5rem)] text-[color:var(--color-sepia)]">
          {t("title")}
        </h1>

        <p className="mx-auto mt-8 max-w-[44ch] text-[1.05rem] leading-[1.65] text-[color:var(--color-muted)]">
          {t("body")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" withArrow>
            {t("primaryCta")}
          </ButtonLink>
          <ButtonLink href="/teatro" variant="ghost" withArrow>
            {t("secondaryCta")}
          </ButtonLink>
        </div>

        <div className="mt-14 flex justify-center">
          <Fregio width={200} tone="rosso" />
        </div>
      </div>
    </section>
  );
}
