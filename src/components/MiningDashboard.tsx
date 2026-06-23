import React, { useState, useEffect } from "react";
import { Zap, Calculator, TrendingUp, Cpu, Server, MapPin, Globe, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { ASICModel } from "../types";

export default function MiningDashboard() {
  const [btcPrice, setBtcPrice] = useState<number>(68420); // Fallback standard
  const [globalHashrate, setGlobalHashrate] = useState<number>(615); // EH/s
  const [networkDifficulty, setNetworkDifficulty] = useState<number>(89.2); // T
  const [loading, setLoading] = useState(false);

  // India Clean Energy Tarifs Presets (in INR / kWh)
  const STATE_PRESETS = [
    { name: "Himachal Pradesh (Hydro)", tariffINR: 3.8, co2Intensity: 80, notes: "Highly abundant run-of-the-river hydroelectricity" },
    { name: "Rajasthan (Solar Microgrid)", tariffINR: 4.5, co2Intensity: 0, notes: "Solar surplus daytime offset" },
    { name: "Gujarat (Industrial Grid)", tariffINR: 5.2, co2Intensity: 420, notes: "Highly reliable high-voltage dedicated supply" },
    { name: "Tamil Nadu (Wind Mix)", tariffINR: 4.2, co2Intensity: 120, notes: "Wind seasonal generation peaks" },
    { name: "Standard Commercial Grid (Coal-dominant)", tariffINR: 8.5, co2Intensity: 820, notes: "High cost, fossil-fuel intense tariff" },
  ];

  const ASIC_MODELS: ASICModel[] = [
    { name: "Antminer S21 Pro (New)", hashrateTHs: 234, powerWatts: 3510, efficiencyJTH: 15, estimatedCostINR: 285000 },
    { name: "Antminer T21 Hybrid", hashrateTHs: 190, powerWatts: 3610, efficiencyJTH: 19, estimatedCostINR: 210000 },
    { name: "Whatsminer M60S (Premium)", hashrateTHs: 186, powerWatts: 3441, efficiencyJTH: 18.5, estimatedCostINR: 235000 },
    { name: "Whatsminer M50S++", hashrateTHs: 150, powerWatts: 3300, efficiencyJTH: 22, estimatedCostINR: 165000 },
    { name: "Antminer S19 XP", hashrateTHs: 141, powerWatts: 3031, efficiencyJTH: 21.5, estimatedCostINR: 140000 },
  ];

  // Calculator states
  const [selectedAsic, setSelectedAsic] = useState<ASICModel>(ASIC_MODELS[0]);
  const [selectedState, setSelectedState] = useState(STATE_PRESETS[0]);
  const [customTariff, setCustomTariff] = useState<string>("");
  const [hardwareCount, setHardwareCount] = useState<number>(1);
  const [hasCustomAsic, setHasCustomAsic] = useState(false);
  
  // Custom ASIC overrides
  const [customHashrate, setCustomHashrate] = useState<number>(150);
  const [customPower, setCustomPower] = useState<number>(3200);

  // Math variables
  const currentTariff = customTariff !== "" ? parseFloat(customTariff) : selectedState.tariffINR;
  const currentHashrate = hasCustomAsic ? customHashrate : selectedAsic.hashrateTHs;
  const currentPower = hasCustomAsic ? customPower : selectedAsic.powerWatts;

  // Calculation outputs
  const [results, setResults] = useState({
    dailyRevenueINR: 0,
    dailyRevenueUSD: 0,
    dailyCostINR: 0,
    dailyProfitINR: 0,
    weeklyProfitINR: 0,
    monthlyProfitINR: 0,
    yearlyProfitINR: 0,
    roiDays: 0,
    dailyCo2SavedKg: 0,
    marginPercent: 0,
  });

  // Calculate profitability
  useEffect(() => {
    // Basic approximate Bitcoin reward formula:
    // Daily Reward (BTC) = (Hardware Hashrate TH/s / Network Hashrate TH/s) * Daily Block Reward * Blocks per Day
    // Network Hashrate = ~615 EH/s = 615,000,000 TH/s
    // Daily block rewards = 144 blocks * (3.125 BTC block reward + ~0.5 BTC fees) = ~522 BTC per day globally post-halving
    const hardwareHashRateTH = currentHashrate * hardwareCount;
    const globalHashrateTH = globalHashrate * 1000000;
    const dailyBtcEarned = (hardwareHashRateTH / globalHashrateTH) * 522;
    
    const dailyRevUSD = dailyBtcEarned * btcPrice;
    const dailyRevINR = dailyRevUSD * 83.5; // USDRUB/INR rate (~83.5)

    // Daily Power Cost: kW * 24h * Electricity Rate
    const dailyPowerKW = (currentPower * hardwareCount) / 1000;
    const dailyCost = dailyPowerKW * 24 * currentTariff;

    const dailyProfit = dailyRevINR - dailyCost;
    const weeklyProfit = dailyProfit * 7;
    const monthlyProfit = dailyProfit * 30;
    const yearlyProfit = dailyProfit * 365;

    // ROI Calculation based on equipment price
    const totalCapExINR = hasCustomAsic ? 0 : selectedAsic.estimatedCostINR * hardwareCount;
    const roi = dailyProfit > 0 ? Math.round(totalCapExINR / dailyProfit) : 0;

    // CO2 Mitigation (relative to baseline Coal generation of 820g/kWh)
    const baselineCo2Kg = dailyPowerKW * 24 * 0.820; // global/coal baseline
    const stateCo2Kg = dailyPowerKW * 24 * (selectedState.co2Intensity / 1000);
    const co2Saved = Math.max(0, baselineCo2Kg - stateCo2Kg);

    const margin = dailyRevINR > 0 ? (dailyProfit / dailyRevINR) * 100 : 0;

    setResults({
      dailyRevenueINR: Math.round(dailyRevINR),
      dailyRevenueUSD: parseFloat(dailyRevUSD.toFixed(2)),
      dailyCostINR: Math.round(dailyCost),
      dailyProfitINR: Math.round(dailyProfit),
      weeklyProfitINR: Math.round(weeklyProfit),
      monthlyProfitINR: Math.round(monthlyProfit),
      yearlyProfitINR: Math.round(yearlyProfit),
      roiDays: roi,
      dailyCo2SavedKg: parseFloat(co2Saved.toFixed(1)),
      marginPercent: Math.round(margin),
    });
  }, [selectedAsic, selectedState, customTariff, hardwareCount, hasCustomAsic, customHashrate, customPower, btcPrice, globalHashrate]);

  const refreshStats = () => {
    setLoading(true);
    // Simulate web scraping network difficulties
    setTimeout(() => {
      setBtcPrice(Math.round(68000 + Math.random() * 2000));
      setGlobalHashrate(Math.round(610 + Math.random() * 15));
      setNetworkDifficulty(parseFloat((88.5 + Math.random() * 2).toFixed(2)));
      setLoading(false);
    }, 800);
  };

  return (
    <section id="tech-terminal" className="bg-slate-950 border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1 text-[10px] text-emerald-400 font-mono mb-4 uppercase tracking-widest font-bold">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Industrial Intelligence Terminal</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tighter uppercase leading-none">
            GREEN BITCOIN <br/>
            <span className="text-emerald-400 underline decoration-4 decoration-amber-500">MINING CALCULATOR</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            The most advanced localized calculator tailored to Indian electricity rates, clean energy offsets, and hardware performance vectors. Formulate your mining ROI instantly with institutional-grade data.
          </p>
        </div>

        {/* Global Live Blockchain Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Est. BTC Price</span>
              <span className="text-lg sm:text-xl font-black font-mono text-slate-200">
                ${btcPrice.toLocaleString()} 
                <span className="text-xs text-slate-500 font-normal ml-1">USD</span>
              </span>
            </div>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)] animate-pulse" />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Global Hashrate</span>
              <span className="text-lg sm:text-xl font-black font-mono text-amber-500">{globalHashrate} EH/s</span>
            </div>
            <Globe className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Net Difficulty</span>
              <span className="text-lg sm:text-xl font-black font-mono text-slate-200">{networkDifficulty} T</span>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-500" />
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">India Green Hashrate</span>
              <span className="text-lg sm:text-xl font-black font-mono text-emerald-400">18.5 MW</span>
            </div>
            <button 
              onClick={refreshStats}
              disabled={loading}
              className="p-1 rounded bg-slate-950 border border-slate-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-450 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Input & Output Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CALCULATOR INPUTS - 5 Cols */}
          <div className="lg:col-span-5 bg-slate-900/30 border border-slate-800/80 p-6 rounded flex flex-col gap-6">
            <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter border-b border-slate-800 pb-3 flex items-center gap-2">
              <Cpu className="text-emerald-450 w-5 h-5 animate-pulse" />
              <span>Computational Configuration</span>
            </h3>

            {/* ASIC Model Picker */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Hardware Unit</label>
              <div className="flex gap-4 mb-3">
                <button
                  onClick={() => setHasCustomAsic(false)}
                  className={`flex-1 py-2 px-3 rounded-sm text-[10px] font-mono uppercase tracking-widest font-bold transition border ${
                    !hasCustomAsic ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-slate-950 text-slate-400 border-slate-900"
                  }`}
                >
                  PRESET ASICS
                </button>
                <button
                  onClick={() => setHasCustomAsic(true)}
                  className={`flex-1 py-2 px-3 rounded-sm text-[10px] font-mono uppercase tracking-widest font-bold transition border ${
                    hasCustomAsic ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" : "bg-slate-950 text-slate-400 border-slate-900"
                  }`}
                >
                  CUSTOM UNITS
                </button>
              </div>

              {!hasCustomAsic ? (
                <select
                  value={selectedAsic.name}
                  onChange={(e) => {
                    const model = ASIC_MODELS.find((m) => m.name === e.target.value);
                    if (model) setSelectedAsic(model);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded py-2.5 px-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 font-sans cursor-pointer"
                >
                  {ASIC_MODELS.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name} ({model.hashrateTHs} TH/s, {model.powerWatts}W)
                    </option>
                  ))}
                </select>
              ) : (
                <div id="custom-hardware-inputs" className="grid grid-cols-2 gap-3 mt-1">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1 font-bold">Hashrate (TH/s)</span>
                    <input
                      type="number"
                      value={customHashrate}
                      onChange={(e) => setCustomHashrate(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-550 font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1 font-bold">Power (Watts)</span>
                    <input
                      type="number"
                      value={customPower}
                      onChange={(e) => setCustomPower(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-555 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Hardware Count */}
            <div>
              <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">Deployed Rig Quantity</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={hardwareCount}
                  onChange={(e) => setHardwareCount(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-950"
                />
                <input
                  type="number"
                  min="1"
                  value={hardwareCount}
                  onChange={(e) => setHardwareCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-slate-950 border border-slate-800 rounded py-1.5 px-2 text-center text-sm font-mono text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* State Grid presets */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">Locational Power Source</label>
                <span className="text-[10px] font-mono text-amber-500 font-bold">Electricity Tariff Code</span>
              </div>
              <select
                value={selectedState.name}
                onChange={(e) => {
                  const state = STATE_PRESETS.find((s) => s.name === e.target.value);
                  if (state) {
                    setSelectedState(state);
                    setCustomTariff(""); // Reset custom
                  }
                }}
                disabled={customTariff !== ""}
                className="w-full bg-slate-950 border border-slate-800 rounded py-2.5 px-3 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 mb-2 disabled:opacity-50 cursor-pointer"
              >
                {STATE_PRESETS.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name} [₹{state.tariffINR}/kWh]
                  </option>
                ))}
              </select>
              
              <p className="text-[11px] text-slate-400 leading-normal bg-slate-950 border border-slate-900 p-2.5 rounded font-sans">
                {selectedState.notes}
              </p>
            </div>

            {/* Custom Tariff Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block font-bold">Or Input Custom Tariff</label>
                {customTariff !== "" && (
                  <button 
                    onClick={() => setCustomTariff("")}
                    className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                  >
                    Clear Override
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Example: 4.8"
                  value={customTariff}
                  onChange={(e) => setCustomTariff(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded py-2.5 px-3.5 pr-14 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-500 font-mono font-bold">₹/kWh</span>
              </div>
            </div>

            <div className="mt-2 bg-slate-950 border-l-2 border-emerald-400 p-3 rounded-sm flex items-start gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] font-mono text-slate-400 leading-normal">
                Indian miners leverage hydro and thermal microgrid setups for optimized 24/7 uptime. Check out the Sponsorship page to sponsor a dedicated off-grid node facility.
              </p>
            </div>
          </div>

          {/* CALCULATOR RESULTS - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Primary Ledger Board */}
            <div className="bg-slate-900/30 border border-slate-800 p-6 rounded flex-grow flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-4 border-b border-slate-800 pb-2 font-black">
                  Estimated Financial Ledgers & Economics
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Revenue metrics */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1 font-bold">Gross Daily Income</span>
                    <span className="text-2xl font-black font-mono text-slate-200 block mb-1">
                      ₹{results.dailyRevenueINR.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 tracking-tight block">
                      Equivalent &asymp; ${results.dailyRevenueUSD} USD/day
                    </span>
                  </div>

                  {/* Operational Expense */}
                  <div className="bg-slate-950 border border-slate-900 p-4 rounded">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1 font-bold">Daily Utility Cost</span>
                    <span className="text-2xl font-black font-mono text-slate-200 block mb-1">
                      ₹{results.dailyCostINR.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono text-amber-500 tracking-tight block">
                      Calculated at ₹{currentTariff} / kWh rate
                    </span>
                  </div>
                </div>

                {/* Main Net Profit banner */}
                <div className={`rounded border p-6 transition text-center ${
                  results.dailyProfitINR > 0
                    ? "bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.06)]"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                }`}>
                  <span className="text-[10px] font-mono uppercase tracking-widest block mb-1.5 font-black">Net Hardware Profits (Daily)</span>
                  <span className="text-3xl sm:text-4.5xl font-black font-mono tracking-tighter block leading-none">
                    {results.dailyProfitINR > 0 ? "+" : ""}
                    ₹{results.dailyProfitINR.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-2 inline-block font-bold">
                    Hashrate Margin Efficiency: <strong className="text-slate-100">{results.marginPercent}%</strong>
                  </span>
                </div>
              </div>

              {/* Extended projections */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Weekly Projections</span>
                  <span className="text-sm font-bold font-mono text-slate-200 block mt-0.5">
                    ₹{results.weeklyProfitINR.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Monthly Net Yield</span>
                  <span className="text-sm font-bold font-mono text-slate-200 block mt-0.5">
                    ₹{results.monthlyProfitINR.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Yearly Net Forecast</span>
                  <span className="text-sm font-bold font-mono text-slate-200 block mt-0.5">
                    ₹{results.yearlyProfitINR.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Green offset board & ROI banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ROI Matrix */}
              <div className="bg-slate-900/30 border border-slate-800 p-5 rounded flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Est. Break Even (ROI)</span>
                  <span className="text-xl font-black font-mono text-amber-500 block mt-0.5">
                    {results.roiDays > 0 ? `${results.roiDays} Days` : "Zero Profit Potential"}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-1">Based on preset unit CAPEX.</span>
                </div>
                <Server className="w-8 h-8 text-amber-500/20" />
              </div>

              {/* CO2 intensity offset */}
              <div className="bg-slate-900/30 border border-slate-800 p-5 rounded flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block flex items-center gap-1 font-black">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Green ESG Advantage
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-400 block mt-0.5">
                    {results.dailyCo2SavedKg} Kg
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-1">CO2 emissions averted daily.</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
