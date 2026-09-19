import React from 'react';
import { Camera, CheckCircle2, AlertTriangle, Pill, Volume2, Sparkles, Plus, Clock } from 'lucide-react';
import { Language, MedicineItem } from '../types';
import { MEDICINES_DATA, TRANSLATIONS } from '../data';

interface MedicineHubSectionProps {
  currentLang: Language;
  onOpenScanner: () => void;
  onSelectMedicine?: (med: MedicineItem) => void;
}

export const MedicineHubSection: React.FC<MedicineHubSectionProps> = ({
  currentLang,
  onOpenScanner,
  onSelectMedicine,
}) => {
  const t = TRANSLATIONS[currentLang];
  const paracetamol = MEDICINES_DATA.find((m) => m.name === 'Paracetamol') || MEDICINES_DATA[0];
  const amoxicillin = MEDICINES_DATA.find((m) => m.name === 'Amoxicillin') || MEDICINES_DATA[1];

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (currentLang === 'HI') {
        utterance.lang = 'hi-IN';
      } else if (currentLang === 'GU') {
        utterance.lang = 'gu-IN';
      } else {
        utterance.lang = 'en-IN';
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="px-4 py-4" id="medicine-hub-section">
      {/* Section Subheading & Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Pill className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {t.medicineHub}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
          <Clock className="w-3 h-3" />
          2 Active Items
        </span>
      </div>

      {/* Large, Prominent Vibrant Soft Green Button with Camera Icon */}
      {/* Exact required text: "SCAN MEDICINE / દવા સ્કેન કરો" */}
      <button
        type="button"
        id="btn-scan-medicine"
        onClick={onOpenScanner}
        className="w-full relative overflow-hidden group bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white py-3.5 px-5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all duration-200 flex items-center justify-between"
      >
        {/* Soft radial shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/15 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>

        <div className="flex items-center space-x-3.5 text-left">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/30 shadow-xs flex-shrink-0">
            <Camera className="w-6 h-6 text-white stroke-[2.2]" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight leading-snug">
              SCAN MEDICINE / દવા સ્કેન કરો
            </div>
            <div className="text-[11px] text-emerald-100 font-medium">
              Instant Expiry & Dosage AI Check • દવાની સુરક્ષા તપાસો
            </div>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/90">
          <Sparkles className="w-4 h-4" />
        </div>
      </button>

      {/* Active Inventory List on White Cards */}
      <div className="mt-4 space-y-3">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>{t.inventoryTitle}</span>
          <span className="text-slate-400">ABDM Synced</span>
        </div>

        {/* Paracetamol with a green checkmark and text "Expires: 2026" */}
        <div
          id="card-paracetamol"
          onClick={() => onSelectMedicine?.(paracetamol)}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              {/* Green checkmark icon */}
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Paracetamol
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    ({currentLang === 'GU' ? paracetamol.gujaratiName : currentLang === 'HI' ? paracetamol.hindiName : 'Tablet'})
                  </span>
                </div>

                {/* Text "Expires: 2026" with verified safe indicator */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Expires: 2026
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Batch: {paracetamol.batch}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1.5 font-normal leading-relaxed">
                  {paracetamol.dosage}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => handleSpeak('Paracetamol expires in 2026. Safe for fever and mild body ache.', e)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors flex-shrink-0"
              title="Voice readout"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Red Alert Box for "Amoxicillin" with a warning icon reading "Expired / સમય પૂરો થયો છે!" */}
        <div
          id="card-amoxicillin-alert"
          onClick={() => onSelectMedicine?.(amoxicillin)}
          className="bg-red-50/90 rounded-2xl p-4 border-2 border-red-300/90 shadow-xs hover:border-red-400 transition-all cursor-pointer relative overflow-hidden"
        >
          {/* Subtle red warning strip */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-red-600"></div>

          <div className="flex items-start justify-between gap-3 pl-1">
            <div className="flex items-start space-x-3">
              {/* Warning icon */}
              <div className="w-9 h-9 rounded-xl bg-red-100 border border-red-300 flex items-center justify-center text-red-600 flex-shrink-0 mt-0.5 animate-pulse">
                <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-extrabold text-red-950 tracking-tight">
                    Amoxicillin
                  </h3>
                  <span className="text-xs text-red-700 font-medium">
                    ({currentLang === 'GU' ? amoxicillin.gujaratiName : currentLang === 'HI' ? amoxicillin.hindiName : 'Antibiotic 250mg'})
                  </span>
                </div>

                {/* Warning icon reading "Expired / સમય પૂરો થયો છે!" */}
                <div className="mt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-red-700 bg-red-100/90 px-2.5 py-1 rounded-md border border-red-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Expired / સમય પૂરો થયો છે!
                  </span>
                </div>

                <p className="text-xs font-semibold text-red-900 mt-2 leading-relaxed">
                  ⚠️ {t.safeDisposalAlert}
                </p>

                <div className="mt-2.5 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Locating nearest green medical disposal bin in Ahmedabad Civil Hospital & AMC centers...');
                    }}
                    className="text-[11px] font-bold bg-white text-red-700 border border-red-300 px-2.5 py-1 rounded-lg hover:bg-red-50 active:scale-95 transition-all shadow-2xs"
                  >
                    Find Disposal Bin / નિકાલ કેન્દ્ર
                  </button>
                  <span className="text-[10px] text-red-600/80">Batch: B#AMX-1092</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => handleSpeak('Warning! Amoxicillin has expired. Do not consume. Dispose safely.', e)}
              className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center text-red-700 transition-colors flex-shrink-0"
              title="Voice warning"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
