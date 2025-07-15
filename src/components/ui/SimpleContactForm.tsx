'use client'

import { useState } from 'react'
import { X, Plus, User, Mail, Instagram, Building2, MapPin, Briefcase, Check } from 'lucide-react'
import { GlassContainer } from './GlassContainer'
import { Button } from './button'
import { useContacts } from '@/contexts/ContactContext'
import { Contact } from '@/types/contact'

interface SimpleContactFormProps {
  onClose: () => void
}

export function SimpleContactForm({ onClose }: SimpleContactFormProps) {
  const { contacts, addContact } = useContacts()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    instagram: '',
    role: '',
    club: '',
    city: '',
    country: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const countries = [
    'France', 'Spain', 'United Kingdom', 'Germany', 'Italy', 'Netherlands', 
    'Belgium', 'Switzerland', 'Portugal', 'United States', 'Canada', 'Australia'
  ]

  const roles = [
    'Talent Buyer', 'Booking Manager', 'Music Director', 'Event Manager', 
    'Club Owner', 'Promoter', 'A&R', 'DJ Resident'
  ]

  const getContinent = (country: string) => {
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
      'United States': 'America',
      'Canada': 'America',
      'Australia': 'Oceania'
    }
    return continentMap[country] || 'Other'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.club || !formData.role) {
      return
    }

    setIsSubmitting(true)

    const newContact: Contact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email || undefined,
      instagram: formData.instagram || undefined,
      role: formData.role,
      club: formData.club,
      city: formData.city || undefined,
      country: formData.country || undefined,
      continent: formData.country ? getContinent(formData.country) : undefined,
      status: 'new',
      dateAdded: new Date().toISOString()
    }

    console.log('SimpleContactForm: Adding contact:', newContact)
    addContact(newContact)

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      instagram: '',
      role: '',
      club: '',
      city: '',
      country: ''
    })

    setSuccessMessage(`Contact ${newContact.name} added successfully!`)
    setIsSubmitting(false)

    // Clear success message and close modal after 2 seconds
    setTimeout(() => {
      setSuccessMessage('')
      onClose()
    }, 2000)
  }

  return (
    <GlassContainer className="relative max-w-4xl mx-auto rounded-[28px] overflow-hidden shadow-2xl border-white/20">
      {/* Header */}
      <div className="relative h-16 flex items-center justify-center border-b border-white/10 bg-white/5">
        <button 
          onClick={onClose}
          className="absolute left-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-violet-400" />
          <span className="text-white font-bold text-xl">Add Contacts</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-10">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400">{successMessage}</span>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{contacts.length}</div>
            <div className="text-white/60 text-sm">Added contacts</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{contacts.filter(c => c.status === 'contacted').length}</div>
            <div className="text-white/60 text-sm">Contacted</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{contacts.filter(c => c.status === 'responded').length}</div>
            <div className="text-white/60 text-sm">Responses</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Ex: John"
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Ex: Smith"
                className="w-full bg-white/10 border border-white/30 rounded-xl py-3 px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@club.com"
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="@username"
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Rôle */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Role *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                >
                  <option value="" className="bg-gray-800 text-white">Select a role...</option>
                  {roles.map(role => (
                    <option key={role} value={role} className="bg-gray-800 text-white">{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Club */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Club / Venue *
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  required
                  value={formData.club}
                  onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                  placeholder="Ex: Fabric London"
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                City
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ex: London"
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-white/10 border border-white/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
              >
                <option value="" className="bg-gray-800 text-white">Select a country...</option>
                {countries.map(country => (
                  <option key={country} value={country} className="bg-gray-800 text-white">{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.club || !formData.role}
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
          <p className="text-violet-300 text-sm">
            💡 <strong>Tip:</strong> Contacts added here will appear in the "Contacts" page where you can track your interactions and manage your networking.
          </p>
        </div>
      </div>
    </GlassContainer>
  )
} 