import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StageReset } from "@/components/motion/StageReset";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  const url = siteConfig.url;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${url}/${l}`]),
  );

  return {
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    category: "arts",
    alternates: {
      canonical: `${url}/${locale}`,
      languages: {
        ...languages,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      url: `${url}/${locale}`,
      siteName: siteConfig.name,
      title: t("defaultTitle"),
      description: t("description"),
      locale: locale === "it" ? "it_IT" : "en_GB",
      alternateLocale: locale === "it" ? ["en_GB"] : ["it_IT"],
      // Next resolves the convention-based /opengraph-image.tsx automatically.
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <StageReset />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-sepia)] focus:px-4 focus:py-2 focus:text-[var(--color-travertino)]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
