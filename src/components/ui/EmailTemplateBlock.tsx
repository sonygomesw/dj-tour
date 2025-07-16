<<<<<<< HEAD
import { useState } from 'react'
import { Copy, Check, Download, FileText } from 'lucide-react'
import { GlassContainer } from './GlassContainer'
import { Contact } from '@/types/contact'

interface EmailTemplateBlockProps {
  onComplete: () => void
  contacts?: Contact[]
  region?: { country: string; city: string }
}

export function EmailTemplateBlock({ onComplete, contacts = [], region }: EmailTemplateBlockProps) {
  const [copied, setCopied] = useState(false)
  const [customTemplate, setCustomTemplate] = useState('')
  const [selectedContactId, setSelectedContactId] = useState(contacts.length > 0 ? contacts[0].id : '')
=======
import { useState } from 'react';
import { Copy, Check, Download, FileText } from 'lucide-react';
import { GlassContainer } from './GlassContainer';
import { Contact } from '@/types/contact';

interface EmailTemplateBlockProps {
  onComplete: () => void;
  contacts?: Contact[];
  region?: { country: string; city: string };
}

export function EmailTemplateBlock({ 
  onComplete, 
  contacts = [], 
  region 
}: EmailTemplateBlockProps) {
  const [copied, setCopied] = useState(false);
  const [customTemplate, setCustomTemplate] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(contacts.length > 0 ? contacts[0].id : '');
>>>>>>> recup-version-stable
  const [templateData, setTemplateData] = useState({
    name: '',
    contactFirstName: '',
    city: region?.city || '',
    recentGigs: '',
    style: ''
<<<<<<< HEAD
  })

  const selectedContact = contacts.find(c => c.id === selectedContactId)
  const contactFirstName = templateData.contactFirstName || '[Prénom]'
=======
  });

  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const contactFirstName = templateData.contactFirstName || '[Prénom]';
>>>>>>> recup-version-stable

  const defaultTemplate = `Salut ${contactFirstName},

Je suis ${templateData.name || '[Nom du DJ]'} basé à ${templateData.city || '[ville]'}, avec des gigs récents à ${templateData.recentGigs || '[x], [y] et [z]'}.
<<<<<<< HEAD
=======

>>>>>>> recup-version-stable
J'ai vu que vous programmez souvent des artistes dans mon style (${templateData.style || 'house/techno etc'}).

Voici mon press kit rapide : [lien]

Est-ce que vous cherchez de nouveaux DJs ?
<<<<<<< HEAD
Merci pour votre temps 🙌

${templateData.name || '[Nom du DJ]'}`

  const handleCopy = () => {
    navigator.clipboard.writeText(customTemplate || defaultTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onComplete()
  }
=======

Merci pour votre temps 🙌
${templateData.name || '[Nom du DJ]'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(customTemplate || defaultTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onComplete();
  };
>>>>>>> recup-version-stable

  return (
    <GlassContainer className="p-6">
      <div className="space-y-6">
        {/* Tutorial */}
<<<<<<< HEAD
        <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-700 dark:text-white/80">
=======
        <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-700">
>>>>>>> recup-version-stable
          <p className="font-medium mb-2">💡 Pour un message efficace, il te faut :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Un mini press kit (CapCut + PDF)</li>
            <li>Un message accrocheur et personnalisé</li>
            <li>Un lien vers ton profil DJ</li>
            <li>Une demande claire et directe</li>
          </ul>
        </div>

        {/* Contact Selection */}
        {contacts.length > 0 && (
          <div className="space-y-4 bg-violet-500/10 border border-violet-500/30 rounded-xl p-4">
<<<<<<< HEAD
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
=======
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
>>>>>>> recup-version-stable
              📧 Choisir le contact pour ce message
            </h3>
            <select
              value={selectedContactId}
              onChange={(e) => setSelectedContactId(e.target.value)}
<<<<<<< HEAD
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
=======
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
>>>>>>> recup-version-stable
            >
              <option value="">Sélectionner un contact...</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id} className="bg-gray-800">
                  {contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.name} - {contact.club}
                </option>
              ))}
            </select>
            {selectedContact && (
<<<<<<< HEAD
              <div className="text-sm text-gray-600 dark:text-white/70 bg-white/5 rounded-lg p-3">
=======
              <div className="text-sm text-gray-600 bg-white/5 rounded-lg p-3">
>>>>>>> recup-version-stable
                ✨ Message personnalisé pour <strong className="text-violet-300">{contactFirstName}</strong> de <strong className="text-violet-300">{selectedContact.club}</strong>
              </div>
            )}
          </div>
        )}

        {/* Template Customization */}
        <div className="space-y-4">
<<<<<<< HEAD
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personnalise ton message</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
=======
          <h3 className="text-lg font-medium text-gray-900">Personnalise ton message</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
>>>>>>> recup-version-stable
                Nom du DJ
              </label>
              <input
                type="text"
                value={templateData.name}
                onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                placeholder="Ex: DJ Snake"
<<<<<<< HEAD
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
=======
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
>>>>>>> recup-version-stable
                Prénom du contact
              </label>
              <input
                type="text"
                value={templateData.contactFirstName}
                onChange={(e) => setTemplateData({ ...templateData, contactFirstName: e.target.value })}
                placeholder="Ex: John"
<<<<<<< HEAD
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Ta ville
=======
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ville
>>>>>>> recup-version-stable
              </label>
              <input
                type="text"
                value={templateData.city}
                onChange={(e) => setTemplateData({ ...templateData, city: e.target.value })}
                placeholder="Ex: Paris"
<<<<<<< HEAD
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Tes derniers gigs
=======
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Gigs récents
>>>>>>> recup-version-stable
              </label>
              <input
                type="text"
                value={templateData.recentGigs}
                onChange={(e) => setTemplateData({ ...templateData, recentGigs: e.target.value })}
<<<<<<< HEAD
                placeholder="Ex: Showcase, Badaboum, La Machine"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Ton style
=======
                placeholder="Ex: Club XYZ, Festival ABC"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Style musical
>>>>>>> recup-version-stable
              </label>
              <input
                type="text"
                value={templateData.style}
                onChange={(e) => setTemplateData({ ...templateData, style: e.target.value })}
<<<<<<< HEAD
                placeholder="Ex: house/techno"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 dark:text-white placeholder:text-gray-500 dark:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
=======
                placeholder="Ex: House, Techno, Hip-Hop"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
>>>>>>> recup-version-stable
              />
            </div>
          </div>
        </div>

        {/* Template Preview */}
<<<<<<< HEAD
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Template de message</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copier
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <textarea
              value={customTemplate || defaultTemplate}
              onChange={(e) => setCustomTemplate(e.target.value)}
              className="w-full bg-transparent text-gray-900 dark:text-white resize-none focus:outline-none min-h-[200px]"
              placeholder="Personnalise ton message..."
            />
          </div>
        </div>

        {/* Press Kit Tips */}
        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Press Kit - To prepare
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-white/80">
            <li>Une vidéo CapCut de 30s avec tes meilleurs moments</li>
            <li>Un PDF d'une page avec ta bio, photos et liens</li>
            <li>Des liens vers tes meilleurs mixes</li>
            <li>Tes réseaux sociaux principaux</li>
          </ul>
        </div>
      </div>
    </GlassContainer>
  )
=======
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Aperçu du message</h3>
            <button
              onClick={handleCopy}
              className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copier
                </>
              )}
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <pre className="text-sm text-gray-900 whitespace-pre-wrap font-sans">
              {customTemplate || defaultTemplate}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleCopy}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            Copier et terminer
          </button>
        </div>
      </div>
    </GlassContainer>
  );
>>>>>>> recup-version-stable
} 