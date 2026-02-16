# Fill Their Suitcase — Content Analyzer

## Quick Setup (5 minutes)

### Step 1: Get Anthropic API Key (2 min)
1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click "Get API Keys"
4. Click "Create Key"
5. Copy your key (starts with `sk-ant-...`)

### Step 2: Deploy to Vercel (3 min)
1. Go to https://vercel.com
2. Sign up (use GitHub login)
3. Click "Add New" → "Project"
4. Drag the entire `fts-app` folder into the upload area
5. Click "Environment Variables"
6. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** [paste your key from Step 1]
7. Click "Deploy"
8. Wait 2 minutes
9. Click your live URL to open the app

### That's it!

Your app is live and ready to use. Bookmark the URL on your phone.

## Usage

1. Open your URL on any device
2. Upload an image from your camera roll
3. Click "Analyze Image"  
4. Get instant caption suggestions + feedback
5. Copy caption and paste into Instagram

## Cost

- Vercel: Free forever
- Anthropic: $5 free credit (~150-500 analyses)
- After free credit: ~$0.01-0.03 per image

## Troubleshooting

**404 Error or "Not Found"**
- Make sure you dragged the entire `fts-app` folder (not individual files)
- Vercel should auto-detect it as a Node.js project
- Wait 2-3 minutes after deployment

**"Failed to analyze"**
- Check your API key is correct in Vercel environment variables
- Check you have API credit at console.anthropic.com

**App loads but analyze button doesn't work**
- Check browser console for errors (F12)
- Make sure `/api/analyze` endpoint is deployed (check Vercel functions tab)
