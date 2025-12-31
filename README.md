🎬 Movie Recommendation AI App

An AI-powered movie recommendation web application built with Next.js, OpenAI, and MongoDB.
Users can enter their movie preferences (genre, mood, era, etc.) and instantly receive personalized movie recommendations with a modern, animated UI.

✨ Features

🤖 AI-powered movie recommendations using OpenAI

🎨 Modern, animated UI with card & pin-style layout

❤️ Custom animated loader while recommendations are generated

📦 Backend API using Next.js App Router

🗃️ MongoDB integration to store user inputs & recommendations

🔄 “Search Again” functionality

⚡ Fast & responsive design

🛠️ Tech Stack
Frontend

Next.js 14 (App Router)

React (Client Components)

CSS (Custom modern animations & layout)

Backend

Next.js API Routes

OpenAI API

MongoDB (Atlas / local)

📂 Project Structure
movie-ai/
│
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts     # API for movie recommendations
│   ├── globals.css          # Global styles & animations
│   ├── page.tsx             # Main UI page
│
├── lib/
│   └── db.ts                # MongoDB connection
│
├── .gitignore
├── package.json
├── README.md
└── next-env.d.ts

🚀 How It Works

User enters a movie preference (e.g. “Horror movies with suspense”)

Frontend sends the input to /api/recommend

OpenAI generates movie recommendations

Cleaned movie data is:

Displayed in animated cards

Saved to MongoDB with timestamp

User can search again or explore more recommendations

🔐 Environment Variables

Create a .env.local file in the root directory:

OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongodb_connection_string

▶️ Run the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/devloperdarshana123/movie-ai.git
cd movie-ai

2️⃣ Install Dependencies
npm install

3️⃣ Add Environment Variables

Create .env.local and add:

OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongodb_connection_string

4️⃣ Start Development Server
npm run dev

5️⃣ Open in Browser
http://localhost:3000
