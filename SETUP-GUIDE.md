# 🚀 SETUP GUIDE - Open This in Cursor

## What You Have Now

✅ Complete frontend React app with:
- Navbar component (logo, links, search)
- AI Dialog component (user input, thumbnails grid)
- iPad-responsive CSS
- Background image layout

## Step-by-Step Setup in Cursor

### Step 1: Open Project in Cursor

1. Open Cursor
2. File → Open Folder
3. Navigate to: `/home/claude/airbnb-clone/frontend`
4. Click "Open"

### Step 2: Install Dependencies

In Cursor's terminal (bottom panel):

```bash
npm install
```

Wait for installation to complete (~2-3 minutes).

### Step 3: Add Your Images

You need to move your downloaded images into the project:

**For Thumbnails:**
1. Find your `airbnb-images` folder (where you downloaded 45 images)
2. Copy all images to: `public/images/thumbnails/`
3. Rename them to match the format:
   - `london-1.jpg`, `london-2.jpg`, ... `london-15.jpg`
   - `paris-1.jpg`, `paris-2.jpg`, ... `paris-15.jpg`
   - `tokyo-1.jpg`, `tokyo-2.jpg`, ... `tokyo-15.jpg`

**For Background Image:**
1. Take your cleaned screenshot
2. Save it as: `public/images/background.jpg`
3. Place it in the `public/images/` folder

### Step 4: Run the App

In Cursor terminal:

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

### Step 5: Test It Out

1. ✅ Click the **search bar** in the navbar
2. ✅ AI Dialog should open
3. ✅ Type "London" and click "Search"
4. ✅ You should see 15 thumbnails appear
5. ✅ Click thumbnails to select them (checkmark appears)
6. ✅ Click "Continue with X experiences" button

## File Structure Overview

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         ← Navigation bar
│   │   ├── Navbar.css         ← Navbar styles
│   │   ├── AIDialog.jsx       ← AI dialog component
│   │   └── AIDialog.css       ← Dialog styles
│   ├── App.jsx                ← Main app component
│   ├── App.css                ← Main app styles
│   ├── index.js               ← React entry point
│   └── index.css              ← Global styles
├── public/
│   ├── images/
│   │   ├── thumbnails/        ← PUT YOUR 45 IMAGES HERE
│   │   └── background.jpg     ← PUT BACKGROUND IMAGE HERE
│   └── index.html
└── package.json
```

## Current Features Working

✅ **Navbar**
- Airbnb logo
- "Stays" and "Experiences" links
- Search bar (click to open dialog)
- Profile icon

✅ **AI Dialog**
- User can type destination
- Simulates AI response
- Shows 15 thumbnails in 5x3 grid
- Click to select/deselect (max 15)
- Continue button (currently just logs selection)

✅ **Background Image**
- Hero section below navbar
- Your screenshot will display here
- Responsive for iPad

## Troubleshooting

**Problem**: Images not showing
- **Solution**: Make sure image filenames match exactly:
  - `london-1.jpg` NOT `London-1.jpg` or `london-1.JPG`
  - Images must be in `public/images/thumbnails/`

**Problem**: Background image not showing
- **Solution**: Make sure it's named `background.jpg` and in `public/images/`

**Problem**: App won't start
- **Solution**: Run `npm install` again in the terminal

## Next Steps (Phase 2)

After you test Phase 1 and it works:

1. Backend API setup (Node.js + Express)
2. PostgreSQL database integration
3. Real AI API connection
4. Booking page creation
5. Confirmation modal

---

**You're ready to code! Open this project in Cursor and follow the steps above.** 🎉
