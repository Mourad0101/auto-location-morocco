import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CarCard } from "./CarCard";
import { Vehicle } from "@/data/fleet";
import { ArrowRight } from "lucide-react";

export function CategorySection({ title, slug, cars }: { title: string; slug: string; cars: Vehicle[] }) {
  const { t } = useTranslation();
  return (
    <section className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="pill-maroon">{title}</span>
        <Link to={`/cars?cat=${slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {t("categories.viewAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((c) => (<CarCard key={c.id} car={c} />))}
      </div>
    </section>
  );
}
