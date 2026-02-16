const Anthropic = require('@anthropic-ai/sdk');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: imageBase64
            }
          },
          {
            type: 'text',
            text: `You are the content strategist for Fill Their Suitcase, a luxury family travel Instagram brand (@filltheirsuitcase). Analyze this image and provide four things:

**BRAND CONTEXT:**
- Voice: Refined, warm, confident, genuine, editorial (like Travel + Leisure meets family travel)
- Aesthetic: DM Serif Display font, terracotta/charcoal/ivory palette, bold editorial design
- Content pillars: Luxury hotels, Disney/cruises, international family travel, honest reviews
- Audience: Affluent families who value experiences, aspire to luxury but want real recommendations

**YOUR TASK:**

1) **CAPTION SUGGESTIONS** — Write 3 Instagram caption options in the Fill Their Suitcase voice:
   - Hook (first line must stop the scroll)
   - Body (2-4 sentences, personal and specific)
   - CTA (question or action that drives engagement)
   - Hashtags (8-12 relevant, mix of broad and niche)
   Format each as a complete ready-to-post caption.

2) **BRAND VOICE CHECK** — Does this image fit the Fill Their Suitcase brand? Why or why not? Be specific about what works and what could be adjusted.

3) **VISUAL FEEDBACK** — Analyze the image quality, composition, lighting, and editorial appeal. Would this stop the scroll? Does it feel luxury-editorial or generic travel snap?

4) **ENGAGEMENT TACTICS** — Suggest 2-3 specific ways to maximize saves, shares, and comments based on this image and content type.

Format your response with clear headers: CAPTION 1:, CAPTION 2:, CAPTION 3:, BRAND VOICE:, VISUAL FEEDBACK:, ENGAGEMENT TACTICS:`
          }
        ]
      })
    });

    const text = message.content.find(c => c.type === 'text')?.text || '';

    // Parse sections
    function extractSection(text, header) {
      const regex = new RegExp(
        `${header}[:\\s]*([\\s\\S]*?)(?=(?:CAPTION|BRAND VOICE|VISUAL FEEDBACK|ENGAGEMENT TACTICS)[:\\s]|$)`,
        'i'
      );
      const match = text.match(regex);
      return match ? match[1].trim() : '';
    }

    function extractFirstCaption(captionsText) {
      const match = captionsText.match(/CAPTION 1[:\s]*([\s\S]*?)(?=CAPTION [23]|$)/i);
      return match ? match[1].trim() : '';
    }

    const captions = extractSection(text, 'CAPTION');
    const voice = extractSection(text, 'BRAND VOICE');
    const visual = extractSection(text, 'VISUAL FEEDBACK');
    const engagement = extractSection(text, 'ENGAGEMENT TACTICS');
    const firstCaption = extractFirstCaption(captions);

    return res.status(200).json({
      captions: captions || 'No caption suggestions found.',
      voice: voice || 'No voice analysis found.',
      visual: visual || 'No visual feedback found.',
      engagement: engagement || 'No engagement tactics found.',
      firstCaption: firstCaption
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to analyze image' });
  }
};
