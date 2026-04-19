import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FLEET, INSURANCE_TIERS, EXTRAS, PAYMENT_METHODS } from "@/data/fleet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const driverSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  idType: z.enum(["cin", "passport"]),
  idNumber: z.string().min(4),
  license: z.string().min(4),
  nationality: z.string().min(2),
  requests: z.string().optional(),
});
type DriverForm = z.infer<typeof driverSchema>;

export default function BookingPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const car = FLEET.find((c) => c.id === id);

  const [step, setStep] = useState(1);
  const [insurance, setInsurance] = useState("standard");
  const [extras, setExtras] = useState<string[]>([]);
  const [payment, setPayment] = useState("cmi");
  const [terms, setTerms] = useState(false);

  const days = 5; // demo
  const insurancePrice = INSURANCE_TIERS.find((i) => i.id === insurance)?.price ?? 0;
  const extrasTotal = useMemo(
    () => extras.reduce((s, id) => {
      const e = EXTRAS.find((x) => x.id === id);
      if (!e) return s;
      return s + (e.perDay ? e.price * days : e.price);
    }, 0),
    [extras]
  );
  const base = (car?.pricePerDay ?? 0) * days;
  const insTot = insurancePrice * days;
  const total = base + insTot + extrasTotal;

  const form = useForm<DriverForm>({
    resolver: zodResolver(driverSchema),
    defaultValues: { idType: "cin", nationality: "Marocaine" },
  });

  if (!car) return <div className="container py-20 text-center">Car not found.</div>;

  const reference = `AL-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000 + 10000)}`;

  const submitFinal = () => {
    if (!terms) {
      toast({ title: "Veuillez accepter les conditions", variant: "destructive" });
      return;
    }
    toast({ title: t("booking.confirmed"), description: `${t("booking.reference")}: ${reference}` });
    navigate(`/booking/confirmation/${reference}`, { state: { car: car.id, total } });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-10">
        <h1 className="mb-2 text-3xl font-bold">{t("booking.title")}</h1>
        <p className="mb-6 text-muted-foreground">{car.brand} {car.model} · {days} {t("detail.days")}</p>

        <Progress value={(step / 3) * 100} className="mb-2" />
        <div className="mb-8 flex justify-between text-xs font-semibold uppercase tracking-wider">
          <span className={step >= 1 ? "text-primary" : "text-muted-foreground"}>1. {t("booking.step1")}</span>
          <span className={step >= 2 ? "text-primary" : "text-muted-foreground"}>2. {t("booking.step2")}</span>
          <span className={step >= 3 ? "text-primary" : "text-muted-foreground"}>3. {t("booking.step3")}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            {step === 1 && (
              <div className="space-y-6">
                <section>
                  <h2 className="mb-3 text-lg font-semibold">{t("booking.insurance")}</h2>
                  <RadioGroup value={insurance} onValueChange={setInsurance} className="grid gap-3 sm:grid-cols-3">
                    {INSURANCE_TIERS.map((tier) => (
                      <label key={tier.id} className={`relative cursor-pointer rounded-2xl border-2 p-4 transition ${insurance === tier.id ? "border-primary bg-primary/5" : "border-border"}`}>
                        <RadioGroupItem value={tier.id} className="sr-only" />
                        {(tier as any).recommended && <Badge className="absolute -top-2 right-3 bg-primary">Recommended</Badge>}
                        <div className="text-base font-bold">{tier.name}</div>
                        <div className="text-primary">{tier.price} MAD/day</div>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                          {tier.coverage.map((c) => (<li key={c} className="flex gap-1.5"><Check className="h-3 w-3 text-emerald-500" />{c}</li>))}
                        </ul>
                      </label>
                    ))}
                  </RadioGroup>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-semibold">{t("booking.extrasTitle")}</h2>
                  <div className="space-y-2">
                    {EXTRAS.map((e) => (
                      <div key={e.id} className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                        <div>
                          <div className="text-sm font-medium">{e.name}</div>
                          <div className="text-xs text-muted-foreground">+{e.price} MAD {e.perDay ? "/ day" : "flat"}</div>
                        </div>
                        <Switch checked={extras.includes(e.id)} onCheckedChange={(v) => setExtras((p) => v ? [...p, e.id] : p.filter((x) => x !== e.id))} />
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} className="rounded-full bg-primary px-8 hover:bg-primary-dark">{t("booking.next")}</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={form.handleSubmit(() => setStep(3))} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t("booking.fullName")} error={form.formState.errors.fullName?.message}>
                    <Input {...form.register("fullName")} />
                  </Field>
                  <Field label={t("booking.email")} error={form.formState.errors.email?.message}>
                    <Input type="email" {...form.register("email")} />
                  </Field>
                  <Field label={t("booking.phone")} error={form.formState.errors.phone?.message}>
                    <Input placeholder="+212 6 12 34 56 78" {...form.register("phone")} />
                  </Field>
                  <Field label={t("booking.nationality")} error={form.formState.errors.nationality?.message}>
                    <Input {...form.register("nationality")} />
                  </Field>
                  <div>
                    <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("booking.idType")}</Label>
                    <RadioGroup defaultValue="cin" onValueChange={(v) => form.setValue("idType", v as any)} className="flex gap-4">
                      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="cin" /> {t("booking.cin")}</label>
                      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="passport" /> {t("booking.passport")}</label>
                    </RadioGroup>
                  </div>
                  <Field label={t("booking.idNumber")} error={form.formState.errors.idNumber?.message}>
                    <Input {...form.register("idNumber")} />
                  </Field>
                  <Field label={t("booking.license")} error={form.formState.errors.license?.message}>
                    <Input {...form.register("license")} />
                  </Field>
                </div>
                <Field label={t("booking.requests")}>
                  <Textarea {...form.register("requests")} />
                </Field>
                <div className="flex justify-between">
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>← {t("booking.back")}</Button>
                  <Button type="submit" className="rounded-full bg-primary px-8 hover:bg-primary-dark">{t("booking.next")}</Button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">{t("booking.paymentMethod")}</h2>
                <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
                  {PAYMENT_METHODS.map((p) => (
                    <label key={p.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${payment === p.id ? "border-primary bg-primary/5" : "border-border"}`}>
                      <RadioGroupItem value={p.id} className="mt-1" />
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.desc}</div>
                      </div>
                    </label>
                  ))}
                </RadioGroup>

                <label className="flex items-start gap-2 text-sm">
                  <Checkbox checked={terms} onCheckedChange={(v) => setTerms(!!v)} className="mt-0.5" />
                  {t("booking.terms")}
                </label>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(2)}>← {t("booking.back")}</Button>
                  <Button onClick={submitFinal} className="h-12 rounded-full bg-primary px-10 text-base font-bold hover:bg-primary-dark">
                    {t("booking.confirm")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <aside className="rounded-3xl bg-rose-card p-6 shadow-soft lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex h-32 items-center justify-center">
              <img src={car.image} alt="" className="max-h-full" />
            </div>
            <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
            <p className="text-xs text-muted-foreground">{car.city} · {car.year}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k={`${days} × ${car.pricePerDay} MAD`} v={`${base} MAD`} />
              <Row k={`${t("booking.insurance")} (${insurance})`} v={`${insTot} MAD`} />
              <Row k="Extras" v={`${extrasTotal} MAD`} />
            </dl>
            <div className="mt-4 border-t border-border pt-3">
              <div className="flex justify-between text-base font-bold">
                <span>{t("detail.total")}</span><span className="text-primary">{total} MAD</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>;
}
