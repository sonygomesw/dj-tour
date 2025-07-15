import { useState } from 'react'
import { Plus, Trash2, Instagram, Mail, User } from 'lucide-react'
import { GlassContainer } from './GlassContainer'
import { useContacts } from '../../contexts/ContactContext'
import { Contact } from '@/types/contact'

interface Club {
  id: string
  name: string
  instagram: string
}

interface ContactFinderProps {
  onComplete: (contacts: Contact[]) => void
  minContacts?: number
  clubs?: Club[]
  region?: { country: string; city: string }
}

export function ContactFinder({ onComplete, minContacts = 5, clubs = [], region }: ContactFinderProps) {
  const { contacts, addContact, deleteContact } = useContacts()
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    role: '',
    instagram: '',
    email: '',
    club: ''
  })
  const [selectedClubId, setSelectedClubId] = useState('')

  // Helper function to get continent from country
  const getContinent = (country?: string) => {
    if (!country) return undefined
    
    const continentMap: { [key: string]: string } = {
      'France': 'Europe',
      'Spain': 'Europe',
      'United Kingdom': 'Europe',
      'Germany': 'Europe',
      'Italy': 'Europe',
      'Netherlands': 'Europe',
      'Belgium': 'Europe',
      'Switzerland': 'Europe',
      'Portugal': 'Europe',
      'Austria': 'Europe',
      'United States': 'America',
      'Canada': 'America',
      'Mexico': 'America',
      'Brazil': 'America',
      'Argentina': 'America',
      'Colombia': 'America',
      'Japan': 'Asia',
      'China': 'Asia',
      'South Korea': 'Asia',
      'Thailand': 'Asia',
      'Singapore': 'Asia',
      'Hong Kong': 'Asia',
      'India': 'Asia',
      'Australia': 'Oceania',
      'New Zealand': 'Oceania',
      'South Africa': 'Africa',
      'Morocco': 'Africa',
      'Egypt': 'Africa',
      'Nigeria': 'Africa',
      'Kenya': 'Africa'
    }
    
    return continentMap[country] || 'Other'
  }

  const handleAddContact = () => {
    if (!newContact.firstName || !newContact.lastName) return

    const selectedClub = clubs.find(c => c.id === selectedClubId)
    const clubName = selectedClub?.name || newContact.club

    if (!clubName) return

    // Create contact with full name and required fields
    const contactData: Contact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${newContact.firstName} ${newContact.lastName}`,
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      email: newContact.email || undefined,
      role: newContact.role,
      club: clubName,
      instagram: newContact.instagram || undefined,
      continent: getContinent(region?.country),
      country: region?.country,
      city: region?.city,
      status: 'new',
      dateAdded: new Date().toISOString()
    }

    console.log('ContactFinder: Creating new contact with data:', contactData);

    // Add to global contacts database
    addContact(contactData)
    console.log('ContactFinder: Contact added to global database');

    // Reset form
    setNewContact({
      firstName: '',
      lastName: '',
      role: '',
      instagram: '',
      email: '',
      club: ''
    })
    setSelectedClubId('')

    // Check if we have enough contacts to complete
    console.log('ContactFinder: Current contacts count:', contacts.length);
    if (contacts.length + 1 >= minContacts) {
      console.log('ContactFinder: Minimum contacts reached, completing step');
      onComplete(contacts)
    }
  }

  return (
    <GlassContainer className="p-8 backdrop-blur-2xl bg-white/[0.02] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.08)]">
      <div className="space-y-8">
        {/* Tutorial */}
        <div className="bg-white/[0.02] rounded-2xl p-6 text-sm text-gray-700 border border-white/10">
          <p className="font-semibold mb-3 text-violet-400">💡 How to find the right contacts:</p>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>Search club followers (keywords:"Booker","Talent","Music Director")</li>
            <li>Google"[Club name] + talent buyer"or"booking"</li>
            <li>Search on LinkedIn with the same keywords</li>
            <li>Look who responds to comments on club posts</li>
          </ul>
        </div>

        {/* Add New Contact Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  value={newContact.firstName}
                  onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                  placeholder="Ex: John"
                  className="w-full bg-white/10 border border-white/30 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Last Name
              </label>
              <input
                type="text"
                value={newContact.lastName}
                onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                placeholder="Ex: Smith"
                className="w-full bg-white/10 border border-white/30 rounded-2xl py-4 px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Role
              </label>
              <select
                value={newContact.role}
                onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                className="w-full bg-white/10 border border-white/30 rounded-2xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
              >
                <option value="" className="bg-gray-800 text-white">Select a role...</option>
                <option value="Director" className="bg-gray-800 text-white">Director</option>
                <option value="Talent buyer" className="bg-gray-800 text-white">Talent buyer</option>
                <option value="Manager" className="bg-gray-800 text-white">Manager</option>
                <option value="DJ Resident" className="bg-gray-800 text-white">DJ Resident</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  value={newContact.instagram}
                  onChange={(e) => setNewContact({ ...newContact, instagram: e.target.value })}
                  placeholder="@username"
                  className="w-full bg-white/10 border border-white/30 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="email@club.com"
                  className="w-full bg-white/10 border border-white/30 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 backdrop-blur-xl"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleAddContact}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 shadow-[0_8px_32px_rgba(139,92,246,0.3)]"
          >
            <Plus className="w-5 h-5" />
            Add Contact
          </button>
        </div>

        {/* Contact List */}
        {contacts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Added Contacts</h3>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between bg-white/[0.02] rounded-2xl p-6 border border-white/10">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-white font-semibold text-lg">{contact.name}</h4>
                      {contact.role && (
                        <span className="text-sm text-white/60 bg-white/10 px-2 py-1 rounded-full">
                          ({contact.role})
                        </span>
                      )}
                    </div>
                    <p className="text-violet-400 font-medium mb-2">{contact.club}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      {contact.instagram && (
                        <span className="flex items-center gap-1">
                          <Instagram className="w-3 h-3" />
                          {contact.instagram}
                        </span>
                      )}
                      {contact.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassContainer>
  )
} 