# Barkus' Big Fat Greek Bucks — Event Site

A single deployable Node/Express app: static pages for the event info + a small
JSON-file-backed API for the fines tracker, with a password-gated admin view.

## File structure

```
bucks-party-site/
├── server.js              # Express app: static hosting + API routes
├── db.js                  # JSON file store (no native deps), auto-creates data/fines.json
├── package.json
├── .env.example            # copy to .env and fill in
├── data/                    # created automatically, holds fines.json (gitignored)
└── public/
    ├── index.html          # homepage
    ├── attendees.html      # attendee list with Full Trip / HCMC / Maybe filters
    ├── itinerary.html      # day-by-day schedule + Ha Giang extension
    ├── fines.html           # punishments list + public "log a fine" form
    ├── admin.html           # password-gated fines dashboard
    ├── css/style.css
    ├── js/
    │   ├── main.js          # shared nav toggle
    │   ├── fines.js         # public submission form logic
    │   └── admin.js         # login + dashboard logic
    └── images/
        ├── hero-placeholder.svg
        ├── attendees-banner.svg
        ├── itinerary-banner.svg
        ├── fines-banner.svg
        └── IMAGES.md         # how to swap placeholders for real photos
```

## Running locally

```bash
cd bucks-party-site
npm install
cp .env.example .env
# edit .env: set ADMIN_PASSWORD and SESSION_SECRET
npm start
```

Then open `http://localhost:3000`.

## How the fines tracker works

- **Anyone** can submit a fine via the form on `/fines.html` → `POST /api/fines`.
  No login required — it's meant to be easy to snitch.
- Submissions are stored in a local JSON file (`data/fines.json`), created
  automatically on first run. Writes go through a temp-file-then-rename so a
  crash mid-write can't corrupt the file. Fine for this scale (one event,
  dozens of entries) — swap in a real database only if you outgrow it.
- Only the organizer can **view** the fines log, at `/admin.html`, gated by the
  `ADMIN_PASSWORD` you set in `.env`. Login uses a signed, httpOnly session
  cookie (`express-session`) — no accounts, no database of users, just one
  shared password.
- From the admin dashboard you can mark fines resolved/open, assign a
  punishment, or delete a fine entirely.

## Deploying

This is a plain Node app with a file-based JSON store and zero native
dependencies, so it deploys cleanly to any host that runs a persistent Node
process with a writable disk — **Render**, **Railway**, **Fly.io**, or a
small VPS all work well. (Serverless platforms like Vercel's default
functions won't persist the JSON file between requests — avoid those unless
you swap in a hosted database.)

**Render / Railway (typical flow):**

1. Push this folder to a Git repo.
2. Create a new Web Service pointing at the repo.
3. Build command: `npm install`. Start command: `npm start`.
4. Set environment variables `ADMIN_PASSWORD` and `SESSION_SECRET` in the
   host's dashboard (generate the secret with
   `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
5. Make sure the service has a persistent disk mounted (Render's free tier
   disks are ephemeral on redeploy — attach a small persistent volume at
   `/opt/render/project/src/data` if you want fines to survive redeploys, or
   upgrade to a plan that supports persistent disks).
6. Deploy. The app listens on `process.env.PORT` automatically.

## Swapping in real photos

See [`public/images/IMAGES.md`](public/images/IMAGES.md) — every placeholder
is a single file referenced by a plain `<img src="...">` tag, so replacing
them is just dropping in a new file and updating one `src` attribute per page.

## Editing content

- **Attendee list**: edit the `<li class="attendee-row">` entries directly in
  `public/attendees.html`.
- **Itinerary**: each day is a `.day-card` section in `public/itinerary.html`.
- **Punishments list**: `<ul class="punishment-list">` in `public/fines.html`.
