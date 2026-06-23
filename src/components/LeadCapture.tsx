import React, { useState } from "react";
import { Mail, Landmark, Users, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Loader2, Network } from "lucide-react";

export default function LeadCapture() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    hashrate: "190", // TH/s baseline
    energySource: "Hydro",
    location: "Himachal Pradesh",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg("Please provide your full name and corporate email address.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccessMsg(result.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          hashrate: "190",
          energySource: "Hydro",
          location: "Himachal Pradesh",
          message: "",
        });
      } else {
        setErrorMsg(result.error || "A transport error occurred while submitting lead payload.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg("Failed to connect to our lead intake server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-capture" className="bg-slate-950 border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/5 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Co-location value narrative & benefits */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1 text-[11px] text-emerald-400 font-mono mb-4 uppercase tracking-widest w-fit font-bold">
              <Network className="w-3.5 h-3.5" />
              <span>Co-Location & Private Hashrate Pool</span>
            </div>

            <div className="border-l-4 border-amber-500 pl-6 mb-6">
              <h3 className="text-sm text-amber-500 font-black uppercase tracking-widest mb-1">Market Gateway</h3>
              <h2 className="text-3xl sm:text-4.5xl font-black text-slate-100 uppercase tracking-tighter leading-none">
                India's Premier Institutional Gateway to Sustainable Hashrate.
              </h2>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
              BitMining.in serves as the nexus between Indian investment surplus and global digital mining hardware. We specialize in green energy integration, direct PPA microgrids, and institutional-grade mining facility co-location.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/10 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest">Guaranteed Grid Uptime</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans">99.8% annualized computational uptime backed by triple-redundant high-voltage substations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/10 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest">Direct-to-Grid Solar & Hydro Rates</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans">Enjoy industrial microgrid rates as low as ₹3.80 per unit, bypassing general commercial retail surges.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded bg-emerald-500/10 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-widest">SEC/FEMA Compliant Frameworks</h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-sans font-medium">Structured investment custody compliant with Reserve Bank of India (RBI) capital control directives.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-900 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                ISO 27001 Physical Security Standards
              </span>
            </div>
          </div>

          {/* RIGHT: High-converting White Lead Form block */}
          <div className="lg:col-span-7 bg-white text-slate-950 p-8 rounded-sm shadow-2xl relative">
            <div className="absolute -top-3 left-6 bg-amber-500 text-white text-[10px] px-3 py-1 font-black uppercase tracking-wider rounded-sm shadow-md">
              High Performance Hub
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1 text-slate-900">
              Private Consultation
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-semibold font-sans">
              Join the network of institutional investors shaping India's crypto-mining future. Secure and compliant storage.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Form Row: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Professional Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="r.sharma@enterprise.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                  />
                </div>
              </div>

              {/* Form Row: Company & Deployment State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Institution / Company (Optional)</label>
                  <input
                    type="text"
                    placeholder="Deccan Energy Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Target Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                  >
                    <option value="Himachal Pradesh">Himachal Pradesh (Hydro Hub)</option>
                    <option value="Rajasthan">Rajasthan (Solar Plains)</option>
                    <option value="Gujarat">Gujarat (Industrial Corridor)</option>
                    <option value="Tamil Nadu">Tamil Nadu (Wind Fields)</option>
                    <option value="Offshore/Global">Global Nodes (Standard)</option>
                  </select>
                </div>
              </div>

              {/* Form Row: Target Hashrate & Primary Energy Source */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Capacity Allocation</label>
                  <select
                    value={formData.hashrate}
                    onChange={(e) => setFormData({ ...formData, hashrate: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                  >
                    <option value="190">~190 to 500 TH/s (ASIC Trial)</option>
                    <option value="1000">500 TH/s to 5 PH/s (Standard Field)</option>
                    <option value="5000">5 PH/s to 20 PH/s (Enterprise Cluster)</option>
                    <option value="20000">Over 20 PH/s (Mega Datacenter)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Energy Source interest</label>
                  <select
                    value={formData.energySource}
                    onChange={(e) => setFormData({ ...formData, energySource: e.target.value })}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                  >
                    <option value="Hydro">Direct Hydroelectric Turbine</option>
                    <option value="Solar">Photovoltaic Grid Array</option>
                    <option value="Wind">Wind Farm Turbine Link</option>
                    <option value="Hybrid">Grid Mix / Subsidized Co-Generation</option>
                  </select>
                </div>
              </div>

              {/* Messages requirements area */}
              <div>
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold font-sans">Outline your requirements *</label>
                <textarea
                  rows={3}
                  placeholder="Machine model types, preferred timeline, budget constraints, or rack co-location services needed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 focus:outline-emerald-500 rounded-sm py-2.5 px-3 text-sm font-medium font-sans"
                />
              </div>

              {/* Server Alerts Display */}
              {errorMsg && (
                <div role="alert" className="p-3 bg-red-50 text-red-700 border border-red-150 rounded-sm flex items-center gap-2.5 text-xs font-mono font-bold animate-pulse">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div role="alert" className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-150 rounded-sm flex items-start gap-2.5 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                id="sumbit-lead-form-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-slate-950 text-white hover:bg-emerald-600 active:scale-98 py-4 rounded-sm font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    Dispatching parameters...
                  </>
                ) : (
                  <>
                    Initialize Private Consultation
                    <ArrowRight className="w-4 h-4 text-white" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
