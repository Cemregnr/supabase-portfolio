import { ThemeProvider } from "next-themes";
import "../../globals.css";
import { LangProvider } from "@/providers/lang-provider";
import TransitionProvider from "@/components/transitionProvider";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Breadcrumb } from "@/components/breadcrumb";
import { VerticalSidebar } from "@/components/vertical-sidebar";

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
    <TransitionProvider>
      <div className="relative">
        <VerticalSidebar />
        <div className="pl-20 pt-6">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </TransitionProvider>
  );
}
