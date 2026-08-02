# rspayout — randseed.org desktop with the Payout page

The full randseed.org desktop web app (as exported from the main project)
with the **Payout** page implemented — a site-wide payout / RTP summary
across all games that replaces the per-game batch "History" view, plus a
personal payout-rate view for signed-in players.

Everything outside the Payout page content — header, navigation, Money /
Play / Rank pages, footer, mobile tab bar, styles, prerender setup — is the
original site code, unchanged. See [`PAYOUT_DESIGN.md`](./PAYOUT_DESIGN.md)
for the requirement assessment and design decisions.

## Run

```bash
npm install
npm run dev      # http://localhost:3000 → navigate to /payout
npm run lint     # tsc --noEmit
npm run build    # vite build + prerender (incl. /payout SEO route)
```

No env vars needed for local dev (`.env.example` is AI Studio boilerplate;
nothing in `src/` reads it). Sign-in is the site's existing mock flow
(wallet connect → profile setup) and unlocks the personal payout view.

## What changed vs the original export

| File | Change |
| --- | --- |
| `src/components/PayoutPage.tsx` | **New** — the Payout page, styled entirely with RS Design System tokens/components |
| `src/api/payoutMock.ts` | **New** — mock data layer + TypeScript contract for the real API |
| `src/styles/rs/` | **New** — verbatim copies from the RS Design System build (`tokens.css`, `button.css`); re-copy from the RS repo to update |
| `src/styles/payout.css` | **New** — page-scoped classes referencing RS tokens only (cards, chips, table skin, tooltip, ticker) |
| `src/index.tsx` | Placeholder `payout` branch replaced with `<PayoutPage userAccount={userAccount} onSignInClick={…} />` (+ import) |
| `public/images/headshots/01–07.svg` | **New** — the system avatars `src/utils/avatar.ts` already references (they were missing from the export) |
| `docs/screenshots/` | Current renders of the page states |

Everything else — including `src/index.css` — is byte-identical to the
original export. See `PAYOUT_DESIGN.md` §三 for the token/component mapping.

## Wiring the real backend

`src/api/payoutMock.ts` is the contract: swap `payout_center.get_game_stats()`
/ `get_my_stats()` for the real canister calls, keep the interfaces. Table
level figures are lifetime aggregates; batch-scoped numbers appear only in
a row's expanded panel. Point each game's `logo` at the production CDN or
join against `useHomeData().games`.
