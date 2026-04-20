import { useTranslation } from "react-i18next";
import heroCar from "@/assets/hero-car.png";
import { SearchWidget } from "./SearchWidget";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="stripe-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="container relative py-10 md:py-14 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Copy */}
          <div className="relative z-10 animate-fade-in-up lg:col-span-7">
            <h1 className="hero-headline text-[2.25rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-[68px]">
              <span className="block text-primary">{t("hero.title")}</span>
              <span className="mt-2 block text-maroon">{t("hero.brand")}</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("hero.subtitle")}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Stat n="50+" label={t("hero.stats.brands")} />
              <Stat n="10K+" label={t("hero.stats.clients")} />
              <Stat n="24/7" label={t("hero.stats.support")} />
            </dl>
          </div>

          {/* Image */}
          <div className="relative order-first h-[220px] sm:h-[300px] lg:order-last lg:col-span-5 lg:h-[460px]">
            <img
              src={heroCar}
              alt="Auto Location red sports car"
              className="float-slow relative z-10 mx-auto h-full w-auto object-contain drop-shadow-2xl"
              width={1024}
              height={1280}
            />
          </div>
        </div>

        {/* Search widget — full width below */}
        <div className="relative z-10 mt-10">
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-extrabold text-primary md:text-3xl">{n}</dt>
      <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground md:text-xs">
        {label}
      </dd>
    </div>
  );
}
