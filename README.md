# StudyNotion

A full-stack e-learning platform (MERN stack) where students browse and purchase courses, instructors build and publish courses through a step-by-step wizard, and admins manage course categories. Built with a React frontend and a Node.js/Express/MongoDB backend.

## Features

- **Authentication** — email OTP-verified signup, JWT-based login, forgot/reset password, change password
- **Role-based access** — Student, Instructor, and Admin, each with their own dashboard
- **Course catalog** — browse by category, view course details, ratings & reviews
- **Payments** — Razorpay checkout with server-side signature verification before enrollment
- **Course builder** — 3-step instructor wizard (course info → sections & lectures → publish), with video/image upload to Cloudinary
- **Progress tracking** — lecture-by-lecture completion, with a progress bar on the student dashboard
- **Video player** — in-browser lecture playback with next/previous navigation and mark-as-complete

## Tech Stack

**Frontend:** React (Vite), Redux Toolkit, React Router, Tailwind CSS, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

**Third-party services:** Cloudinary (media storage), Razorpay (payments), Nodemailer (email)

## Project Structure

```
study/
├── server-fixed-v3/
│   └── server/          # Express REST API
│       ├── config/      # Database, Cloudinary, Razorpay config
│       ├── controller/  # Route handlers
│       ├── middlewares/ # Auth & role-check middleware
│       ├── model/       # Mongoose schemas
│       ├── routes/      # Express routers
│       ├── email/       # HTML email templates
│       └── utils/       # Cloudinary upload, mail sender
│
└── studynotion-frontend/
    └── src/
        ├── components/  # common/ (shared UI) and core/ (feature components)
        ├── pages/       # Route-level pages
        ├── services/    # API layer (apis.js, operations/)
        ├── slices/      # Redux Toolkit state
        └── store.js
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB database (local or [Atlas](https://www.mongodb.com/cloud/atlas))
- Accounts for [Cloudinary](https://cloudinary.com), [Razorpay](https://razorpay.com), and an SMTP provider (e.g. [Mailtrap](https://mailtrap.io) for testing)

### 1. Backend setup

```bash
cd server-fixed-v3/server
npm install
```

Copy `.env.example` to `.env` and fill in your own values:

```
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
JWT_SECRET=
FOLDER_NAME=
RAZORPAY_KEY=
RAZORPAY_SECRET=
CLOUDNAME=
API_KEY=
API_SECRET=
MONGODB_URL=
PORT=4000
```

Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:4000`.

### 2. Frontend setup

Open a new terminal:

```bash
cd studynotion-frontend
npm install
```

Copy `.env.example` to `.env`:

```
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

`VITE_RAZORPAY_KEY` should match `RAZORPAY_KEY` from the backend `.env` (this is the public key ID — never put `RAZORPAY_SECRET` here).

Start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

### 3. Try it out

1. Sign up as a Student (check your email/terminal for the OTP)
2. Sign up again as an Instructor
3. As the Instructor: Dashboard → Add Course → complete all 3 steps → publish
4. As the Student: browse the catalog, add the course to your cart, check out with a Razorpay test card
5. Go to Enrolled Courses → open the course → watch a lecture → mark it complete

## API Overview

All endpoints are prefixed with `/api/v1`.

| Base route | Purpose |
|---|---|
| `/auth` | Signup, OTP, login, password reset/change |
| `/profile` | Get/update/delete user profile |
| `/course` | Courses, sections, lectures, categories, ratings, progress |
| `/payment` | Razorpay order creation and payment verification |

## Security Notes

- Passwords are hashed with bcrypt before storage
- JWTs are signed with a secret and expire after 2 hours
- Razorpay payments are verified server-side via HMAC-SHA256 signature comparison before any enrollment is granted
- Course video content is only returned to users who are enrolled in that course (or its instructor)

## License

This project was built for educational/portfolio purposes.
