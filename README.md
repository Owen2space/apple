# Selipher's Birthday Surprise Website

A beautiful, interactive birthday surprise website created with love for Selipher. This web application features a password-protected special message, photo gallery, and interactive elements.

## About This Project

This is a personalized birthday gift website that includes:
- Password protection (using birth year)
- Animated gift box that reveals a special birthday message
- Photo gallery with memories
- Interactive floating hearts with special messages
- Background music that plays when the gift box is opened
- Mobile-friendly design

## Technical Requirements

Before running the project, please follow these setup steps:

### Audio File Setup

1. Download the romantic guitar audio file from: https://cdn.pixabay.com/download/audio/2022/03/15/audio_3e1b7eb9c3.mp3?filename=romantic-guitar-110386.mp3
2. Save it as `romantic-guitar.mp3` in the `src/assets/` directory

### Photos Setup

Place your personal photos in the `src/assets/photos/` directory:
- Name them photo1.jpeg, photo2.jpeg, etc.
- The site will automatically display these photos in the photo gallery

## Development Guide

To run this project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd seliphers-love-surprise

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The development server will start at http://localhost:8080

## Technologies Used

This project is built with:
- Vite - Fast development server and build tool
- TypeScript - Type safety for JavaScript
- React - Frontend UI library
- shadcn-ui - Beautiful UI components
- Tailwind CSS - Utility-first CSS framework

## Usage Instructions

1. When sharing with Selipher, direct her to the website URL
2. She'll need to enter her birth year (2002) as the password
3. After entering the correct password, she can click on the gift box
4. The gift box will open with confetti, revealing a birthday message
5. Background music will play automatically
6. She can scroll to view the photo gallery
7. She can click on floating hearts to discover special messages

## Customization

You can easily customize various aspects of this website:
- Update messages in `src/components/LoveMessage.tsx`
- Change love notes in `src/components/LoveNotes.tsx`
- Add/replace photos in `src/assets/photos/`
- Modify the password in `src/pages/PasswordProtection.tsx`
