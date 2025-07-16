'use client'

import { useState } from 'react'
import { DJSidebar } from '@/components/ui/DJSidebar'
import { useContacts } from '../../contexts/ContactContext'
import { Search, Mail, Instagram, Phone, Trash2, CheckCircle, XCircle, Building2, Globe2, MapPin, User, Grid, List, LayoutGrid, Plus } from 'lucide-react'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SimpleContactForm } from '@/components/ui/SimpleContactForm'
import { Button } from '@/components/ui/button'

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
    <div className="flex min-h-screen bg-white dark:bg-[#0F0F11] transition-colors duration-300">
      <DJSidebar />
      <div className="flex-1 ml-80 p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-gray-900 dark:text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-br from-white via-violet-100 to-violet-300 text-transparent bg-clip-text leading-none tracking-tight">
                  Contacts
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2"></div>
              </div>
            </div>
            
            {/* Add Contact Button */}
            <Button
              onClick={() => setShowAddContactModal(true)}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Contact
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <GlassContainer className="p-4">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Total</div>
            </GlassContainer>
            <GlassContainer className="p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">{stats.contacted}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Contacted</div>
            </GlassContainer>
            <GlassContainer className="p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">{stats.responded}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Responded</div>
            </GlassContainer>
            <GlassContainer className="p-4">
              <div className="text-2xl font-bold text-violet-400 mb-1">{stats.booked}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Booked</div>
            </GlassContainer>
            <GlassContainer className="p-4">
              <div className="text-2xl font-bold text-red-400 mb-1">{stats.rejected}</div>
              <div className="text-sm text-gray-600 dark:text-white/60">Rejected</div>
            </GlassContainer>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-2 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/40 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
          >
            <option value="all" className="bg-gray-900">All statuses</option>
            <option value="new" className="bg-gray-900">New</option>
            <option value="contacted" className="bg-gray-900">Contacted</option>
            <option value="responded" className="bg-gray-900">Responded</option>
            <option value="booked" className="bg-gray-900">Booked</option>
            <option value="rejected" className="bg-gray-900">Rejected</option>
          </select>
          <select
            value={continentFilter}
            onChange={(e) => setContinentFilter(e.target.value)}
            className="bg-white/[0.02] border border-white/10 rounded-2xl px-6 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
          >
            <option value="all" className="bg-gray-900">All continents</option>
            {uniqueContinents.map(continent => (
              <option key={continent} value={continent} className="bg-gray-900">{continent}</option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-2 flex">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-900 dark:text-white shadow-lg'
                  : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="font-medium">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                viewMode === 'table'
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-gray-900 dark:text-white shadow-lg'
                  : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:text-white hover:bg-white/5'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="font-medium">Table</span>
            </button>
          </div>
        </div>

        {/* Contact List */}
        {filteredContacts.length > 0 ? (
          viewMode === 'cards' ? (
            /* Vue en cartes */
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <GlassContainer key={contact.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                        {contact.role && (
                          <span className="text-sm text-gray-600 dark:text-white/60 bg-white/10 px-3 py-1 rounded-full">
                            {contact.role}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-6 text-gray-600 dark:text-white/60">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span className="text-violet-400">{contact.club}</span>
                        </div>
                        {contact.continent && (
                          <div className="flex items-center gap-2">
                            <Globe2 className="w-4 h-4" />
                            <span>{contact.continent}</span>
                          </div>
                        )}
                        {contact.city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{contact.city}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white/60">
                        {contact.email && (
                          <a 
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-1 hover:text-violet-400 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </a>
                        )}
                        {contact.instagram && (
                          <a 
                            href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-violet-400 transition-colors"
                          >
                            <Instagram className="w-4 h-4" />
                            {contact.instagram}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatusChange(contact.id, 'contacted')}
                        className={`p-2 rounded-xl transition-colors ${
                          contact.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                        }`}
                        title="Marquer comme contacté"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(contact.id, 'responded')}
                        className={`p-2 rounded-xl transition-colors ${
                          contact.status === 'responded' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                        }`}
                        title="Marquer comme répondu"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(contact.id, 'booked')}
                        className={`p-2 rounded-xl transition-colors ${
                          contact.status === 'booked' ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                        }`}
                        title="Marquer comme booké"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(contact.id, 'rejected')}
                        className={`p-2 rounded-xl transition-colors ${
                          contact.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                        }`}
                        title="Marquer comme rejeté"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="p-2 rounded-xl bg-white/5 text-gray-500 dark:text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        title="Supprimer le contact"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </GlassContainer>
              ))}
            </div>
          ) : (
            /* Vue en tableau */
            <GlassContainer className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Nom</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Rôle</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Club</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Localisation</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Contact</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Statut</th>
                      <th className="text-center py-4 px-6 text-sm font-medium text-gray-700 dark:text-white/80">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact, index) => (
                      <tr 
                        key={contact.id} 
                        className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                          index % 2 === 0 ? 'bg-white/[0.01]' : ''
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900 dark:text-white">{contact.name}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-600 dark:text-white/60 bg-white/10 px-2 py-1 rounded-full">
                            {contact.role}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-violet-400 font-medium">{contact.club}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-gray-600 dark:text-white/60 text-sm">
                            {contact.city && contact.continent ? `${contact.city}, ${contact.continent}` : 
                             contact.continent || contact.city || '-'}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            {contact.email && (
                              <a 
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60 hover:text-violet-400 transition-colors"
                              >
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </a>
                            )}
                            {contact.instagram && (
                              <a 
                                href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-gray-600 dark:text-white/60 hover:text-violet-400 transition-colors"
                              >
                                <Instagram className="w-3 h-3" />
                                {contact.instagram}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            contact.status === 'new' ? 'bg-gray-500/20 text-gray-300' :
                            contact.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                            contact.status === 'responded' ? 'bg-green-500/20 text-green-400' :
                            contact.status === 'booked' ? 'bg-violet-500/20 text-violet-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {contact.status === 'new' ? 'Nouveau' :
                             contact.status === 'contacted' ? 'Contacté' :
                             contact.status === 'responded' ? 'Répondu' :
                             contact.status === 'booked' ? 'Booké' :
                             'Rejeté'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleStatusChange(contact.id, 'contacted')}
                              className={`p-1.5 rounded-lg transition-colors ${
                                contact.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                              }`}
                              title="Marquer comme contacté"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(contact.id, 'responded')}
                              className={`p-1.5 rounded-lg transition-colors ${
                                contact.status === 'responded' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                              }`}
                              title="Marquer comme répondu"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(contact.id, 'booked')}
                              className={`p-1.5 rounded-lg transition-colors ${
                                contact.status === 'booked' ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                              }`}
                              title="Marquer comme booké"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(contact.id, 'rejected')}
                              className={`p-1.5 rounded-lg transition-colors ${
                                contact.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-500 dark:text-white/40 hover:bg-white/10'
                              }`}
                              title="Marquer comme rejeté"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="p-1.5 rounded-lg bg-white/5 text-gray-500 dark:text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                              title="Supprimer le contact"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassContainer>
          )
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-gray-400 dark:text-white/20" />
            </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No contact found</h3>
            <p className="text-gray-600 dark:text-white/60 mb-6">
              {searchQuery || statusFilter !== 'all' || continentFilter !== 'all'
                ? "Aucun contact ne correspond à vos critères de recherche"
                : "Start by adding contacts via Build Tour"}
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-yellow-400 text-sm">
                💡 <strong>Debug:</strong> Total contacts dans le contexte: {contacts.length}
              </p>
              {contacts.length > 0 && (
                <p className="text-yellow-400 text-xs mt-2">
                  Contacts présents mais filtrés: {contacts.map(c => c.name).join(', ')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Add Contact Modal */}
        {showAddContactModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <SimpleContactForm onClose={() => setShowAddContactModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 