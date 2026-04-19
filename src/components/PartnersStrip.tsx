const brands = ["Ferrari", "Dacia", "Ford", "Renault", "Land Rover", "Peugeot", "Mercedes", "Fiat", "Hyundai", "Kia", "BMW", "Yamaha"];

export function PartnersStrip() {
  const list = [...brands, ...brands];
  return (
    <section className="border-y border-border/60 bg-background py-8">
      <div className="container overflow-hidden">
        <div className="marquee flex w-max items-center gap-12">
          {list.map((b, i) => (
            <span key={i} className="text-2xl font-bold uppercase tracking-widest text-muted-foreground/60 transition hover:text-primary">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
