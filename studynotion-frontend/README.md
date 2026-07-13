# StudyNotion Frontend

A React (Vite + Tailwind CSS v4) frontend built for the `server-fixed-v2` StudyNotion backend.

## Setup

```bash
npm install
npm run dev
```

The app runs on **http://localhost:3000** (matches the backend's CORS config). Make sure your backend is running on `http://localhost:4000` first (`npm run dev` inside your `server` folder).

## Environment variables (`.env`)

```
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_RAZORPAY_KEY=your_razorpay_key_id
```

`VITE_RAZORPAY_KEY` should be the same `RAZORPAY_KEY` value from your backend's `.env` (this is the public key_id, safe to expose client-side — never put `RAZORPAY_SECRET` here).

## What's included

- **Auth**: signup (student/instructor), OTP verification, login, forgot/reset password, change password, delete account
- **Catalog**: browse by category, course details page, ratings/reviews
- **Cart & checkout**: add to cart, Razorpay checkout, enrollment
- **Student dashboard**: profile, settings, enrolled courses with progress bars
- **Course player**: video playback, mark-lecture-complete, next/previous navigation, leave a review
- **Instructor dashboard**: stats, course list, 3-step course builder (info -> sections/lectures -> publish), edit/delete courses
- **Admin**: category management

## Architecture

- `src/services/` - API layer (`apis.js` endpoint constants, `operations/` thunks/functions per feature, matching the backend routes exactly)
- `src/slices/` + `src/store.js` - Redux Toolkit state (auth, profile, cart, course builder, course viewer)
- `src/components/common/` - shared UI (Navbar, Footer, route guards, modals, etc.)
- `src/components/core/` - feature components grouped by domain (Auth, Catalog, Course, Dashboard, ViewCourse)
- `src/pages/` - route-level pages

## Known simplifications (flagged, not hidden)

- The backend's `createCourse` requires a `tag` field (array of strings); the form doesn't expose a tag picker UI yet - it silently sends `"General"`. Fine to extend later.
- The Contact page is a static demo form - there's no backend endpoint for it yet.
- Checkout loops through cart items sequentially (opens one Razorpay modal per course) since the backend's payment endpoints are single-course. Works fine, just not a single combined checkout screen.
