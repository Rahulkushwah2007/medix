import React, { useState } from 'react';
import { Camera, X, CheckCircle2, AlertTriangle, RefreshCw, Zap, Volume2 } from 'lucide-react';
import { Language } from '../types';

interface MedicineScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const MedicineScannerModal: React.FC<MedicineScannerModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [scanState, setScanState] = useState<'scanning' | 'scanned_safe' | 'scanned_expired'>('scanning');

  if (!isOpen) return null;

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (currentLang === 'GU') utterance.lang = 'gu-IN';
      else if (currentLang === 'HI') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-3xl w-full max-w-sm overflow-hidden border border-slate-700 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-black tracking-wider uppercase">
              {currentLang === 'GU' ? 'દવા સ્કેનર' : currentLang === 'HI' ? 'दवा स्कैनर' : 'Medicine AI Scanner'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-700/80 hover:bg-slate-600 flex items-center justify-center text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden p-4">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          {/* Scanner laser beam */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-bounce"></div>

          {/* Alignment corner brackets */}
          <div className="relative w-52 h-44 border-2 border-emerald-400/80 rounded-2xl flex flex-col items-center justify-center p-3 bg-slate-900/50 backdrop-blur-2xs">
            <div className="absolute top-1 left-2 text-[9px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
              OCR STRIP TARGET
            </div>

            {/* Medicine Strip Simulated Mockup */}
            <div className="w-40 bg-gradient-to-br from-slate-200 to-slate-300 text-slate-800 rounded-lg p-2.5 shadow-md border border-slate-400 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-blue-900">PARACETAMOL 500mg</span>
                <span className="text-[8px] bg-emerald-700 text-white px-1 rounded">IP</span>
              </div>
              <div className="text-[8px] text-slate-600 font-mono mt-1">
                Mfg: 11/2023 • Exp: 10/2026
              </div>
              <div className="text-[8px] text-slate-500 font-mono">
                Batch No: B#PC-8842
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="text-[10px] bg-slate-800/90 text-emerald-300 font-bold px-3 py-1 rounded-full border border-slate-700">
              {currentLang === 'GU' ? 'કેમેરા દવાના પત્તા સામે રાખો' : 'Align medicine strip within frame'}
            </span>
          </div>
        </div>

        {/* Action / Test selector buttons */}
        <div className="p-4 bg-slate-900 space-y-3">
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setScanState('scanned_safe');
                handleSpeak('Paracetamol verified. Valid till 2026. Safe for consumption.');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-extrabold border transition-all ${
                scanState === 'scanned_safe'
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              Test Valid Med
            </button>
            <button
              type="button"
              onClick={() => {
                setScanState('scanned_expired');
                handleSpeak('Warning! Amoxicillin expired in August 2024. Do not take this medicine.');
              }}
              className={`flex-1 py-2 px-3 rounded-xl font-extrabold border transition-all ${
                scanState === 'scanned_expired'
                  ? 'bg-red-600 border-red-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              Test Expired Med
            </button>
          </div>

          {/* Results Display */}
          {scanState === 'scanned_safe' && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200">
              <div className="flex items-center space-x-2 text-sm font-black text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Paracetamol 500mg • Safe to Use</span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-1">
                Expiry: November 2026 • Verified GMC & CDSCO Standard.
              </p>
            </div>
          )}

          {scanState === 'scanned_expired' && (
            <div className="p-3 rounded-xl bg-red-950/90 border border-red-600 text-red-200">
              <div className="flex items-center space-x-2 text-sm font-black text-red-400">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Expired / સમય પૂરો થયો છે!</span>
              </div>
              <p className="text-xs text-red-200 mt-1 font-bold">
                ⚠️ Amoxicillin 250mg expired in August 2024. Safe disposal recommended.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors"
          >
            Close Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
