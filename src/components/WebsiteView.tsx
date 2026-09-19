import React, { useState } from 'react';
import {
  Language,
  MedicalRecord,
  MedicineItem,
  DoctorProfile,
} from '../types';
import {
  MEDICINES_DATA,
  RECORDS_DATA,
  DOCTORS_LIST,
  TRANSLATIONS,
} from '../data';
import {
  Camera,
  FileText,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Mic,
  ShieldCheck,
  Search,
  Calendar,
  Clock,
  MapPin,
  Star,
  Sparkles,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Pill,
  Heart,
  Activity,
  ArrowUpRight,
  Globe,
  Bell,
  Check
} from 'lucide-react';

interface WebsiteViewProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenScanner: () => void;
  onOpenRecords: () => void;
  onSelectRecord: (record: MedicalRecord) => void;
  onOpenVoiceAssistant: () => void;
  onTriggerEmergency: () => void;
  onSwitchToMockup: () => void;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({
  currentLang,
  onSelectLang,
  onOpenScanner,
  onOpenRecords,
  onSelectRecord,
  onOpenVoiceAssistant,
  onTriggerEmergency,
  onSwitchToMockup,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [medFilter, setMedFilter] = useState<'ALL' | 'VALID' | 'EXPIRED'>('ALL');
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'MEDICINES' | 'RECORDS' | 'DOCTORS'>('DASHBOARD');
  const [appointmentBooked, setAppointmentBooked] = useState<string | null>(null);

  const filteredMeds = MEDICINES_DATA.filter((med) => {
    const matchesFilter =
      medFilter === 'ALL'
        ? true
        : medFilter === 'VALID'
        ? med.status === 'valid'
        : med.status === 'expired';
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.gujaratiName.includes(searchQuery) ||
      med.hindiName.includes(searchQuery) ||
      med.dosage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBookAppointment = (doctorName: string) => {
    setAppointmentBooked(doctorName);
    setTimeout(() => {
      setAppointmentBooked(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Notification Announcement Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2 px-4 sm:px-8 flex items-center justify-between border-b border-emerald-800">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-emerald-500 text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            ABDM Synced
          </span>
          <span className="truncate">
            {currentLang === 'GU'
              ? 'ગુજરાત સરકાર ૧૦૮ કટોકટી અને આયુષ્માન ભારત સાથે જોડાયેલ ડિજિટલ હેલ્થ પોર્ટલ'
              : currentLang === 'HI'
              ? 'गुजरात सरकार १०८ आपातकालीन एवं आयुष्मान भारत से संबद्ध एकीकृत डिजिटल हेल्थ पोर्टल'
              : 'Official ABDM & Gujarat 108 Emergency Synced Unified Healthcare Portal'}
          </span>
        </div>

        <div className="flex items-center space-x-4 flex-shrink-0 text-[11px]">
          <button
            type="button"
            onClick={onSwitchToMockup}
            className="flex items-center space-x-1.5 text-emerald-300 hover:text-white font-bold transition-colors bg-emerald-800/60 px-2.5 py-1 rounded-md"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Switch to Phone Mockup</span>
          </button>
        </div>
      </div>

      {/* Main Website Header Navigation */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* MEDIX Logo & Brand Name */}
          <div className="flex items-center space-x-3.5">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden shadow-md shadow-emerald-500/20 border border-emerald-500/30 bg-emerald-50 flex-shrink-0">
              <img
                src="/medix-logo.jpg"
                alt="MEDIX Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-black text-lg">
                M+
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  MEDIX
                </span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  HEALTHCARE
                </span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 tracking-wide flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {currentLang === 'GU'
                  ? 'સ્માર્ટ ડિજિટલ દવા અને આરોગ્ય પ્લેટફોર્મ'
                  : currentLang === 'HI'
                  ? 'स्मार्ट डिजिटल दवा एवं स्वास्थ्य सुरक्षा'
                  : 'Smart Digital Health & Medicine Verification'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              type="button"
              onClick={() => setActiveTab('DASHBOARD')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'DASHBOARD'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {currentLang === 'GU' ? 'ડેશબોર્ડ' : currentLang === 'HI' ? 'डैशबोर्ड' : 'Dashboard'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('MEDICINES')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'MEDICINES'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {currentLang === 'GU' ? 'દવા કેન્દ્ર (Meds)' : currentLang === 'HI' ? 'दवा केंद्र (Meds)' : 'Medicine Hub'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('RECORDS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'RECORDS'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {currentLang === 'GU' ? 'હેલ્થ રેકોર્ડ્સ (ABDM)' : currentLang === 'HI' ? 'हेल्थ रिकॉर्ड्स (ABDM)' : 'Health Locker'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('DOCTORS')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'DOCTORS'
                  ? 'bg-slate-100 text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {currentLang === 'GU' ? 'તબીબો (Doctors)' : currentLang === 'HI' ? 'चिकित्सक (Doctors)' : 'Verified Doctors'}
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3">
            {/* Trilingual Toggle (EN | ગુજરાતી | हिंदी) */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
              <button
                type="button"
                onClick={() => onSelectLang('EN')}
                className={`px-2.5 py-1 font-bold rounded-lg transition-all ${
                  currentLang === 'EN'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('GU')}
                className={`px-2.5 py-1 font-bold rounded-lg transition-all ${
                  currentLang === 'GU'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ગુજરાતી
              </button>
              <button
                type="button"
                onClick={() => onSelectLang('HI')}
                className={`px-2.5 py-1 font-bold rounded-lg transition-all ${
                  currentLang === 'HI'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Voice Assistant Microphone Button */}
            <button
              type="button"
              onClick={onOpenVoiceAssistant}
              className="flex items-center space-x-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-xs"
              title="Voice Health Assistant"
            >
              <Mic className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="hidden sm:inline">
                {currentLang === 'GU' ? 'અવાજ સહાયક' : currentLang === 'HI' ? 'वॉइस असिस्टेंट' : 'Voice AI'}
              </span>
            </button>

            {/* 108 Emergency Trigger */}
            <button
              type="button"
              onClick={onTriggerEmergency}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-md shadow-red-600/30 transition-all active:scale-95 animate-pulse"
            >
              <PhoneCall className="w-4 h-4" />
              <span>108 SOS</span>
            </button>

            {/* Phone Mockup Switcher */}
            <button
              type="button"
              onClick={onSwitchToMockup}
              className="hidden lg:flex items-center space-x-1.5 border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-bold px-3 py-2 rounded-xl text-xs transition-all shadow-xs hover:bg-slate-50"
              title="View as Mobile Smartphone App Mockup"
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Phone View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Appointment Toast Notification */}
      {appointmentBooked && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500 flex items-center space-x-3 animate-slide-in">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm">Appointment Requested Successfully!</div>
            <div className="text-xs text-emerald-200">
              Confirmation SMS & ABDM Token sent for {appointmentBooked}.
            </div>
          </div>
        </div>
      )}

      {/* Website Main Hero Banner with Quick Actions */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {currentLang === 'GU'
                    ? 'સત્તાવાર મેડિકલ આસિસ્ટન્ટ • અમદાવાદ'
                    : currentLang === 'HI'
                    ? 'आधिकारिक मेडिकल असिस्टेंट • अहमदाबाद'
                    : 'Verified Digital Health Assistant • Ahmedabad Region'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {currentLang === 'GU'
                  ? 'તમારી દવાઓ, રેકોર્ડ્સ અને આરોગ્ય સલામતી એક જ જગ્યાએ'
                  : currentLang === 'HI'
                  ? 'आपकी दवाएं, रिकॉर्ड्स और आपातकालीन सुरक्षा एक ही मंच पर'
                  : 'Smart Medicine Verification, Health Locker & Emergency Care'}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                {currentLang === 'GU'
                  ? 'મુદત પૂરી થયેલ દવાઓની ત્વરિત ચેતવણી મેળવો, આયુષ્માન ભારત રેકોર્ડ્સ સ્કેન કરો અને ગુજરાત ૧૦૮ સાથે સીધો સંપર્ક કરો.'
                  : currentLang === 'HI'
                  ? 'समाप्त हो चुकी दवाओं की त्वरित चेतावनी पाएं, आयुष्मान भारत रिकॉर्ड्स डिजिटल रूप में देखें और सीधे १०८ से जुड़ें।'
                  : 'Verify expiry dates on medicines instantly, access ABDM synced clinical records with Gemini AI summaries, and connect to certified doctors.'}
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenScanner}
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-3.5 rounded-2xl shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm">{t.scanMedicine}</span>
              </button>

              <button
                type="button"
                onClick={onOpenRecords}
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-white border-2 border-slate-300 hover:border-emerald-600 hover:text-emerald-700 text-slate-800 font-bold px-5 py-3.5 rounded-2xl shadow-xs transition-all"
              >
                <FileText className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">{t.viewRecords}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Active Medicines</span>
                <Pill className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">3 Monitored</div>
              <div className="text-[11px] font-semibold text-red-600 flex items-center gap-1 mt-1">
                <AlertTriangle className="w-3 h-3" />
                1 Expired Alert (Amoxicillin)
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>ABDM Locker</span>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">2 Reports Synced</div>
              <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" />
                Civil Hospital & Sharda Trust
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Nearest ER Hub</span>
                <MapPin className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">0.8 km</div>
              <div className="text-[11px] text-slate-600 mt-1">
                Civil Hospital Asarwa (6 min)
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>Emergency 108</span>
                <Activity className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-2xl font-black text-red-600 mt-1">Live Ready</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                GPS Tracking Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Website Content Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 Cols on Desktop) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Medicine Hub & Tracker */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {t.medicineHub}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {currentLang === 'GU'
                      ? 'દવાઓનું સલામત સેવન, સમાપ્તિ તારીખ અને ડોઝ ટ્રેકર'
                      : currentLang === 'HI'
                      ? 'दवाओं की सुरक्षा, समाप्ति तिथि एवं डोज ट्रैकर'
                      : 'Expiry verification, dosage tracker and safe disposal guidance'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenScanner}
                  className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>+ Scan Medicine Strip</span>
                </button>
              </div>

              {/* Medicine Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-5">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Paracetamol, Amoxicillin..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center space-x-1.5 w-full sm:w-auto bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setMedFilter('ALL')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      medFilter === 'ALL'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({MEDICINES_DATA.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setMedFilter('VALID')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      medFilter === 'VALID'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-700 hover:text-emerald-900'
                    }`}
                  >
                    Safe & Valid
                  </button>
                  <button
                    type="button"
                    onClick={() => setMedFilter('EXPIRED')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      medFilter === 'EXPIRED'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-red-700 hover:text-red-900'
                    }`}
                  >
                    Expired (1)
                  </button>
                </div>
              </div>

              {/* Medicine Cards List */}
              <div className="space-y-4">
                {filteredMeds.map((med) => {
                  const isExpired = med.status === 'expired';
                  return (
                    <div
                      key={med.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isExpired
                          ? 'bg-red-50/60 border-red-200 hover:border-red-300'
                          : 'bg-slate-50/70 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start space-x-3.5">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isExpired
                                ? 'bg-red-100 text-red-600'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            <Pill className="w-5 h-5" />
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-base font-extrabold text-slate-900">
                                {med.name}
                              </h3>
                              <span className="text-xs text-slate-500 font-medium">
                                ({currentLang === 'GU' ? med.gujaratiName : currentLang === 'HI' ? med.hindiName : med.dosage})
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mt-1">
                              <strong>Dosage:</strong> {med.dosage} •{' '}
                              <span className="font-mono text-[11px] text-slate-500">
                                {med.batch}
                              </span>
                            </p>

                            <p className="text-xs text-slate-500 mt-0.5">
                              {med.notes}
                            </p>
                          </div>
                        </div>

                        {/* Expiry Pill */}
                        <div className="sm:text-right flex-shrink-0">
                          {isExpired ? (
                            <div className="inline-flex items-center space-x-1.5 bg-red-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-xs">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>{med.expiryText[currentLang]}</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 border border-emerald-200 font-extrabold text-xs px-3 py-1.5 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{med.expiryText[currentLang]}</span>
                            </div>
                          )}
                          <div className="text-[11px] text-slate-400 mt-1">
                            Expiry: {med.expiryDate}
                          </div>
                        </div>
                      </div>

                      {/* Expired Medicine Warning Box with Action */}
                      {isExpired && (
                        <div className="mt-4 p-3 rounded-xl bg-red-100/80 border border-red-300 text-red-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            <span className="font-semibold">
                              {t.safeDisposalAlert}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              alert(
                                'Nearby Safe Medicine Disposal Boxes:\n1. Civil Hospital OPD Gate 2\n2. Asarwa Municipal Health Centre\n3. Red Cross Chemist Counter'
                              )
                            }
                            className="bg-red-700 hover:bg-red-800 text-white text-[11px] font-bold px-3 py-1 rounded-lg self-start sm:self-auto flex-shrink-0"
                          >
                            Find Disposal Box
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 2: Health Locker (Government ABDM Synced) */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {t.healthLocker}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      ABDM Verified
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {t.recordsSubtitle} • ABHA Health ID: 91-8204-7712-4019
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenRecords}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.viewRecords}</span>
                </button>
              </div>

              {/* Records List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {RECORDS_DATA.map((record) => (
                  <div
                    key={record.id}
                    onClick={() => onSelectRecord(record)}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-white transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                          {record.badge}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {record.date}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 mt-2.5 line-clamp-1">
                      {currentLang === 'GU'
                        ? record.gujaratiTitle
                        : currentLang === 'HI'
                        ? record.hindiTitle
                        : record.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {record.hospital} • {record.doctor}
                    </p>

                    {/* Gemini AI Summary Snippet */}
                    <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold text-blue-700 mb-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>{t.digitizedSummary}</span>
                      </div>
                      <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        {record.geminiSummary[currentLang][0]}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs font-bold text-blue-600 pt-2 border-t border-slate-200/60">
                      <span>View clinical report</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column (4 Cols on Desktop) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 108 Emergency Card */}
            <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-xl shadow-red-600/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-widest text-red-100">
                    GUJARAT EMERGENCY
                  </span>
                </div>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-mono font-bold">
                  24x7
                </span>
              </div>

              <h3 className="text-2xl font-black mt-3">
                108 Ambulance Dispatch
              </h3>
              <p className="text-xs text-red-100 mt-1 leading-relaxed">
                {currentLang === 'GU'
                  ? 'કટોકટીના સમયે તાત્કાલિક એમ્બ્યુલન્સ અને લાઈવ લોકેશન ટ્રેકિંગ માટે બટન દબાવો.'
                  : currentLang === 'HI'
                  ? 'आपातकालीन स्थिति में तुरंत एम्बुलेंस और लाइव लोकेशन ट्रैकिंग हेतु कॉल करें।'
                  : 'Instant dispatch with live GPS broadcast to Civil Hospital Ahmedabad emergency trauma center.'}
              </p>

              <div className="mt-4 pt-3 border-t border-red-500/60 flex items-center justify-between text-xs">
                <span>Nearest Center:</span>
                <span className="font-bold">Civil Trauma Wing (0.8 km)</span>
              </div>

              <button
                type="button"
                onClick={onTriggerEmergency}
                className="w-full mt-4 bg-white hover:bg-slate-100 text-red-700 font-black py-3 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 text-sm"
              >
                <PhoneCall className="w-4 h-4 fill-red-700" />
                <span>DIAL 108 / તાત્કાલિક કટોકટી</span>
              </button>
            </div>

            {/* Verified Doctors Directory */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {t.verifiedDoctors}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.verifiedDoctorBadge}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Available
                </span>
              </div>

              <div className="space-y-4 mt-4">
                {DOCTORS_LIST.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-500/20 shadow-xs"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5">
                          <h4 className="font-extrabold text-sm text-slate-900 truncate">
                            {doc.name}
                          </h4>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-600 truncate">
                          {doc.qualification}
                        </p>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                            {doc.rating}
                          </span>
                          <span>•</span>
                          <span>{doc.distance}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-600 italic bg-white p-2 rounded-lg border border-slate-200">
                      {doc.reviewSnippet[currentLang]} —{' '}
                      <span className="text-slate-400 not-italic">
                        {doc.reviewerName}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        {doc.availableTime}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleBookAppointment(doc.name)}
                        className="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                      >
                        Book Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trilingual Voice AI Assistant Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-6">
              <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs">
                <Mic className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>Trilingual Healthcare Voice AI</span>
              </div>
              <h4 className="font-extrabold text-base text-slate-900 mt-2">
                {currentLang === 'GU'
                  ? 'તમારી માતૃભાષામાં વાત કરો'
                  : currentLang === 'HI'
                  ? 'अपनी भाषा में स्वास्थ्य परामर्श लें'
                  : 'Ask in Gujarati, Hindi or English'}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                {t.voiceHint}
              </p>

              <div className="space-y-1.5 mt-3 text-xs">
                <div className="bg-white/80 p-2 rounded-xl border border-blue-100 text-slate-700 cursor-pointer hover:bg-white" onClick={onOpenVoiceAssistant}>
                  🗣️ &ldquo;દવા ક્યારે લેવી? (When to take medicine?)&rdquo;
                </div>
                <div className="bg-white/80 p-2 rounded-xl border border-blue-100 text-slate-700 cursor-pointer hover:bg-white" onClick={onOpenVoiceAssistant}>
                  🗣️ &ldquo;પેરાસિટામોલની એક્સપાયરી ચેક કરો&rdquo;
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenVoiceAssistant}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2"
              >
                <Mic className="w-4 h-4" />
                <span>Launch Voice Health AI</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Website Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <img src="/medix-logo.jpg" alt="MEDIX" className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
            <div>
              <span className="font-black text-slate-900">MEDIX Healthcare Platform</span>
              <p className="text-[11px] text-slate-400">
                Accredited under Ayushman Bharat Digital Mission (ABDM) • Gujarat Medical Council
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button type="button" onClick={onSwitchToMockup} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" />
              Phone Mockup View
            </button>
            <span>•</span>
            <button type="button" onClick={onTriggerEmergency} className="text-red-600 font-bold hover:underline">
              108 Emergency SOS
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
