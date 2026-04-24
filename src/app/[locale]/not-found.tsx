import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Fregio } from "@/components/brand/Fregio";

export default function LocaleNotFound() {
  const t = useTranslations("events404");
  return (
    <section className="container-site grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <p className="font-[family-name:var(--font-cartel)] text-[0.78rem] tracking-[0.28em] text-[color:var(--color-terracotta)]">
          CDV · 404
        </p>
        <h1 className="mt-6 bodoni-italic text-[clamp(3rem,7vw,6rem)] leading-[0.95] text-[color:var(--color-sepia)]">
          {t("title")}
        </h1>
        <p className="mx-auto mt-8 max-w-[40ch] text-[1.1rem] leading-[1.65] text-[color:var(--color-sepia-soft)]">
          {t("body")}
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/" withArrow>
            {t("cta")}
          </ButtonLink>
        </div>
        <div className="mt-12 flex justify-center">
          <Fregio width={200} tone="terracotta" />
        </div>
      </div>
    </section>
  );
}
