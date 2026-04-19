import { useTranslation } from "react-i18next";
import { Scissors } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const cols = [
    { title: t("footer.about"), items: ["Notre histoire", "Carrières", "Presse"] },
    { title: t("footer.fleet"), items: ["Économique", "SUV", "Luxe", "Motos"] },
    { title: t("footer.cities"), items: ["Casablanca", "Marrakech", "Rabat", "Agadir"] },
    { title: t("footer.legal"), items: ["CGV", "Confidentialité", "Cookies"] },
    { title: t("footer.contact"), items: ["+212 5 22 00 00 00", "hello@autolocation.ma"] },
  ];
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Scissors className="h-5 w-5 -rotate-45" />
              </span>
              <span className="text-lg font-bold">
                Auto <span className="text-primary">Location</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Premium car rental across Morocco. From Casablanca to Dakhla, drive on your terms.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">{c.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.items.map((i) => (<li key={i}><a className="hover:text-primary" href="#">{i}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Auto Location · {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
