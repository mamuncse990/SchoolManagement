"use client";

import { useState } from "react";
import OnlineApply from "../../components/OnlineApply";
import Header from "../../components/Header";
import MenuSection from "../../components/MenuSection";
import Footer from "../../components/Footer";
import PrintAdmitCardDialog from "@/components/PrintAdmitCardDialog";
import styles from "./page.module.css"; // Adjust the path if your CSS module file is located elsewhere

export default function RegistrationPage() {
  const [printDialogOpen, setPrintDialogOpen] = useState(false);

  return (
    <div className="website-container">
      <Header />
      <MenuSection />
      <main>

      <div className={styles.headerSection}>
        <h2 className={styles.applyTitle}>Apply Information</h2>
        <button 
          className={styles.printButton}
          onClick={() => setPrintDialogOpen(true)}
        >
          Print Admit Card
        </button>
      </div>



        {/* <div className="flex justify-end px-8">
        <h2 className="text-3xl font-bold text-center my-8">Apply Information</h2>

          <button
            onClick={() => setPrintDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Print Admit Card
          </button>
        </div> */}
        <h1 className="text-3xl font-bold text-center my-8">Preliminary Enrolment Form</h1>
        <OnlineApply />
        <PrintAdmitCardDialog 
          open={printDialogOpen} 
          onClose={() => setPrintDialogOpen(false)} 
        />
      </main>
      <Footer />
    </div>
  );
}
