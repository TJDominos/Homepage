import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronsUpDown, Coins, Info } from "lucide-react";
import { ProductLogo } from "./ProductLogo";
import { getSysAvatar } from "../utils/avatar";
import {
  payout_center,
  type CurrencySplit,
  type GamePayoutStats,
  type MyPayoutSummary,
} from "../api/payoutMock";
import "../styles/payout.css";

const fmtUsd = (n: number, dec = 0) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });

const fmtPct = (n: number) => `${n.toFixed(2)}%`;

const fmtToken = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: n < 100 ? 2 : 0,
  });

/** Per-currency amounts with their share, aligned as a mini table:
    amount (primary, tabular) · symbol (muted) · share % (muted, right).
    align="start" (the stacked panel) sizes every column to its widest
    content so the block shrinks to fit narrow viewports; align="end"
    keeps fixed trailing columns so lines right-align under a table
    column. */
const CurrencyLines: React.FC<{
  splits?: CurrencySplit[];
  align?: "start" | "end";
}> = ({ splits, align = "end" }) =>
  splits && splits.length > 0 ? (
    align === "start" ? (
      <div className="grid w-fit grid-cols-[auto_auto_auto] items-baseline gap-x-2 gap-y-1.5 md:gap-x-2.5">
        {splits.map((s) => (
          <React.Fragment key={s.symbol}>
            <span className="text-right text-[13px] font-medium tabular-nums text-(--text-primary) md:text-sm">
              {fmtToken(s.amount)}
            </span>
            <span className="text-xs text-(--text-subtle)">{s.symbol}</span>
            <span className="text-right text-xs tabular-nums text-(--color-black-alpha-50)">
              {s.sharePct}%
            </span>
          </React.Fragment>
        ))}
      </div>
    ) : (
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
    )
  ) : (
    <span
      className={`block text-(--text-disabled) ${align === "end" ? "text-right" : "text-left"}`}
    >
      –
    </span>
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

export default function PayoutPage({ userAccount }: PayoutPageProps) {
  const [games, setGames] = useState<GamePayoutStats[] | null>(null);
  const [myStats, setMyStats] = useState<MyPayoutSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("jackpot");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [myExpanded, setMyExpanded] = useState(false);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
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
  }, [myStats, games]);

  const sortedGames = useMemo(() => {
    if (!games) return [];
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
    return [...games].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      if (av === null && bv === null) return 0;
      if (av === null) return 1; // nulls always last
      if (bv === null) return -1;
      return sortDir === "desc" ? bv - av : av - bv;
    });
  }, [games, sortKey, sortDir]);

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
  const colCount = 7;

  const SortTh: React.FC<{
    k: SortKey;
    label: string;
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
      <div className="mb-5">
        <h1 className="text-base font-bold text-(--text-primary)">Payouts</h1>
        <p className="mt-1 text-sm text-(--text-subtle)">
          Site-wide payout &amp; return-to-player statistics
        </p>
      </div>

      {/* ---------- Hero stats ---------- */}
      {loading || !totals ? (
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-[104px] animate-pulse rounded-(--radius-lg) bg-(--color-black-alpha-5)"
            />
          ))}
        </div>
      ) : (
        <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="payout-card p-5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-(--text-subtle)">
              <Coins size={14} className="text-(--color-coin)" aria-hidden />
              Total Payout
            </div>
            <div className="mt-1 text-3xl font-bold leading-none tracking-tight text-(--text-primary)">
              {fmtUsd(Math.round(heroPaidOut))}
            </div>
            <div className="mt-2 text-xs text-(--color-black-alpha-50)">
              Across all games, lifetime
            </div>
          </div>
          <div className="payout-card p-5">
            <div className="text-xs font-medium text-(--text-subtle)">
              Actual RTP
            </div>
            <div className="mt-1 text-3xl font-bold leading-none tracking-tight text-(--text-primary)">
              {totals.overallActual === null
                ? "–"
                : fmtPct(totals.overallActual)}
            </div>
            <div className="mt-2 text-xs text-(--color-black-alpha-50)">
              vs {totals.weightedTheo.toFixed(2)}% weighted theoretical
            </div>
          </div>
        </div>
      )}

      {/* ---------- Personal summary (signed in only) ---------- */}
      {signedIn && (
        <div className="payout-mycard mb-5 overflow-hidden">
          <button
            type="button"
            onClick={() => myStats && setMyExpanded((v) => !v)}
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
                  My payout stats
                  {myStats && (
                    <ChevronDown
                      size={16}
                      className={`text-(--color-black-alpha-60) transition-transform duration-200 ${myExpanded ? "rotate-180" : ""}`}
                    />
                  )}
                </div>
                <div className="mt-0.5 text-xs text-(--text-subtle) md:text-sm">
                  {myStats
                    ? `${myStats.plays} plays · ${myStats.games.length} games`
                    : "Loading…"}
                </div>
              </div>
            </div>
            {myStats && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8">
                <div>
                  <div className="text-xs font-medium text-(--text-subtle)">
                    Wagered
                  </div>
                  <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                    {fmtUsd(myStats.wageredUsd, 2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-(--text-subtle)">
                    Won
                  </div>
                  <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                    {fmtUsd(myStats.wonUsd, 2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-(--text-subtle)">
                    Net
                  </div>
                  <div className="text-base font-semibold tabular-nums text-(--text-primary)">
                    {myStats.wonUsd - myStats.wageredUsd >= 0 ? "+" : "−"}
                    {fmtUsd(Math.abs(myStats.wonUsd - myStats.wageredUsd), 2)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-(--text-subtle)">
                    My overall RTP
                  </div>
                  <div className="text-base font-bold tabular-nums text-(--text-accent)">
                    {fmtPct((myStats.wonUsd / myStats.wageredUsd) * 100)}
                  </div>
                </div>
              </div>
            )}
          </button>

          {myExpanded && myStats && (
            <div className="border-t border-(--color-purple-100) px-2 pb-2 pt-1 sm:px-4 sm:pb-3">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead className="text-xs font-medium text-(--text-subtle)">
                    <tr>
                      <th className="px-1.5 py-2 sm:px-2">Game</th>
                      <th className="px-1.5 py-2 text-right sm:px-2">Plays</th>
                      <th className="hidden px-2 py-2 text-right sm:table-cell">
                        Wagered
                      </th>
                      <th className="hidden px-2 py-2 text-right sm:table-cell">
                        Won
                      </th>
                      <th className="px-1.5 py-2 text-right sm:px-2">Net</th>
                      <th className="px-1.5 py-2 text-right sm:px-2">My RTP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-(--color-black-alpha-5) text-[13px] sm:text-sm">
                    {myGameRows.map((r) => (
                      <tr key={r.gameId}>
                        <td className="px-1.5 py-2.5 sm:px-2">
                          <div className="flex items-center gap-2 sm:gap-2.5">
                            <ProductLogo
                              src={r.logo}
                              alt={r.name}
                              className="h-6 w-6 shrink-0 rounded-(--radius-md) object-cover sm:h-7 sm:w-7"
                            />
                            <span className="whitespace-nowrap font-medium text-(--text-primary)">
                              {r.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-1.5 py-2.5 text-right tabular-nums text-(--text-subtle) sm:px-2">
                          {r.plays.toLocaleString("en-US")}
                        </td>
                        <td className="hidden px-2 py-2.5 text-right tabular-nums text-(--text-primary) sm:table-cell">
                          {fmtUsd(r.wageredUsd, 2)}
                        </td>
                        <td className="hidden px-2 py-2.5 text-right tabular-nums text-(--text-primary) sm:table-cell">
                          {fmtUsd(r.wonUsd, 2)}
                        </td>
                        <td className="px-1.5 py-2.5 text-right tabular-nums text-(--text-primary) sm:px-2">
                          {r.netUsd >= 0 ? "+" : "−"}
                          {fmtUsd(Math.abs(r.netUsd), 2)}
                        </td>
                        <td className="px-1.5 py-2.5 text-right font-semibold tabular-nums text-(--text-accent) sm:px-2">
                          {fmtPct(r.rtp)}
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
                <th className="px-3 py-3.5 md:px-4 md:py-4">Game</th>
                <SortTh k="jackpot" label="Live Jackpot" />
                <SortTh
                  k="theo"
                  label="Theoretical RTP"
                  tip="The share of wagers a game is designed to return to players over the long run."
                  className="hidden md:table-cell"
                />
                <SortTh
                  k="actual"
                  label="Actual RTP"
                  tip="Realized payouts ÷ total wagers to date. Low-volume games swing above and below theory."
                  className="pr-3"
                />
                <SortTh
                  k="plays"
                  label="Total Plays"
                  className="hidden md:table-cell"
                />
                <SortTh
                  k="paid"
                  label="Paid Out"
                  className="hidden md:table-cell"
                />
                <th
                  className="hidden w-10 px-2 py-3.5 md:table-cell"
                  aria-label="Details"
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
                        "", // Live Jackpot
                        "hidden md:table-cell", // Theoretical RTP
                        "", // Actual RTP
                        "hidden md:table-cell", // Total Plays
                        "hidden md:table-cell", // Paid Out
                      ].map((cls, j) => (
                        <td key={j} className={`px-1.5 py-4 md:px-3 ${cls}`}>
                          <div className="ml-auto h-4 w-16 rounded-(--radius-sm) bg-(--color-black-alpha-5)" />
                        </td>
                      ))}
                    </tr>
                  ))
                : sortedGames.map((g) => {
                    const expanded = expandedGame === g.gameId;
                    return (
                      <React.Fragment key={g.gameId}>
                      <tr
                        onClick={() =>
                          setExpandedGame(expanded ? null : g.gameId)
                        }
                        className={`payout-row cursor-pointer transition-colors ${expanded ? "payout-row--open" : ""}`}
                      >
                        <td className="px-3 py-3 md:px-4 md:py-3.5">
                          <div className="flex items-center gap-2 md:gap-3">
                            <ProductLogo
                              src={g.logo}
                              alt={g.name}
                              className="h-8 w-8 shrink-0 rounded-(--radius-md) object-cover md:h-9 md:w-9"
                            />
                            <div className="min-w-0 truncate text-[13px] font-semibold text-(--text-primary) md:text-sm">
                              {g.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-1.5 py-3 text-right md:px-3 md:py-3.5">
                          {g.jackpotUsd === null ? (
                            <span className="text-(--text-disabled)">–</span>
                          ) : (
                            <span className="inline-flex items-center justify-end gap-1 whitespace-nowrap text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                              <Coins
                                size={13}
                                className="hidden text-(--color-coin) md:inline"
                                aria-hidden
                              />
                              {fmtUsd(g.jackpotUsd, 2)}
                            </span>
                          )}
                        </td>
                        <td className="hidden px-3 py-3.5 text-right tabular-nums text-(--text-subtle) md:table-cell">
                          {fmtPct(g.theoreticalRtp)}
                        </td>
                        <td className="py-3 pl-1.5 pr-3 text-right md:py-3.5 md:pl-3">
                          {g.actualRtp === null ? (
                            <>
                              <span className="text-(--text-disabled)">–</span>
                              <span className="block text-xs text-(--text-disabled)">
                                no plays yet
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-[13px] font-semibold tabular-nums text-(--text-primary) md:text-sm">
                                {fmtPct(g.actualRtp)}
                              </span>
                              {/* The Theoretical RTP column is hidden below
                                  md, so surface theo here instead. */}
                              <span className="mt-0.5 block text-[11px] tabular-nums text-(--color-black-alpha-50) md:hidden">
                                theo {fmtPct(g.theoreticalRtp)}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="hidden px-3 py-3.5 text-right tabular-nums text-(--text-subtle) md:table-cell">
                          {g.totalPlays === 0
                            ? "–"
                            : g.totalPlays.toLocaleString("en-US")}
                        </td>
                        <td className="hidden px-3 py-3.5 text-right font-medium tabular-nums text-(--text-primary) md:table-cell">
                          {g.totalPaidOutUsd === 0
                            ? "–"
                            : fmtUsd(
                                g.totalPaidOutUsd,
                                g.totalPaidOutUsd < 10 ? 2 : 0,
                              )}
                        </td>
                        {/* Below md the whole row is the tap target, so the
                            chevron column disappears entirely. */}
                        <td className="hidden px-2 py-3.5 text-center md:table-cell">
                          <button
                            type="button"
                            aria-label={`${expanded ? "Collapse" : "Expand"} ${g.name} breakdown`}
                            aria-expanded={expanded}
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedGame(expanded ? null : g.gameId);
                            }}
                            className="payout-expand rounded-(--radius-full) p-1.5 text-(--color-black-alpha-60) transition-colors hover:bg-(--color-black-alpha-5)"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        </td>
                      </tr>

                      {/* Below md some columns are hidden, so the breakdowns
                          can't sit under them — show a labeled panel that
                          fills the row: each group repeats its USD total
                          (the Paid Out column isn't visible at this width)
                          and the two groups stretch to opposite edges, the
                          left flush with Game, the right flush with the
                          Actual RTP column (same 12px edge padding). */}
                      {expanded && (
                        <tr className="payout-panel md:hidden">
                          <td colSpan={colCount} className="px-3 py-4">
                            <div className="flex flex-wrap justify-between gap-x-6 gap-y-4">
                              {/* Games without a jackpot pool skip this
                                  group entirely; Paid Out then sits alone,
                                  still flush right via ml-auto. */}
                              {g.jackpotUsd !== null && (
                                <div className="flex flex-col items-start">
                                  <div className="text-[11px] font-semibold uppercase tracking-wide text-(--color-black-alpha-50)">
                                    Live Jackpot
                                  </div>
                                  <div className="mt-1 text-[13px] font-semibold tabular-nums text-(--text-primary)">
                                    {fmtUsd(g.jackpotUsd, 2)}
                                  </div>
                                  {g.jackpotByCurrency && (
                                    <div className="mt-2">
                                      <CurrencyLines
                                        splits={g.jackpotByCurrency}
                                        align="start"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="ml-auto flex flex-col items-end">
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-(--color-black-alpha-50)">
                                  Paid Out
                                </div>
                                <div className="mt-1 text-[13px] font-semibold tabular-nums text-(--text-primary)">
                                  {g.totalPaidOutUsd === 0 ? (
                                    <span className="font-normal text-(--text-disabled)">
                                      –
                                    </span>
                                  ) : (
                                    fmtUsd(
                                      g.totalPaidOutUsd,
                                      g.totalPaidOutUsd < 10 ? 2 : 0,
                                    )
                                  )}
                                </div>
                                {g.paidOutByCurrency && (
                                  <div className="mt-2">
                                    <CurrencyLines
                                      splits={g.paidOutByCurrency}
                                      align="start"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* md+ (all columns visible): cells mirror the main
                          columns so the amounts sit directly under Live
                          Jackpot and Paid Out; the w-0/min-w-full wrapper
                          keeps this content out of the auto-layout so column
                          widths never shift — wider lines overflow left into
                          the empty cells. */}
                      {expanded && (
                        <tr className="payout-panel hidden md:table-row">
                          <td className="px-4 py-4" />
                          <td className="px-3 py-4 align-top">
                            {/* No jackpot pool → leave the cell empty rather
                                than show a dash under the row's dash. */}
                            {g.jackpotByCurrency && (
                              <div className="w-0 min-w-full">
                                <CurrencyLines splits={g.jackpotByCurrency} />
                              </div>
                            )}
                          </td>
                          <td />
                          <td />
                          <td />
                          <td className="px-3 py-4 align-top">
                            {g.paidOutByCurrency && (
                              <div className="w-0 min-w-full">
                                <CurrencyLines splits={g.paidOutByCurrency} />
                              </div>
                            )}
                          </td>
                          <td />
                        </tr>
                      )}
                      </React.Fragment>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- Smallprint ---------- */}
      <p className="mt-4 text-xs leading-relaxed text-(--color-black-alpha-50)">
        All figures are USD equivalents; expand a game row for the
        per-currency breakdown (WLT, Gcoin, Bonus). Actual RTP is realized
        payouts ÷ wagers to date and naturally swings while volume is low —
        theoretical RTP is the long-run design expectation.
      </p>
    </div>
  );
}
