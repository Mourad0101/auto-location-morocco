import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function BookingConfirmation() {
  const { ref } = useParams();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>
        <h1 className="mb-2 text-3xl font-bold">Réservation confirmée !</h1>
        <p className="mb-1 text-muted-foreground">Votre numéro de référence</p>
        <div className="mb-8 rounded-full bg-secondary px-6 py-2 font-mono text-lg font-bold tracking-wider">{ref}</div>
        <p className="mb-8 max-w-md text-sm text-muted-foreground">
          Un email de confirmation vient de vous être envoyé. Notre équipe vous contactera 24h avant la prise en charge.
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="rounded-full"><Link to="/cars">Continuer à explorer</Link></Button>
          <Button asChild className="rounded-full bg-primary hover:bg-primary-dark"><Link to="/">Retour à l'accueil</Link></Button>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
