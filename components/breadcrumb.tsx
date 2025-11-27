"use client";

import { ChevronRight, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("Navbar");

  // Remove locale from pathname for processing
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  
  // Split path into segments
  const pathSegments = pathWithoutLocale.split("/").filter(segment => segment !== "");
  
  // Don't show breadcrumbs on home page
  if (pathWithoutLocale === "/" || pathSegments.length === 0) {
    return null;
  }

  // Create breadcrumb items
  const breadcrumbItems = [
    {
      label: t("home"),
      href: "/",
      isHome: true
    }
  ];

  // Add path segments
  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Get translation key for segment
    let label = segment;
    if (segment === "cemre-guner") {
      label = t("cemre-guner");
    } else if (segment === "blog") {
      label = t("blog");
    } else if (segment === "contact") {
      label = t("contact");
    } else {
      // Capitalize first letter for unknown segments
      label = segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    breadcrumbItems.push({
      label,
      href: currentPath,
      isHome: false
    });
  });

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6 ml-20">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
          {index === breadcrumbItems.length - 1 ? (
            // Current page - not a link
            <span className="text-gray-800 dark:text-gray-200 font-medium flex items-center">
              {item.isHome && <Home className="w-4 h-4 mr-1" />}
              {item.label}
            </span>
          ) : (
            // Previous pages - links
            <Link
              href={item.href}
              className="hover:text-primary transition-colors flex items-center"
            >
              {item.isHome && <Home className="w-4 h-4 mr-1" />}
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}