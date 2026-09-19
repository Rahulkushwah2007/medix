import React from 'react';
import { Shield, Wifi, Battery, Signal, Mic } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface PhoneHeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenVoiceAssistant: () => void;
  isVoiceActive?: boolean;
}

export const PhoneHeader: React.FC<PhoneHeaderProps> = ({
  currentLang,
  onSelectLang,
  onOpenVoiceAssistant,
  isVoiceActive = true,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-30 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      {/* Smartphone Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-slate-800 text-xs font-semibold select-none">
        <span className="tracking-tight text-[13px] font-bold">9:41</span>
        
        {/* Dynamic Island Notch Area */}
        <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center space-x-1.5 px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center">
            <Battery className="w-4 h-4 fill-slate-800 text-slate-800" />
          </div>
        </div>
      </div>

      {/* Clean Top Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2">
        {/* MEDIX Logo & Brand Name */}
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-[13px] overflow-hidden shadow-sm shadow-teal-700/20 border border-teal-300/80 bg-gradient-to-b from-teal-50 to-emerald-50 flex-shrink-0 group ring-1 ring-teal-500/10 transition-all duration-300 hover:shadow-md hover:shadow-teal-500/30">
            <img
              id="medix-brand-logo"
              src="/medix-logo.jpg"
              alt="MEDIX - Stethoscope M Cross Medical Icon"
              className="w-full h-full object-cover rounded-[12px] transition-transform duration-300 group-hover:scale-105 select-none"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            {/* SVG Fallback reproducing the exact stethoscope M and mint cross if image fails */}
            <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-b from-[#f0fdfa] to-[#ccfbf1] p-1">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* M-shaped Stethoscope Tubing */}
                <path
                  d="M16 18 V28 C16 38 24 44 32 36 C40 44 48 38 48 28 V18"
                  stroke="#0d9488"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Left Earpieces */}
                <circle cx="16" cy="18" r="3.5" fill="#f8fafc" stroke="#0d9488" strokeWidth="2" />
                {/* Right Diaphragm / Chestpiece */}
                <circle cx="48" cy="18" r="5" fill="#0d9488" stroke="#f8fafc" strokeWidth="2" />
                <circle cx="48" cy="18" r="2" fill="#5eead4" />
                {/* Center Mint Cross */}
                <path
                  d="M32 38 V48 M27 43 H37"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-[16px] font-black tracking-tight text-slate-900 leading-tight truncate flex items-center gap-1.5">
              <span>{t.appTitle}</span>
              <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 tracking-wider">
                CARE
              </span>
            </h1>
            <p className="text-[10px] font-semibold text-emerald-700 tracking-wide flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              {currentLang === 'GU' ? 'સ્માર્ટ ડિજિટલ હેલ્થકેર' : currentLang === 'HI' ? 'स्मार्ट डिजिटल हेल्थकेयर' : 'Smart Digital Healthcare'}
            </p>
          </div>
        </div>

        {/* Right Section: Language Toggles & Active Voice Assistant */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Small text toggles for EN | ગુજરાતી | हिंदी */}
          <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => onSelectLang('EN')}
              className={`px-2 py-1 text-[11px] font-bold rounded-full transition-all ${
                currentLang === 'EN'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English"
            >
              EN
            </button>
            <span className="text-slate-300 text-[10px]">|</span>
            <button
              type="button"
              onClick={() => onSelectLang('GU')}
              className={`px-2 py-1 text-[11px] font-bold rounded-full transition-all ${
                currentLang === 'GU'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="ગુજરાતી"
            >
              ગુજરાતી
            </button>
            <span className="text-slate-300 text-[10px]">|</span>
            <button
              type="button"
              onClick={() => onSelectLang('HI')}
              className={`px-2 py-1 text-[11px] font-bold rounded-full transition-all ${
                currentLang === 'HI'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="हिंदी"
            >
              हिंदी
            </button>
          </div>

          {/* Prominent Blue Microphone Icon with Audio Waves indicating Active Voice Assistant */}
          <button
            type="button"
            onClick={onOpenVoiceAssistant}
            aria-label="Active voice assistant"
            className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/30 hover:bg-blue-700 active:scale-95 transition-all"
            title="Voice Assistant / અવાજ સહાયક"
          >
            {/* Pulsing Audio Waves Ring Animation */}
            {isVoiceActive && (
              <>
                <span className="absolute -inset-1 rounded-full border-2 border-blue-400/50 animate-ping opacity-75 pointer-events-none"></span>
                <span className="absolute -inset-2 rounded-full border border-blue-400/30 animate-pulse pointer-events-none"></span>
              </>
            )}

            {/* Mic Icon */}
            <Mic className="w-5 h-5 relative z-10" />

            {/* Animated Audio Wave bars indicator badge */}
            <div className="absolute -bottom-1 -right-1 bg-white border border-blue-200 rounded-full px-1 py-0.5 shadow-xs flex items-center space-x-0.5">
              <span className="w-0.5 h-2 bg-blue-600 rounded-full animate-bounce"></span>
              <span className="w-0.5 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-0.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
