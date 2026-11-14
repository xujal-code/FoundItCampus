# FoundIt Campus Frontend

React + Vite frontend for the supplied Express/Mongoose backend.

## Requirements
- Node.js 18+ recommended
- Backend running on `http://localhost:5000`
- MongoDB connection configured on backend

## Setup
1. Extract this folder.
2. Open the folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Keep `VITE_API_URL=http://localhost:5000` if the backend runs locally.
6. Run `npm run dev`.
7. Open the local URL printed by Vite (usually http://localhost:5173).

## Backend assumptions
This frontend uses the routes present in the supplied `server.js`:
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/items` (multipart field name: `image`)
- GET `/api/items`
- GET `/api/items/:id/matches`
- POST `/api/claims`
- GET `/api/notifications`

`GET /api/items` currently returns all items, so search/filtering is done in the browser.
Item details are also found from the list response because the supplied server does not have `GET /api/items/:id`.
"My reports" filters the returned list using the JWT userId and populated `reportedBy`.
The admin screen is a placeholder because the supplied server has no admin endpoints.
The current server has no mark-notification-as-read endpoint or received-claims endpoint.

## Important backend fixes before production
- Restrict registration to your actual college email domain on the server.
- Do not trust a client-provided `role`; always assign `student` at registration. Create admin accounts securely outside public registration.
- Validate uploaded file type and size with Multer.
- Restrict CORS to the frontend origin in production.
- Do not expose detailed server error messages in production.
- Add authorization checks so users cannot claim their own found items or submit duplicate claims.
- Add the missing admin, received-claims, my-items, and notification-read routes if required.
- The current frontend uses localStorage for the JWT to match this simple demo backend. For production, consider secure httpOnly cookies and stronger session protections.

## Shared enum values
Categories, colors and locations in the report form match the exact enum values in the supplied `server.js`.
