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
    setNewContact({ firstName: '', lastName: '', role: '', instagram: '', email: '', club: '' })
    setSelectedClubId('')

    // Check if we have enough contacts to complete
    console.log('ContactFinder: Current contacts count:', contacts.length);
    if (contacts.length + 1 >= minContacts) {
      console.log('ContactFinder: Minimum contacts reached, completing step');
      onComplete(contacts)
    }
  }

  return (
    <GlassContainer className="p-8 bg-white border-gray-200 shadow-lg">
      <div className="space-y-8">
        {/* Tutorial */}
        <div className="bg-gray-50 rounded-2xl p-6 text-sm text-gray-700 border border-gray-200">
          <p className="font-semibold mb-3 text-violet-500">💡 How to find the right contacts:</p>
          <ul className="list-disc list-inside space-y-2 leading-relaxed text-gray-800">
            <li>Search club followers (keywords: "Booker", "Talent", "Music Director")</li>
            <li>Google "[Club name] + talent buyer" or "booking"</li>
            <li>Search on LinkedIn with the same keywords</li>
            <li>Look who responds to comments on club posts</li>
          </ul>
        </div>

        {/* Add New Contact Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={newContact.firstName}
                  onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                  placeholder="Ex: John"
                  className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3">
                Last Name
              </label>
              <input
                type="text"
                value={newContact.lastName}
                onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                placeholder="Ex: Smith"
                className="w-full bg-white border border-gray-300 rounded-2xl py-4 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3">
                Role
              </label>
              <select
                value={newContact.role}
                onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-2xl py-4 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
              >
                <option value="" className="bg-white text-gray-900">Select a role...</option>
                <option value="Director" className="bg-white text-gray-900">Director</option>
                <option value="Talent buyer" className="bg-white text-gray-900">Talent buyer</option>
                <option value="Manager" className="bg-white text-gray-900">Manager</option>
                <option value="DJ Resident" className="bg-white text-gray-900">DJ Resident</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={newContact.instagram}
                  onChange={(e) => setNewContact({ ...newContact, instagram: e.target.value })}
                  placeholder="@username"
                  className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-base font-semibold text-gray-900 mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="email@club.com"
                  className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200"
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
            <h3 className="text-xl font-semibold text-gray-800">Added Contacts</h3>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-gray-900 font-semibold text-lg">{contact.name}</h4>
                      {contact.role && (
                        <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">({contact.role})</span>
                      )}
                    </div>
                    <p className="text-violet-500 font-medium mb-2">{contact.club}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
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
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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