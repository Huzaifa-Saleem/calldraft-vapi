# CallDraft - AI Voice Agent for HVAC

CallDraft is a real-time AI voice agent designed for HVAC businesses. This prototype features "Sarah," a virtual receptionist for Anderson Heating & Cooling, capable of handling service inquiries and booking requests in real-time.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Voice Engine**: Vapi (STT + TTS + LLM Orchestration)
- **UI Components**: Shadcn UI + Lucide Icons
- **Styling**: Tailwind CSS
- **Package Manager**: Bun

## Setup Instructions

### 1. Clone & Install
```bash
bun install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your Vapi Public Key:
```bash
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
```
You can find your public key in the [Vapi Dashboard](https://dashboard.vapi.ai).

### 3. Run Locally
```bash
bun dev
```
Open [http://localhost:3000](http://localhost:3000) to start the conversation.

## Features

- **Real-time Conversation**: Natural, low-latency voice interaction.
- **Live Transcripts**: Streaming speech-to-text display for both user and agent.
- **Latency Monitoring**: Visible response time indicator in milliseconds.
- **Premium UI**: Modern, clean design tailored for a professional HVAC service.

## Why Vapi?

I chose **Vapi** for this prototype because it provides the lowest latency and the fastest development cycle for production-grade voice agents. By handling the complex orchestration between STT, LLM (GPT-4o), and TTS in a single managed WebSocket connection, we achieve natural-feeling response times (often < 800ms) which is critical for a high-quality caller experience.
