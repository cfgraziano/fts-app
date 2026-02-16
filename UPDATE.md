# How to Update Your App

## What Changed
Added automatic image compression! Now all images are:
- Resized to max 1200px (maintains aspect ratio)
- Compressed to 85% quality JPEG
- Reduces file size by 70-80%
- Saves you money on API costs
- Makes uploads faster

A 5MB iPhone photo becomes ~500KB — perfect for analysis!

## How to Deploy the Update

### Option 1: Upload via GitHub Website (Easiest)
1. Go to github.com → your `fts-app` repository
2. Click on `index.html`
3. Click the pencil icon (Edit this file)
4. Delete everything in that file
5. Open the NEW `index.html` from this folder
6. Copy all the text and paste it into GitHub
7. Scroll down → Click "Commit changes"
8. Vercel will auto-deploy in 2 minutes!

### Option 2: Replace File via Upload
1. Go to github.com → your `fts-app` repository
2. Click `index.html` → Click trash icon (Delete file) → Commit
3. Click "Add file" → "Upload files"
4. Drag the NEW `index.html` from this folder
5. Click "Commit changes"
6. Vercel auto-deploys!

## Test It
1. Go to your app URL
2. Upload a large photo (3-5MB)
3. It will compress automatically before analyzing
4. Check the console (F12) to see the compressed size

Done! Your app now saves you money on every upload. 💰
