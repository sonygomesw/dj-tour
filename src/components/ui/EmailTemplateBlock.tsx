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
  const [templateData, setTemplateData] = useState({
    name: '',
    contactFirstName: '',
    city: region?.city || '',
    recentGigs: '',
    style: ''
  });

  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const contactFirstName = templateData.contactFirstName || '[Prénom]';

  const defaultTemplate = `Salut ${contactFirstName},

Je suis ${templateData.name || '[Nom du DJ]'} basé à ${templateData.city || '[ville]'}, avec des gigs récents à ${templateData.recentGigs || '[x], [y] et [z]'}.

J'ai vu que vous programmez souvent des artistes dans mon style (${templateData.style || 'house/techno etc'}).

Voici mon press kit rapide : [lien]

Est-ce que vous cherchez de nouveaux DJs ?

Merci pour votre temps 🙌
${templateData.name || '[Nom du DJ]'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(customTemplate || defaultTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onComplete();
  };

  return (
    <GlassContainer className="p-6">
      <div className="space-y-6">
        {/* Tutorial */}
        <div className="bg-white/5 rounded-lg p-4 text-sm text-gray-700">
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
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              📧 Choisir le contact pour ce message
            </h3>
            <select
              value={selectedContactId}
              onChange={(e) => setSelectedContactId(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
            >
              <option value="">Sélectionner un contact...</option>
              {contacts.map((contact) => (
                <option key={contact.id} value={contact.id} className="bg-gray-800">
                  {contact.firstName ? `${contact.firstName} ${contact.lastName}` : contact.name} - {contact.club}
                </option>
              ))}
            </select>
            {selectedContact && (
              <div className="text-sm text-gray-600 bg-white/5 rounded-lg p-3">
                ✨ Message personnalisé pour <strong className="text-violet-300">{contactFirstName}</strong> de <strong className="text-violet-300">{selectedContact.club}</strong>
              </div>
            )}
          </div>
        )}

        {/* Template Customization */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Personnalise ton message</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nom du DJ
              </label>
              <input
                type="text"
                value={templateData.name}
                onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                placeholder="Ex: DJ Snake"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Prénom du contact
              </label>
              <input
                type="text"
                value={templateData.contactFirstName}
                onChange={(e) => setTemplateData({ ...templateData, contactFirstName: e.target.value })}
                placeholder="Ex: John"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Ville
              </label>
              <input
                type="text"
                value={templateData.city}
                onChange={(e) => setTemplateData({ ...templateData, city: e.target.value })}
                placeholder="Ex: Paris"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Gigs récents
              </label>
              <input
                type="text"
                value={templateData.recentGigs}
                onChange={(e) => setTemplateData({ ...templateData, recentGigs: e.target.value })}
                placeholder="Ex: Club XYZ, Festival ABC"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Style musical
              </label>
              <input
                type="text"
                value={templateData.style}
                onChange={(e) => setTemplateData({ ...templateData, style: e.target.value })}
                placeholder="Ex: House, Techno, Hip-Hop"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
          </div>
        </div>

        {/* Template Preview */}
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
} 