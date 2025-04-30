## F1 Info

A web application that provides Formula 1 race information, schedules, results, and standings using [FastF1](https://github.com/theOehrly/Fast-F1 "FastF1") data.

### Features

📅 **Schedule**: View the complete F1 race calendar\
🏎️ **Race Results**: Access detailed race and qualifying results\
🏆 **Driver & Constructor Standings**: Track championship standings throughout the season

### Technology Stack

#### Frontend:

- Next.js
- TypeScript
- Tailwind CSS

#### Backend:

1. FastAPI
2. Python
3. FastF1

## Getting Started

First, create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Then, install the frontend dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server (python dependencies will be installed automatically here):

```bash
npm install
# or
yarn
# or
pnpm install
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The FastApi server will be running on [http://127.0.0.1:8000](http://127.0.0.1:8000) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).

## Legal Notice

This project/website is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
