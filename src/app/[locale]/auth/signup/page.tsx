import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing, Link } from "@/i18n/routing";
import { SignupForm } from "./SignupForm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Create account",
};

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth" });

  return (
    <section className="container-site grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-md">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-tight tracking-[-0.025em]">
          {t("signupTitle")}
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-sepia-soft)]">
          {t("signupSub")}
        </p>
        <div className="mt-8">
          <SignupForm
            labels={{
              name: t("nameLabel"),
              email: t("emailLabel"),
              password: t("passwordLabel"),
              submit: t("signupCta"),
            }}
          />
        </div>
        <p className="mt-6 text-sm text-[color:var(--color-sepia-soft)]">
          {t("haveAccount")}{" "}
          <Link href="/auth/login" className="hover-underline text-[color:var(--color-sepia)]">
            {t("loginCta")}
          </Link>
        </p>
      </div>
    </section>
  );
}
