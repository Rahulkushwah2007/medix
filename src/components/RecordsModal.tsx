import React from 'react';
import { X, Sparkles, FileText, CheckCircle2, ShieldCheck, Download, Share2, Calendar } from 'lucide-react';
import { MedicalRecord, Language } from '../types';
import { RECORDS_DATA } from '../data';

interface RecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRecord: MedicalRecord | null;
  currentLang: Language;
}

export const RecordsModal: React.FC<RecordsModalProps> = ({
  isOpen,
  onClose,
  selectedRecord,
  currentLang,
}) => {
  if (!isOpen) return null;
  const record = selectedRecord || RECORDS_DATA[0];
  const summaryPoints = record.geminiSummary[currentLang] || record.geminiSummary.EN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden border border-slate-200 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-4 py-3.5 bg-emerald-600 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-200" />
            <span className="text-xs font-black tracking-wider uppercase">
              Health Locker • ABDM Vault
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-3.5">
          {/* Document Header */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/90">
            <div className="flex items-center space-x-2 text-blue-600 mb-1">
              <FileText className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{record.badge}</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
              {currentLang === 'GU' ? record.gujaratiTitle : currentLang === 'HI' ? record.hindiTitle : record.title}
            </h3>
            <div className="mt-1.5 text-xs text-slate-500 space-y-0.5 font-medium">
              <p>Issued by: <strong className="text-slate-700">{record.hospital}</strong></p>
              <p>Attending: <strong className="text-slate-700">{record.doctor}</strong></p>
              <p className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /> {record.date}</p>
            </div>
          </div>

          {/* EXACT REQUIRED LABEL: DIGITIZED SUMMARY (Gemini) */}
          <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 border border-blue-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-100">
              <div className="flex items-center space-x-1.5 text-blue-700 font-extrabold text-xs">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>DIGITIZED SUMMARY (Gemini)</span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                AI Verified
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-2.5">
              Automated high-precision clinical extraction formatted for immediate patient clarity:
            </p>

            <ul className="space-y-2">
              {summaryPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-800 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => alert('Encrypted ABDM PDF downloaded successfully to device.')}
              className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 hover:bg-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              type="button"
              onClick={() => alert('Secure 15-minute token generated to share with Dr. Sharma.')}
              className="flex-1 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 hover:bg-emerald-100 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Token</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
