import React from 'react';
import { Vault, FileText, Sparkles, ExternalLink, Activity, Calendar, ShieldCheck } from 'lucide-react';
import { Language, MedicalRecord } from '../types';
import { RECORDS_DATA, TRANSLATIONS } from '../data';

interface HealthLockerSectionProps {
  currentLang: Language;
  onOpenRecords: () => void;
  onSelectRecord?: (record: MedicalRecord) => void;
}

export const HealthLockerSection: React.FC<HealthLockerSectionProps> = ({
  currentLang,
  onOpenRecords,
  onSelectRecord,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="px-4 py-3" id="health-locker-section">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {/* Secure Vault Icon */}
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Vault className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {t.healthLocker}
          </h2>
        </div>

        {/* ABDM Secure Lock Badge */}
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          ABHA Linked
        </span>
      </div>

      {/* Main Vault Action Card with Green Button reading "VIEW MY RECORDS" */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs mb-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            {/* Secure Vault Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 border border-emerald-200/90 flex items-center justify-center text-emerald-700 shadow-2xs flex-shrink-0">
              <Vault className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                Encrypted Health Vault
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {t.recordsSubtitle}
              </div>
            </div>
          </div>

          {/* Secure vault icon with a green button reading "VIEW MY RECORDS" */}
          <button
            type="button"
            id="btn-view-my-records"
            onClick={onOpenRecords}
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-600/30 transition-all flex items-center space-x-1.5 flex-shrink-0"
          >
            <span>VIEW MY RECORDS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Small visual thumbnails of digitized medical reports and prescriptions sitting inside white card containers */}
      {/* with the label "DIGITIZED SUMMARY (Gemini)" */}
      <div className="space-y-3">
        {RECORDS_DATA.map((record) => {
          const summaryPoints = record.geminiSummary[currentLang] || record.geminiSummary.EN;

          return (
            <div
              key={record.id}
              onClick={() => onSelectRecord ? onSelectRecord(record) : onOpenRecords()}
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              {/* Header inside white container: Document Info + Label "DIGITIZED SUMMARY (Gemini)" */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {currentLang === 'GU' ? record.gujaratiTitle : currentLang === 'HI' ? record.hindiTitle : record.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-2.5 h-2.5" />
                      {record.date} • {record.hospital}
                    </span>
                  </div>
                </div>

                {/* EXACT REQUIRED LABEL: "DIGITIZED SUMMARY (Gemini)" */}
                <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/70 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex-shrink-0 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />
                  <span>DIGITIZED SUMMARY (Gemini)</span>
                </div>
              </div>

              {/* Visual Thumbnail & AI summary layout */}
              <div className="flex items-start space-x-3">
                {/* Visual Thumbnail of Document */}
                <div className="w-16 h-18 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex flex-col justify-between flex-shrink-0 shadow-inner group-hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between text-[8px] text-slate-400 font-bold border-b border-slate-200/80 pb-0.5">
                    <span>Rx</span>
                    <span className="text-emerald-600 font-black">✓ OK</span>
                  </div>

                  {/* Micro simulated text lines / diagram */}
                  <div className="space-y-1 my-1">
                    <div className="h-1 bg-slate-300 rounded-full w-full"></div>
                    <div className="h-1 bg-slate-200 rounded-full w-4/5"></div>
                    <div className="h-1 bg-emerald-200 rounded-full w-2/3"></div>
                  </div>

                  <div className="flex items-center justify-center bg-blue-100/80 text-blue-700 text-[8px] font-bold rounded py-0.5">
                    <Activity className="w-2.5 h-2.5 mr-0.5" />
                    Report
                  </div>
                </div>

                {/* Gemini Extracted Bullet Summaries */}
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Key Findings:</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      Doctor Verified
                    </span>
                  </div>

                  <ul className="space-y-1 text-[11px] text-slate-600 leading-snug">
                    <li className="flex items-start space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                      <span className="truncate">{summaryPoints[0]}</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0"></span>
                      <span className="truncate">{summaryPoints[1]}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
