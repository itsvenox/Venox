# Venox — Modern Web Design & Development Agency Website

A complete, production-ready agency website with EN/DE language support, premium dark UI, and a Node.js backend for contact form handling.

## Project Structure

```
venox/
├── src/                          # Frontend source
│   ├── components/               # Reusable UI components
│   │   ├── Icons.jsx             # SVG icon library
│   │   ├── Header.jsx            # Navigation with language switcher
│   │   ├── Footer.jsx            # Site footer
│   │   ├── CookieBanner.jsx      # GDPR-compliant cookie consent
│   │   └── Shared.jsx            # WebMockup, ProjectCard, SectionHeader, CTASection
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx          # Landing page with all sections
│   │   ├── ContentPages.jsx      # Services, Portfolio, About, Process, Pricing, FAQ
│   │   ├── ContactPage.jsx       # Contact form with API integration
│   │   └── LegalPages.jsx        # Impressum, Privacy Policy, 404
│   ├── i18n/                     # Internationalization
│   │   ├── en.js                 # English translations
│   │   ├── de.js                 # German translations
│   │   └── index.js              # Language registry
│   ├── styles/
│   │   └── main.css              # Complete stylesheet
│   ├── App.jsx                   # Root app with routing + state
│   └── main.jsx                  # Entry point
├── backend/                      # Node.js API server
│   ├── config/
│   │   └── index.js              # Environment configuration
│   ├── middleware/
│   │   ├── validation.js         # express-validator rules
│   │   └── rateLimiter.js        # Rate limiting
│   ├── routes/
│   │   ├── contact.js            # POST /api/contact endpoint
│   │   └── emailService.js       # Nodemailer email templates
│   ├── data/                     # JSON file storage (auto-created)
│   ├── server.js                 # Express server entry
│   ├── package.json
│   └── .env.example              # Environment variables template
├── public/
│   └── index.html                # HTML entry with SEO meta
├── package.json                  # Root scripts
├── .gitignore
└── README.md
```

## Features

### Frontend
- **11 pages**: Home, Services, Portfolio, About, Process, Pricing, FAQ, Contact, Impressum, Privacy, 404
- **EN/DE language toggle** in header — instant switching, no page reload
- **GDPR cookie consent** with granular categories (Essential, Analytics, Marketing, Preferences)
- **Premium dark UI** with Outfit + DM Sans typography
- **Fully responsive** — mobile-first design
- **Conversion-focused** with CTAs on every page
- **SEO-ready** with semantic HTML, meta tags, Open Graph

### Backend
- **Express.js** API server
- **Contact form endpoint** (`POST /api/contact`) with:
  - Input validation & sanitization (express-validator)
  - Rate limiting (5 submissions per 15 min per IP)
  - JSON file storage for all submissions
  - HTML email notifications to the Venox team
  - Confirmation emails to the client
  - Branded email templates
- **Security**: Helmet, CORS, rate limiting, input escaping
- **Health checks**: `GET /api/health`, `GET /api/contact/health`

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies
npm run install:all

# Or separately:
cd backend && npm install
```

### 2. Configure Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your SMTP credentials and settings
```

### 3. Run Development

```bash
# Backend only:
cd backend && npm run dev

# Or from root (both frontend + backend):
npm run dev
```

The backend runs on `http://localhost:3001` by default.

### 4. Frontend Development

The frontend is a React app. To run it with Vite or your preferred bundler:

```bash
# If using Vite:
npm create vite@latest frontend -- --template react
# Then copy the src/ directory into frontend/src/
```

Or integrate directly into any React project by importing `App.jsx`.

## API Endpoints

### `POST /api/contact`

Submit a contact form inquiry.

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "company": "My Business GmbH",
  "phone": "+49 123 456789",
  "type": "New Business Website",
  "budget": "€1,500 – €3,000",
  "message": "I need a website for my restaurant...",
  "consent": true
}
```

**Required fields:** `name`, `email`, `message`, `consent` (must be `true`)

**Response (200):**
```json
{
  "success": true,
  "message": "Your inquiry has been received. We will get back to you within 24 hours.",
  "id": "uuid-here"
}
```

**Error responses:** 400 (validation), 429 (rate limit), 500 (server error)

### `GET /api/health`

Server health check.

### `GET /api/contact/health`

Contact service health check.

## Email Configuration

The backend sends two emails per submission:

1. **Notification** → sent to the Venox team (`NOTIFICATION_EMAIL`)
2. **Confirmation** → sent to the client who submitted the form

Configure SMTP in `.env`. Works with any provider:
- Gmail (with App Password)
- SendGrid
- Mailgun
- Amazon SES
- Any SMTP server

If SMTP is not configured, submissions are still saved to `data/submissions.json`.

## Language Support

The website supports English and German with a toggle in the header. All UI text, form labels, FAQs, service descriptions, legal pages, and CTAs are fully translated.

To add a new language:
1. Create `src/i18n/xx.js` based on `en.js`
2. Add it to `src/i18n/index.js`
3. Add the language button to `Header.jsx`

## Legal Pages

The Impressum and Datenschutzerklärung pages contain comprehensive structures with clear placeholders (⚠️ markers) where business-specific details need to be inserted.

**Before going live:**
- Fill in all placeholder fields (business name, address, VAT ID, etc.)
- Have legal texts reviewed by a qualified legal professional
- Configure actual cookie/analytics tools and update the privacy policy accordingly
- Set up proper SMTP for form submission emails

## Production Deployment

```bash
# Build the frontend
npm run build

# Start the backend (serves static files + API)
cd backend && NODE_ENV=production npm start
```

The backend serves the built frontend in production mode. Deploy behind nginx/Caddy with SSL.

## Tech Stack

**Frontend:** React, CSS (custom), Outfit + DM Sans fonts
**Backend:** Node.js, Express, Nodemailer, express-validator, express-rate-limit, Helmet
**Data:** JSON file storage (upgrade to PostgreSQL/MongoDB for production scale)
