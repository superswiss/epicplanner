# Operation: Epic Universe - Mission Brief

A lightweight web application for coordinating your Epic Universe trip with friends.

## Features

- **Operative Selection**: Choose your agent profile
- **Mission Checklists**: Track pre-deployment and arrival tasks
- **Preference Profiles**: Record ride preferences, dining choices, and meal plans
- **Local Storage**: All data saved in your browser
- **Mobile Responsive**: Works on desktop and mobile devices

## How to Deploy to GitHub Pages (Free Hosting)

### Step 1: Create a GitHub Account
If you don't have one already, sign up at [github.com](https://github.com)

### Step 2: Create a New Repository
1. Go to GitHub and click the "+" icon in the top right
2. Select "New repository"
3. Name it something like `epic-universe-mission` (lowercase, no spaces)
4. Make it **Public**
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 3: Upload Your Files
1. On the repository page, click "uploading an existing file"
2. Drag and drop these three files:
   - `index.html`
   - `app.js`
   - `README.md`
3. Scroll down and click "Commit changes"

### Step 4: Enable GitHub Pages
1. In your repository, click "Settings"
2. Scroll down to "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Wait a minute or two for deployment

### Step 5: Access Your Site
Your site will be live at:
```
https://[your-username].github.io/[repository-name]/
```

For example: `https://johndoe.github.io/epic-universe-mission/`

## Usage

1. Share the link with your group members
2. Each person selects their operative profile
3. Complete checklists and enter preferences
4. Data is saved locally in each person's browser

## Data Storage

- All data is stored in the browser's localStorage
- No server or database required
- Each user's data stays on their device
- To reset: Clear browser data or use browser dev tools

## Customization

To modify the content:
1. Edit `index.html` for structure and text
2. Edit `app.js` for data (agents, rides, resources, etc.)
3. Commit and push changes to GitHub

## Files

- `index.html` - Main HTML structure and styling
- `app.js` - JavaScript functionality and data
- `README.md` - This file

## Technical Details

- Pure HTML/CSS/JavaScript (no frameworks needed)
- No build process required
- Lightweight and fast
- Works offline after first load

---

**Mission Status**: Ready for Deployment 🚀
