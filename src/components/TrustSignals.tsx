import { useTranslation } from "react-i18next";
import { Shield, CalendarX2, Headphones, BadgeCheck } from "lucide-react";

export function TrustSignals() {
  const { t } = useTranslation();
  const items = [
    { icon: Shield, label: t("trust.insured") },
    { icon: CalendarX2, label: t("trust.cancel") },
    { icon: Headphones, label: t("trust.support247") },
    { icon: BadgeCheck, label: t("trust.noFees") },
  ];
  return (
    <section className="container py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <i.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
