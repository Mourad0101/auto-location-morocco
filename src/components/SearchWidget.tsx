import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITIES, FLEET } from "@/data/fleet";
import { Car, Bike, MapPin, CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";

export function SearchWidget() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"cars" | "bikes">("cars");
  const [city, setCity] = useState("");
  const [carId, setCarId] = useState("");
  const [pickup, setPickup] = useState<Date | undefined>();
  const [returnD, setReturnD] = useState<Date | undefined>();

  const onSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (tab === "bikes") params.set("cat", "motorbike");
    if (carId) params.set("car", carId);
    navigate(`/cars?${params.toString()}`);
  };

  const carOptions = FLEET.filter((c) => (tab === "bikes" ? c.category === "motorbike" : c.category !== "motorbike"));

  return (
    <div className="rounded-3xl bg-rose-strong p-4 shadow-card sm:p-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v as "cars" | "bikes")}>
        <TabsList className="mb-5 h-auto w-full justify-start gap-2 rounded-full bg-transparent p-0 sm:w-auto">
          <TabsTrigger
            value="cars"
            className="rounded-full border border-primary/30 bg-card px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
          >
            {t("search.cars")}
          </TabsTrigger>
          <TabsTrigger
            value="bikes"
            className="rounded-full border border-primary/30 bg-card px-6 py-2 text-xs font-bold uppercase tracking-wider text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
          >
            {t("search.bikes")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto]">
        <Field label={t("search.pickup")} icon={<MapPin className="h-3.5 w-3.5" />}>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-9 border-0 bg-transparent px-0 text-sm shadow-none focus:ring-0">
              <SelectValue placeholder={t("search.selectLocation")} />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>

        <Field label={t("search.car")} icon={<Car className="h-3.5 w-3.5" />}>
          <Select value={carId} onValueChange={setCarId}>
            <SelectTrigger className="h-9 border-0 bg-transparent px-0 text-sm shadow-none focus:ring-0">
              <SelectValue placeholder={t("search.selectCar")} />
            </SelectTrigger>
            <SelectContent>
              {carOptions.map((c) => (<SelectItem key={c.id} value={c.id}>{c.brand} {c.model}</SelectItem>))}
            </SelectContent>
          </Select>
        </Field>

        <Field label={t("search.pickupDate")} icon={<CalendarIcon className="h-3.5 w-3.5" />}>
          <Popover>
            <PopoverTrigger className="flex h-9 w-full items-center text-start text-sm">
              {pickup ? format(pickup, "dd MMM yyyy") : <span className="text-muted-foreground">{t("search.selectDate")}</span>}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={pickup} onSelect={setPickup} />
            </PopoverContent>
          </Popover>
        </Field>

        <Field label={t("search.returnDate")} icon={<CalendarIcon className="h-3.5 w-3.5" />}>
          <Popover>
            <PopoverTrigger className="flex h-9 w-full items-center text-start text-sm">
              {returnD ? format(returnD, "dd MMM yyyy") : <span className="text-muted-foreground">{t("search.selectDate")}</span>}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={returnD} onSelect={setReturnD} />
            </PopoverContent>
          </Popover>
        </Field>

        <Button
          onClick={onSearch}
          size="lg"
          className="h-12 w-full rounded-2xl bg-maroon px-8 text-sm font-bold uppercase tracking-widest text-maroon-foreground shadow-soft hover:bg-maroon/90 sm:col-span-2 lg:col-span-1 lg:h-auto lg:w-auto lg:self-stretch"
        >
          <Search className="me-2 h-4 w-4" />
          {t("search.cta")}
        </Button>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-background px-4 py-2.5 ring-1 ring-border transition hover:ring-primary/40">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="-mt-0.5">{children}</div>
    </div>
  );
}
