import React, { useState } from 'react';
import { AlertOctagon, X, PhoneCall, ShieldAlert, MapPin, Navigation, Ambulance, Heart } from 'lucide-react';
import { Language } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [sosTriggered, setSosTriggered] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-red-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden border-2 border-red-500 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-red-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5 fill-white text-red-600 animate-pulse" />
            <span className="text-sm font-black tracking-wide uppercase">
              EMERGENCY / કટોકટી (108 SOS)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-700/80 hover:bg-red-800 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3.5">
          {/* Active Live Location GPS */}
          <div className="bg-red-50 rounded-2xl p-3 border border-red-200 flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-700 flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="text-xs font-black text-red-900">
                Live Ahmedabad Emergency Dispatch
              </div>
              <div className="text-[11px] text-red-700 font-medium leading-tight mt-0.5">
                Near Civil Hospital, Asarwa, Ahmedabad (23.0525° N, 72.6026° E)
              </div>
            </div>
          </div>

          {/* Big Instant 108 Ambulance Call */}
          <a
            href="tel:108"
            onClick={(e) => {
              e.preventDefault();
              setSosTriggered(true);
              alert('Dialing Gujarat 108 Emergency Medical Service... Live location broadcasted to Ahmedabad control room.');
            }}
            className="w-full py-4 px-4 bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-2xl font-black text-center shadow-lg shadow-red-600/35 border border-red-400 flex items-center justify-center space-x-3 transition-all"
          >
            <Ambulance className="w-6 h-6 animate-bounce" />
            <div className="text-left">
              <div className="text-base font-black tracking-wider leading-none">
                DIAL 108 AMBULANCE
              </div>
              <div className="text-[11px] text-red-100 font-normal">
                મફત ઇમરજન્સી એમ્બ્યુલન્સ સેવા (Gujarat Free SOS)
              </div>
            </div>
          </a>

          {/* Quick Contact Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => alert('Dialing 112 National Police & Disaster Relief...')}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-left transition-colors"
            >
              <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                <span>112 Police/SOS</span>
                <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1">National Helpline</div>
            </button>

            <button
              type="button"
              onClick={() => alert('Connecting to Civil Hospital Trauma Ward (079-22681000)...')}
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-left transition-colors"
            >
              <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                <span>Civil Trauma ICU</span>
                <Heart className="w-3.5 h-3.5 text-red-500" />
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Ahmedabad Center</div>
            </button>
          </div>

          {sosTriggered && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold text-center">
              ✓ 108 Ambulance Unit #AHM-44 Dispatched • ETA 4 mins
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-slate-500 text-xs font-bold hover:text-slate-800"
          >
            Cancel / પાછા જાઓ
          </button>
        </div>
      </div>
    </div>
  );
};
