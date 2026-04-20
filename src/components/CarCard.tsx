import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Vehicle } from "@/data/fleet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Fuel, Users, Settings2 } from "lucide-react";

export function CarCard({ car }: { car: Vehicle }) {
  const { t } = useTranslation();
  return (
    <article className="group flex flex-col rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
      <header className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {car.brand} {car.model}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
            {car.category}
          </p>
        </div>
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
        <Badge variant="outline" className="border-border bg-muted/40 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          <Settings2 className="me-1 h-3 w-3" /> {car.transmission === "manual" ? "Manual" : "Auto"}
        </Badge>
        <Badge variant="outline" className="border-border bg-muted/40 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          <Fuel className="me-1 h-3 w-3" /> {car.fuel}
        </Badge>
        <Badge variant="outline" className="border-border bg-muted/40 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          <Users className="me-1 h-3 w-3" /> {car.seats}
        </Badge>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/60 pt-4">
        <div>
          <div className="text-xl font-extrabold text-foreground">
            {car.pricePerDay}
            <span className="ms-1 text-xs font-medium text-muted-foreground">MAD</span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {t("card.perDay")}
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="rounded-full border-border text-xs font-semibold">
            <Link to={`/cars/${car.id}`}>{t("card.specs")}</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary-dark">
            <Link to={`/booking/${car.id}`}>{t("card.book")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
