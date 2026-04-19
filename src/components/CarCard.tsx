import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Vehicle } from "@/data/fleet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, Users, Settings2 } from "lucide-react";

export function CarCard({ car }: { car: Vehicle }) {
  const { t } = useTranslation();
  return (
    <article className="group flex flex-col rounded-3xl bg-rose-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <header className="mb-3 flex items-start justify-between">
        <h3 className="text-base font-semibold text-foreground">{car.brand} {car.model}</h3>
      </header>

      <div className="relative mx-auto flex h-36 w-full items-center justify-center">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="outline" className="border-primary/30 bg-background/60 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          <Settings2 className="me-1 h-3 w-3" /> {car.transmission === "manual" ? "Manual" : "Auto"}
        </Badge>
        <Badge variant="outline" className="border-primary/30 bg-background/60 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          <Fuel className="me-1 h-3 w-3" /> {car.fuel}
        </Badge>
        <Badge variant="outline" className="border-primary/30 bg-background/60 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          <Users className="me-1 h-3 w-3" /> {car.seats}
        </Badge>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <Link to={`/cars/${car.id}`} className="inline-flex items-center rounded-full border border-primary/40 bg-background px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10">
          {t("card.specs")}
        </Link>
        <div className="rounded-full border border-primary/40 bg-background px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
          {car.pricePerDay} MAD
        </div>
        <Button asChild size="sm" className="rounded-full bg-primary text-[11px] font-semibold uppercase tracking-wide text-primary-foreground hover:bg-primary-dark">
          <Link to={`/booking/${car.id}`}>{t("card.book")}</Link>
        </Button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{car.pricePerDay} {t("card.perDay")}</p>
    </article>
  );
}
