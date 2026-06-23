import React from "react";
import { ShieldCheck, Scale, Award, Landmark, Lock, HelpCircle } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: "home" | "sponsorship") => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: "home" | "sponsorship") => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 text-slate-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Upper footer metadata grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-slate-800 pb-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-slate-200">
                <span className="text-emerald-400">Bit</span><span className="text-amber-500">Mining</span><span className="text-slate-200 font-sans">.in</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-sans">
              Sovereign exactmatch hashrate branding and advisory framework for the Indian green cryptocurrency mining landscape. High integrity, lower customer acquisition costs.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-200 mb-4 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sovereign Navigation</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={() => handleNavClick("home")}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Home Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("sponsorship")}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Development / Partnership
                </button>
              </li>
              <li>
                <a 
                  href="https://web.works/services" 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Corporate Contacts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-200 mb-4 flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secured Safeguards</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 font-mono">
              <li>Muted Audio Compliant</li>
              <li>Encrypted Database Tunnel</li>
              <li>Zero External Cookies</li>
              <li>Private Server Leads</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-200 mb-4 flex items-center gap-1.5 font-bold">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>Regulatory Stance</span>
            </h4>
            <p className="text-[10px] text-slate-500 leading-normal font-sans">
              All co-location partner integrations and calculations are formulated under guidance matching the Reserve Bank of India (RBI) and FEMA investment frameworks.
            </p>
          </div>

        </div>

        {/* Lower Legal disclaimer blocks (Phase 6 requirement) */}
        <div className="space-y-6 text-[10px] text-slate-500 leading-relaxed font-mono">
          
          {/* Paragraph 1: Trademark and copyrights */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm space-y-2">
            <h5 className="font-bold text-slate-300 uppercase flex items-center gap-1.5 text-[10px] tracking-widest">
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              GENERAL COPYRIGHT, TRADEMARK & REGULATORY COMPLIANCE
            </h5>
            <p className="font-sans text-slate-500 leading-relaxed">
              &copy; {currentYear} BitMining.in. All rights reserved. The domain name, proprietary calculators, custom graphics, and technological forecasting layouts on this platform represent unique industrial intellectual assets. Any unrecognized or unauthorized duplication of the exactmatch structure, brand design system, or algorithmic formulas without prior compliance authorization will be contested under contemporary registry and international trademark protections. All third-party hardware trademarks (including Antminer, Whatsminer, Whatsminer M50, and MicroBT) remain the structural intellectual properties of their respective developers.
            </p>
          </div>

          {/* Paragraph 2: User Submitted Content Disclaimer */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm space-y-2">
            <h5 className="font-bold text-slate-300 uppercase flex items-center gap-1.5 text-[10px] tracking-widest">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              DISCLAIMER FOR USER SUBMITTED CONTENT & ESTIMATES
            </h5>
            <p className="font-sans text-slate-500 leading-relaxed">
              The hashrate metrics, power configurations, and financial predictions delivered by our interactive calculators are strictly intended for generalized research and educational assessment. Cryptocomputational difficulty and global market values fluctuate on a block-by-block basis. Past yields are not reflective of long-term profitability. BitMining.in does not hold fiduciary liabilities for custom hardware orders, commercial microgrid leases, or sovereign capital deployments arranged through co-location partners. All data submitted via our lead application vectors is stored securely under confidential servers—no email addresses, hashrate deployment sizes, or personal contact datasets are sold or leased to third-party marketing networks.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
