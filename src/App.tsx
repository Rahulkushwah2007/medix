import React, { useState } from 'react';
import { Language, NavTab, MedicalRecord, MedicineItem } from './types';
import { DribbbleFrame } from './components/DribbbleFrame';
import { PhoneHeader } from './components/PhoneHeader';
import { MedicineHubSection } from './components/MedicineHubSection';
import { HealthLockerSection } from './components/HealthLockerSection';
import { VerifiedDoctorsSection } from './components/VerifiedDoctorsSection';
import { BottomNavigation } from './components/BottomNavigation';
import { MedicineScannerModal } from './components/MedicineScannerModal';
import { EmergencyModal } from './components/EmergencyModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { RecordsModal } from './components/RecordsModal';
import { SecondaryViews } from './components/SecondaryViews';
import { WebsiteView } from './components/WebsiteView';
import { RECORDS_DATA } from './data';
import { Globe, Smartphone } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [currentTab, setCurrentTab] = useState<NavTab>('HOME');
  const [viewMode, setViewMode] = useState<'website' | 'mobile'>('mobile');

  // Modals
  const [scannerOpen, setScannerOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [recordsOpen, setRecordsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(RECORDS_DATA[0]);

  const handleSelectRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setRecordsOpen(true);
  };

  const handleSelectMedicine = (med: MedicineItem) => {
    if (med.status === 'expired') {
      alert(`⚠️ Expired Medicine Warning: ${med.name} expired in ${med.expiryDate}. Please take to nearest civic safe disposal bin.`);
    } else {
      alert(`✓ ${med.name} is verified safe. ${med.expiryText[currentLang]}. Dosage: ${med.dosage}`);
    }
  };

  return (
    <>
      {/* Floating View Mode Switcher Pill */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center bg-slate-900/90 hover:bg-slate-900 text-white rounded-full p-1.5 shadow-2xl border border-slate-700/80 backdrop-blur-md transition-all text-xs font-bold">
        <button
          type="button"
          onClick={() => setViewMode('website')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all ${
            viewMode === 'website'
              ? 'bg-emerald-500 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Full responsive website layout"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Website</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('mobile')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all ${
            viewMode === 'mobile'
              ? 'bg-emerald-500 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Smartphone mockup showcase"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone</span>
        </button>
      </div>

      {viewMode === 'website' ? (
        /* Full-featured Responsive Website Experience */
        <WebsiteView
          currentLang={currentLang}
          onSelectLang={(lang) => setCurrentLang(lang)}
          onOpenScanner={() => setScannerOpen(true)}
          onOpenRecords={() => setRecordsOpen(true)}
          onSelectRecord={handleSelectRecord}
          onOpenVoiceAssistant={() => setVoiceOpen(true)}
          onTriggerEmergency={() => setEmergencyOpen(true)}
          onSwitchToMockup={() => setViewMode('mobile')}
        />
      ) : (
        /* Mobile Smartphone Mockup Experience inside Dribbble Studio Frame */
        <DribbbleFrame onSwitchToWebsite={() => setViewMode('website')}>
          {/* Phone Screen Root Container with crisp light white background (#FAFAFA) */}
          <div className="w-full flex-1 flex flex-col bg-[#FAFAFA] text-slate-900 font-sans min-h-full">
            {/* Header: Clean top bar with MEDIX logo, brand title, EN|ગુજરાતી|हिंदी toggles, blue microphone */}
            <PhoneHeader
              currentLang={currentLang}
              onSelectLang={(lang) => setCurrentLang(lang)}
              onOpenVoiceAssistant={() => setVoiceOpen(true)}
              isVoiceActive={true}
            />

            {/* Scrollable Mobile Screen Body */}
            <div className="flex-1 overflow-y-auto pb-4">
              {currentTab === 'HOME' ? (
                <>
                  {/* Section 1: Medicine Hub (Top) */}
                  <MedicineHubSection
                    currentLang={currentLang}
                    onOpenScanner={() => setScannerOpen(true)}
                    onSelectMedicine={handleSelectMedicine}
                  />

                  {/* Section 2: Health Locker (Middle) */}
                  <HealthLockerSection
                    currentLang={currentLang}
                    onOpenRecords={() => setRecordsOpen(true)}
                    onSelectRecord={handleSelectRecord}
                  />

                  {/* Section 3: Verified Doctors (Bottom) */}
                  <VerifiedDoctorsSection
                    currentLang={currentLang}
                    onBookAppointment={() => {
                      alert('Appointment requested! A confirmation SMS and token has been sent.');
                    }}
                  />
                </>
              ) : (
                <SecondaryViews
                  currentTab={currentTab}
                  currentLang={currentLang}
                  onOpenScanner={() => setScannerOpen(true)}
                  onOpenRecords={() => setRecordsOpen(true)}
                />
              )}
            </div>

            {/* Footer & Navigation: Standard bottom nav with green active icons + Floating Red EMERGENCY / કટોકટી button */}
            <BottomNavigation
              currentTab={currentTab}
              onSelectTab={(tab) => setCurrentTab(tab)}
              currentLang={currentLang}
              onTriggerEmergency={() => setEmergencyOpen(true)}
            />
          </div>
        </DribbbleFrame>
      )}

      {/* Interactive Modals (Shared across Website and Mobile views) */}
      <MedicineScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        currentLang={currentLang}
      />

      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        currentLang={currentLang}
      />

      <VoiceAssistantModal
        isOpen={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        currentLang={currentLang}
      />

      <RecordsModal
        isOpen={recordsOpen}
        onClose={() => setRecordsOpen(false)}
        selectedRecord={selectedRecord}
        currentLang={currentLang}
      />
    </>
  );
}
