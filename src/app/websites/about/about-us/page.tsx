import Header from "../../components/Header";
import MenuSection from "../../components/MenuSection";
import Footer from "../../components/Footer";
import AboutSection from "../../components/AboutSection";
import StatisticsSection from "../../components/StatisticsSection";

export default function WebsitePage() {
  return (
    <div className="website-container">
      <Header />
      <MenuSection />
      <main>
        <AboutSection />
        <StatisticsSection />
      </main>
      <Footer />
    </div>
  );
}
