import React from "react";
import { Link2, Sparkles, Menu, X, Landmark, Zap, BarChart2, ShieldAlert } from "lucide-react";

interface HeaderProps {
  currentTab: "home" | "sponsorship";
  setCurrentTab: (tab: "home" | "sponsorship") => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ currentTab, setCurrentTab, onScrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (tab: "home" | "sponsorship") => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeroScroll = (id: string) => {
    setCurrentTab("home");
    setMobileMenuOpen(false);
    // Allow React state to update first, then scroll
    setTimeout(() => {
      onScrollToSection(id);
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/10 shadow-lg shadow-amber-500/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Top Left: Bigger, bolder, illuminated domain name */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group animate-fade-in"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-500 to-amber-500 opacity-20 blur-sm group-hover:opacity-40 transition" />
              <div className="relative bg-slate-900 border border-emerald-500/20 px-2.5 py-1 rounded text-emerald-400 font-mono text-xs tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span className="font-bold">IN</span>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tighter select-none">
              <span className="text-emerald-400 duration-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.45)] select-all">Bit</span>
              <span className="text-amber-500 group-hover:text-amber-400 transition-colors duration-300 select-all">Mining</span>
              <span className="text-slate-300 text-lg font-bold select-all">.in</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              id="nav-home"
              onClick={() => handleNavClick("home")}
              className={`px-3 py-2 text-sm font-black uppercase tracking-widest transition-colors ${
                currentTab === "home" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Home
            </button>
            <button
              id="nav-tech"
              onClick={() => handleHeroScroll("tech-terminal")}
              className="px-3 py-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-200 transition-colors"
            >
              National Terminal
            </button>
            <button
              id="nav-lead"
              onClick={() => handleHeroScroll("lead-capture")}
              className="px-3 py-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-200 transition-colors"
            >
              Lead Gen Hub
            </button>
            <button
              id="nav-advisor"
              onClick={() => handleHeroScroll("ai-consultant")}
              className="px-3 py-2 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-200 transition-colors"
            >
              AI Consultant
            </button>

            {/* Top Right Bold, Bigger, Illuminating Dynamic Link Button */}
            <button
              id="nav-sponsor-cta"
              onClick={() => handleNavClick("sponsorship")}
              className={`relative group px-6 py-2.5 rounded-full font-black tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95 text-xs uppercase ${
                currentTab === "sponsorship"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-emerald-400/50"
                  : "bg-slate-900 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]"
              }`}
            >
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-20 blur-md group-hover:opacity-60 transition duration-300" />
              <span className="relative flex items-center gap-1.5 justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-white animate-bounce" />
                Development/Partnership/Sponsorship
              </span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-amber-500/10 px-4 pt-2 pb-4 space-y-2">
          <button
            id="mobile-nav-home"
            onClick={() => handleNavClick("home")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
              currentTab === "home" ? "bg-amber-500/10 text-amber-500" : "text-slate-400 hover:bg-slate-900 hover:text-slate-300"
            }`}
          >
            Home Center
          </button>
          <button
            id="mobile-nav-tech"
            onClick={() => handleHeroScroll("tech-terminal")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            National Hasrate Terminal
          </button>
          <button
            id="mobile-nav-lead"
            onClick={() => handleHeroScroll("lead-capture")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            Lead Gen Hub
          </button>
          <button
            id="mobile-nav-advisor"
            onClick={() => handleHeroScroll("ai-consultant")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            AI Consultant
          </button>
          
          <button
            id="mobile-nav-sponsor-cta"
            onClick={() => handleNavClick("sponsorship")}
            className={`block w-full text-center px-4 py-3 rounded-md text-base font-bold uppercase transition ${
              currentTab === "sponsorship"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950"
                : "bg-slate-900 text-amber-400 border border-amber-500/30"
            }`}
          >
            Development/Partnership/Sponsorship
          </button>
        </div>
      )}
    </header>
  );
}
