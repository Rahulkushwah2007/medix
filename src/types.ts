export type Language = 'EN' | 'GU' | 'HI';

export type NavTab = 'HOME' | 'MEDS' | 'DOCTORS' | 'RECORDS' | 'ME';

export interface MedicineItem {
  id: string;
  name: string;
  gujaratiName: string;
  hindiName: string;
  status: 'valid' | 'expired';
  expiryDate: string;
  expiryText: {
    EN: string;
    GU: string;
    HI: string;
  };
  dosage: string;
  batch: string;
  notes: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  gujaratiTitle: string;
  hindiTitle: string;
  date: string;
  hospital: string;
  doctor: string;
  geminiSummary: {
    EN: string[];
    GU: string[];
    HI: string[];
  };
  type: 'prescription' | 'lab_report' | 'vaccination';
  badge: string;
}

export interface DoctorProfile {
  name: string;
  qualification: string;
  hospital: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  reviewSnippet: {
    EN: string;
    GU: string;
    HI: string;
  };
  reviewerName: string;
  location: string;
  distance: string;
  availableTime: string;
  photoUrl: string;
  languages: string[];
}
