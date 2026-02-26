# VC Intelligence Platform

A lightweight VC research tool built with Next.js.

This platform allows users to:
- Browse companies
- View company profiles
- Enrich company data using AI
- Create custom lists
- Save searches locally

---

## 🚀 Features

### 📊 Companies
- Search and filter companies
- View detailed company profile page
- AI-powered enrichment (website summarization)

### 📂 Lists
- Create custom lists
- Add companies to lists
- Data persisted in localStorage

### 💾 Saved Searches
- Save search queries
- Retrieve saved searches
- Stored in localStorage

---

## 🧠 AI Enrichment

The Enrich feature:
1. Fetches company website content
2. Sends content to OpenAI API
3. Returns summarized company description

Note:
An OpenAI API key is required in `.env.local`.

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API
- localStorage (for persistence)

---

## ⚙️ Setup Instructions

1. Clone repository
git clone <https://github.com/Shreya-Moray123/vc-intelligence.git>
cd vc-intelligence


2. Install dependencies

npm install


3. Create `.env.local`


OPENAI_API_KEY=your_api_key_here


4. Run development server


npm run dev



---

## 🔐 Security

- API keys are stored in `.env.local`
- `.env.local` is ignored via `.gitignore`
- No secrets are committed

---

## 📌 Future Improvements

- Add backend database
- Structured AI output (JSON)
- Authentication system
- Deployment on Vercel

---

## 👩‍💻 Author

Shreya Moray