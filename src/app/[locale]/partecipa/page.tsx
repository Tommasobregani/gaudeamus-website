import { redirect } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function PartecipaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  // The Partecipa flow is suspended pending client confirmation.
  // Send anyone who lands here to the contact page so they can still reach us.
  redirect(`/${locale}/contatti`);
}
