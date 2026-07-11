# TOEIC Vocabulary Learning Website

## Introduction

TOEIC Vocabulary Learning Website is a web-based learning platform developed to help learners improve their English vocabulary for the TOEIC examination. The system provides a structured learning environment based on the official TOEIC 600-word list, allowing users to study vocabulary by topic, practice through quizzes, review incorrect answers, and monitor their learning progress.

The project aims to provide a simple, modern, and user-friendly interface while supporting efficient vocabulary memorization through interactive learning methods.

---

# Objectives

The main objectives of this project are:

- Provide a complete TOEIC vocabulary learning platform.
- Organize vocabulary into different learning topics.
- Help learners memorize vocabulary through quizzes.
- Track individual learning progress.
- Store user learning history.
- Support pronunciation using browser Text-to-Speech.
- Build a responsive interface that works on both desktop and mobile devices.

---

# Main Features

## 1. Vocabulary Learning

The vocabulary learning module allows users to browse TOEIC vocabulary by category.

Each vocabulary item includes:

- English word
- Vietnamese meaning
- Pronunciation
- Example sentence
- Audio pronunciation
- Learning status

Users can navigate through vocabulary easily while listening to the pronunciation of each word.

---

## 2. Topic Management

Vocabulary is divided into multiple TOEIC topics for easier learning.

Examples include:

- Office
- Marketing
- Finance
- Travel
- Shopping
- Business
- Meetings
- Restaurants
- Transportation
- Housing
- Entertainment

Each topic contains a collection of vocabulary related to that subject.

---

## 3. Quiz System

The quiz module helps learners reinforce their vocabulary through multiple-choice questions.

Functions include:

- Random question generation
- Multiple-choice answers
- Immediate answer checking
- Automatic score calculation
- Progress tracking
- Topic-based quizzes
- Randomized answer order

The system records the quiz results after completion.

---

## 4. Review System

The review page allows users to revisit previously learned vocabulary.

Functions include:

- Review incorrect answers
- Review all learned vocabulary
- Practice difficult words
- Improve long-term memorization

---

## 5. Progress Tracking

The system records user learning information.

Recorded information includes:

- Number of completed topics
- Learned vocabulary count
- Quiz scores
- Review history
- Learning progress

This data allows users to monitor their improvement over time.

---

## 6. User Authentication

The system supports user account management.

Features include:

- User Registration
- User Login
- Session Management
- Learning Data Storage

Each user has an independent learning history.

---

## 7. Pronunciation Support

Vocabulary pronunciation is generated using the browser's built-in Speech Synthesis API.

Benefits:

- Native-like pronunciation
- No external API required
- Fast response
- Works directly in supported browsers

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- React
- Vite

Frontend responsibilities:

- User Interface
- Responsive Design
- Quiz Interaction
- Vocabulary Display
- Dashboard
- Progress Visualization

---

## Backend

The backend is developed using Python.

Framework:

- FastAPI

Responsibilities:

- REST API
- User Authentication
- Progress Storage
- Quiz Data
- Vocabulary API

---

## Database

Database:

SQLite

Stored data:

- User Accounts
- Learning Progress
- Quiz Results
- Review History

Vocabulary data is stored in JSON format.

---

# Project Structure

```
WEB-TOEIC-C-N-B-N
│
├── backend
│   └── main.py
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   ├── api.js
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── css
│   ├── style.css
│   └── responsive.css
│
├── js
│   ├── main.js
│   ├── study.js
│   ├── quiz.js
│   ├── review.js
│   ├── progress.js
│   ├── storage.js
│   └── speech.js
│
├── data
│   ├── toeic600.json
│   └── progress.db
│
├── index.html
├── study.html
├── quiz.html
├── review.html
├── progress.html
└── topics.html
```

---

# Installation Guide

## Step 1

Clone the repository.

```bash
git clone https://github.com/tuitendu/WEB-TOEIC-C-N-B-N.git
```

---

## Step 2

Navigate to the project folder.

```bash
cd WEB-TOEIC-C-N-B-N
```

---

# Backend Setup

Navigate to backend.

```bash
cd backend
```

Install required packages.

```bash
pip install fastapi
pip install uvicorn
```

Run the server.

```bash
uvicorn main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

API Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Navigate to frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run development server.

```bash
npm run dev
```

Default URL

```
http://localhost:5173
```

---

# Vocabulary Dataset

The project includes a vocabulary dataset containing approximately 600 TOEIC words.

Each vocabulary item contains:

```json
{
    "word": "apply",
    "meaning": "nộp đơn",
    "phonetic": "/əˈplaɪ/",
    "example": "She applied for a new position."
}
```

The dataset is stored in:

```
data/toeic600.json
```

---

# REST API

The backend provides RESTful APIs.

Typical endpoints include:

```
POST /login

POST /register

GET /topics

GET /study

GET /quiz

POST /progress

GET /review
```

---

# Browser Support

The application supports modern browsers including:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Brave
- Opera

---

# Future Improvements

The project can be extended with the following features:

- Google Authentication
- Email Verification
- Password Reset
- TOEIC Full Test
- Flashcards
- Spaced Repetition Algorithm
- AI Vocabulary Recommendation
- Leaderboard
- Achievement System
- Dark Mode
- Offline Learning
- Progressive Web Application (PWA)
- Mobile Application
- Cloud Database
- Administrator Dashboard
- Analytics Dashboard

---

# Development Roadmap

Phase 1

- Basic Vocabulary Learning
- Quiz Module
- Progress Tracking

Phase 2

- User Authentication
- Backend API
- SQLite Integration

Phase 3

- Responsive Interface
- Dashboard
- Review Module

Phase 4

- AI Recommendation
- Cloud Deployment
- Mobile Optimization

---

# Author

Project Name:

TOEIC Vocabulary Learning Website

Developer:

Phúc Du

Purpose:

This project was developed for educational purposes and software development practice.

---

# License

This project is intended for educational, research, and learning purposes. Commercial use should comply with the applicable license terms of any third-party libraries or assets included in the project.
