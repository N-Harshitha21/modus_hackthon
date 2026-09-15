# 🚀 Modus AI — Dynamic Candidate Assessment Platform

> **Live Interactive Output**: [https://n-harshitha21.github.io/modus_hackthon/](https://n-harshitha21.github.io/modus_hackthon/)

---

## 🌟 Overview
**Modus AI** is an advanced, evidence-based candidate assessment and skill mapping platform designed to evaluate candidate capability (CCI), potential (CPI), and job readiness (CRI).

Instead of relying solely on self-reported resume claims, Modus AI dynamically parses uploaded candidate resumes, verifies portfolio and repository links, and locked assessments until approved by a Senior Assessor.

---

## 🔗 Live Application Output
Visitors can instantly view and interact with the live application:
👉 **[Click Here to Launch Live App](https://n-harshitha21.github.io/modus_hackthon/)**

---

## ✨ Key Features

1. **Clean Profile Onboarding**:
   - Initial profile fields start completely blank until candidate inputs details or uploads a resume.
   - Resume parser extracts candidate name, education, experience, and exact portfolio/GitHub/LinkedIn links.

2. **Strict Senior Assessor Gatekeeping**:
   - Stage 5 adaptive assessment questions remain locked until approved by the Senior Assessor in Stage 3.
   - Prevents unverified submissions from accessing testing workflows.

3. **OpenAI Dynamic AI Assessment**:
   - Dynamic 5-question technical assessment powered by OpenAI (`gpt-4o-mini`).
   - If resume is uploaded, questions adapt dynamically to the candidate's exact resume skills and background.

4. **3-Page Detailed Technical Report & Executive Summary**:
   - Detailed visual breakdown of Capability Index (CCI), Potential Index (CPI), and Readiness Index (CRI).
   - Generates strengths, skill gaps, verified evidence links, and a 6-month personalized development plan.

5. **LocalStorage Data Persistence**:
   - Profile state (`modus_candidate_profile`) and response state (`modus_assessment_responses`) automatically save across browser reloads.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Modern CSS with HSL dark mode, Glassmorphism, Responsive Grid
* **Icons**: Lucide React
* **AI Evaluation**: OpenAI API (`gpt-4o-mini`) with fallback local scoring rules
* **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Local Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/N-Harshitha21/modus_hackthon.git
cd modus_hackthon
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

* `npm run dev`: Runs the local development server with HMR.
* `npm run build`: Compiles TypeScript and builds production assets into `dist/`.
* `npm run deploy`: Builds and deploys the production bundle directly to GitHub Pages.

---

## 📄 License
Created for Hackathon / Project Demonstration. All rights reserved.
