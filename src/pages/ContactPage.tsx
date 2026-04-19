import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container py-16">
        <h1 className="mb-2 text-4xl font-bold">Contact</h1>
        <p className="mb-10 text-muted-foreground">Notre équipe est à votre disposition 7j/7</p>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: MapPin, t: "Adresse", v: "12 Boulevard Mohammed V, Casablanca" },
            { icon: Phone, t: "Téléphone", v: "+212 5 22 00 00 00" },
            { icon: Mail, t: "Email", v: "hello@autolocation.ma" },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.t}</div>
              <div className="mt-1 font-medium">{c.v}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
