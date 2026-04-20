import partnersImg from "@/assets/partners.svg";

export function PartnersStrip() {
  return (
    <section className="border-y border-border/60 bg-background py-8">
      <div className="container overflow-hidden">
        <div className="marquee flex w-max items-center gap-16">
          <img src={partnersImg} alt="Car brand partners" className="h-16 w-auto max-w-none opacity-90" />
          <img src={partnersImg} alt="" aria-hidden className="h-16 w-auto max-w-none opacity-90" />
        </div>
      </div>
    </section>
  );
}
