# Vaibhav Kumar Verma – Full-Stack Portfolio & Admin Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

A production-ready, full-stack personal portfolio and content management system for **Vaibhav Kumar Verma** (B.Tech Computer Science & Engineering student at United University, Prayagraj; Founder of **TSO Groups**).

---

## 🌟 Key Features

### Public Portfolio
- **Cinematic Visual Identity:** Luxury black (`#080808`), charcoal, and warm gold (`#D4B87A`) palette with custom Fraunces and Manrope typography.
- **Hero & Orbital Core:** Rotating planetary rings showcasing core domains (AI/ML, Web, Creative Direction) with verified, live KPI stats.
- **Transparent Project Grid:** Interactive category and honest status filtering (`Completed`, `Prototype`, `In Progress`, `Future Idea`) with detailed project case modals.
- **Live Sandboxed Showcase:** Interactive tabbed iframe showcase allowing live interaction with deployed apps (Streamlit ML Car Price Predictor, IMAGIX Image Studio, Smart Village 2.0, GrainGuard).
- **TSO Groups Creative Studio:** Direct showcase of design and video services (Graphic Design, Thumbnails, Posters, Video Post-Production, YouTube Management).
- **Media Gallery & Lightbox:** Responsive masonry gallery with filter pills and modal preview for graphics and YouTube embeds.
- **Experience Timeline:** Honest milestones detailing current university coursework, built prototypes, and career roadmap.
- **Real Contact Form:** Validates client inputs, enforces anti-spam, and persists enquiries directly to the backend database.

### Secure Admin Dashboard (`/admin`)
- **Metric KPI Overview:** Live counts for projects, prototypes, creative media items, and unread enquiries.
- **Project CRUD:** Create, edit, delete, toggle featured status, update live links, and manage tags.
- **Media Studio:** Add image graphics or YouTube links with instant thumbnail extraction.
- **Enquiry Inbox:** Real-time triage workflow (`new` -> `read` -> `completed`), spam deletion, and keyword search.
- **Services Manager:** Update studio service packages, descriptions, and deliverable chips.
- **Profile & Settings:** Edit bio, education, contact numbers, and SEO metadata.
- **Security & Password Management:** Change admin password with authenticated session verification and HTTP-only cookies.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router, Server Components & Server Actions) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS + Custom CSS Variables |
| **Database** | Supabase (PostgreSQL with Row Level Security policies) / Unified persistent local store fallback |
| **Storage** | Supabase Storage (`portfolio-media` public bucket) |
| **Authentication** | Session-based HMAC token with HTTP-only cookies |
| **Icons** | Lucide React |
| **Hosting & CI/CD** | Vercel Serverless Functions + GitHub Actions |

---

## 📁 Directory Structure

```
vaibhav-portfolio/
├── app/
│   ├── admin/
│   │   └── page.tsx              # Admin CMS portal (Overview, Projects, Media, Inbox, Settings)
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts    # Admin authentication
│   │   │   ├── logout/route.ts   # Session termination
│   │   │   ├── projects/route.ts # Project CRUD API
│   │   │   ├── media/route.ts    # Media upload & delete API
│   │   │   ├── enquiries/route.ts# Contact enquiry triage API
│   │   │   ├── services/route.ts # Studio services API
│   │   │   ├── profile/route.ts  # Profile updates API
│   │   │   ├── settings/route.ts # Site settings API
│   │   │   └── password/route.ts # Admin password change API
│   │   └── contact/route.ts      # Contact form submission & database write
│   ├── globals.css               # Luxury gold & charcoal styling
│   ├── layout.tsx                # Root layout, OpenGraph & meta tags
│   ├── not-found.tsx             # 404 handler
│   └── page.tsx                  # Public cinematic portfolio (SSR)
├── components/
│   ├── About.tsx                 # About Vaibhav & verified facts
│   ├── ContactSection.tsx        # Real validated contact form
│   ├── CustomCursor.tsx          # Desktop luxury gold cursor
│   ├── Footer.tsx                # Footer with social links & admin shortcut
│   ├── Hero.tsx                  # Cinematic typography, orbital ring, verified stats
│   ├── JourneyTimeline.tsx       # Honest career & learning milestones
│   ├── LightboxModal.tsx         # Media lightbox & YouTube player
│   ├── LiveShowcase.tsx          # Sandboxed live demo iframe showcase
│   ├── MediaGallery.tsx          # Masonry design gallery & category filter
│   ├── Navbar.tsx                # Responsive header with progress bar
│   ├── ProjectModal.tsx          # Deep-dive project modal
│   ├── ProjectsSection.tsx       # Filterable project grid
│   ├── SkillsSection.tsx         # Categorized technologies
│   └── StudioSection.tsx         # TSO Groups creative studio offerings
├── lib/
│   ├── auth.ts                   # Admin token creation & validation
│   ├── data.ts                   # Initial verified portfolio seed data
│   ├── db.ts                     # Unified database layer (Supabase + local fallback)
│   ├── supabaseClient.ts         # Browser Supabase client
│   ├── supabaseServer.ts         # Server-side Supabase client
│   └── types.ts                  # TypeScript interface contracts
├── supabase/
│   ├── schema.sql                # Complete PostgreSQL schema & RLS policies
│   └── seed.sql                  # Initial database seed script
├── .env.example                  # Environment variable reference
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `18.18+` or `20+`
- npm, pnpm, or yarn
- Git

### 2. Clone Repository
```bash
git clone https://github.com/thesecretone09/vaibhav-portfolio.git
cd vaibhav-portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your parameters:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Authentication
ADMIN_EMAIL=vermavaibhav710@gmail.com
ADMIN_PASSWORD=your-secure-password
ADMIN_JWT_SECRET=your-random-32-character-secret

# Production Site URL
NEXT_PUBLIC_SITE_URL=https://vaibhav-portfolio.vercel.app
```
*(Note: If Supabase keys are omitted during local development, the application automatically uses a resilient local storage engine so all features work immediately out-of-the-box).*

### 5. Database Setup (Optional for Supabase Cloud)
1. Open your [Supabase Dashboard](https://supabase.com).
2. Navigate to **SQL Editor**.
3. Run the contents of `supabase/schema.sql` to generate all tables, indexes, and RLS policies.
4. Run the contents of `supabase/seed.sql` to populate initial projects, skills, services, and media items.

### 6. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.  
Open [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the Admin Dashboard.

---

## 🔒 Security & Row Level Security (RLS)

- **Public Access:** Anyone can view published projects, skills, services, and media items.
- **Enquiry Submission:** Anyone can post enquiries through the `/api/contact` endpoint, protected with server-side validation and anti-abuse safeguards.
- **Administrative Privileges:** All CRUD operations (`POST`, `PUT`, `DELETE`) on projects, media, services, settings, and enquiries are strictly gated behind server-side authentication tokens.
- **No Client Secrets:** Service-role keys and administrative passwords remain exclusively on the server and are never exposed to browser bundles.

---

## 👤 Author & Credits

- **Vaibhav Kumar Verma**  
  B.Tech Computer Science & Engineering, United University, Prayagraj  
  Founder, **TSO Groups**  
  - 🌐 Portfolio: [vaibhav-portfolio.vercel.app](https://vaibhav-portfolio.vercel.app)  
  - 💼 LinkedIn: [vaibhav-verma-953044344](https://www.linkedin.com/in/vaibhav-verma-953044344/)  
  - 🐙 GitHub: [thesecretone09](https://github.com/thesecretone09)  
  - 📺 YouTube: [@im_Vaibhav_Verma](https://www.youtube.com/@im_Vaibhav_Verma)  
  - 📧 Email: [vermavaibhav710@gmail.com](mailto:vermavaibhav710@gmail.com)
