import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Mock responses for offline mode - Professional tone
const mockResponses = [
  `**DJ Development Strategy - 6 Month Plan**

To develop your DJ career effectively, here's a structured plan:

**Phase 1 (Months 1-2): Foundations**
- Define your unique musical style and personal brand
- Create a professional press kit with bio, photos, tracklist
- Optimize your profiles on all platforms (Instagram, SoundCloud, Spotify)

**Phase 2 (Months 3-4): Visibility**
- Post regular content (3-4 times/week)
- Collaborate with other DJs at your level
- Target local venues for your first bookings

**Phase 3 (Months 5-6): Expansion**
- Develop your professional network
- Create partnerships with promoters
- Analyze your performances and adjust your strategy

**Priority advice:** Focus on quality over quantity. Better to have 1000 true fans than 10,000 passive followers.`,

  `**Spotify Performance Analysis**

Here's how to optimize your Spotify statistics:

**Key metrics to monitor:**
- Track completion rate (>60% = excellent)
- Number of saves and playlist additions
- Audience geolocation
- Listening peaks (hours/days)

**Optimization strategies:**
- Release new tracks regularly (1-2 per month minimum)
- Pitch your tracks to playlist curators
- Use Spotify for Artists to understand your audience
- Collaborate with artists who have similar audiences

**Immediate action:** Analyze your 3 best performing tracks and identify common elements (BPM, style, structure).`,

  `**Instagram Strategy for DJs**

Instagram is crucial for your visibility. Here's how to break through:

**Content that works:**
- Behind-the-scenes in studio
- Live set excerpts (30-60 seconds)
- Interactive stories with polls and questions
- Collaborations with other artists

**Optimal timing:**
- Posts: 6pm-9pm on weekdays
- Stories: Multiple times per day
- Lives: Weekend evening (8pm-10pm)

**Strategic hashtags:**
Use a mix of popular hashtags (#DJ, #ElectronicMusic) and niche ones (#TechHouseParis, #UndergroundScene).

**Engagement:** Reply to all comments within 2 hours. The algorithm favors quick interaction.`,

  `**Professional Network Development**

Networking is essential in the music industry:

**Events to target:**
- Industry conferences (ADE, Midem, IMS)
- Local showcases and networking events
- Afterparties of major events

**Professional approach:**
- Prepare a 30-second elevator pitch
- Always exchange your contact details (digital business card)
- Follow up within 48h after meeting someone

**Tip:** Never directly ask for a booking during a first meeting. Build an authentic relationship first.`
]

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Validation des données
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Format de messages invalide' },
        { status: 400 }
      )
    }

    // Limite de longueur des messages
    const totalLength = messages.reduce((sum, msg) => sum + msg.content.length, 0)
    if (totalLength > 8000) {
      return NextResponse.json(
        { error: 'Conversation too long. Please create a new conversation.' },
        { status: 400 }
      )
    }

    // Vérifier si on a une clé API
    if (!process.env.OPENAI_API_KEY) {
      console.log('🔄 Mode offline - Utilisation des réponses mock')
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      return NextResponse.json({
        content: randomResponse,
        mode: 'offline'
      })
    }

    // Optimized system prompt for DJ Coach AI
    const systemPrompt = `You are DJ Coach AI, an expert in career development for DJs and electronic music producers.

**YOUR EXPERTISE:**
• Booking strategies and negotiation
• Music marketing and social media
• Streaming data analysis (Spotify, SoundCloud)
• Personal brand development
• Networking and industry relations
• Production techniques and performance

**YOUR COMMUNICATION STYLE:**
• Professional but accessible tone
• Structured responses with clear sections
• Actionable and specific advice
• Use markdown for readability (**, ##, -, etc.)
• Avoid emojis, favor a clean style
• Adapt your responses to the user's level

**STRUCTURE YOUR RESPONSES:**
• Use titles with ## or **
• Create lists with - or •
• Separate ideas into short paragraphs
• Give concrete examples
• End with priority advice

**AREAS OF EXPERTISE:**
- Booking and fee negotiation
- Instagram, TikTok, Spotify strategies
- Performance analysis and metrics
- Professional network development
- Music production and mixing techniques
- Career management and business plan

Always respond in English with expertise and clear structure.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      max_tokens: 1200,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const content = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse appropriée."

    // Vérification de la qualité de la réponse
    if (content.length < 50) {
      throw new Error('Réponse trop courte générée')
    }

    return NextResponse.json({
      content,
      mode: 'online',
      tokens: completion.usage?.total_tokens || 0
    })

  } catch (error: any) {
    console.error('❌ Erreur API DJ Coach:', error)
    
    // Gestion d'erreurs spécifiques
    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json({
        content: "Je suis temporairement surchargé. Veuillez réessayer dans quelques minutes.",
        mode: 'rate_limited',
        error: 'Rate limit exceeded'
      })
    }

    if (error.code === 'insufficient_quota') {
      return NextResponse.json({
        content: "Service temporairement indisponible. Veuillez réessayer plus tard.",
        mode: 'quota_exceeded',
        error: 'Quota exceeded'
      })
    }

    // Fallback avec réponse mock intelligente
    const fallbackResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
    
    return NextResponse.json({
      content: fallbackResponse,
      mode: 'fallback',
      error: error.message
    })
  }
} 