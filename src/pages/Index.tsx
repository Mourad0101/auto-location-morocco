import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { PartnersStrip } from "@/components/PartnersStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSignals } from "@/components/TrustSignals";
import { Testimonials } from "@/components/Testimonials";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FLEET } from "@/data/fleet";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const economy = FLEET.filter((c) => c.category === "economy").slice(0, 3);
  const suv = FLEET.filter((c) => c.category === "suv").slice(0, 3);
  const luxury = FLEET.filter((c) => c.category === "luxury").slice(0, 3);
  const bikes = FLEET.filter((c) => c.category === "motorbike").slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PartnersStrip />
        <CategorySection title={t("categories.economy") + " Cars"} slug="economy" cars={economy} />
        <CategorySection title="SUVs" slug="suv" cars={suv} />
        <CategorySection title={t("categories.luxury") + " Cars"} slug="luxury" cars={luxury} />
        <CategorySection title={t("categories.motorbike")} slug="motorbike" cars={bikes} />
        <TrustSignals />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
