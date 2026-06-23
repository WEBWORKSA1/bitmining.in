import React from "react";
import { Sparkles, BarChart3, Target, Shield, HelpCircle, Trophy, Megaphone, Zap, ExternalLink } from "lucide-react";

export default function SponsorshipView() {
  const BENEFITS = [
    {
      title: "PREMIUM DOMAIN RECOGNITION & TRUST",
      stat: "85%",
      detail: "BitMining.in is the exact match brand asset for the Indian hashrate sectors. It commands instant trust, prestige, and higher user retention compared to vague tech subdomains."
    },
    {
      title: "LOWER CUSTOMER ACQUISITION COST (CAC)",
      stat: "14x",
      detail: "Avoid paid PPC keyword bidding wars (with average CPCs for 'bitcoin mining' terms over $5.00). Sponsoring this domain triggers high-converting organic click-through yields naturally."
    },
    {
      title: "EXCELLENT SEARCH DISCOVERABILITY (SEO/AEO)",
      stat: "1st Tier",
      detail: "The matching exact-match URL structure offers a major algorithmic search engine ranking benefit for voice search, chat generation (AEO/AIEO), and traditional indexing."
    }
  ];

  return (
    <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative min-h-screen">
      
      {/* Absolute glow grids */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Banner with premium glow */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-[11px] text-emerald-400 font-mono mb-6 uppercase tracking-widest leading-none font-bold">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Development, Partnership & Sponsorship Prospectus</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-100 uppercase tracking-tighter leading-none mb-4">
            THE STRATEGIC ADVANTAGE <br/>OF <span className="text-emerald-400 underline decoration-4 decoration-amber-500">BitMining.in</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-mono uppercase tracking-widest block max-w-3xl mx-auto border-y border-slate-900 py-3.5 mt-6 font-bold">
            Lower CAC, Exact-Match Authority, and Sovereign Green Blockchain Positioning in India.
          </p>
        </div>

        {/* Brand/Sponsorship Details - 2 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Column Left: Brand Analysis */}
          <div className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-sm text-amber-500 font-black uppercase tracking-widest mb-1">Premium Asset Value</h3>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tighter leading-none">
                THE POWER OF EXACT-MATCH TRADEMARK ASSETS
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              In digital asset acquisition and capital growth, domain real estate dictates market capitalization and user authority. Operating under a generic subpath or hyphenated URL dilutes trust. 
              <strong className="text-emerald-400"> BitMining.in</strong> represents the categorical sovereign brand for Bitcoin computation and renewable technology in India.
            </p>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-sm space-y-4">
              <h4 className="text-xs font-mono text-amber-500 font-black uppercase tracking-widest">WHY RECURRING PPC SPENDS ARE A FAILED STRATEGY</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Traditional PPC marketing (e.g. search keyword ads) acts as a recurring variable expense. The moment you pause funding, your traffic drops to zero. 
                Sponsoring this platform secures <strong className="text-slate-200">permanent brand real estate</strong> and steady, continuous inbound link velocity—accruing equity assets instead of rent.
              </p>
              
              {/* ROI Stats comparison */}
              <div className="grid grid-cols-2 gap-4 pt-3.5 border-t border-slate-800 font-mono">
                <div>
                  <span className="text-[10px] text-rose-400 block uppercase font-bold">Traditional Media (PPC)</span>
                  <span className="text-sm font-black text-slate-100 uppercase tracking-tight">Recurring Rent</span>
                  <span className="text-[9px] text-slate-500 block font-normal mt-0.5">No brand equity accrued</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">Sponsorship Media</span>
                  <span className="text-sm font-black text-slate-100 uppercase tracking-tight">Passive Inbound</span>
                  <span className="text-[9px] text-slate-500 block font-normal mt-0.5">Permanent traffic index</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Strategic Benefits */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-sm">
            <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter mb-2">
              Sponsorship Benefit matrix
            </h3>
            <p className="text-xs text-slate-500 font-mono mb-6 uppercase tracking-wider font-bold">Comparative metrics on exact-match assets.</p>

            <div className="space-y-4">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 hover:bg-slate-950 border border-slate-800/65 hover:border-emerald-500/20 transition-all rounded-sm">
                  <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-sm text-lg font-black font-mono flex-shrink-0">
                    {benefit.stat}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-250 uppercase tracking-widest mb-1 text-slate-200">{benefit.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans mt-0.5">{benefit.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Niche Specific Sponsorship Options / Tiered Grid */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-sm p-8 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter">Available Sponsorship Tiers</h3>
            <p className="text-xs text-slate-400 mt-2 font-medium">Perfect for hosting facilities, container manufacturers, and mining hardware distributors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tier 1 */}
            <div className="bg-slate-950 border border-slate-850 p-6 rounded-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block mb-1.5 font-bold">Standard Node</span>
                <h4 className="text-lg font-black text-slate-200 uppercase tracking-tight mb-3">Newsletter & Sidebar</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                  Place a permanent responsive ad banner inside our newsletter and sidebars reaching Indian miners and local clean energy investors.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Available Spots:</span>
                <span className="text-amber-500 font-black">2 of 3 Active</span>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-slate-950 border border-emerald-500/30 p-6 rounded-sm flex flex-col justify-between relative shadow-lg">
              <div className="absolute top-3 right-3 bg-emerald-500/20 text-emerald-400 text-[8px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-sm font-black">
                MOST POPULAR
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest block mb-1.5 font-bold">Mega Hash</span>
                <h4 className="text-lg font-black text-slate-200 uppercase tracking-tight mb-3">Top Billboards & Media Sponsor</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                  Secure the top 50/50 Billboard right below the navigation bar. Receive premium text highlights, CTA buttons, and dedicated media slots.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Available Spots:</span>
                <span className="text-emerald-400 font-black">1 spot remaining</span>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-slate-950 border border-slate-850 p-6 rounded-sm flex flex-col justify-between font-sans">
              <div>
                <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest block mb-1.5 font-bold">Sovereign Cluster</span>
                <h4 className="text-lg font-black text-slate-200 uppercase tracking-tight mb-3">Sovereign Joint Venture</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                  Total integrated branding across calculators, state power guides, and co-location intake lead pipelines statically.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Available Spots:</span>
                <span className="text-amber-500 font-black">Exclusively Offered</span>
              </div>
            </div>

          </div>
        </div>

        {/* FINAL MONETIZATION CALL TO ACTION */}
        <div className="bg-slate-900 border border-slate-800 rounded-sm p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-555/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Megaphone className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
            <h3 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tighter leading-none">
              INITIATE ADVERTISING & PARTNERSHIP
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Connect with our corporate development team to secure exclusive sponsorships, brand takeovers, and targeted hashrate distribution streams. Review and approve custom contracts safely.
            </p>

            <div className="pt-4">
              <a
                href="https://web.works/services"
                target="_blank"
                referrerPolicy="no-referrer"
                id="partnership-contact-cta"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors duration-200 shadow-md"
              >
                <span>Contact Portfolio Services</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
