# ⚡ QUICK START COMMANDS

## After Moving to git-practice Folder

### 1️⃣ Setup Database (One Time Only)

```bash
# Create database
psql postgres
CREATE DATABASE airbnb_clone;
\q

# Run schema
cd backend
psql -U postgres -d airbnb_clone -f db/schema.sql
```

---

### 2️⃣ Install Dependencies (One Time Only)

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your DB password

# Frontend  
cd ../frontend
npm install
```

---

### 3️⃣ Start Development Servers (Every Time)

**Open TWO terminals:**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running at http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend running at http://localhost:3000

---

### 4️⃣ Test Flow

1. Open http://localhost:3000
2. Click search bar
3. Type "London" → Search
4. Select experiences
5. Click "Continue"
6. Fill booking details
7. Reserve!

---

### 5️⃣ Push to GitHub

```bash
cd airbnb-clone
git add .
git commit -m "Your message"
git push origin main
```

---

## File Locations Checklist

✅ Images in: `frontend/public/images/thumbnails/`
✅ Background in: `frontend/public/images/background.jpg`
✅ .env created in: `backend/.env`
✅ Database created: `airbnb_clone`

---

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/experiences` - All experiences
- `GET /api/experiences/city/london` - London experiences
- `POST /api/bookings` - Create booking
- `POST /api/bookings/bulk` - Create multiple bookings

---

That's it! 🚀
