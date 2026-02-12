# Airbnb Experiences Clone - Frontend

## Phase 1: Frontend Setup ✅

This is the frontend React application for the Airbnb Experiences clone project.

## Features Implemented

- ✅ Navbar with logo, navigation links, and search bar
- ✅ AI Dialog box with user input for destination search
- ✅ Thumbnail grid display (15 images) with selection functionality
- ✅ Background hero image below header
- ✅ iPad-responsive design (768px - 1024px optimized)

## Project Structure

```
frontend/
├── public/
│   ├── images/
│   │   ├── thumbnails/     # Your 45 city images go here
│   │   └── background.jpg  # Your background screenshot
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── AIDialog.jsx
│   │   └── AIDialog.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Add Your Images

Place your images in the correct folders:

- **Thumbnails**: `public/images/thumbnails/`
  - london-1.jpg through london-15.jpg
  - paris-1.jpg through paris-15.jpg
  - tokyo-1.jpg through tokyo-15.jpg
  - (New York when ready)

- **Background**: `public/images/background.jpg`

### 3. Run the Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## How It Works

1. **Click Search Bar** → Opens AI Dialog
2. **Type City Name** (London, Paris, Tokyo) → Click "Search"
3. **AI Shows 15 Thumbnails** → Click to select (up to 15)
4. **Click "Continue"** → Logs selection (Phase 2 will navigate to booking page)

## iPad Testing

- **Portrait**: 768px width
- **Landscape**: 1024px width

Open browser DevTools and set device to iPad for testing.

## Next Phase

Phase 2 will add:
- Backend API (Node.js + Express)
- PostgreSQL database
- Real AI integration
- Booking page and confirmation flow

---

**Created by**: Michael  
**Project**: Pursuit Capstone - Airbnb Clone  
**Date**: February 2026
