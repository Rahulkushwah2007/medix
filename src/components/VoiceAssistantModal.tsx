import React, { useState } from 'react';
import { Mic, X, Volume2, Sparkles, AudioWaveform as Waveform } from 'lucide-react';
import { Language } from '../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [activeQuery, setActiveQuery] = useState<string>('');
  const [assistantReply, setAssistantReply] = useState<string>('');

  if (!isOpen) return null;

  const sampleQueries = {
    EN: [
      'Tell me about Paracetamol expiry and dosage',
      'Find nearest doctor near Civil Hospital Ahmedabad',
      'What to do with expired Amoxicillin?',
      'Read my latest digitized lab summary',
    ],
    GU: [
      'પેરાસિટામોલની મુદત અને લેવાની રીત જણાવો',
      'સિવિલ હોસ્પિટલ પાસે ડોક્ટર શોધો',
      'એમોક્સિસિલિન એક્સપાયર થઈ ગઈ છે, શું કરવું?',
      'મારા લેબ રિપોર્ટનો સારાંશ વાંચો',
    ],
    HI: [
      'पैरासिटामोल की एक्सपायरी और खुराक बताएं',
      'सिविल अस्पताल के पास डॉक्टर खोजें',
      'एक्सपायर एमोक्सिसिलिन का सुरक्षित निस्तारण कैसे करें?',
      'मेरी हालिया लैब रिपोर्ट का सारांश सुनाएं',
    ],
  };

  const handleQuery = (q: string) => {
    setActiveQuery(q);
    let reply = '';
    if (q.includes('Paracetamol') || q.includes('પેરાસિટામોલ') || q.includes('पैरासिटामोल')) {
      reply =
        currentLang === 'GU'
          ? 'પેરાસિટામોલ 500mg ની મુદત 2026 સુધી માન્ય છે. તાવ કે દુખાવા માટે ભોજન પછી એક ગોળી લઈ શકાય છે.'
          : currentLang === 'HI'
          ? 'पैरासिटामोल 500mg 2026 तक सुरक्षित है। हल्के बुखार या दर्द के लिए भोजन के बाद ले सकते हैं।'
          : 'Paracetamol 500mg expires in 2026. Verified safe for mild fever and headache after food.';
    } else if (q.includes('Amoxicillin') || q.includes('એમોક્સિસિલિન') || q.includes('एमोक्सिसिलिन')) {
      reply =
        currentLang === 'GU'
          ? 'ચેતવણી! એમોક્સિસિલિન ઓગસ્ટ 2024 માં એક્સપાયર થઈ ચૂકી છે. કૃપા કરીને આ દવા ન લેશો.'
          : currentLang === 'HI'
          ? 'सावधान! एमोक्सिसिलिन अगस्त 2024 में समाप्त हो चुकी है। इसका सेवन बिल्कुल न करें।'
          : 'Critical Alert! Amoxicillin expired in August 2024. Please safely dispose of this batch.';
    } else {
      reply =
        currentLang === 'GU'
          ? 'ડો. એ. શર્મા સિવિલ હોસ્પિટલ પાસે 0.8 કિમી દૂર ઉપલબ્ધ છે. રેટિંગ 5.0 સ્ટાર છે.'
          : currentLang === 'HI'
          ? 'डॉ. ए. शर्मा सिविल अस्पताल के पास 0.8 किमी की दूरी पर 5.0 स्टार रेटिंग के साथ उपलब्ध हैं।'
          : 'Dr. A. Sharma is available near Civil Hospital Ahmedabad, 0.8 km away with 5.0 stars.';
    }

    setAssistantReply(reply);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(reply);
      if (currentLang === 'GU') utterance.lang = 'gu-IN';
      else if (currentLang === 'HI') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden border border-slate-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 bg-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-white animate-pulse" />
            <span className="text-xs font-black tracking-wider uppercase">
              {currentLang === 'GU' ? 'વોઇસ સહાયક (ગુજરાતી / હિન્દી / EN)' : 'AI Voice Assistant'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-blue-700/80 hover:bg-blue-800 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="p-6 bg-gradient-to-b from-blue-50/70 to-white flex flex-col items-center justify-center text-center">
          <div className="relative w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 mb-3">
            <span className="absolute -inset-2 rounded-full border-2 border-blue-400/50 animate-ping opacity-60"></span>
            <span className="absolute -inset-4 rounded-full border border-blue-300/40 animate-pulse"></span>
            <Mic className="w-9 h-9" />
          </div>

          <div className="flex items-center space-x-1 mb-2">
            {[40, 70, 95, 60, 85, 50, 90, 65, 45].map((h, idx) => (
              <span
                key={idx}
                className="w-1 bg-blue-600 rounded-full animate-pulse"
                style={{
                  height: `${h * 0.28}px`,
                  animationDelay: `${idx * 80}ms`,
                }}
              ></span>
            ))}
          </div>

          <p className="text-xs font-extrabold text-slate-800">
            {currentLang === 'GU'
              ? 'સાંભળી રહ્યા છીએ... બોલો અથવા નીચે પ્રશ્ન પસંદ કરો'
              : currentLang === 'HI'
              ? 'सुन रहे हैं... बोलें या नीचे से प्रश्न चुनें'
              : 'Listening... Speak in Gujarati, Hindi or English'}
          </p>
        </div>

        {/* Interactive Query Suggestions */}
        <div className="p-4 pt-1 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Sample Voice Prompts:
          </div>
          <div className="space-y-1.5">
            {sampleQueries[currentLang].map((query, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleQuery(query)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-800 text-xs text-slate-700 font-semibold border border-slate-200/90 transition-all flex items-center justify-between"
              >
                <span className="truncate pr-2">{query}</span>
                <Sparkles className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* AI Response Output */}
          {assistantReply && (
            <div className="mt-3 p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950">
              <div className="flex items-center space-x-1.5 font-black text-blue-700 mb-1">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>MEDIX AI Response:</span>
              </div>
              <p className="font-medium leading-relaxed">{assistantReply}</p>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 py-2 text-slate-500 text-xs font-bold hover:text-slate-800"
          >
            Close / બંધ કરો
          </button>
        </div>
      </div>
    </div>
  );
};
