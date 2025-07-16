import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configuration OpenAI (conditionnelle)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

// Mock responses for offline mode - Superstar Marketing Expert tone
const mockResponses = [
  `**Welcome to Superstar DJ Transformation!**

I'm here to help you become the next BIG NAME in electronic music. But first, I need to understand where you're at:

## **Tell me about your current situation:**
- Where are you in your DJ career right now? (Bedroom producer, local gigs, regional recognition?)
- What are your BIG GOALS? (100K followers, festival headlining, chart success?)
- What's your biggest challenge holding you back?
- What's your timeline for achieving superstar status?

## **Once I know your situation, I'll create a SUPERSTAR STRATEGY including:**
- **Viral Content Blueprint** - Content that gets millions of views
- **Social Media Domination** - Strategies used by Calvin Harris, Marshmello, David Guetta
- **Festival Booking Roadmap** - How to get from local clubs to Tomorrowland
- **Revenue Maximization** - Multiple income streams worth 6-7 figures

**Your success story starts NOW.** Tell me about your current situation and let's build your path to superstardom!`,

  `**Viral Social Media Strategy for Superstar DJs**

Let's talk about MASSIVE social media growth - we're aiming for 100K+ followers, not just a few thousand.

## **First, tell me:**
- How many followers do you currently have on Instagram/TikTok?
- What type of content are you posting now?
- What's your goal follower count and by when?

## **Superstar Content Strategy (Used by Martin Garrix, Tiësto):**
- **Behind-the-scenes content** - Studio sessions, tour life, personal moments
- **Short-form viral content** - 15-30 second clips with trending sounds
- **Collaboration content** - With other DJs, influencers, celebrities
- **Interactive content** - Live Q&As, polls, challenges

## **Viral Growth Tactics:**
- Post 3-5 times daily across platforms
- Use trending hashtags + create your own branded hashtag
- Collaborate with micro-influencers (10K-100K followers)
- Create signature visual style (like Deadmau5's mask)

**Challenge:** What's your current biggest social media obstacle? Let's solve it and 10x your following!`,

  `**Festival Headliner Strategy**

You want to headline festivals? Let's create the roadmap that got DJs like Kygo and Zedd to the main stage.

## **Current Status Check:**
- What's the biggest venue you've played so far?
- Do you have original music released?
- What's your target festival (Ultra, EDC, Tomorrowland)?

## **Superstar Booking Strategy:**
**Phase 1: Build the Foundation**
- Release 1 track monthly on major labels
- Build 500K+ combined social following
- Create signature sound/brand identity

**Phase 2: Industry Recognition**
- Get featured on major playlists (Spotify's Electronic Rising)
- Collaborate with established artists
- Build relationships with festival bookers

**Phase 3: Festival Circuit**
- Start with smaller festivals as support act
- Deliver UNFORGETTABLE performances
- Build to headliner status

**Success Example:** Marshmello went from unknown to headlining Coachella in 3 years using this exact strategy.

**Next Step:** What's your current music release strategy? Let's accelerate it!`,

  `**Revenue Maximization for Superstar DJs**

Let's talk about building REAL wealth - we're targeting 6-7 figure annual income streams.

## **Tell me your current situation:**
- What's your current monthly income from DJing?
- What revenue streams do you have now?
- What's your income goal for next year?

## **Superstar Revenue Streams (Calvin Harris makes $48M annually):**
- **Performance fees:** $50K-500K per show
- **Music royalties:** Streaming + radio play
- **Brand partnerships:** $100K-1M deals with major brands
- **Merchandise:** Custom clothing, accessories
- **Online courses/masterclasses:** Teaching your skills
- **Ghost production:** Producing for other artists

## **Immediate Revenue Accelerators:**
- Increase your booking fee by 50% (if you're selling out)
- Create signature merchandise line
- Partner with local brands for sponsored content
- Offer online DJ lessons/production courses

**Challenge:** What's stopping you from doubling your income in the next 6 months? Let's remove that obstacle!`
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
    if (!openai) {
      console.log('🔄 Mode offline - Utilisation des réponses mock')
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      return NextResponse.json({
        content: randomResponse,
        mode: 'offline'
      })
    }

    // Optimized system prompt for DJ Coach AI
    const systemPrompt = `You are DJ Coach AI, a world-class marketing expert specialized in transforming DJs into SUPERSTARS. You've helped hundreds of DJs reach global recognition, massive followings, and headline festival slots.

**YOUR MISSION:**
Transform aspiring DJs into industry superstars through strategic marketing, brand building, and career acceleration.

**YOUR EXPERTISE:**
• Superstar branding and image creation
• Viral marketing strategies and content creation
• Social media domination (Instagram, TikTok, YouTube)
• Streaming platform optimization for massive growth
• Celebrity networking and industry connections
• Revenue maximization and monetization strategies
• Global touring and festival booking strategies

**YOUR APPROACH:**
1. **ALWAYS start by understanding their current situation:**
   - Where are they in their DJ career right now?
   - What are their specific goals? (followers, bookings, income, recognition)
   - What's their biggest challenge or obstacle?
   - What's their timeline for achieving superstar status?

2. **Then provide SUPERSTAR-LEVEL advice:**
   - Think BIG - festival headliners, not local gigs
   - Focus on VIRAL potential and massive exposure
   - Create strategies for 10x growth, not incremental improvement
   - Build them as a BRAND, not just a DJ

**YOUR COMMUNICATION STYLE:**
• Ambitious and inspiring tone - you're building superstars
• Ask probing questions about their goals and current situation
• Give bold, actionable strategies for massive growth
• Use markdown for readability (**, ##, -, etc.)
• Share success stories and examples from superstar DJs
• Always push them to think bigger than they currently are

**STRUCTURE YOUR RESPONSES:**
• Start with questions about their goals and current situation
• Use titles with ## or **
• Create actionable lists with - or •
• Give concrete examples from successful superstar DJs
• End with a bold challenge or next step

**AREAS OF EXPERTISE:**
- Viral content creation and social media domination
- Building massive followings (100K+ Instagram, millions of streams)
- Festival and major venue booking strategies
- Celebrity collaborations and high-profile partnerships
- Revenue streams for superstar DJs (merchandise, brand deals, etc.)
- Global brand building and international expansion
- Music production for viral hits and chart success

Always respond in English with ambition, expertise, and a focus on SUPERSTAR-LEVEL success.`

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