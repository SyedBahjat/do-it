<div align="center">

# ScribeFlow

### Real-Time Audio Transcription for Meetings & Screen Recordings

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Speech_API-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/speech-to-text)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Stop taking notes. Start capturing everything.**

ScribeFlow captures audio directly from your screen — meetings, lectures, podcasts, videos — and transcribes it in real time. No browser extensions. No desktop apps. Just open a tab and go.

[Get Started](#-quick-start) &bull; [Features](#-features) &bull; [Demo](#-demo) &bull; [Contributing](#-contributing)

---

</div>

## The Problem

You're in a Google Meet call, a Zoom lecture, or watching a YouTube tutorial. You're scrambling to type notes while the speaker moves on. You miss context. You lose focus. Sound familiar?

**Most transcription tools** require you to install desktop apps, browser extensions, or upload files *after* the fact. They don't work in real time. They don't capture screen audio.

## The Solution

ScribeFlow uses the **Display Media API** to capture audio directly from your screen share — the same audio you hear in your headphones. It chunks the audio into 5-second segments, sends them to Google Cloud Speech-to-Text, and streams the transcript back to you in real time.

No microphone needed. No recording files. No post-processing. Just **live text as the audio plays**.

---

## Features

| Feature | Description |
|---------|-------------|
| **Screen Audio Capture** | Captures audio from any tab, window, or entire screen using the Display Media API — no microphone required |
| **Real-Time Transcription** | 5-second chunked audio processing delivers near-instant transcription results |
| **Live Audio Visualizer** | Canvas-based frequency spectrum visualization so you know audio is being captured |
| **Glass Morphism UI** | Modern, polished dark-mode interface with frosted glass effects and smooth animations |
| **Session Dashboard** | Track your transcription sessions, total hours, and saved records |
| **Zero Config** | Works out of the box with mock transcription — add Google Cloud credentials when ready |
| **Self-Hostable** | Deploy on Vercel, Railway, or any Node.js host in minutes |

---

## Demo

<!--
  HOW TO ADD SCREENSHOTS:
  1. Create a /screenshots folder in the project root
  2. Take screenshots of the Dashboard and Session pages
  3. Uncomment the img tags below and delete the ASCII art
-->

<div align="center">

### Dashboard
> *Track your sessions, hours transcribed, and saved records*

<!-- ![Dashboard](./screenshots/dashboard.png) -->

```
┌──────────────────────────────────────────────────────────────┐
│  ScribeFlow            Dashboard   Sessions   Settings       │
│                                                              │
│  Welcome back!                        [ Start New Session ]  │
│                                                              │
│  ┌────────────┐  ┌────────────────┐  ┌────────────────┐     │
│  │ 12         │  │ 4.5            │  │ 8              │     │
│  │ Sessions   │  │ Hours          │  │ Saved          │     │
│  └────────────┘  └────────────────┘  └────────────────┘     │
│                                                              │
│  Recent Sessions                                             │
│  ├─ Team Standup Meeting                Today                │
│  ├─ Client Presentation                 Yesterday            │
│  └─ Product Review                      2 days ago           │
└──────────────────────────────────────────────────────────────┘
```

### Live Transcription Session
> *Real-time transcript feed with audio visualization*

<!-- ![Session](./screenshots/session.png) -->

```
┌──────────────────────────────────────────────────────────────┐
│  ● Listening...                              [ End Capture ] │
│                                                              │
│  Transcription Feed        │  ████▓▓▒▒░░████▓▓▒▒░░         │
│  ─────────────────         │  Audio Visualizer               │
│  "Welcome everyone to      │  ──────────────────             │
│   today's standup..."      │                                 │
│                            │  Session Info                   │
│  "Let's start with the     │  ──────────────                 │
│   updates from the         │  Source: Screen Audio           │
│   frontend team..."        │  Duration: 00:02:34             │
└──────────────────────────────────────────────────────────────┘
```

</div>

> **Replace the ASCII art with real screenshots** for maximum visual impact. Drop them in a `/screenshots` folder and uncomment the image tags above.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server components, API routes, React Compiler |
| **Language** | TypeScript 5 | Type safety across the entire codebase |
| **UI** | Tailwind CSS 4 | Utility-first styling with custom glass morphism utilities |
| **Animations** | Framer Motion | Smooth, performant sidebar and UI transitions |
| **Icons** | Lucide React | Clean, consistent iconography |
| **Speech-to-Text** | Google Cloud Speech API | Industry-leading accuracy for real-time transcription |
| **Audio Capture** | Web Audio API + Display Media API | Direct screen audio capture without extensions |
| **Optimization** | React Compiler (Babel) | Automatic memoization and render optimization |

---

## Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- (Optional) Google Cloud account with Speech-to-Text API enabled

### 1. Clone the repository

```bash
git clone https://github.com/SyedBahjat/scribeflow.git
cd scribeflow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables (optional)

Create a `.env.local` file in the root directory:

```env
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/service-account-key.json
```

> **No Google Cloud account?** No problem. ScribeFlow works out of the box with mock transcription for development and testing.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start transcribing.

---

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐     ┌──────────────┐
│  Screen      │     │  Web Audio   │     │  MediaRecorder   │     │  Google Cloud │
│  Audio       │────▶│  API         │────▶│  (5s chunks)     │────▶│  Speech API   │
│  (Display    │     │  (Visualizer)│     │  (WebM/Opus)     │     │  (Transcribe) │
│   Media API) │     └──────────────┘     └─────────────────┘     └──────┬───────┘
└─────────────┘                                                          │
                                                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Live Transcript Feed  ◀──  POST /api/transcribe  ◀──  JSON Response   │
└─────────────────────────────────────────────────────────────────────────┘
```

1. **Capture** — User shares their screen; ScribeFlow extracts the audio track via `getDisplayMedia()`
2. **Visualize** — Audio stream routes through Web Audio API's `AnalyserNode` for real-time frequency visualization
3. **Record** — `MediaRecorder` captures audio in 5-second chunks encoded as WebM/Opus
4. **Transcribe** — Each chunk is sent to `/api/transcribe`, which forwards it to Google Cloud Speech-to-Text
5. **Display** — Transcription results stream back and append to the live feed

---

## Project Structure

```
scribeflow/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with sidebar
│   │   ├── page.tsx                # Dashboard (home page)
│   │   ├── globals.css             # Theme & glass morphism utilities
│   │   ├── api/
│   │   │   └── transcribe/
│   │   │       └── route.ts        # Google Cloud Speech-to-Text endpoint
│   │   └── session/
│   │       └── page.tsx            # Live transcription session
│   ├── components/
│   │   ├── AudioVisualizer.tsx     # Canvas-based frequency bars
│   │   └── Sidebar.tsx             # Navigation with Framer Motion
│   └── hooks/
│       ├── useAudioCapture.ts      # Display Media API management
│       └── useAudioRecorder.ts     # Chunked recording & transcription
├── public/                          # Static assets
├── package.json
├── next.config.ts                   # React Compiler enabled
└── tsconfig.json
```

---

## Google Cloud Setup

<details>
<summary><strong>Click to expand full setup instructions</strong></summary>

### 1. Create a Google Cloud project

Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project.

### 2. Enable the Speech-to-Text API

Navigate to **APIs & Services > Library**, search for "Cloud Speech-to-Text API", and click **Enable**.

### 3. Create a service account

Go to **IAM & Admin > Service Accounts**, create a new service account, and assign the **Cloud Speech Client** role.

### 4. Download the key file

Create a JSON key for the service account and download it to your machine.

### 5. Set the environment variable

```bash
# .env.local
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/your-key.json
```

### 6. Restart the dev server

```bash
npm run dev
```

You should now see real transcription results instead of mock data.

</details>

---

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SyedBahjat/scribeflow)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add `GOOGLE_APPLICATION_CREDENTIALS` as an environment variable
4. Deploy

### Other Platforms

Works with any Node.js hosting platform — Railway, Render, Fly.io, or Docker:

```bash
npm run build
npm start
```

---

## Roadmap

- [ ] Persistent sessions — save transcripts to a database
- [ ] User authentication — sign in with Google / GitHub
- [ ] Export transcripts as TXT, SRT, PDF
- [ ] Speaker diarization — identify different speakers
- [ ] Multi-language support — 100+ languages via Google Speech API
- [ ] Whisper integration — local, offline transcription
- [ ] Browser extension — one-click transcription from any tab
- [ ] Real-time collaboration — share live transcripts with team members
- [ ] AI-powered meeting summaries
- [ ] Keyboard shortcuts for hands-free control

---

## Contributing

Contributions are what make the open source community amazing. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Looking for a place to start? Check out issues labeled [`good first issue`](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

## Author

**Muhammad Bahjat**

- GitHub: [@SyedBahjat](https://github.com/SyedBahjat)
- LinkedIn: [Muhammad Bahjat](https://www.linkedin.com/in/muhammadbahjat/)

---

<div align="center">

**If ScribeFlow helped you, consider giving it a star — it means a lot.**

[Report Bug](../../issues/new) &bull; [Request Feature](../../issues/new)

</div>
