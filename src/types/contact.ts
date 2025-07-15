export interface Contact {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role: string;
  club: string;
  location?: string;
  continent?: string;
  country?: string;
  city?: string;
  instagram?: string;
  status: 'new' | 'contacted' | 'responded' | 'booked' | 'rejected';
  dateAdded?: string;
  lastContacted?: string;
  notes?: string;
}

export interface ContactStats {
  total: number;
  contacted: number;
  responded: number;
  booked: number;
  rejected: number;
} 