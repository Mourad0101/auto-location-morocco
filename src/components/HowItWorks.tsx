import { useTranslation } from "react-i18next";
import { Search, FileSignature, Car } from "lucide-react";

export function HowItWorks() {
  const { t } = useTranslation();
  const steps = [
    { icon: Search, t: t("steps.s1"), d: t("steps.s1d") },
    { icon: FileSignature, t: t("steps.s2"), d: t("steps.s2d") },
    { icon: Car, t: t("steps.s3"), d: t("steps.s3d") },
  ];
  return (
    <section className="container py-16">
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">{t("steps.title")}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <s.icon className="h-7 w-7" />
            </div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">Step {i + 1}</div>
            <h3 className="mb-2 text-lg font-semibold">{s.t}</h3>
            <p className="text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
