import React, { useState } from 'react';
import {
  Smartphone,
  Sun,
  Maximize2,
  Sliders,
  Palette,
  Eye,
  Check,
  Sparkles,
  Info,
  RotateCw,
  Globe,
} from 'lucide-react';

interface DribbbleFrameProps {
  children: React.ReactNode;
  onSwitchToWebsite?: () => void;
}

export const DribbbleFrame: React.FC<DribbbleFrameProps> = ({ children, onSwitchToWebsite }) => {
  const [studioLight, setStudioLight] = useState<'darkroom' | 'clean' | 'warm' | 'gradient'>('darkroom');
  const [deviceColor, setDeviceColor] = useState<'titanium' | 'obsidian' | 'gold'>('titanium');
  const [scaleMode, setScaleMode] = useState<'normal' | 'fit'>('normal');
  const [showSpecs, setShowSpecs] = useState(false);
  const [bezelMode, setBezelMode] = useState<'realistic' | 'frameless'>('realistic');

  // Studio background themes
  const studioBgClasses = {
    darkroom: 'bg-[#0b0f19] text-slate-100',
    clean: 'bg-[#f4f6fa] text-slate-800',
    warm: 'bg-[#faf7f2] text-amber-950',
    gradient: 'bg-gradient-to-br from-slate-900 via-[#111827] to-[#06201a] text-white',
  };

  // Smartphone bezel metallic edge styles
  const bezelFrames = {
    titanium: {
      outer: 'bg-[#3b3e45] border-[#555a64] shadow-[0_25px_70px_rgba(0,0,0,0.65),0_10px_25px_rgba(0,0,0,0.4)]',
      accent: 'from-[#6e7480] via-[#3d424b] to-[#25282e]',
      button: 'bg-[#4b5059]',
    },
    obsidian: {
      outer: 'bg-[#181a1f] border-[#2d3038] shadow-[0_25px_75px_rgba(0,0,0,0.85)]',
      accent: 'from-[#3a3e48] via-[#1a1c22] to-[#0f1013]',
      button: 'bg-[#2b2e36]',
    },
    gold: {
      outer: 'bg-[#4a4237] border-[#6b5f4f] shadow-[0_25px_70px_rgba(0,0,0,0.6)]',
      accent: 'from-[#8a7b66] via-[#4d4438] to-[#2e2820]',
      button: 'bg-[#5e5343]',
    },
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 flex flex-col justify-between ${studioBgClasses[studioLight]} font-sans selection:bg-emerald-500 selection:text-white`}>
      {/* Top Dribbble Presentation Bar */}
      <header className="w-full px-4 sm:px-8 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 z-40 backdrop-blur-md bg-black/20">
        <div className="flex items-center space-x-3">
          {/* MEDIX Logo & Dribbble-style badge */}
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 bg-emerald-950">
            <img src="/medix-logo.jpg" alt="MEDIX" className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="text-sm font-extrabold tracking-tight flex items-center gap-2">
              <span>MEDIX</span>
              <span className="text-xs font-normal opacity-60">| Mobile UI/UX & Web Healthcare</span>
            </h1>
            <p className="text-[11px] opacity-70">
              Clean Light Canvas (#FAFAFA) • Vibrant Soft Green • Accessible Tri-Lingual (EN | ગુજરાતી | हिंदी)
            </p>
          </div>
        </div>

        {/* Presentation Controls Toolbar */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Website Mode Switcher */}
          {onSwitchToWebsite && (
            <button
              type="button"
              onClick={onSwitchToWebsite}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all animate-pulse"
              title="Switch to full-width responsive Website Mode"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website Mode</span>
            </button>
          )}
          {/* Studio Lighting Picker */}
          <div className="flex items-center bg-black/30 rounded-full p-1 border border-white/10">
            <button
              type="button"
              onClick={() => setStudioLight('darkroom')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                studioLight === 'darkroom' ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Studio Darkroom"
            >
              Studio Dark
            </button>
            <button
              type="button"
              onClick={() => setStudioLight('clean')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                studioLight === 'clean' ? 'bg-white/30 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Clean Studio Light"
            >
              Clean Light
            </button>
            <button
              type="button"
              onClick={() => setStudioLight('gradient')}
              className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                studioLight === 'gradient' ? 'bg-emerald-500/30 text-emerald-200 shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Emerald Studio"
            >
              Vibrant Studio
            </button>
          </div>

          {/* Device Frame Mode */}
          <button
            type="button"
            onClick={() => setBezelMode(bezelMode === 'realistic' ? 'frameless' : 'realistic')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-bold border transition-all ${
              bezelMode === 'realistic'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20'
            }`}
            title="Toggle Smartphone Bezel Frame"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{bezelMode === 'realistic' ? 'Detailed Bezel' : 'Direct Screen'}</span>
          </button>

          {/* Color Finish Picker */}
          {bezelMode === 'realistic' && (
            <div className="flex items-center bg-black/30 rounded-full p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setDeviceColor('titanium')}
                className={`w-5 h-5 rounded-full bg-[#626875] border-2 transition-all ${
                  deviceColor === 'titanium' ? 'border-white scale-110' : 'border-transparent opacity-60'
                }`}
                title="Titanium"
              />
              <button
                type="button"
                onClick={() => setDeviceColor('obsidian')}
                className={`w-5 h-5 rounded-full bg-[#1e2026] border-2 ml-1 transition-all ${
                  deviceColor === 'obsidian' ? 'border-white scale-110' : 'border-transparent opacity-60'
                }`}
                title="Obsidian Black"
              />
              <button
                type="button"
                onClick={() => setDeviceColor('gold')}
                className={`w-5 h-5 rounded-full bg-[#8c7b64] border-2 ml-1 transition-all ${
                  deviceColor === 'gold' ? 'border-white scale-110' : 'border-transparent opacity-60'
                }`}
                title="Desert Gold"
              />
            </div>
          )}

          {/* Design Specs Inspector Toggle */}
          <button
            type="button"
            onClick={() => setShowSpecs(!showSpecs)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-bold border transition-all ${
              showSpecs
                ? 'bg-blue-500/30 text-blue-200 border-blue-400'
                : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Design Specs</span>
          </button>
        </div>
      </header>

      {/* Main Studio Presentation Stage */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-10 relative overflow-hidden">
        {/* Studio Lighting Glow Spotlights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-b from-emerald-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Design Specs Drawer Overlay if enabled */}
        {showSpecs && (
          <aside className="absolute top-4 right-4 z-40 w-72 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 border border-slate-700 shadow-2xl text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-extrabold uppercase tracking-wider text-slate-400">Design System Specs</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Dribbble Ready</span>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Color Palette:</div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#FAFAFA] border border-slate-400"></span> Canvas White
                  </span>
                  <span>#FAFAFA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#16A34A]"></span> Vibrant Soft Green
                  </span>
                  <span>#16A34A</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#2563EB]"></span> Safe-Blue
                  </span>
                  <span>#2563EB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#DC2626]"></span> Alert-Red
                  </span>
                  <span>#DC2626</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Accessibility & Type:</div>
              <ul className="text-[11px] text-slate-300 space-y-1">
                <li>• Font: Plus Jakarta Sans + Noto Gujarati</li>
                <li>• Contrast: WCAG 2.1 AAA Compliant</li>
                <li>• Inclusive trilingual visual layout</li>
                <li>• Touch targets ≥ 44px for elderly users</li>
              </ul>
            </div>
          </aside>
        )}

        {/* Ultra-realistic Smartphone Bezel or Frameless Screen */}
        <div className="relative flex justify-center items-center">
          {bezelMode === 'realistic' ? (
            /* Detailed Smartphone Bezel Frame */
            <div
              className={`relative p-[10px] rounded-[52px] border-4 ${bezelFrames[deviceColor].outer} transition-all duration-300`}
            >
              {/* Hardware buttons on phone edges */}
              {/* Silent Switch */}
              <div className={`absolute -left-[14px] top-28 w-[4px] h-7 rounded-l-md ${bezelFrames[deviceColor].button}`}></div>
              {/* Volume Up */}
              <div className={`absolute -left-[14px] top-40 w-[4px] h-12 rounded-l-md ${bezelFrames[deviceColor].button}`}></div>
              {/* Volume Down */}
              <div className={`absolute -left-[14px] top-56 w-[4px] h-12 rounded-l-md ${bezelFrames[deviceColor].button}`}></div>
              {/* Power Button */}
              <div className={`absolute -right-[14px] top-36 w-[4px] h-18 rounded-r-md ${bezelFrames[deviceColor].button}`}></div>

              {/* Metallic edge bezel reflection gradient */}
              <div className="p-[2.5px] rounded-[44px] bg-gradient-to-b from-white/35 via-black/50 to-white/10 shadow-inner">
                {/* Screen display container */}
                <div className="w-[380px] sm:w-[400px] h-[830px] rounded-[40px] bg-[#FAFAFA] overflow-hidden relative shadow-2xl flex flex-col border border-black/40">
                  {/* Top Speaker Slit */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-1 bg-black/60 rounded-full z-40 pointer-events-none"></div>

                  {/* Inner Phone Content (MEDIX) */}
                  <div className="flex-1 w-full h-full overflow-y-auto no-scrollbar relative flex flex-col bg-[#FAFAFA]">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Direct Screen View without bezel frame */
            <div className="w-full max-w-md min-h-[820px] rounded-3xl bg-[#FAFAFA] shadow-2xl overflow-hidden border border-slate-200 relative flex flex-col">
              {children}
            </div>
          )}
        </div>
      </main>

      {/* Dribbble Presentation Footer with Design Tags */}
      <footer className="w-full px-4 sm:px-8 py-3 border-t border-white/10 bg-black/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs opacity-75">
        <div className="flex items-center space-x-2">
          <span className="font-bold">MEDIX</span>
          <span>• Mobile UI/UX & Web Healthcare Platform</span>
          <span className="hidden sm:inline opacity-50">| Designed for Production & Clinical Verification</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-mono">Mobile Screen Mockup</span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">Studio Lighting</span>
        </div>
      </footer>
    </div>
  );
};
