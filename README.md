# PhysicsLab

I built this site because I got tired of just looking at equations on slides. I wanted to see them actually move. It's got 36 topics across three volumes—Classical, Quantum, and Black Hole Physics—plus a couple of math games. Every simulation shows the math behind it right on the screen; nothing runs until the equation is there.

You can check it out live at [random-physics.vercel.app](https://random-physics.vercel.app).

## What's inside

- **Home** (`/`) — A live double pendulum and links to the different volumes.
- **Classical Physics** (`/classical-mechanics`) — Vol. 1, covering 12 topics with a gold/bronze look.
- **Quantum Physics** (`/quantum`) — Vol. 2, 10 topics with an emerald green theme.
- **Black Hole Physics** (`/black-holes`) — Vol. 3, 14 topics with a deep purple vibe.
- **Visual Math** (`/visual-math`) — A couple of games: rebuild curves with circles or explore the Mandelbrot set.
- **Quantum Tunneling** (`/quantum-tunneling`) — An AI model that 'rediscovers' Kepler's laws, plus the concept of tunneling.
- **Notes** (`/notes`) — My changelog, roadmap, and who to credit.

## Design

I went with a dark, cosmic theme. Each volume has its own accent color: **auric** (gold) for Classical, **verdant** (green) for Quantum, and **nebula** (purple) for Black Holes. The background is a procedural starfield I built that drifts slowly as you browse.

For fonts, I'm using **Hanken Grotesk** for the UI, **Source Serif 4** for the stories/narratives, and **JetBrains Mono** for the math labels.

## The Math

I'm using [KaTeX](https://katex.org) to render the equations. I built a custom component that 'types' out the derivation steps as you scroll, so you can follow the logic before the simulation kicks in.

## Tech Stuff

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router
- KaTeX via CDN
- Deployed on Vercel (I've already set up the `vercel.json`).

## How to run it locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # build for production
```

## Things I'm still working on

Check the `/notes` page in the app for the full roadmap. I'm planning to add a Statistical Mechanics volume, PDF exports for the math, and better mobile support for some of the denser panels.
