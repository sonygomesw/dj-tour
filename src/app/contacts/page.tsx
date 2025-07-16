'use client'

import { useState } from 'react'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { useContacts } from '../../contexts/ContactContext'
import { Search, Mail, Instagram, Phone, Trash2, CheckCircle, XCircle, Building2, Globe2, MapPin, User, Grid, List, LayoutGrid, Plus, Users, Sparkles } from 'lucide-react'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SimpleContactForm } from '@/components/ui/SimpleContactForm'
import { Button } from '@/components/ui/button'
import { ContactFinder } from '@/components/ui/ContactFinder'

export default function ContactsPage() {
  const { contacts, updateContact, deleteContact } = useContacts()
  
  console.log('ContactsPage: Current contacts:', contacts)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [continentFilter, setContinentFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
  const [showAddContactModal, setShowAddContactModal] = useState(false)

  // Filtrer les contacts en fonction de la recherche et des filtres
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (contact.instagram && contact.instagram.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    const matchesContinent = continentFilter === 'all' || contact.continent === continentFilter
    const matchesRole = roleFilter === 'all' || contact.role === roleFilter

    return matchesSearch && matchesStatus && matchesContinent && matchesRole
  })

  // Statistiques des contacts
  const stats = {
    total: contacts.length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    responded: contacts.filter(c => c.status === 'responded').length,
    booked: contacts.filter(c => c.status === 'booked').length,
    rejected: contacts.filter(c => c.status === 'rejected').length
  }

  // Obtenir les continents uniques pour le filtre
  const uniqueContinents = Array.from(new Set(contacts.map(c => c.continent).filter(Boolean)))
  
  // Obtenir les rôles uniques pour le filtre
  const uniqueRoles = Array.from(new Set(contacts.map(c => c.role).filter(Boolean)))

  const handleStatusChange = (contactId: string, newStatus: 'new' | 'contacted' | 'responded' | 'booked' | 'rejected') => {
    updateContact(contactId, { status: newStatus })
  }

  return (
    <div className="flex min-h-screen bg-white transition-colors duration-300">
      <DJSidebar />
      <div className="flex-1 ml-80 p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-[0_8px_32px_rgba(139,92,246,0.3),0_3px_16px_rgba(139,92,246,0.2)] border border-white/10">
                <Users className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Contacts</h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 font-light">
            Manage your professional network and industry connections
          </p>
        </div>

        {/* Contact Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Finder */}
          <GlassContainer className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Search className="w-6 h-6 text-violet-400" />
              Find Contacts
            </h3>
            <ContactFinder />
          </GlassContainer>

          {/* Contact List */}
          <GlassContainer className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-violet-400" />
              Your Contacts
            </h3>
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassContainer>
        </div>
      </div>
    </div>
  )
} 