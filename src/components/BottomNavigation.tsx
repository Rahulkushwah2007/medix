import React from 'react';
import {
  Home,
  Pill,
  UserCheck,
  FolderHeart,
  User,
  AlertOctagon,
  PhoneCall,
} from 'lucide-react';
import { NavTab, Language } from '../types';
import { TRANSLATIONS } from '../data';

interface BottomNavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentLang: Language;
  onTriggerEmergency: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onSelectTab,
  currentLang,
  onTriggerEmergency,
}) => {
  const t = TRANSLATIONS[currentLang];

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'HOME', label: t.home, icon: Home },
    { id: 'MEDS', label: t.meds, icon: Pill },
    { id: 'DOCTORS', label: t.doctors, icon: UserCheck },
    { id: 'RECORDS', label: t.records, icon: FolderHeart },
    { id: 'ME', label: t.me, icon: User },
  ];

  return (
    <div className="sticky bottom-0 z-40 w-full select-none">
      {/* Floating Just Above Navigation Bar: Large, Highly Visible Red "EMERGENCY / કટોકટી" Button */}
      <div className="px-4 pb-2 pt-1 flex justify-center pointer-events-none">
        <button
          type="button"
          id="btn-emergency-sos"
          onClick={onTriggerEmergency}
          className="pointer-events-auto w-full max-w-sm relative group bg-red-600 hover:bg-red-500 active:scale-97 text-white font-black py-3 px-5 rounded-2xl shadow-xl shadow-red-600/35 border-2 border-white flex items-center justify-between transition-all duration-200"
        >
          {/* Pulsing Alert Waves */}
          <span className="absolute -inset-1 rounded-2xl bg-red-600/30 animate-pulse pointer-events-none"></span>

          <div className="flex items-center space-x-3 relative z-10">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center border border-white/30 text-white flex-shrink-0 animate-bounce">
              <AlertOctagon className="w-5 h-5 fill-white/20 stroke-[2.5]" />
            </div>

            <div className="text-left">
              {/* Exact required text: "EMERGENCY / કટોકટી" */}
              <div className="text-sm font-black tracking-wide leading-none uppercase">
                EMERGENCY / કટોકટી
              </div>
              <div className="text-[10px] text-red-100 font-bold mt-0.5 opacity-90">
                108 Ambulance • Hospital SOS • Live GPS
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white text-red-600 flex items-center justify-center font-black shadow-md flex-shrink-0 relative z-10">
            <PhoneCall className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Standard Bottom Navigation Bar on a White Background with Green Active Icons */}
      <nav
        aria-label="Bottom Navigation"
        className="bg-white border-t border-slate-200/90 px-3 pt-2 pb-5 shadow-lg flex items-center justify-around"
      >
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              id={`nav-${item.id.toLowerCase()}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
                isActive ? 'text-emerald-600 scale-105' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Green active indicator bubble */}
              {isActive && (
                <span className="absolute -top-2 w-7 h-1 rounded-full bg-emerald-600 shadow-xs shadow-emerald-500/50"></span>
              )}

              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-emerald-50 text-emerald-600 shadow-2xs' : 'text-slate-500'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.5] text-emerald-600' : 'stroke-[1.8]'}`} />
              </div>

              {/* Exact tab labels: "HOME", "MEDS", "DOCTORS", "RECORDS", and "ME" */}
              <span
                className={`text-[10px] font-extrabold tracking-wider mt-0.5 uppercase ${
                  isActive ? 'text-emerald-700' : 'text-slate-500'
                }`}
              >
                {item.id}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
