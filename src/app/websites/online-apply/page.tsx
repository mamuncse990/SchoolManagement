import Header from "../components/Header";
import MenuSection from "../components/MenuSection";
import Footer from "../components/Footer";
import OnlineApply from "../components/OnlineApply";

export default function WebsitePage() {
  return (
    <div className="website-container">
      <Header />
      <MenuSection />
      <main>
       <OnlineApply />
      </main>
      <Footer />
    </div>
  );
}
