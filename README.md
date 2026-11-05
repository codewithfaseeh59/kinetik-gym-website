# KINETIK — gym website

A front-end-only gym website with a bold, animation-heavy design: smooth scrolling, a page loader, scroll-driven
animations and a full set of pages. No backend and no database.

KINETIK is a made-up brand. The layout and motion are inspired by [phive.pt](https://phive.pt); the brand, copy,
logo and code are original, and no assets or text from that site are used.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: video hero, clubs, facilities, pinned "Fitness / Strong" scene, classes, app promo, socials |
| `/clubs` | All five clubs |
| `/clubs/[slug]` | Club detail: facts, facilities, gallery, classes, other clubs |
| `/classes` | 26 classes with category filters and a detail popup |
| `/timetable` | Weekly schedule by club and day, with demo booking (`?club=harbor` pre-selects a club) |
| `/fitness-hub` | Coaching, physio, nutrition and Pilates services |
| `/form/schedule-visit`, `/form/know-more`, `/form/join` | Validated forms with a success screen (nothing is sent) |
| `/privacy-policy`, 404 | Legal page and a styled not-found page |

## Tech

- [Next.js](https://nextjs.org) (App Router, TypeScript), exported as a fully static site
- [GSAP](https://gsap.com) (ScrollTrigger, SplitText, Draggable, Inertia) for animation
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- CSS Modules, with design tokens in `app/globals.css`
- Fonts: Anton and Space Grotesk via `next/font/google`

Animations respect `prefers-reduced-motion`. The timetable is generated deterministically from local data, so there
is no server state.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # static export to ./out
npx serve out    # preview the exported site
```

Requires Node.js 20 or newer.

## Project structure

```
app/            routes, layout, global styles
components/     layout (Header, Footer, Loader), ui (Button, RollingTitle, SplitReveal, ...), providers
sections/       page sections (Hero, ClubsIntro, Facilities, TimetableApp, ...)
data/           clubs, classes, timetable generator, services, forms
lib/            GSAP setup, Lenis helpers, loader coordination, useMotion hook
public/         images and the hero video
```

## Notes

- The forms, booking buttons and language switch are front-end demos only. Nothing is stored or sent.
- Photos come from Unsplash and the hero video from Pexels; see [CREDITS.md](CREDITS.md).

## License

The source code is released under the [MIT License](LICENSE). The photos and video are not covered by it: they keep
their original Unsplash and Pexels licenses.
