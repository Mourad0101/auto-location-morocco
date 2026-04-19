import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Youssef A.", city: "Casablanca", text: "Service impeccable, voiture impeccable. Je recommande à 100% !", rating: 5 },
  { name: "Fatima Z.", city: "Marrakech", text: "Réservation simple, prise en charge rapide à l'aéroport. Top.", rating: 5 },
  { name: "Karim B.", city: "Agadir", text: "Le meilleur rapport qualité/prix de Marrakech. Personnel adorable.", rating: 5 },
];

export function Testimonials() {
  const { t } = useTranslation();
  return (
    <section className="container py-16">
      <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">{t("testimonials.title")}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <div key={i} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <div className="mb-4 flex gap-0.5 text-primary">
              {Array.from({ length: r.rating }).map((_, j) => (<Star key={j} className="h-4 w-4 fill-current" />))}
            </div>
            <p className="mb-5 text-sm leading-relaxed text-foreground/85">"{r.text}"</p>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {r.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
