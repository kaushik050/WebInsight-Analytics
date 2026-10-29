# WebInsight Analytics: Interactive Domain-Based Analytics & Visualization System

WebInsight Analytics is an interactive multi-domain analytics and visualization platform built with Python (Flask, Pandas, NumPy), PostgreSQL / SQLite, and React.js (Vite, Recharts).

---

## 🚀 Docker Execution Guide (Step-by-Step)

You can build and execute the entire full-stack application inside Docker containers with a single command using **Docker Compose**.

### Prerequisites
- Install **Docker Desktop** on Windows/Mac/Linux.

### Steps to Run via Docker:

1. **Open Terminal / PowerShell** in the project root directory:
   ```cmd
   cd "Website Content Engagement Analytics and Visualization System"
   ```

2. **Build and Launch Containers**:
   ```cmd
   docker-compose up --build
   ```

3. **Access the Application**:
   - 🌐 **Frontend React Dashboard**: `http://localhost:5173`
   - ⚡ **Backend Flask REST API**: `http://localhost:5000`

4. **Stop Docker Containers**:
   ```cmd
   docker-compose down
   ```

---

## 🛠️ Local Execution (Without Docker)

### 1. Run Backend Server
```cmd
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Run Frontend UI
```cmd
cd frontend
npm install
npm run dev
```
Access UI on `http://localhost:5173`.

---

## 🏆 Key Features

1. **7 Industry Analytics Domains**: Entertainment, Education, News, Sports, E-Commerce, Technology, Social Media.
2. **Accurate Real-World Sports Mappings**:
   - **Cricket**: Virat Kohli, MS Dhoni, Rohit Sharma, Jasprit Bumrah (IPL, ICC World Cup).
   - **Football**: Lionel Messi, Cristiano Ronaldo, Kylian Mbappé (UEFA Champions League, Premier League).
   - **Tennis**: Novak Djokovic, Rafael Nadal, Carlos Alcaraz (Wimbledon, US Open).
   - **Basketball**: LeBron James, Stephen Curry (NBA Finals).
   - **Formula 1**: Max Verstappen, Lewis Hamilton (Monaco GP).
3. **Advanced Filtering Engine**: Platform/Sport, Sub-filter/Tournament, Region, Date range presets, Sort by metric, Live Search.
4. **Local SQLite / PostgreSQL Dual Database**: Automatically connects to PostgreSQL or seamlessly uses local SQLite fallback.
