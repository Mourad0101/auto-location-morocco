import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { CarCard } from "@/components/CarCard";
import { FLEET, CITIES } from "@/data/fleet";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const CATS = ["economy", "suv", "luxury", "motorbike"] as const;
const FUELS = ["diesel", "petrol", "hybrid", "electric"] as const;

export default function CarsPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const initialCat = params.get("cat");
  const initialCity = params.get("city") || "all";

  const [cats, setCats] = useState<string[]>(initialCat ? [initialCat] : []);
  const [transmission, setTransmission] = useState<string>("all");
  const [fuels, setFuels] = useState<string[]>([]);
  const [seats, setSeats] = useState<string>("all");
  const [city, setCity] = useState<string>(initialCity);
  const [price, setPrice] = useState<[number, number]>([0, 50000]);
  const [sort, setSort] = useState<string>("popular");

  const results = useMemo(() => {
    let r = FLEET.filter((c) => {
      if (cats.length && !cats.includes(c.category)) return false;
      if (transmission !== "all" && c.transmission !== transmission) return false;
      if (fuels.length && !fuels.includes(c.fuel)) return false;
      if (seats !== "all" && c.seats !== Number(seats)) return false;
      if (city !== "all" && c.city !== city) return false;
      if (c.pricePerDay < price[0] || c.pricePerDay > price[1]) return false;
      return true;
    });
    if (sort === "priceAsc") r = [...r].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "priceDesc") r = [...r].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "newest") r = [...r].sort((a, b) => b.year - a.year);
    return r;
  }, [cats, transmission, fuels, seats, city, price, sort]);

  const Filters = (
    <div className="space-y-7">
      <div>
        <Label className="mb-3 block text-sm font-semibold uppercase tracking-wider">{t("categories.economy")} / SUV / {t("categories.luxury")}</Label>
        <div className="space-y-2">
          {CATS.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox id={c} checked={cats.includes(c)} onCheckedChange={(v) => setCats((p) => v ? [...p, c] : p.filter((x) => x !== c))} />
              <label htmlFor={c} className="text-sm capitalize">{c}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold uppercase tracking-wider">{t("filters.price")}</Label>
        <Slider min={0} max={50000} step={50} value={price} onValueChange={(v) => setPrice(v as [number, number])} />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{price[0]} MAD</span><span>{price[1]} MAD</span>
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold uppercase tracking-wider">{t("filters.transmission")}</Label>
        <RadioGroup value={transmission} onValueChange={setTransmission}>
          {["all", "manual", "automatic"].map((v) => (
            <div key={v} className="flex items-center gap-2"><RadioGroupItem value={v} id={`t-${v}`} /><label htmlFor={`t-${v}`} className="text-sm capitalize">{v}</label></div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold uppercase tracking-wider">{t("filters.fuel")}</Label>
        <div className="space-y-2">
          {FUELS.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Checkbox id={f} checked={fuels.includes(f)} onCheckedChange={(v) => setFuels((p) => v ? [...p, f] : p.filter((x) => x !== f))} />
              <label htmlFor={f} className="text-sm capitalize">{f}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold uppercase tracking-wider">{t("filters.seats")}</Label>
        <RadioGroup value={seats} onValueChange={setSeats}>
          {["all", "2", "4", "5", "7"].map((v) => (
            <div key={v} className="flex items-center gap-2"><RadioGroupItem value={v} id={`s-${v}`} /><label htmlFor={`s-${v}`} className="text-sm">{v === "all" ? "All" : v + "+"}</label></div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold uppercase tracking-wider">{t("filters.city")}</Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {CITIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{t("nav.cars")}</h1>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden"><SlidersHorizontal className="me-2 h-4 w-4" />{t("filters.title")}</Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-auto p-6">{Filters}</SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-48"><SelectValue placeholder={t("filters.sortBy")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{t("filters.popular")}</SelectItem>
                <SelectItem value="priceAsc">{t("filters.priceAsc")}</SelectItem>
                <SelectItem value="priceDesc">{t("filters.priceDesc")}</SelectItem>
                <SelectItem value="newest">{t("filters.newest")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-3xl border border-border bg-card p-6 lg:block">{Filters}</aside>
          <div>
            <p className="mb-4 text-sm text-muted-foreground">{t("filters.found", { count: results.length })}</p>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (<CarCard key={c.id} car={c} />))}
            </div>
            {results.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">No vehicles match these filters.</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
