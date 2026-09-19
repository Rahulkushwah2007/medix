import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Star,
  UserCheck,
  Phone,
  Calendar,
  Navigation,
  Sparkles,
  Award
} from 'lucide-react';
import { Language } from '../types';
import { PRIMARY_DOCTOR, TRANSLATIONS } from '../data';

interface VerifiedDoctorsSectionProps {
  currentLang: Language;
  onBookAppointment?: () => void;
}

export const VerifiedDoctorsSection: React.FC<VerifiedDoctorsSectionProps> = ({
  currentLang,
  onBookAppointment,
}) => {
  const t = TRANSLATIONS[currentLang];
  const doctor = PRIMARY_DOCTOR;
  const reviewText = doctor.reviewSnippet[currentLang] || doctor.reviewSnippet.EN;
  const [booked, setBooked] = useState(false);

  return (
    <section className="px-4 py-3" id="verified-doctors-section">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
            {t.verifiedDoctors}
          </h2>
        </div>

        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
          <Award className="w-3 h-3 text-blue-600" />
          Civil Hospital OPD
        </span>
      </div>

      {/* Container with Soft Map Background */}
      <div className="rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs bg-white">
        {/* Soft Map Background with Location Pin labeled "Ahmedabad (Near Civil Hospital)" */}
        <div className="relative h-32 w-full bg-[#eef3f7] overflow-hidden">
          {/* Stylized vector map grid representation */}
          <svg
            className="absolute inset-0 w-full h-full opacity-70"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 160"
            preserveAspectRatio="none"
          >
            {/* Map terrain blocks */}
            <rect x="0" y="0" width="400" height="160" fill="#f1f5f9" />
            <path d="M0,40 Q150,20 280,60 T400,30" fill="none" stroke="#e2e8f0" strokeWidth="16" />
            <path d="M-10,110 Q120,130 260,100 T420,130" fill="none" stroke="#e2e8f0" strokeWidth="20" />
            {/* Secondary roads */}
            <path d="M90,0 L120,160" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 2" />
            <path d="M250,0 L230,160" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M0,85 L400,75" stroke="#94a3b8" strokeWidth="4.5" />
            <path d="M180,30 L320,130" stroke="#cbd5e1" strokeWidth="3" />
            
            {/* River Sabarmati soft accent */}
            <path d="M-10,150 C80,110 90,40 130,-10" fill="none" stroke="#bfdbfe" strokeWidth="28" strokeLinecap="round" opacity="0.6" />

            {/* Hospital campus area highlight */}
            <rect x="175" y="40" width="130" height="70" rx="12" fill="#dcfce7" opacity="0.6" stroke="#86efac" strokeWidth="1.5" />
            <text x="185" y="58" fill="#166534" fontSize="9" fontWeight="bold" fontFamily="system-ui">
              Ahmedabad Civil Hospital Campus
            </text>
          </svg>

          {/* Location Pin Labeled "Ahmedabad (Near Civil Hospital)" */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {/* Ripple pulse circle around the pin */}
            <div className="absolute top-3 w-10 h-10 rounded-full bg-emerald-500/20 animate-ping"></div>

            {/* Map Pin Icon with Medical Cross */}
            <div className="relative z-10 w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-700/40 border-2 border-white">
              <MapPin className="w-5 h-5 fill-white text-emerald-700" />
            </div>

            {/* REQUIRED PIN LABEL: "Ahmedabad (Near Civil Hospital)" */}
            <div className="mt-1.5 z-10 bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1 border border-white/20 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ahmedabad (Near Civil Hospital)</span>
            </div>
          </div>

          {/* Distance & GPS quick chip */}
          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-slate-200/80 text-[10px] font-bold text-slate-700 shadow-2xs flex items-center gap-1">
            <Navigation className="w-2.5 h-2.5 text-blue-600" />
            0.8 km • Asarwa Gate 3
          </div>
        </div>

        {/* Below the map: Doctor's profile card for "Dr. A. Sharma" */}
        {/* featuring a portrait photo, a blue verification tick, 5 golden stars, and a review text snippet: "Friendly, clear answers" */}
        <div className="p-4 bg-white" id="doctor-card-sharma">
          <div className="flex items-start space-x-3.5">
            {/* Doctor Portrait Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={doctor.photoUrl}
                alt="Dr. A. Sharma Portrait"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-slate-100 shadow-sm"
              />
              {/* Online OPD badge */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              </span>
            </div>

            <div className="flex-1 min-w-0">
              {/* Doctor Name + Blue Verification Tick */}
              <div className="flex items-center space-x-1.5">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight truncate">
                  {doctor.name}
                </h3>

                {/* Blue Verification Tick */}
                <div
                  className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs flex-shrink-0"
                  title="Verified Doctor (GMC Reg #48291)"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>

                <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                  GMC Verified
                </span>
              </div>

              {/* Specialization & Hospital */}
              <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                {doctor.qualification}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {doctor.hospital}
              </p>

              {/* 5 Golden Stars */}
              <div className="flex items-center space-x-1 mt-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-xs font-bold text-slate-900 ml-1">5.0</span>
                <span className="text-[10px] text-slate-400 font-medium">
                  ({doctor.reviewsCount}+ reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Review text snippet: "Friendly, clear answers" */}
          <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 flex items-start space-x-2">
            <span className="text-emerald-600 font-serif text-lg leading-none select-none">“</span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-800 italic">
                {reviewText}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                — {doctor.reviewerName}
              </p>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          </div>

          {/* Interactive CTAs */}
          <div className="mt-3.5 flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                setBooked(true);
                onBookAppointment?.();
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-extrabold py-2.5 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{booked ? 'Token #14 Confirmed' : 'Book OPD Slot (Free)'}</span>
            </button>

            <a
              href="tel:07922681000"
              onClick={(e) => {
                e.preventDefault();
                alert('Connecting to Civil Hospital Ahmedabad OPD line (079-22681000)...');
              }}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 border border-slate-200 flex items-center justify-center transition-colors flex-shrink-0"
              title="Call Doctor Desk"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
