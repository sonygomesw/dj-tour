import { useState } from 'react'
import { GlassContainer } from './GlassContainer'
import { Button } from './button'
import { Copy, Check, Mail, Send, User, Building, Music, Star } from 'lucide-react'

interface ContextualEmailTemplatesProps {
  onComplete: () => void
  context: 'venue-inquiry' | 'dj-collaboration' | 'booking-request' | 'follow-up'
  userProfile?: {
    name: string
    city: string
    genre: string
    experience: string
  }
}

export function ContextualEmailTemplates({ 
  onComplete, 
  context, 
  userProfile = { name: 'DJ Name', city: 'Your City', genre: 'House', experience: 'Beginner' }
}: ContextualEmailTemplatesProps) {
  const [copied, setCopied] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [customizations, setCustomizations] = useState({
    recipientName: '',
    venueName: '',
    eventDate: '',
    additionalInfo: ''
  })

  const templates = {
    'venue-inquiry': [
      {
        subject: `DJ Inquiry - ${userProfile.name} for ${customizations.venueName || '[Venue Name]'}`,
        body: `Hi ${customizations.recipientName || '[Name]'},

I'm ${userProfile.name}, a ${userProfile.experience.toLowerCase()} ${userProfile.genre} DJ based in ${userProfile.city}. I've been following ${customizations.venueName || '[Venue Name]'} and love the energy you bring to the local scene.

I'd love to discuss the possibility of performing at your venue. I specialize in ${userProfile.genre} music and have experience creating the perfect atmosphere for different crowds.

I've attached my press kit with recent mixes, photos, and performance history. Would you be available for a brief call to discuss potential opportunities?

Best regards,
${userProfile.name}

📧 [your-email@example.com]
🎵 [soundcloud.com/yourprofile]
📱 [+1-234-567-8900]`,
        tips: [
          'Research the venue\'s music style before sending',
          'Mention specific events or nights you\'ve attended',
          'Keep it concise but show genuine interest'
        ]
      },
      {
        subject: `${userProfile.genre} DJ Available - ${userProfile.name}`,
        body: `Hello ${customizations.recipientName || '[Name]'},

Hope you're doing well! I'm ${userProfile.name}, a ${userProfile.genre} DJ from ${userProfile.city}. I came across ${customizations.venueName || '[Venue Name]'} and was impressed by your commitment to quality electronic music.

I'm reaching out to introduce myself and see if you have any upcoming opportunities for guest DJs. My sets focus on ${userProfile.genre} with influences from underground and commercial tracks that keep the dance floor moving.

Recent highlights:
• Performed at [Recent Venue 1] and [Recent Venue 2]
• Regular resident at [Local Club Name]
• Featured on [Local Radio Station] mix show

I'd love to contribute to your venue's atmosphere. My press kit is attached with recent performances and references.

Looking forward to hearing from you!

${userProfile.name}`,
        tips: [
          'Mention recent performances to show you\'re active',
          'Include specific musical influences',
          'Show you understand their venue\'s vibe'
        ]
      }
    ],
    'dj-collaboration': [
      {
        subject: `Collaboration Opportunity - ${userProfile.name}`,
        body: `Hey ${customizations.recipientName || '[DJ Name]'},

I'm ${userProfile.name}, a ${userProfile.genre} DJ from ${userProfile.city}. I've been following your work and really respect your style and approach to ${userProfile.genre} music.

I'm interested in exploring potential collaborations - whether that's back-to-back sets, co-hosting events, or working on some music together. I think our styles could complement each other really well.

Some ideas I had:
• Back-to-back set at [Venue Name]
• Monthly event series focusing on ${userProfile.genre}
• Collaborative mix for SoundCloud/podcast

I'd love to grab coffee sometime and discuss possibilities. Let me know if you're interested!

Best,
${userProfile.name}`,
        tips: [
          'Show you know their work specifically',
          'Suggest concrete collaboration ideas',
          'Keep the tone friendly and professional'
        ]
      }
    ],
    'booking-request': [
      {
        subject: `Booking Request - ${userProfile.name} for ${customizations.eventDate || '[Event Date]'}`,
        body: `Hi ${customizations.recipientName || '[Name]'},

I hope this message finds you well. I'm ${userProfile.name}, a ${userProfile.genre} DJ based in ${userProfile.city}, and I'm interested in performing at ${customizations.venueName || '[Venue/Event Name]'}.

Event Details:
• Date: ${customizations.eventDate || '[Event Date]'}
• Duration: [Set Length - e.g., 2 hours]
• Style: ${userProfile.genre} with crowd-reading adaptability
• Equipment: Can work with CDJs, controllers, or vinyl

I bring high energy, professional presentation, and a deep understanding of how to read and move a crowd. My goal is always to create an unforgettable experience for your guests.

Attached you'll find:
• Recent performance videos
• Press kit with bio and photos
• References from previous bookings
• Sample mixes

I'm flexible with rates and excited about the possibility of working together. When would be a good time to discuss details?

Best regards,
${userProfile.name}`,
        tips: [
          'Be specific about event details',
          'Show flexibility in your approach',
          'Include all necessary attachments'
        ]
      }
    ],
    'follow-up': [
      {
        subject: `Following up - ${userProfile.name}`,
        body: `Hi ${customizations.recipientName || '[Name]'},

I wanted to follow up on my previous message about performing at ${customizations.venueName || '[Venue Name]'}. I understand you're probably busy, but I wanted to make sure my email didn't get lost in your inbox.

I'm still very interested in the opportunity and would love to discuss how I can contribute to your venue's success. I've since:
• ${customizations.additionalInfo || 'Added recent performance/achievement'}
• Updated my press kit with new material
• Received positive feedback from recent shows

If now isn't the right time, I completely understand. I'd appreciate any feedback or suggestions for future opportunities.

Thanks for your time and consideration.

Best,
${userProfile.name}`,
        tips: [
          'Keep follow-ups brief and polite',
          'Add new information since last contact',
          'Show respect for their time'
        ]
      }
    ]
  }

  const currentTemplates = templates[context] || []
  const currentTemplate = currentTemplates[selectedTemplate]

  const handleCopy = () => {
    if (currentTemplate) {
      const emailContent = `Subject: ${currentTemplate.subject}\n\n${currentTemplate.body}`
      navigator.clipboard.writeText(emailContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const contextTitles = {
    'venue-inquiry': 'Venue Inquiry Templates',
    'dj-collaboration': 'DJ Collaboration Templates', 
    'booking-request': 'Booking Request Templates',
    'follow-up': 'Follow-up Templates'
  }

  const contextIcons = {
    'venue-inquiry': Building,
    'dj-collaboration': User,
    'booking-request': Star,
    'follow-up': Mail
  }

  const ContextIcon = contextIcons[context]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
            <ContextIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {contextTitles[context]}
        </h3>
        <p className="text-gray-600">
          Professional email templates customized for your DJ profile
        </p>
      </div>

      {/* Template Selection */}
      {currentTemplates.length > 1 && (
        <div className="flex justify-center space-x-2">
          {currentTemplates.map((_, index) => (
            <Button
              key={index}
              size="sm"
              variant={selectedTemplate === index ? 'default' : 'outline'}
              onClick={() => setSelectedTemplate(index)}
              className="bg-white/5"
            >
              Template {index + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Customization Fields */}
      <GlassContainer className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Customize Your Email</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={customizations.recipientName}
              onChange={(e) => setCustomizations({...customizations, recipientName: e.target.value})}
              placeholder="John Smith"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Venue/Event Name
            </label>
            <input
              type="text"
              value={customizations.venueName}
              onChange={(e) => setCustomizations({...customizations, venueName: e.target.value})}
              placeholder="Club XYZ"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          {context === 'booking-request' && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Event Date
              </label>
              <input
                type="text"
                value={customizations.eventDate}
                onChange={(e) => setCustomizations({...customizations, eventDate: e.target.value})}
                placeholder="Saturday, March 15th"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Additional Info
            </label>
            <input
              type="text"
              value={customizations.additionalInfo}
              onChange={(e) => setCustomizations({...customizations, additionalInfo: e.target.value})}
              placeholder="Recent achievement or update"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>
      </GlassContainer>

      {/* Template Preview */}
      {currentTemplate && (
        <GlassContainer className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Email Preview</h4>
            <Button
              onClick={handleCopy}
              className="bg-violet-500 hover:bg-violet-600 text-white"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email
                </>
              )}
            </Button>
          </div>
          
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-900">Subject: </span>
              <span className="text-sm text-gray-600">{currentTemplate.subject}</span>
            </div>
                          <div className="border-t border-gray-200 pt-4">
              <pre className="text-sm text-gray-900 whitespace-pre-wrap font-sans">
                {currentTemplate.body}
              </pre>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h5 className="font-medium text-blue-400 mb-2">💡 Email Tips</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {currentTemplate.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </GlassContainer>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={onComplete}
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600"
        >
          <Send className="w-4 h-4 mr-2" />
          Complete Mission
        </Button>
      </div>
    </div>
  )
} 