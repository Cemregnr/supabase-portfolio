import { ThemeProvider } from "next-themes";
import "../globals.css";
import { LangProvider } from "@/providers/lang-provider";
import { AuthProfileProvider } from "@/providers/auth-profile-provider";
import TransitionProvider from "@/components/transitionProvider";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="class"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProfileProvider>
        <LangProvider locale={locale}>
              {children}
        </LangProvider>
      </AuthProfileProvider>
    </ThemeProvider>
  );
}
