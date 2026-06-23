import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Trash2, ArrowRight, CornerDownLeft, Loader2 } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function CryptoInsights() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Namaste. I am the lead AI Consultant for BitMining.in. Having analyzed the Indian regulatory, energy, and cryptographic landscapes for decades, I am here to help you configure solar, hydro, or thermal-powered mining operations.\n\nAsk me anything regarding ASIC efficiencies, grid connectivity, state-wise industrial tariffs, or Bitcoin taxation protocols."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_QUERIES = [
    { text: "HP Hydro vs. Rajasthan Solar ROI?", tag: "POWER COMPARISON" },
    { text: "Tax rates & regulations in India?", tag: "COMPLIANCE & TAX" },
    { text: "Antminer S21 efficiency at ₹4/kWh?", tag: "HARDWARE ROI" },
    { text: "What is green hashrate offset?", tag: "ESG STANDARD" }
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.text || "I was unable to compile a payload strategy for this vector." }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: `Error: ${data.error || "An integration failure occurred."}` }]);
      }
    } catch (err) {
      console.error("Failed to query consultant:", err);
      setMessages((prev) => [...prev, { sender: "ai", text: "Network connection timeout. Ensure Gemini is correctly authorized." }]);
    } finally {
      setLoading(false);
    }
  };

  const wrapBold = (text: string) => {
    // Basic text parsing to highlight bold elements and paragraphs
    return text.split("\n").map((line, idx) => {
      // Check if line is empty
      if (!line.trim()) return <div key={idx} className="h-3" />;
      
      // Parse bold **text** elements
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const elements = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="text-amber-400 font-extrabold">{part}</strong>;
        }
        return part;
      });

      return (
        <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-1.5">
          {elements}
        </p>
      );
    });
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "Namaste. Let's restart our consultation module. How may I advise your operations today?"
      }
    ]);
  };

  return (
    <section id="ai-consultant" className="bg-slate-900 border-b border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Consultant Persona & Info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1 text-[11px] text-emerald-400 font-mono mb-4 uppercase tracking-widest font-bold">
                <Bot className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>AI Consultative Layer Active</span>
              </div>

              <div className="border-l-4 border-amber-500 pl-6 mb-6">
                <h3 className="text-sm text-amber-500 font-black uppercase tracking-widest mb-1">Expert Network</h3>
                <h2 className="text-3xl sm:text-4.5xl font-black text-slate-100 uppercase tracking-tighter leading-none">
                  INDIAN CRYPTO & MINING INTEL
                </h2>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-sans">
                Connect instantly with our highly qualified AI mining consultant. Receive real-time insights regarding power structures, hardware layouts, thermal thresholds, and legal frameworks matching the Indian crypto landscape.
              </p>
              
              <div className="space-y-3 bg-slate-950 p-5 rounded-sm border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-widest font-black block">Expertise vectors:</span>
                <ul className="space-y-1.5 font-mono text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    FEMA & Regulatory tax strategies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Indian Grid connectivity pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    ASIC Thermal / Air duct physics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Off-grid solar microgrid rates
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden lg:block mt-8">
              <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest font-bold">Power Client</span>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Gemini AI Engine / server-side secure TLS routing active.
              </p>
            </div>
          </div>

          {/* RIGHT: Actual UI Chat Sandbox */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800/80 rounded flex flex-col h-[520px] overflow-hidden shadow-2xl">
            
            {/* Chat header */}
            <div className="bg-slate-900/60 border-b border-slate-800/80 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-slate-300 uppercase tracking-widest font-bold">Sovereign Consulting Terminal</span>
              </div>
              
              <button
                onClick={clearChat}
                className="text-xs text-slate-500 hover:text-amber-500 font-mono flex items-center gap-1.5 transition-colors cursor-pointer font-bold"
                title="Reset consultant thread memory"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Terminal</span>
              </button>
            </div>

            {/* Chat message space */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex gap-3 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                  }`}
                >
                  <div className={`p-2 rounded h-8 w-8 flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "user" ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900 border border-slate-800 text-emerald-400"
                  }`}>
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-sm border font-sans text-sm ${
                    msg.sender === "user"
                      ? "bg-amber-550/10 border-amber-500/35 text-slate-200"
                      : "bg-slate-900/40 border-slate-800 text-slate-350"
                  }`}>
                    {wrapBold(msg.text)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="p-2 rounded h-8 w-8 flex items-center justify-center bg-slate-900 border border-slate-800 text-emerald-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-4 rounded-sm border bg-slate-900/40 border-slate-800 text-slate-400 font-mono text-xs flex items-center gap-2">
                    Expert adviser formulating calculations...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested Queries Pill List */}
            <div className="px-5 py-2 bg-slate-900/30 border-t border-slate-800/80">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {SUGGESTED_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q.text)}
                    disabled={loading}
                    className="flex-shrink-0 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/20 rounded-full px-3.5 py-1 text-[10px] font-mono text-slate-400 hover:text-emerald-400 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 font-bold"
                  >
                    <span>{q.text}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat input box */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(input);
                }}
                disabled={loading}
                placeholder="Ask our expert regarding custom microgrids or setup costs..."
                className="flex-grow bg-slate-950 border border-slate-850 rounded px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={loading || !input.trim()}
                className="p-3.5 rounded bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 transition flex items-center justify-center cursor-pointer font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
