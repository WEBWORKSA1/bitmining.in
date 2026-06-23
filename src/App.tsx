import React, { useState } from "react";
import Header from "./components/Header";
import HeroBillboard from "./components/HeroBillboard";
import MiningDashboard from "./components/MiningDashboard";
import LeadCapture from "./components/LeadCapture";
import CryptoInsights from "./components/CryptoInsights";
import SponsorshipView from "./components/SponsorshipView";
import Footer from "./components/Footer";

export default function App() {
  const [currentTab, setCurrentTab] = useState<"home" | "sponsorship">("home");

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToSponsorship = () => {
    setCurrentTab("sponsorship");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Primary Global Navigation */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main Content Area with micro-animations */}
      <main className="flex-grow transition-all duration-300">
        {currentTab === "home" ? (
          <div className="animate-fade-in">
            {/* Phase 2 Hero Billboard */}
            <HeroBillboard onGoToSponsorship={navigateToSponsorship} />
            
            {/* Interactive Industrial Calculations Terminal */}
            <MiningDashboard />
            
            {/* Dedicated High-Converting Lead Gen */}
            <LeadCapture />
            
            {/* AI Advisor Consulting Desk */}
            <CryptoInsights />
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Standalone Sponsorship & Valuation View */}
            <SponsorshipView />
          </div>
        )}
      </main>

      {/* Phase 6 Legal Compliance and Footer Disclaimer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
