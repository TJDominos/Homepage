import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronsUpDown, Coins, Info, ArrowRight } from "lucide-react";
import { ProductLogo } from "../components/shared/ProductLogo";
import { getSysAvatar } from "../utils/avatar";
import { AssetIcon } from "../components/shared/AssetIcon";
import {
  payout_center,
  type CurrencySplit,
  type GamePayoutStats,
  type MyPayoutSummary,
} from "../api/payoutMock";
import "./styles/payout.css";

const fmtGcoin = (n: number, dec = 0) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: dec,
  });
  return (
    <span className="inline-flex items-center gap-1">
      <AssetIcon type="Gcoin" className="w-[14px] h-[14px]" />
      {formatter.format(n * 10)}
    </span>
  );
};

const fmtBonus = (n: number, dec = 0) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: dec,
  });
  return (
    <span className="inline-flex items-center gap-1">
      <AssetIcon type="Bonus" className="w-[14px] h-[14px]" />
      {formatter.format(n * 10000)}
    </span>
  );
};

const fmtPct = (n: number) => `${n.toFixed(2)}%`;

const fmtToken = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: n < 100 ? 2 : 0,
  });

/** Per-currency amounts with their share, right-aligned so lines sit
    under a numeric table column (md+ expanded rows): amount (primary,
    tabular) · symbol (muted) · share % (muted, right). */
const CurrencyLines: React.FC<{ splits?: CurrencySplit[] }> = ({ splits }) =>
  splits && splits.length > 0 ? (
    <div className="flex flex-col gap-1.5">
      {splits.map((s) => (
        <div
          key={s.symbol}
          className="flex items-baseline justify-end gap-2 whitespace-nowrap"
        >
          <span className="text-sm font-medium tabular-nums text-(--text-primary)">
            {fmtToken(s.amount)}
          </span>
          <span className="w-11 text-left text-xs text-(--text-subtle)">
            {s.symbol}
          </span>
          <span className="w-9 text-right text-xs tabular-nums text-(--color-black-alpha-50)">
            {s.sharePct}%
          </span>
        </div>
      ))}
    </div>
  ) : null;

/** One labeled group of the below-md expanded panel: label and USD
    total left-aligned as the group header, per-currency lines below
    on a right-aligned numeric spine (share % in its own trailing mini
    column). Both groups use this identical structure so neither side
    mirrors the other. */
const BreakdownGroup: React.FC<{
  label: React.ReactNode;
  total: React.ReactNode;
  splits?: CurrencySplit[];
  className?: string;
}> = ({ label, total, splits, className = "" }) => (
  <div
    className={`grid grid-cols-[auto_auto_auto] items-baseline gap-x-2.5 gap-y-1.5 ${className}`}
  >
    <div className="col-span-3 mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-(--color-black-alpha-50)">
      {label}
    </div>
    <span className="col-span-3 text-[13px] font-semibold tabular-nums text-(--text-primary)">
      {total}
    </span>
    {splits?.map((s) => (
      <React.Fragment key={s.symbol}>
        <span className="text-xs text-(--text-subtle)">{s.symbol}</span>
        <span className="text-right text-[13px] font-medium tabular-nums text-(--text-primary)">
          {fmtToken(s.amount)}
        </span>
        <span className="text-right text-xs tabular-nums text-(--color-black-alpha-50)">
          {s.sharePct}%
        </span>
      </React.Fragment>
    ))}
  </div>
);

/** Count-up for the hero figure; snaps to the target under reduced motion. */
function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (
      target === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return value;
}

/* Hover-only affordance — desktop only: hidden on touch/mobile widths,
   and below lg the icons' width would overflow the full-column table. */
const HeaderTip: React.FC<{ text: string }> = ({ text }) => (
  <span className="group/tip relative ml-1 hidden align-middle lg:inline-flex">
    <Info size={12} className="text-(--color-black-alpha-30)" />
    {/* display-gated (not opacity) so the hidden panel never widens the
        table's scroll area; opens downward to stay inside the clipped card,
        right-anchored so it can't overflow the table's right edge. */}
    <span
      className="payout-tip pointer-events-none absolute right-0 top-full z-20 mt-1.5 hidden w-52 whitespace-normal px-2.5 py-1.5 text-left normal-case leading-snug group-hover/tip:block"
      role="tooltip"
    >
      {text}
    </span>
  </span>
);

type SortKey = "jackpot" | "theo" | "actual" | "plays" | "paid";
type SortDir = "asc" | "desc";

interface PayoutPageProps {
  /** Signed-in account id, same value App passes to MoneyPage. */
  userAccount?: string | null;
  /** Kept for API compatibility with the app shell; unused since the
      signed-out sign-in banner was removed. */
  onSignInClick?: () => void;
}


const ASSETS_RANKING = [
  { symbol: "JUP", users: 124, lastTime: "2 mins ago", amount: "12,300", usdValue: "$2,384.10" },
  { symbol: "Bonk", users: 98, lastTime: "5 mins ago", amount: "450M", usdValue: "$1,377.00" },
  { symbol: "RAY", users: 76, lastTime: "12 mins ago", amount: "420", usdValue: "$630.00" },
  { symbol: "WLT", users: 65, lastTime: "15 mins ago", amount: "3.2M", usdValue: "$480.00" },
  { symbol: "Gcoin", users: 54, lastTime: "30 mins ago", amount: "4,000", usdValue: "$400.00" },
  { symbol: "TRUMP", users: 45, lastTime: "1 hr ago", amount: "15,000", usdValue: "$150.00" },
  { symbol: "PUMP", users: 22, lastTime: "3 hrs ago", amount: "10M", usdValue: "$100.00" },
  { symbol: "ANSEM", users: 12, lastTime: "5 hrs ago", amount: "4.5M", usdValue: "$90.00" },
  { symbol: "Fartcoin", users: 5, lastTime: "1 day ago", amount: "1M", usdValue: "$5.00" },
];

export default function PayoutPage({ userAccount }: PayoutPageProps) {
  const [games, setGames] = useState<GamePayoutStats[] | null>(null);
  const [myStats, setMyStats] = useState<MyPayoutSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState("Rewards");
  const [gameCategory, setGameCategory] = useState<"Rand Game" | "Randball">("Rand Game");
  const [sortKey, setSortKey] = useState<SortKey>("actual");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [myExpanded, setMyExpanded] = useState(false);
  
  const signedIn = !!userAccount;

  const loadGames = () => {
    setLoading(true);
    payout_center.get_game_stats().then((rows) => {
      setGames(rows);
      setLoading(false);
    });
  };

  useEffect(loadGames, []);

  useEffect(() => {
    if (!signedIn) {
      setMyStats(null);
      return;
    }
    let cancelled = false;
    payout_center.get_my_stats().then((s) => {
      if (!cancelled) setMyStats(s);
    });
    return () => {
      cancelled = true;
    };
  }, [signedIn]);

  const totals = useMemo(() => {
    if (!games) return null;
    const paidOut = games.reduce((s, g) => s + g.totalPaidOutUsd, 0);
    const wagered = games.reduce(
      (s, g) => s + g.totalPlays * g.ticketPriceUsd,
      0,
    );
    const playedGames = games.filter((g) => g.totalPlays > 0);
    const weightedTheo =
      playedGames.reduce(
        (s, g) => s + g.theoreticalRtp * g.totalPlays * g.ticketPriceUsd,
        0,
      ) / Math.max(1, wagered);
    return {
      paidOut,
      wagered,
      overallActual: wagered > 0 ? (paidOut / wagered) * 100 : null,
      weightedTheo,
    };
  }, [games]);

  /** Per-game rows for the expanded personal card (name/logo joined in). */
  const myGameRows = useMemo(() => {
    if (!myStats) return [];
    const byId = new Map(games?.map((g) => [g.gameId, g]));
    return myStats.games
      .filter((g) => {
        const kind = byId.get(g.gameId)?.kind;
        if (!kind) return true;
        return gameCategory === "Rand Game" ? kind === "instant" : kind === "batch";
      })
      .map((g) => ({
        gameId: g.gameId,
        name: byId.get(g.gameId)?.name ?? g.gameId,
        logo: byId.get(g.gameId)?.logo,
        plays: g.plays,
        wageredUsd: g.wageredUsd,
        wonUsd: g.wonUsd,
        netUsd: g.wonUsd - g.wageredUsd,
        rtp: g.wageredUsd > 0 ? (g.wonUsd / g.wageredUsd) * 100 : 0,
      }))
      .sort((a, b) => b.wageredUsd - a.wageredUsd);
  }, [myStats, games, gameCategory]);

  const filteredMyStats = useMemo(() => {
    if (!myStats) return null;
    let plays = 0;
    let wageredUsd = 0;
    let wonUsd = 0;
    myGameRows.forEach(r => {
      plays += r.plays;
      wageredUsd += r.wageredUsd;
      wonUsd += r.wonUsd;
    });
    return { plays, wageredUsd, wonUsd, games: myGameRows };
  }, [myStats, myGameRows]);

  const sortedGames = useMemo(() => {
    if (!games) return [];
    
    const filteredGames = games.filter((g) => 
      gameCategory === "Rand Game" ? g.kind === "instant" : g.kind === "batch"
    );

    const val = (g: GamePayoutStats): number | null => {
      switch (sortKey) {
        case "jackpot":
          return g.jackpotUsd;
        case "theo":
          return g.theoreticalRtp;
        case "actual":
          return g.actualRtp;
        case "plays":
          return g.totalPlays;
        case "paid":
          return g.totalPaidOutUsd;
      }
    };
    return [...filteredGames].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      if (av === null && bv === null) return 0;
      if (av === null) return 1; // nulls always last
      if (bv === null) return -1;
      return sortDir === "desc" ? bv - av : av - bv;
    });
  }, [games, gameCategory, sortKey, sortDir]);

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const heroPaidOut = useCountUp(totals?.paidOut ?? 0);
  // 6 data columns + the trailing expand-toggle column (md+ only;
  // panel colSpan clamps to the visible columns on smaller viewports).
  const colCount = gameCategory === "Randball" ? 5 : 6;

  const SortTh: React.FC<{
    k: SortKey;
    label: React.ReactNode;
    tip?: string;
    className?: string;
  }> = ({ k, label, tip, className = "" }) => (
    <th
      className={`px-1.5 py-3.5 md:px-3 md:py-4 ${className}`}
      aria-sort={
        sortKey === k
          ? sortDir === "desc"
            ? "descending"
            : "ascending"
          : undefined
      }
    >
      <button
        type="button"
        onClick={() => onSort(k)}
        className="payout-sort inline-flex w-full items-center justify-end gap-0.5 whitespace-nowrap"
      >
        {label}
        {tip && <HeaderTip text={tip} />}
        {sortKey === k ? (
          <ChevronDown
            size={12}
            className={`shrink-0 text-(--color-black-alpha-60) transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
          />
        ) : (
          <ChevronsUpDown
            size={12}
            className="shrink-0 text-(--color-black-alpha-25)"
          />
        )}
      </button>
    </th>
  );

  return (
    <div className="payout-page fade-in-up mx-auto w-full max-w-[1024px] px-4 pb-12 pt-4">
      {/* ---------- Title ---------- */}
      <div className="mb-5 flex flex-col items-start gap-3">
        <h1 className="text-[16px] font-bold text-black text-left">
          Site-Wide Rewards &amp; Assets Statistics
        </h1>

        <div className="flex flex-row items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {["Rewards", "Assets"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`w-[60px] sm:w-[80px] h-[28px] rounded-2xl text-[12px] sm:text-sm font-medium transition-colors flex items-center justify-center ${
                  subTab === tab
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/60 hover:text-black hover:bg-black/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

            {subTab === "Rewards" ? (
        <>
    {/* ---------- Hero stats ---------- */}
            {loading || !totals ? (
              <div className="mb-5">
                <div className="h-[104px] animate-pulse rounded-(--radius-lg) bg-(--color-black-alpha-5)" />
              </div>
            ) : (
              <div className="mb-5">
                <button 
                  onClick={() => setSubTab("Assets")}
                  className="payout-card p-5 flex flex-col text-left hover:bg-black/[0.02] transition-colors group cursor-pointer relative w-full"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-(--text-subtle)">
                      <Coins size={14} className="text-(--color-coin)" aria-hidden />
                      Total Rewards
                    </div>
                    <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-purple-500/10 group-hover:text-purple-600 transition-colors shrink-0">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                  <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    <div className="flex items-center gap-3 flex-wrap">
                      {fmtGcoin(Math.round(heroPaidOut))}
                      <span className="text-black/30 font-light text-[20px] hidden sm:inline">/</span>
                      <span className="text-[20px] sm:text-[24px]">{fmtBonus(Math.round(heroPaidOut), 0)}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50) flex items-center justify-between w-full">
                    <span>Across all games, lifetime</span>
                    <span className="text-black font-medium group-hover:text-purple-600 transition-colors whitespace-nowrap ml-2">
                      Asset Tracker
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* ---------- Category Filter ---------- */}
            <div className="mb-5 flex w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="inline-flex items-center gap-1 bg-black/5 p-1 rounded-2xl shrink-0">
                <button
                  onClick={() => { setGameCategory("Rand Game"); setSortKey("actual"); }}
                  className={`px-4 min-w-[112px] h-[28px] flex shrink-0 items-center justify-center rounded-[12px] text-[12px] md:text-[14px] leading-[20px] font-medium transition-all ${
                    gameCategory === "Rand Game"
                      ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  Rand Game
                </button>
                <button
                  onClick={() => { setGameCategory("Randball"); setSortKey("jackpot"); }}
                  className={`px-4 min-w-[112px] h-[28px] flex shrink-0 items-center justify-center rounded-[12px] text-[12px] md:text-[14px] leading-[20px] font-medium transition-all ${
                    gameCategory === "Randball"
                      ? "bg-white text-black shadow-sm ring-1 ring-black/5"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  Rand Ball
                </button>
              </div>
            </div>
            

      
            {/* ---------- Personal summary (signed in only) ---------- */}
            {signedIn && (
              <div className="payout-mycard mb-5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => filteredMyStats && setMyExpanded((v) => !v)}
                  aria-expanded={myExpanded}
                  className="flex w-full flex-col gap-4 p-4 text-left sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getSysAvatar("02")}
                      alt=""
                      className="h-(--size-avatar-lg) w-(--size-avatar-lg) rounded-(--radius-full) border-2 border-(--color-white) object-cover md:h-(--size-avatar-xl) md:w-(--size-avatar-xl)"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-base font-bold leading-tight text-(--text-primary)">
                        My rewards stats
                        {filteredMyStats && (
                          <ChevronDown
                            size={16}
                            className={`text-(--color-black-alpha-60) transition-transform duration-200 ${myExpanded ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-(--text-subtle) md:text-sm">
                        {filteredMyStats
                          ? `${filteredMyStats.plays} plays · ${filteredMyStats.games.length} games`
                          : "Loading…"}
                      </div>
                    </div>
                  </div>
                  {filteredMyStats && (
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8">
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Reward
                        </div>
                        <div className="text-base font-semibold tabular-nums text-(--text-primary) flex flex-col gap-0.5">
                          {fmtGcoin(filteredMyStats.wonUsd, 2)}
                          <span className="text-[13px]">{fmtBonus(filteredMyStats.wonUsd, 0)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-(--text-subtle)">
                          Reward Rate
                        </div>
                        <div className="text-base font-bold tabular-nums text-(--text-accent)">
                          {fmtPct((filteredMyStats.wonUsd / (filteredMyStats.wageredUsd || 1)) * 100)}
                        </div>
                      </div>
                    </div>
                  )}
                </button>
      
                {myExpanded && filteredMyStats && (
                  <div className="border-t border-(--color-purple-100) px-2 pb-2 pt-1 sm:px-4 sm:pb-3">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead className="text-xs font-medium text-(--text-subtle)">
                          <tr>
                            <th className="pl-4 sm:pl-6 pr-1.5 py-2 sm:pr-2 whitespace-nowrap text-left">Game</th>
                            <th className="hidden px-1.5 py-2 text-right sm:table-cell sm:px-2 whitespace-nowrap">Plays</th>
                            
                            <th className="px-2 py-2 text-right whitespace-nowrap">Reward</th>
                            
                            <th className="px-1.5 py-2 text-right sm:px-2 whitespace-nowrap">Reward%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-(--color-purple-100)">
                          {filteredMyStats.games.map((r) => (
                            <tr key={r.gameId}>
                              <td className="pl-4 sm:pl-6 pr-1.5 py-2.5 sm:pr-2">
                                <div className="flex items-center">
                                  <ProductLogo
                                    src={r.logo}
                                    alt={r.name}
                                    className="h-5 w-5 shrink-0 rounded-md border border-(--color-black-alpha-10) object-cover"
                                  />
                                </div>
                              </td>
                              <td className="hidden px-1.5 py-2.5 text-right tabular-nums text-(--text-subtle) sm:table-cell sm:px-2">
                                {r.plays.toLocaleString("en-US")}
                              </td>
                              
                              <td className="px-2 py-2.5 text-right tabular-nums text-black/80">
                                <div className="flex flex-col items-end">
                                  <div className="flex flex-col items-end gap-0.5">
                                    <span className="text-[12px] md:text-[14px]">{fmtGcoin(r.wonUsd, 2)}</span>
                                    <span className="text-[12px] md:text-[14px]">{fmtBonus(r.wonUsd, 0)}</span>
                                  </div>
                                  <span className="text-[11px] text-black/40 sm:hidden mt-0.5">{r.plays.toLocaleString("en-US")} plays</span>
                                </div>
                              </td>
                              
                              <td className="px-1.5 py-2.5 text-right tabular-nums sm:px-2">
                                <div className="flex flex-col items-end">
                                  <span className="text-[12px] font-bold md:text-[15px] text-black">
                                    {fmtPct(r.rtp)}
                                  </span>
                                  <span className={`text-[11px] font-medium mt-0.5 ${r.rtp > 100 ? "text-emerald-600" : r.rtp < 100 ? "text-rose-500" : "text-black/40"}`}>
                                    {r.rtp > 100 ? "+" : ""}{fmtPct(r.rtp - 100)}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* ---------- Games table ---------- */}
            <div className="payout-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="payout-thead border-none">
                    <tr>
                      <th className="pl-4 sm:pl-6 pr-3 py-3.5 md:pr-4 md:py-4 text-left">Game</th>
                      {gameCategory === "Randball" && (
                        <SortTh k="jackpot" label="Prize Pool" />
                      )}
                      {gameCategory === "Rand Game" && (
                        <>
                          <SortTh k="jackpot" label="Prize Pool" />
                          <SortTh
                            k="theo"
                            label="Target RTP"
                            tip="The share of incomes a game is designed to reward players."
                            className="hidden md:table-cell"
                          />
                          <SortTh
                            k="actual"
                            label={
                              <div className="flex flex-col">
                                <span className="hidden md:inline">Actual RTP</span>
                                <span className="md:hidden">RTP</span>
                                <span className="md:hidden text-[10px] text-black/50 font-normal mt-0.5 leading-tight">vs Target</span>
                              </div>
                            }
                            tip="Realized rewards ÷ total incomes to date. Low-volume games swing above and below theory."
                            className="pr-3"
                          />
                        </>
                      )}
                      <SortTh
                        k="plays"
                        label="Total Plays"
                        className="hidden sm:table-cell"
                      />
                      <SortTh
                        k="paid"
                        label="Total Rewards"
                        className="pr-4 sm:pr-6"
                      />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--color-black-alpha-5) text-sm">
                    {loading
                      ? [...Array(7)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td className="px-3 py-4 md:px-4">
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="h-8 w-8 rounded-(--radius-md) bg-(--color-black-alpha-10) md:h-9 md:w-9" />
                                <div className="h-4 w-24 rounded-(--radius-sm) bg-(--color-black-alpha-10)" />
                              </div>
                            </td>
                            {[
                              gameCategory === "Randball" ? "" : null, // Live Jackpot
                              gameCategory === "Rand Game" ? "" : null, // Prize Pool
                              gameCategory === "Rand Game" ? "hidden md:table-cell" : null, // Theoretical RTP
                              gameCategory === "Rand Game" ? "" : null, // Actual RTP
                              "hidden sm:table-cell", // Total Plays
                              "", // Paid Out
                            ].filter(cls => cls !== null).map((cls, j) => (
                              <td key={j} className={`px-1.5 py-4 md:px-3 ${cls}`}>
                                <div className="ml-auto h-4 w-16 rounded-(--radius-sm) bg-(--color-black-alpha-5)" />
                              </td>
                            ))}
                          </tr>
                        ))
                      : sortedGames.map((g) => {
                          return (
                            <React.Fragment key={g.gameId}>
                            <tr
                              className="payout-row transition-colors hover:bg-black/[0.02]"
                            >
                              <td className="pl-4 sm:pl-6 pr-3 py-3 md:pr-4 md:py-3.5 whitespace-nowrap">
                                <div className="flex items-center">
                                  <ProductLogo
                                    src={g.logo}
                                    alt={g.name}
                                    className="h-8 w-8 shrink-0 rounded-xl border border-black/10 object-cover sm:h-10 sm:w-10"
                                  />
                                </div>
                              </td>
                              {gameCategory === "Randball" && (
                                <td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                  {g.jackpotUsd === null ? (
                                    <span className="text-[12px] md:text-[14px] text-(--text-disabled)">–</span>
                                  ) : (
                                    <div className="flex flex-col items-end gap-0.5 whitespace-nowrap text-[12px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                      {fmtGcoin(g.jackpotUsd, 2)}
                                      {fmtBonus(g.jackpotUsd, 0)}
                                    </div>
                                  )}
                                </td>
                              )}
                              {gameCategory === "Rand Game" && (
                                <>
                                  <td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                                    {g.jackpotUsd === null ? (
                                      <span className="text-black/30 text-[12px] md:text-[14px]">–</span>
                                    ) : (
                                      <div className="flex flex-col items-end gap-0.5 whitespace-nowrap text-[12px] font-semibold tabular-nums text-black md:text-[15px]">
                                        {fmtGcoin(g.jackpotUsd, 2)}
                                        {fmtBonus(g.jackpotUsd, 0)}
                                      </div>
                                    )}
                                  </td>
                                  <td className="hidden md:table-cell px-3 py-3.5 text-right tabular-nums text-[12px] md:text-[14px] text-(--text-subtle)">
                                    {fmtPct(g.theoreticalRtp)}
                                  </td>
                                  <td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                                    {g.actualRtp === null ? (
                                      <div className="flex flex-col items-end">
                                        <span className="text-black/30">–</span>
                                        <span className="text-[11px] text-black/30 mt-0.5">no plays yet</span>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-end">
                                        <span className="text-[12px] font-bold tabular-nums md:text-[15px] text-black">
                                          {fmtPct(g.actualRtp)}
                                        </span>
                                        <span className={`mt-0.5 text-[11px] font-medium tabular-nums ${g.actualRtp > g.theoreticalRtp ? "text-emerald-600" : g.actualRtp < g.theoreticalRtp ? "text-rose-500" : "text-black/40"}`}>
                                          {g.actualRtp > g.theoreticalRtp ? "+" : ""}{fmtPct(g.actualRtp - g.theoreticalRtp)}
                                        </span>
                                      </div>
                                    )}
                                  </td>
                                </>
                              )}
                              <td className="hidden sm:table-cell px-3 py-3.5 text-right tabular-nums text-[12px] md:text-[14px] text-black/60">
                                {g.totalPlays === 0
                                  ? "–"
                                  : g.totalPlays.toLocaleString("en-US")}
                              </td>
                              <td className="pl-2 pr-4 sm:pr-6 py-3 md:pl-3 md:py-3.5 text-right font-medium tabular-nums text-[12px] md:text-[14px] text-black">
                                <div className="flex flex-col items-end">
                                  <span>
                                    {g.totalPaidOutUsd === 0
                                      ? "–"
                                      : (
                                        <div className="flex flex-col items-end gap-0.5">
                                          {fmtGcoin(g.totalPaidOutUsd, g.totalPaidOutUsd < 10 ? 2 : 0)}
                                          {fmtBonus(g.totalPaidOutUsd, 0)}
                                        </div>
                                      )}
                                  </span>
                                  <span className="sm:hidden mt-0.5 text-[11px] text-black/40 font-normal">{g.totalPlays.toLocaleString("en-US")} plays</span>
                                </div>
                              </td>
                            </tr>
                            </React.Fragment>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ---------- Smallprint ---------- */}
            <p className="mt-4 text-xs leading-relaxed text-(--color-black-alpha-50)">
              All figures are in Gcoins. Actual RTP is realized rewards ÷ incomes to date and naturally swings while volume is low — theoretical RTP is the long-run design expectation.
            </p>
          
        </>
      ) : (
                <div className="rounded-2xl overflow-hidden mt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#e5e7eb] border-none text-[12px] md:text-[14px] font-medium text-black/40">
                <tr>
                  <th className="px-2 md:px-4 py-3 md:py-4 w-10 md:w-16 text-center">
                    #
                  </th>
                  <th className="px-2 md:px-4 py-3 md:py-4">Asset</th>
                  <th className="hidden sm:table-cell px-2 md:px-4 py-3 md:py-4 text-right">Users</th>
                  <th className="px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">Amount</th>
                  <th className="hidden md:table-cell px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">Last Withdrawn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 bg-transparent text-[14px] md:text-[16px]">
                {ASSETS_RANKING.map((item, index) => {
                  const isRecent = index === 0;
                  return (
                  <tr
                    key={item.symbol}
                    className={`transition-colors ${isRecent ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'hover:bg-black/5'}`}
                  >
                    <td className={`px-2 md:px-4 py-3 md:py-4 font-medium text-center ${isRecent ? 'text-emerald-600' : 'text-black/60'}`}>
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4">
                      <div className="flex items-center space-x-2 md:space-x-4">
                        <AssetIcon type={item.symbol} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-transparent" />
                        <div>
                          <div className={`font-semibold text-[14px] sm:text-[16px] ${isRecent ? 'text-emerald-900' : 'text-black'}`}>{item.symbol}</div>
                          <div className="sm:hidden text-[12px] text-black/50 mt-0.5">{item.users.toLocaleString()} users</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className={`font-medium text-[13px] sm:text-[15px] ${isRecent ? 'text-emerald-700' : 'text-black/80'}`}>
                        {item.users.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-right">
                      <div className="flex flex-col items-end whitespace-nowrap">
                        <span className={`font-semibold text-[13px] sm:text-[15px] ${isRecent ? 'text-emerald-900' : 'text-black'}`}>{item.amount} {item.symbol}</span>
                        <span className="text-[12px] text-black/50 mt-0.5">{item.usdValue}</span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 md:px-4 py-3 md:py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-2">
                        {isRecent && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        )}
                        <span className={`text-[12px] sm:text-[14px] ${isRecent ? 'text-emerald-600 font-medium' : 'text-zinc-400'}`}>
                          {item.lastTime}
                        </span>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      )}
</div>
  );
}
