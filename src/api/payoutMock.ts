/**
 * Mock payout data layer, following the ranksMock.ts conventions of the
 * main site (async canister-style objects resolving after a short delay).
 *
 * Scope note: the Payout page is a pure per-game summary. Batch/draw
 * details and winner feeds are intentionally NOT part of this contract —
 * batch data lives in each game's own page, winner content belongs to
 * the Rank page (see PAYOUT_DESIGN.md §二/§五).
 *
 * Field mapping to the admin console (game management backend):
 *
 *   totalPlays        ← settled bet/record count ("Game Records" rows /
 *                       tickets), NOT round count — rounds can be empty
 *                       (e.g. Roulette rounds with 0 tickets).
 *   wagers            ← Statistics "Wagers" (per currency)
 *   totalPaidOutUsd   ← Statistics "Payout", USD-equivalent
 *   actualRtp         ← Payout ÷ Wagers (same formula the console uses
 *                       for "Actual RTP")
 *   kind              ← batch-configured products = "batch", others
 *                       = "instant" (drives the type chip only)
 *
 * Production notes:
 * - Game logos are the same assets the homepage uses (LOGO_BASE_URL in
 *   src/api/home.ts; Quick Quid ships locally as /qqlogo.png). Offline,
 *   ProductLogo falls back to its gradient placeholder.
 * - Amounts are USD-equivalent numbers. How Bonus-settled games enter
 *   the USD aggregates (and whether they are included in public RTP at
 *   all) is an open product decision — see PAYOUT_DESIGN.md §五.
 * - Mock invariant kept coherent: totalPaidOutUsd ≈
 *   totalPlays × ticketPriceUsd × actualRtp.
 */

/** The three settlement currencies a jackpot / payout can be split across. */
export type PayoutCurrency = "WLT" | "Gcoin" | "Bonus";

export interface CurrencySplit {
  symbol: PayoutCurrency;
  /** native token amount in that currency */
  amount: number;
  /** this currency's share of the metric's total, 0–100 */
  sharePct: number;
}

export interface GamePayoutStats {
  gameId: string;
  name: string;
  logo: string;
  /** batch = scheduled draw periods; instant = continuous play */
  kind: "batch" | "instant";
  ticketPriceUsd: number;
  /** null → game has no jackpot pool (rendered as –) */
  jackpotUsd: number | null;
  /** live jackpot broken down by currency; present when jackpotUsd !== null */
  jackpotByCurrency?: CurrencySplit[];
  /** long-run design expectation, percent */
  theoreticalRtp: number;
  /** realized payout ÷ wagers to date, percent; null → no plays yet */
  actualRtp: number | null;
  totalPlays: number;
  totalPaidOutUsd: number;
  /** total paid out broken down by currency */
  paidOutByCurrency?: CurrencySplit[];
}

export interface MyGameStats {
  gameId: string;
  plays: number;
  wageredUsd: number;
  wonUsd: number;
}

export interface MyPayoutSummary {
  plays: number;
  wageredUsd: number;
  wonUsd: number;
  games: MyGameStats[];
}

/** Same logo assets the homepage uses (see src/api/home.ts). */
const LOGO_BASE_URL = "https://storage.randseed.org/Product/Logo/";

const GAMES: GamePayoutStats[] = [
  {
    gameId: "daily4",
    name: "Daily 4",
    logo: `${LOGO_BASE_URL}daily4logosmall.png`,
    kind: "batch",
    ticketPriceUsd: 0.5,
    jackpotUsd: 4515.7,
    jackpotByCurrency: [
      { symbol: "WLT", amount: 12000, sharePct: 58 },
      { symbol: "Gcoin", amount: 6800, sharePct: 30 },
      { symbol: "Bonus", amount: 4500, sharePct: 12 },
    ],
    theoreticalRtp: 98.5,
    actualRtp: 99.12,
    totalPlays: 45210,
    totalPaidOutUsd: 22406,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 610000, sharePct: 55 },
      { symbol: "Gcoin", amount: 420000, sharePct: 35 },
      { symbol: "Bonus", amount: 390000, sharePct: 10 },
    ],
  },
  {
    gameId: "luckynicky",
    name: "Lucky Nicky",
    logo: `${LOGO_BASE_URL}LNlogo.jpg`,
    kind: "batch",
    ticketPriceUsd: 0.2,
    jackpotUsd: 243.0,
    jackpotByCurrency: [
      { symbol: "WLT", amount: 1200, sharePct: 40 },
      { symbol: "Gcoin", amount: 2430, sharePct: 50 },
      { symbol: "Bonus", amount: 900, sharePct: 10 },
    ],
    theoreticalRtp: 93.0,
    actualRtp: 95.62,
    totalPlays: 3842,
    totalPaidOutUsd: 735,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 3600, sharePct: 45 },
      { symbol: "Gcoin", amount: 7350, sharePct: 45 },
      { symbol: "Bonus", amount: 1200, sharePct: 10 },
    ],
  },
  {
    gameId: "roulette",
    name: "Roulette",
    logo: `${LOGO_BASE_URL}Roulette.png`,
    kind: "instant",
    ticketPriceUsd: 1.0,
    jackpotUsd: null,
    theoreticalRtp: 97.3,
    actualRtp: 97.05,
    totalPlays: 28764,
    totalPaidOutUsd: 27916,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 210000, sharePct: 62 },
      { symbol: "Gcoin", amount: 95000, sharePct: 30 },
      { symbol: "Bonus", amount: 24000, sharePct: 8 },
    ],
  },
  {
    gameId: "fruitsgarden",
    name: "Fruits Garden",
    logo: `${LOGO_BASE_URL}Fruitsgardenlogosmall.png`,
    kind: "instant",
    ticketPriceUsd: 0.25,
    jackpotUsd: 2178.73,
    jackpotByCurrency: [
      { symbol: "WLT", amount: 5400, sharePct: 50 },
      { symbol: "Gcoin", amount: 3200, sharePct: 35 },
      { symbol: "Bonus", amount: 2100, sharePct: 15 },
    ],
    theoreticalRtp: 96.0,
    actualRtp: 95.41,
    totalPlays: 9581,
    totalPaidOutUsd: 2286,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 9800, sharePct: 43 },
      { symbol: "Gcoin", amount: 8600, sharePct: 40 },
      { symbol: "Bonus", amount: 4600, sharePct: 17 },
    ],
  },
  {
    gameId: "mines",
    name: "Mines",
    logo: `${LOGO_BASE_URL}Mineslogo.png`,
    kind: "instant",
    ticketPriceUsd: 0.5,
    jackpotUsd: null,
    theoreticalRtp: 99.0,
    actualRtp: 98.87,
    totalPlays: 12045,
    totalPaidOutUsd: 5954,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 31000, sharePct: 52 },
      { symbol: "Gcoin", amount: 21000, sharePct: 40 },
      { symbol: "Bonus", amount: 4600, sharePct: 8 },
    ],
  },
  {
    // Tiny volume so far — exercises the low-volume tag on Actual RTP.
    gameId: "keno",
    name: "Keno",
    logo: `${LOGO_BASE_URL}Kenologosmall.png`,
    kind: "instant",
    ticketPriceUsd: 1.55,
    jackpotUsd: null,
    theoreticalRtp: 94.0,
    actualRtp: 44.06,
    totalPlays: 18,
    totalPaidOutUsd: 12.29,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 2, sharePct: 16 },
      { symbol: "Gcoin", amount: 4, sharePct: 33 },
      { symbol: "Bonus", amount: 6.29, sharePct: 51 },
    ],
  },
  {
    gameId: "quickquid",
    name: "Quick Quid",
    logo: "/qqlogo.png",
    kind: "batch",
    ticketPriceUsd: 0.1,
    jackpotUsd: null,
    theoreticalRtp: 76.0,
    actualRtp: 88.0,
    totalPlays: 5,
    totalPaidOutUsd: 0.44,
    paidOutByCurrency: [
      { symbol: "WLT", amount: 0.1, sharePct: 23 },
      { symbol: "Gcoin", amount: 0.24, sharePct: 55 },
      { symbol: "Bonus", amount: 0.1, sharePct: 22 },
    ],
  },
];

const MY_STATS: MyPayoutSummary = {
  plays: 271,
  wageredUsd: 160.2,
  wonUsd: 150.0,
  games: [
    { gameId: "daily4", plays: 120, wageredUsd: 60.0, wonUsd: 54.3 },
    { gameId: "luckynicky", plays: 26, wageredUsd: 5.2, wonUsd: 7.7 },
    { gameId: "roulette", plays: 85, wageredUsd: 85.0, wonUsd: 79.9 },
    { gameId: "fruitsgarden", plays: 40, wageredUsd: 10.0, wonUsd: 8.1 },
  ],
};

const LATENCY_MS = 600;

export const payout_center = {
  /** Site-wide per-game payout aggregates. */
  get_game_stats: async (): Promise<GamePayoutStats[]> =>
    new Promise((resolve) => {
      setTimeout(() => resolve(GAMES.map((g) => ({ ...g }))), LATENCY_MS);
    }),

  /** Personal per-game stats for the signed-in player. */
  get_my_stats: async (): Promise<MyPayoutSummary> =>
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            ...MY_STATS,
            games: MY_STATS.games.map((g) => ({ ...g })),
          }),
        LATENCY_MS,
      );
    }),
};
