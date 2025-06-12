This is a simple notes application built with Next.js. It lets you create, edit
and remove markdown notes using a Notion‑style interface. Notes are stored in a
local `notes.json` file so everything works offline.

## Getting Started

First, install dependencies and run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

This project stores notes locally in `notes.json`. It is meant for local use and
does not require any external database.
