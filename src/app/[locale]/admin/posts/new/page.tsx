import { redirect, notFound } from "next/navigation";
import { hasLocale } from "@/i18n/routing";

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  // Post creation is suspended until Eva greenlights it. Bounce to /admin.
  redirect(`/${locale}/admin`);
}
