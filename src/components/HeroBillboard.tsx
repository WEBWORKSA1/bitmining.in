import React, { useEffect, useState } from "react";
import { Megaphone, Play, Volume2, Sparkles, Youtube, Loader2, Award } from "lucide-react";
import { YouTubeVideoInfo } from "../types";

interface HeroBillboardProps {
  onGoToSponsorship: () => void;
}

export default function HeroBillboard({ onGoToSponsorship }: HeroBillboardProps) {
  const [video, setVideo] = useState<YouTubeVideoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("fallback-0");

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const res = await fetch("/api/youtube/latest");
        if (res.ok) {
          const data = await res.json();
          setVideo(data);
        }
      } catch (err) {
        console.error("Failed to fetch latest video:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestVideo();
  }, []);

  const changeVideo = (id: string, title: string, desc: string, index: string) => {
    if (video) {
      setVideo({
        ...video,
        id,
        title,
        description: desc
      });
      setActiveTab(index);
    }
  };

  return (
    <section id="hero-billboard" className="relative bg-slate-950 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Absolute pulsing background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Billboard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT 50%: Automated YouTube Player */}
          <div className="bg-slate-900/40 rounded shadow-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-mono tracking-widest uppercase font-black">
                  <Youtube className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>BitMining.in Official Broadcast Channel</span>
                </div>
                {!loading && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
                    video?.isCustom 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-slate-950 text-slate-400 border-slate-800"
                  }`}>
                    {video?.isCustom ? "LIVE CHANNEL SYNCED" : "ESG STANDARDS"}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter line-clamp-1 mt-2">
                {loading ? "Initializing Broadcast Stream..." : video?.title}
              </h3>
            </div>

            {/* Embed Video Block with Autoplay + Muted (AutoPlay constraint workaround) */}
            <div className="relative aspect-video rounded overflow-hidden bg-slate-950 border border-slate-850 group shadow-lg">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950 text-slate-400">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  <span className="text-xs font-mono">Synchronizing clean energy video matrices...</span>
                </div>
              ) : video ? (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&playlist=${video.id}&loop=1&controls=1&rel=0&enablejsapi=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0 absolute inset-0 grayscale-[20%] opacity-95"
                  />
                  {/* Subtle muted banner for accessibility & compliance */}
                  <div className="absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-sm border border-emerald-500/20 rounded px-2.5 py-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                    <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>MUTED AUTOPLAY ACTIVE</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-red-400">
                  <span>Failed to load media payload.</span>
                </div>
              )}
            </div>

            {/* Video description and micro-playlist switch */}
            <div className="mt-4">
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed bg-slate-950/50 p-3 rounded border border-slate-900 font-sans">
                {loading ? "Retrieving content summaries from global blockchain records..." : video?.description}
              </p>
              
              {/* Fallback playlist display for better Adsense visibility */}
              {!loading && video?.list && video.list.length > 0 && (
                <div className="mt-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 font-bold">Alternative Broadcast Feeds:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {video.list.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => changeVideo(v.id, v.title, v.description, `fallback-${i}`)}
                        className={`text-left p-1.5 rounded-sm border text-[10px] font-mono transition-all truncate flex items-center gap-1.5 ${
                          activeTab === `fallback-${i}`
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-950 text-slate-400 border-slate-900 hover:border-slate-800"
                        }`}
                      >
                        <Play className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="truncate">{v.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 50%: Sponsorship Premium CTA Spot (Fall-back for AdSense) */}
          <div className="relative rounded bg-slate-900/60 p-8 flex flex-col justify-between overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.06),transparent_70%)] pointer-events-none"></div>
            {/* Embedded custom Adsense slot identifier to earn trust */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-[9px] font-mono tracking-wider font-bold">
              <Award className="w-2.5 h-2.5 text-emerald-400" />
              <span>SPONSOR AD</span>
            </div>

            <div className="relative">
              {/* Glowing/Wobbling megaphone icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-25 blur-md animate-ping" />
                  <div className="relative bg-gradient-to-tr from-emerald-600 to-teal-600 p-3.5 rounded border border-emerald-400/30 shadow-lg">
                    <Megaphone className="w-8 h-8 text-white duration-500 transform -rotate-12 group-hover:rotate-0" />
                  </div>
                </div>
                <div>
                  <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase block font-black leading-none">Billboard Position Active</span>
                  <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest block mt-1 hover:text-emerald-400 font-bold">Lower CAC vs Traditional Ads</span>
                </div>
              </div>

              {/* Extra Bold headlines */}
              <div className="space-y-3 mt-6">
                <h4 className="text-slate-500 text-xs font-black uppercase tracking-widest leading-none">ESTABLISH INDUSTRY DOMINANCE</h4>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 uppercase tracking-tighter leading-none select-all">
                  YOUR BRAND <br />
                  <span className="text-emerald-400 underline decoration-4 decoration-amber-500">HERE</span>
                </h2>
                <p className="text-sm text-slate-400 mt-4 leading-relaxed font-sans">
                  Put your brand, host facility, or mining equipment in front of targeted Indian and global clean energy miners. Receive organic, high-intent hashrate traffic directly at <strong className="text-emerald-400">BitMining.in</strong>.
                </p>
              </div>

              {/* Interactive fact badge */}
              <div className="mt-6 p-4 rounded border border-slate-800 bg-slate-950/60">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-3xl font-black text-emerald-400 block font-mono leading-none">10x</span>
                    <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider font-bold">Higher CTR than search</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-amber-500 block font-mono leading-none">&lt; $0.08</span>
                    <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider font-bold">Average acquisition cost</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="billboard-secure-now"
                onClick={onGoToSponsorship}
                className="w-full sm:w-auto flex-grow bg-white hover:bg-emerald-400 text-slate-950 hover:text-slate-950 px-8 py-4 rounded font-black uppercase tracking-tighter text-center text-base shadow-[0_10px_30px_rgba(255,255,255,0.1)] transform hover:-translate-y-0.5 transition duration-300 cursor-pointer"
              >
                Secure This Spot Now
              </button>
              <button
                id="ad-specs-btn"
                onClick={onGoToSponsorship}
                className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 px-6 py-4 rounded font-bold uppercase tracking-widest text-xs transition duration-300 text-center cursor-pointer"
              >
                View Analytics & Rates
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
