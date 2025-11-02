import { ThemeProvider } from "next-themes";
import "../globals.css";
import { LangProvider } from "@/providers/lang-provider";
import TransitionProvider from "@/components/transitionProvider";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LangProvider locale={locale}>
        <TransitionProvider>{children}</TransitionProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
