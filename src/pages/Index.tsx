import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import InfoStrip from "@/components/InfoStrip";
import DateSection from "@/components/DateSection";
import ThemeSection from "@/components/ThemeSection";
import CTASection from "@/components/CTASection";
import EventsSection from "@/components/EventsSection";
import BusRouteSection from "@/components/BusRouteSection";
import Footer from "@/components/Footer";
import SplashCursor from "@/components/SplashCursor";
import NavHeader from "@/components/NavHeader";
import { useImagePreloader } from "@/hooks/useImagePreloader";

const Index = () => {
  // Preload all event images on page load
  useImagePreloader();
  return (
    <main className="bg-background text-foreground scrollbar-hide">
      <NavHeader />
      <SplashCursor
        SIM_RESOLUTION={48}
        DYE_RESOLUTION={384}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={2}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={4000}
        CURL={2}
        PRESSURE_ITERATIONS={8}
      />
      <HeroSection />
      <InfoStrip />
      <DateSection />
      <ThemeSection />
      <CTASection />
      <EventsSection />
      <BusRouteSection />
      <Footer />
    </main>
  );
};

export default Index;
