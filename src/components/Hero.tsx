import { useTranslation } from "react-i18next";
import heroCar from "@/assets/hero-car.png";
import { SearchWidget } from "./SearchWidget";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-20">
        <div className="relative z-10 animate-fade-in-up">
          <h1 className="hero-headline text-4xl text-foreground sm:text-5xl lg:text-[64px]">
            {t("hero.title")}<br />
            <span className="text-primary">{t("hero.brand")}</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-7 flex flex-wrap gap-8">
            <Stat n="50+" label={t("hero.stats.brands")} />
            <Stat n="10K+" label={t("hero.stats.clients")} />
            <Stat n="24/7" label={t("hero.stats.support")} />
          </div>

          <div className="mt-8">
            <SearchWidget />
          </div>
        </div>

        <div className="relative h-[280px] sm:h-[420px] lg:h-[560px]">
          <div className="stripe-bg absolute inset-0 -z-0 opacity-70" />
          <img
            src={heroCar}
            alt="Auto Location red sports car"
            className="float-slow relative z-10 mx-auto h-full w-auto object-contain drop-shadow-2xl"
            width={1024}
            height={1280}
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-primary md:text-3xl">{n}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
