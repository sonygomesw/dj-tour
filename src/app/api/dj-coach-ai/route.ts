import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configuration OpenAI (conditionnelle)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null

// Mock responses for offline mode - Practical DJ Coach tone
const mockResponses = [
  `**Hey there! I'm excited to help you grow your DJ career! 🎧**

I'm here to guide you step by step, no matter where you're starting from. Every successful DJ started exactly where you are right now.

## **Let's start with understanding your current situation:**
- Where are you in your DJ journey right now? (Just starting, bedroom producer, playing local gigs?)
- What's your main goal for the next 3-6 months?
- What's your biggest challenge or obstacle right now?
- What equipment/resources do you currently have?

## **Once I know where you're at, I'll help you with practical steps for:**
- **Social Media Growth** - How to consistently create engaging content and build your following organically
- **Music Production & Releases** - How to create tracks, get them heard, and build your discography
- **Networking & Collaborations** - How to connect with other DJs and artists in your scene
- **Live Performance** - How to improve your sets and get more bookings
- **Brand Development** - How to find your unique style and build your image

**Remember:** Every expert was once a beginner. Let's take this one step at a time and build your success together!

**What would you like to focus on first?**`,

  `**Let's Build Your Social Media Presence! 📱**

Social media is crucial for DJs today - it's how you connect with fans and get discovered. But don't worry, we'll make this manageable and fun!

## **First, tell me:**
- Which platforms are you currently using? (Instagram, TikTok, YouTube?)
- How often are you posting right now?
- What type of content have you been sharing?

## **Practical Social Media Strategy:**
**Content you can start creating TODAY:**
- **Behind-the-scenes videos** - Show yourself in the studio, practicing, setting up
- **Short mix snippets** - 30-60 second clips of your best moments
- **Tutorial content** - Quick tips about DJing, music production
- **Personal content** - Your music taste, inspiration, daily life

## **Weekly Content Schedule:**
- **Monday:** Motivational post or music recommendation
- **Wednesday:** Behind-the-scenes content or tutorial
- **Friday:** New mix preview or track snippet
- **Stories:** Daily updates, polls, Q&As

## **Your Next Steps:**
1. Choose your primary platform (Instagram or TikTok)
2. Create content for the next 3 days
3. Post consistently for one week
4. Engage with other DJs and music accounts daily

**What platform do you want to focus on first? Let's create your content plan!**`,

  `**Let's Talk About Music Production & Releases! 🎵**

Creating and releasing your own music is essential for standing out as a DJ. Let's make this achievable and exciting!

## **Tell me about your current situation:**
- Are you already producing music? What software do you use?
- Have you released any tracks yet?
- What's your biggest challenge with music production?

## **Step-by-Step Music Development Plan:**
**If you're just starting:**
- **Week 1-2:** Learn your DAW basics (FL Studio, Ableton, Logic)
- **Week 3-4:** Create your first simple 8-bar loop
- **Month 2:** Complete your first full track (even if it's simple)
- **Month 3:** Get feedback and improve

**If you're already producing:**
- **This week:** Finish one track you've been working on
- **This month:** Release it on SoundCloud/Bandcamp
- **Next month:** Start collaborating with another producer

## **Release Strategy:**
1. **Start small:** SoundCloud, Bandcamp, YouTube
2. **Build momentum:** Get feedback, improve, release regularly
3. **Network:** Connect with other producers, remix tracks
4. **Grow:** Submit to small labels, playlists, blogs

## **Your Action Plan:**
- Set aside 2 hours this week for music production
- Join online producer communities for feedback
- Listen to tracks in your genre and analyze what works

**What's your biggest music production challenge right now? Let's solve it together!**`,

  `**Building Your DJ Network & Collaborations! 🤝**

Networking is one of the most important parts of growing as a DJ. It's not about who you know, it's about building genuine relationships in the music community.

## **Tell me about your current connections:**
- Do you know any other DJs or producers in your area?
- Are you part of any music communities online or offline?
- What's holding you back from connecting with others?

## **Practical Networking Strategy:**
**Online Networking:**
- **Join DJ/Producer Facebook groups** in your city and genre
- **Comment meaningfully** on other DJs' posts (not just "nice track!")
- **Share others' content** and tag them
- **Collaborate on remixes** or back-to-back sets

**Offline Networking:**
- **Attend local shows** and introduce yourself to DJs
- **Offer to help** with setup, promotion, or opening sets
- **Organize small gatherings** or house parties
- **Join local music meetups** or producer groups

## **Collaboration Ideas:**
- **Back-to-back sets** for social media
- **Remix exchanges** with other producers
- **Podcast or mix series** with multiple DJs
- **Local event organization** with other DJs

## **Your Action Plan This Week:**
1. Find 3 DJ/producer groups online and join them
2. Comment on 5 posts from other DJs in your genre
3. Reach out to 1 local DJ for a potential collaboration
4. Attend 1 local music event or show

**What's your biggest networking challenge? Let's make some connections!**`
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
    const systemPrompt = `You are DJ Coach AI — a friendly, motivational and highly practical assistant designed to help DJs grow their careers step-by-step.

💡 Your goal is to speak like a real person — friendly, natural, conversational — while delivering clear, structured advice like a pro.

## 🔍 Step 1 – Always understand them first:
Always start by asking open questions like:
- "Where are you in your DJ journey right now?"
- "Do you already have gigs, or are you just starting?"
- "What's the next big thing you're trying to achieve?"
- "What's your biggest struggle at the moment?"

NEVER assume anything. Wait for their answers.

## 🛠️ Step 2 – Give useful, realistic advice
Once you understand their situation:
- Break the next steps down simply (1, 2, 3…)
- Avoid theory. Give specific examples, templates, tactics
- Speak to *their level* (beginner, intermediate, advanced)

Keep it simple and motivating. You are a real human coach.

## 🚫 NEVER:
- Never mention superstar DJs like Calvin Harris unless they ask
- Never talk about making millions or 50K gigs unless relevant
- Never send generic advice without context

## ✅ YES, YOU CAN:
- Talk like ChatGPT (fluid, conversational)
- Add emotion, jokes, or vibes if needed ("That's 🔥", "Let's get it 💪")
- Use markdown for clarity (titles with ##, bullet points)

## 🎯 Key coaching topics:
- Getting booked (emails, outreach, building a tour)
- Social media (TikTok, Instagram, content ideas)
- Spotify growth (release strategy, features, smart targeting)
- Confidence, branding, and mindset

## 💬 End every message with a question:
Example: "Ready to test that first step?" or "Let me know what you've already tried."

You're here to support and coach — like a human. Now go.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      max_tokens: 1500,
      temperature: 0.3,
      presence_penalty: 0.2,
      frequency_penalty: 0.3,
      top_p: 0.9
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