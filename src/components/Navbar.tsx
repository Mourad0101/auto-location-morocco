import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, Globe, Moon, Sun, Scissors } from "lucide-react";
import { useEffect, useState } from "react";

const langs = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/cars", label: t("nav.cars") },
    { to: "/cars?cat=motorbike", label: t("nav.bikes") },
    { to: "/cars", label: t("nav.reservation") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <Scissors className="h-5 w-5 -rotate-45" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Auto <span className="text-primary">Location</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {langs.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => i18n.changeLanguage(l.code)}>
                  {l.label} {i18n.language === l.code && "✓"}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" aria-label="Theme" onClick={toggleDark}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="outline" className="hidden rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary md:inline-flex">
            {t("nav.login")}
          </Button>
          <Button className="hidden rounded-full bg-primary text-primary-foreground hover:bg-primary-dark md:inline-flex">
            {t("nav.signup")}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-8 flex flex-col gap-4">
                {links.map((l) => (
                  <NavLink key={l.label} to={l.to} className="text-base font-medium">
                    {l.label}
                  </NavLink>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" className="rounded-full border-primary/50 text-primary">{t("nav.login")}</Button>
                  <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary-dark">{t("nav.signup")}</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
