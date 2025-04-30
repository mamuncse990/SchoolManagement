import Header from "./components/Header";
import Footer from "././components/Footer";
import HeroSection from "././components/HeroSection";
import AboutSection from "././components/AboutSection";
import StatisticsSection from "././components/StatisticsSection";
import TeachersSection from "././components/TeachersSection";
import EventsSection from "././components/EventsSection";
import ContactSection from "././components/ContactSection";
import HomeDashboardSection from "././components/HomeDashboardSection";

export default function WebsitePage() {
  return (
    <div className="website-container">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <HomeDashboardSection />
        <StatisticsSection />
        <TeachersSection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
