# AI Profile Analysis Setup Guide

## 🎯 Overview

The AI Profile Analysis feature uses OpenAI's GPT-4o Vision model to analyze DJ social media profiles and provide personalized, actionable recommendations based on DJ Tour's specific tools and missions.

## 🔧 Setup Instructions

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key (starts with `sk-`)

### 2. Configure Environment Variables

Create a `.env.local` file in the `dj-tour/` directory:

```bash
# OpenAI API Key for AI Profile Analysis
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Supabase Configuration (if not already set)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### 3. Install Dependencies

The OpenAI package is already installed. If you need to reinstall:

```bash
npm install openai
```

### 4. Test the Feature

1. Start the development server: `npm run dev`
2. Go to the Dashboard page
3. Scroll to the "AI Profile Analysis" section
4. Upload screenshots from Instagram, Spotify for Artists, and TikTok
5. Click "Analyze My Profiles"

## 🤖 Model Configuration

- **Model**: GPT-4o (optimal balance of speed, quality, and cost)
- **Max Tokens**: 1200 per analysis, 1000 for global analysis
- **Temperature**: 0.7 (balanced creativity and consistency)

## 📊 Analysis Features

### Individual Platform Analysis
- **Instagram**: Followers, bio effectiveness, content quality, booking accessibility
- **Spotify**: Monthly listeners, top cities, release strategy, playlist presence
- **TikTok**: Followers, viral potential, content consistency, engagement

### Global Strategic Analysis
- Cross-platform synergy opportunities
- Booking potential scoring (1-100)
- 60-day action plan with specific DJ Tour missions
- Revenue growth strategies

## 🎯 DJ Tour Integration

The AI provides recommendations specifically tailored to DJ Tour's features:

- **Missions**: TikTok Daily Mission, Instagram Campaign, Release Strategy
- **Tour Builder**: Target cities based on Spotify data
- **Email Templates**: Booking emails with personalized metrics
- **Presskit Creator**: Professional photos and branding
- **Content Strategy**: Platform-specific content recommendations

## 💡 Example AI Recommendations

### Instagram
- "Use DJ Tour's Instagram Mission to create 7-day content series"
- "Upload professional photos to presskit builder"
- "Activate booking email templates for DM responses"

### Spotify
- "Use DJ Tour's Tour Builder to target Berlin, Paris, London"
- "Create booking emails highlighting 40K monthly listeners"
- "Activate Release Strategy Mission for consistent uploads"

### TikTok
- "Start DJ Tour's TikTok Daily Mission for consistent posting"
- "Create 'Day in the life of a DJ' series"
- "Use trending sounds with your original mixes"

## 🔒 Security & Privacy

- Images are processed securely through OpenAI's API
- No images are stored permanently
- API calls are made server-side only
- Environment variables are kept secure

## 💰 Cost Considerations

- GPT-4o Vision: ~$0.01-0.03 per analysis
- Typical analysis (3 images + global): ~$0.05-0.10
- Cost-effective for the value provided

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to analyze profiles"**
   - Check your OpenAI API key is correct
   - Ensure you have credits in your OpenAI account
   - Verify the images are valid (JPG, PNG, WebP)

2. **API Key not found**
   - Make sure `.env.local` is in the correct directory
   - Restart the development server after adding env variables
   - Check the variable name is exactly `OPENAI_API_KEY`

3. **Slow analysis**
   - GPT-4o is fast but complex analyses take 10-30 seconds
   - Multiple images are processed sequentially
   - Network speed affects response time

### Debug Mode

To enable detailed logging, add to your `.env.local`:

```bash
DEBUG_AI_ANALYSIS=true
```

## 🚀 Production Deployment

For production deployment:

1. Add environment variables to your hosting platform
2. Ensure OpenAI API key has sufficient credits
3. Monitor usage and costs
4. Consider rate limiting for high-traffic scenarios

## 📈 Future Enhancements

Potential improvements:
- Batch processing for faster analysis
- Historical tracking of recommendations
- Integration with mission completion tracking
- Custom prompts for different DJ genres
- Multi-language support

## 🆘 Support

If you encounter issues:
1. Check this guide first
2. Verify your OpenAI API key and credits
3. Test with different images
4. Check browser console for errors
5. Restart the development server

The AI Profile Analysis feature is designed to provide actionable, DJ Tour-specific recommendations that help DJs grow their careers and increase their booking potential. 