import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { CarCard } from "@/components/CarCard";
import { FLEET, EXTRAS } from "@/data/fleet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronRight, CalendarIcon, Shield, Headphones, BadgeCheck } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";

export default function CarDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const car = FLEET.find((c) => c.id === id);
  const [pickup, setPickup] = useState<Date | undefined>();
  const [returnD, setReturnD] = useState<Date | undefined>();
  const [extras, setExtras] = useState<string[]>([]);

  const days = pickup && returnD ? Math.max(1, differenceInCalendarDays(returnD, pickup)) : 1;
  const extrasTotal = useMemo(
    () => extras.reduce((s, id) => {
      const e = EXTRAS.find((x) => x.id === id);
      if (!e) return s;
      return s + (e.perDay ? e.price * days : e.price);
    }, 0),
    [extras, days]
  );
  const total = car ? car.pricePerDay * days + extrasTotal : 0;

  if (!car) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">Car not found. <Link to="/cars" className="text-primary underline">Back to listing</Link></div>
        <Footer />
      </div>
    );
  }

  const similar = FLEET.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-8">
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <Link to="/cars" className="hover:text-primary">{t("nav.cars")}</Link>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <span className="capitalize text-foreground">{car.category}</span>
          <ChevronRight className="h-3 w-3 rtl:rotate-180" />
          <span className="text-foreground">{car.brand} {car.model}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-6 flex h-[280px] items-center justify-center rounded-3xl bg-rose-card p-6 sm:h-[400px]">
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="max-h-full w-auto object-contain" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{car.brand} {car.model}</h1>
            <p className="mt-2 text-muted-foreground">{car.description}</p>

            <h2 className="mt-8 mb-3 text-lg font-semibold">{t("detail.overview")}</h2>
            <dl className="grid gap-3 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
              {[
                ["Brand", car.brand], ["Model", car.model], ["Year", car.year],
                ["Transmission", car.transmission], ["Fuel", car.fuel], ["Seats", car.seats],
                ["City", car.city], ["Category", car.category],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between border-b border-dashed border-border/60 pb-2 text-sm">
                  <dt className="text-muted-foreground">{k}</dt><dd className="font-medium capitalize">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {car.features.map((f) => (<Badge key={f} variant="secondary" className="rounded-full">{f}</Badge>))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-primary">{car.pricePerDay} MAD</div>
                  <div className="text-xs text-muted-foreground">{t("card.perDay")}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{t("detail.available")}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <DateField label={t("search.pickupDate")} value={pickup} onChange={setPickup} />
                <DateField label={t("search.returnDate")} value={returnD} onChange={setReturnD} />
              </div>

              <div className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm">
                {days} {t("detail.days")} × {car.pricePerDay} MAD = <span className="font-bold">{car.pricePerDay * days} MAD</span>
              </div>

              <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold">{t("detail.extras")}</h3>
                <div className="space-y-2">
                  {EXTRAS.map((e) => (
                    <label key={e.id} className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                      <span className="flex items-center gap-2">
                        <Checkbox checked={extras.includes(e.id)} onCheckedChange={(v) => setExtras((p) => v ? [...p, e.id] : p.filter((x) => x !== e.id))} />
                        {e.name}
                      </span>
                      <span className="text-muted-foreground">+{e.price} {e.perDay ? "/day" : ""}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">{t("detail.total")}</span>
                <span className="text-2xl font-extrabold text-primary">{total} MAD</span>
              </div>

              <Button asChild className="mt-4 h-12 w-full rounded-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary-dark">
                <Link to={`/booking/${car.id}`}>{t("detail.reserve")}</Link>
              </Button>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wide text-muted-foreground">
                <Trust icon={Shield} label="Insured" />
                <Trust icon={BadgeCheck} label="Free cancel" />
                <Trust icon={Headphones} label="24/7" />
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">{t("detail.similar")}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((c) => (<CarCard key={c.id} car={c} />))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

function DateField({ label, value, onChange }: { label: string; value?: Date; onChange: (d?: Date) => void }) {
  return (
    <Popover>
      <PopoverTrigger className="flex flex-col items-start gap-0.5 rounded-xl border border-border px-3 py-2 text-start hover:border-primary/50">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="flex items-center gap-1 text-sm">
          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
          {value ? format(value, "dd MMM") : "—"}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={value} onSelect={onChange} /></PopoverContent>
    </Popover>
  );
}

function Trust({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-4 w-4 text-primary" />{label}
    </div>
  );
}
