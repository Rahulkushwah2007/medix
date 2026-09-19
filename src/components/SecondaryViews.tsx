import React from 'react';
import { NavTab, Language } from '../types';
import { MEDICINES_DATA, PRIMARY_DOCTOR, RECORDS_DATA } from '../data';
import {
  Pill,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  User,
  Heart,
  Calendar,
  Sparkles,
  Phone,
  FileText
} from 'lucide-react';

interface SecondaryViewsProps {
  currentTab: NavTab;
  currentLang: Language;
  onOpenScanner: () => void;
  onOpenRecords: () => void;
}

export const SecondaryViews: React.FC<SecondaryViewsProps> = ({
  currentTab,
  currentLang,
  onOpenScanner,
  onOpenRecords,
}) => {
  if (currentTab === 'MEDS') {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-base font-black text-slate-900">
              {currentLang === 'GU' ? 'ચાલુ દવાઓ અને શેડ્યૂલ' : currentLang === 'HI' ? 'सक्रिय दवाएं एवं समय' : 'Medicine Schedule & Expiry'}
            </h2>
            <p className="text-xs text-slate-500">Daily dosage tracker and expiry alerts</p>
          </div>
          <button
            type="button"
            onClick={onOpenScanner}
            className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-xl shadow-xs hover:bg-emerald-500"
          >
            + Scan Med
          </button>
        </div>

        {/* List of Medicines */}
        <div className="space-y-3">
          {MEDICINES_DATA.map((med) => (
            <div
              key={med.id}
              className={`p-3.5 rounded-2xl border ${
                med.status === 'expired'
                  ? 'bg-red-50/90 border-red-300'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-extrabold text-slate-900">{med.name}</h3>
                    {med.status === 'expired' ? (
                      <span className="text-[10px] font-black bg-red-100 text-red-700 px-2 py-0.5 rounded border border-red-300">
                        Expired / સમય પૂરો થયો છે!
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        Expires: 2026
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{med.dosage}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Batch: {med.batch}</p>
                </div>

                {med.status === 'expired' ? (
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'DOCTORS') {
    return (
      <div className="p-4 space-y-4">
        <div className="pb-2 border-b border-slate-200">
          <h2 className="text-base font-black text-slate-900">
            {currentLang === 'GU' ? 'ચકાસાયેલ ડોક્ટર્સ - અમદાવાદ' : currentLang === 'HI' ? 'सत्यापित डॉक्टर्स - अहमदाबाद' : 'Verified Doctors in Ahmedabad'}
          </h2>
          <p className="text-xs text-slate-500">GMC & Ayushman Bharat Verified Practitioners</p>
        </div>

        {/* Primary Doctor */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-start space-x-3">
            <img
              src={PRIMARY_DOCTOR.photoUrl}
              alt="Doctor"
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm font-extrabold text-slate-900">{PRIMARY_DOCTOR.name}</h3>
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  ✓
                </div>
              </div>
              <p className="text-xs text-slate-600">{PRIMARY_DOCTOR.qualification}</p>
              <p className="text-[11px] text-slate-500">{PRIMARY_DOCTOR.hospital}</p>
              <div className="flex items-center space-x-1 text-amber-400 mt-1">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="text-xs font-bold text-slate-900">5.0 (382 reviews)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-700 italic border border-slate-200">
            "{PRIMARY_DOCTOR.reviewSnippet[currentLang] || PRIMARY_DOCTOR.reviewSnippet.EN}"
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => alert('Appointment slot reserved for Dr. A. Sharma at Civil Hospital OPD.')}
              className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-500"
            >
              Book OPD Slot
            </button>
            <a
              href="tel:07922681000"
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center border border-slate-200"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (currentTab === 'RECORDS') {
    return (
      <div className="p-4 space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900">
              {currentLang === 'GU' ? 'હેલ્થ લોકર રેકોર્ડ્સ' : currentLang === 'HI' ? 'हेल्थ लॉकर रिकॉर्ड्स' : 'Health Locker Vault'}
            </h2>
            <p className="text-xs text-slate-500">Synced with Ayushman Bharat Health Account (ABHA)</p>
          </div>
          <button
            type="button"
            onClick={onOpenRecords}
            className="text-xs font-bold bg-emerald-600 text-white px-3 py-1.5 rounded-xl shadow-xs"
          >
            VIEW MY RECORDS
          </button>
        </div>

        <div className="space-y-3">
          {RECORDS_DATA.map((rec) => (
            <div
              key={rec.id}
              onClick={onOpenRecords}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs cursor-pointer hover:border-emerald-300"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">{rec.title}</span>
                <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  DIGITIZED SUMMARY (Gemini)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">{rec.hospital} • {rec.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentTab === 'ME') {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg border border-emerald-300">
            PV
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Pravinbhai V. Patel</h3>
            <p className="text-xs text-slate-500">ABHA: 91-4820-2910-1849</p>
            <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Verified Gujarat Ayushman Citizen
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5 text-xs">
          <div className="font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
            Emergency Medical Card
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Blood Group</span>
            <span className="font-bold text-red-600">O Positive (O+)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Known Allergies</span>
            <span className="font-bold text-slate-800">Sulfa Drugs (No Penicillin issues)</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Emergency Contact</span>
            <span className="font-bold text-slate-800">+91 98250 XXXXX (Son - Ketan)</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
