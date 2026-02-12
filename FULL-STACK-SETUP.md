# 🚀 COMPLETE FULL-STACK SETUP GUIDE

## Project Overview

Complete Airbnb Experiences Clone with:
- ✅ Frontend: React with AI Dialog (8×2 grid) + Booking Page (3×2 grid)
- ✅ Backend: Node.js + Express API
- ✅ Database: PostgreSQL
- ✅ iPad-responsive design

---

## 📁 Project Structure

```
airbnb-clone/
├── frontend/                  # React frontend
│   ├── public/
│   │   └── images/
│   │       ├── thumbnails/    # Your 45 images go here
│   │       └── background.jpg # Your hero image
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── AIDialog.jsx   # AI search dialog (8×2 grid)
│   │   │   └── BookingPage.jsx # Booking page (3×2 grid)
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── backend/                   # Express backend
│   ├── routes/
│   │   ├── experiences.js     # Experience API routes
│   │   └── bookings.js        # Booking API routes
│   ├── db/
│   │   ├── database.js        # PostgreSQL connection
│   │   └── schema.sql         # Database schema
│   ├── server.js              # Express server
│   ├── .env.example
│   └── package.json
│
└── SETUP-GUIDE.md            # This file
```

---

## 🔧 STEP 1: Move to git-practice Folder

1. **Copy the entire `airbnb-clone` folder** to your `git-practice` folder
2. **Move your images:**
   - Copy all 45 images from `airbnb-images` to:
     `git-practice/airbnb-clone/frontend/public/images/thumbnails/`
   - Add your background screenshot to:
     `git-practice/airbnb-clone/frontend/public/images/background.jpg`

---

## 🗄️ STEP 2: Setup PostgreSQL Database

### Install PostgreSQL (if not installed)

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### Create Database

```bash
# Access PostgreSQL
psql postgres

# Create database
CREATE DATABASE airbnb_clone;

# Exit psql
\q
```

### Run Schema

```bash
cd backend
psql -U postgres -d airbnb_clone -f db/schema.sql
```

This creates:
- `experiences` table with 45 pre-loaded experiences (London, Paris, Tokyo)
- `bookings` table for storing reservations

---

## 🖥️ STEP 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database password
# DB_PASSWORD=your_postgres_password

# Start backend server
npm run dev
```

Backend runs at: **http://localhost:5000**

### Test Backend

Open browser: **http://localhost:5000/api/health**

Should see: `{"status":"ok","message":"Server is running"}`

---

## 💻 STEP 4: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start frontend dev server
npm start
```

Frontend runs at: **http://localhost:3000**

---

## ✅ STEP 5: Test the Complete Flow

1. **Homepage loads** → See background image and navbar
2. **Click search bar** → AI Dialog opens
3. **Type "London"** → Click "Search"
4. **See 15 thumbnails** in 8×2 grid
5. **Select 3-5 experiences** → Checkmarks appear
6. **Click "Continue with X experiences"**
7. **Booking page loads** with 3×2 grid
8. **Fill in date/time** for each experience
9. **Click "Reserve All Experiences"**
10. **Check console** → See reservation data

---

## 🎯 Current Features Working

### Frontend:
- ✅ Navbar with search
- ✅ AI Dialog (8 columns × 2 rows = 15 thumbnails)
- ✅ Thumbnail selection (up to 15)
- ✅ Navigation to Booking Page
- ✅ Booking Page (3×2 grid, larger thumbnails 288px×192px)
- ✅ Date/Time pickers
- ✅ Guest selection
- ✅ Total cost calculator
- ✅ iPad responsive

### Backend:
- ✅ Express server
- ✅ PostgreSQL database with 45 experiences
- ✅ GET /api/experiences (all experiences)
- ✅ GET /api/experiences/city/:cityName (by city)
- ✅ POST /api/bookings (create booking)
- ✅ POST /api/bookings/bulk (multiple bookings)

---

## 🔄 STEP 6: Connect Frontend to Backend (Optional - Phase 3)

Currently, frontend uses mock data. To connect to real backend:

### Update AIDialog.jsx:

Replace the mock `handleSubmit` function with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!userInput.trim()) return;

  setIsLoading(true);
  
  try {
    // Call backend API
    const response = await fetch(`http://localhost:5000/api/experiences/city/${userInput}`);
    const data = await response.json();
    
    setAiResponse(`Great choice! I found ${data.length} amazing experiences in ${userInput}.`);
    setThumbnails(data);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    setAiResponse('Sorry, something went wrong. Please try again.');
  }
  
  setIsLoading(false);
};
```

### Update BookingPage.jsx:

Replace the `handleReservation` function with:

```javascript
const handleReservation = async () => {
  const allFilled = bookings.every(b => b.date && b.time);
  
  if (!allFilled) {
    alert('Please fill in date and time for all experiences');
    return;
  }

  try {
    // Send to backend
    const response = await fetch('http://localhost:5000/api/bookings/bulk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookings: bookings.map(b => ({
          experience_id: b.id,
          booking_date: b.date,
          booking_time: b.time,
          guests: b.guests,
          total_price: b.price * b.guests
        }))
      })
    });
    
    const data = await response.json();
    alert(`Reservation confirmed! Total: $${totalCost}\nBooking IDs: ${data.map(b => b.id).join(', ')}`);
  } catch (error) {
    console.error('Error creating reservation:', error);
    alert('Failed to create reservation. Please try again.');
  }
};
```

---

## 📱 STEP 7: Test on iPad Dimensions

In Chrome DevTools:
1. Press **F12**
2. Click **Device Toggle** icon (phone/tablet)
3. Select **iPad** or **iPad Pro**
4. Test portrait (768px) and landscape (1024px)

---

## 🚀 STEP 8: Push to GitHub

```bash
cd airbnb-clone

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Complete Airbnb clone full-stack app"

# Add remote (your repo)
git remote add origin https://github.com/YOUR_USERNAME/airbnb-clone.git

# Push
git push -u origin main
```

---

## 🎓 For Your Presentation (October 29)

### Demo Flow:
1. Show homepage with hero image
2. Click search → Type "Paris"
3. Show 15 Paris experiences in 8×2 grid
4. Select 4-5 experiences
5. Navigate to booking page
6. Fill in dates/times
7. Show total cost calculation
8. Complete reservation
9. Show in database (optional)

### Key Features to Highlight:
- AI-powered destination search
- Visual thumbnail selection (8×2 grid)
- Seamless booking flow (3×2 grid with 192px height)
- Real-time cost calculation
- Full-stack integration (React + Node + PostgreSQL)
- iPad-optimized responsive design

---

## 📝 Troubleshooting

**Images not showing?**
- Check filenames match exactly: `london-1.jpg` not `London-1.jpg`
- Verify images are in `public/images/thumbnails/`

**Backend won't start?**
- Check PostgreSQL is running: `brew services list`
- Verify .env has correct DB password
- Check port 5000 is not in use

**Frontend won't connect to backend?**
- Make sure backend is running on port 5000
- Check CORS is enabled in server.js
- Verify API URLs use `http://localhost:5000`

---

## 🎉 You're Done!

You now have a complete full-stack Airbnb clone ready to:
- Test locally
- Present at Pursuit
- Push to GitHub
- Add to your portfolio

**Good luck with your presentation!** 🚀

---

**Created by**: Michael  
**Bootcamp**: Pursuit  
**Capstone Project**: Airbnb Experiences Clone  
**Presentation Date**: October 29, 2026
