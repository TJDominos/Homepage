const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// 1. Add gameCategory state
content = content.replace(
  'const [subTab, setSubTab] = useState("Rewards");',
  'const [subTab, setSubTab] = useState("Rewards");\n  const [gameCategory, setGameCategory] = useState<"Rand Game" | "Randball">("Rand Game");'
);

// 2. Filter games by category before sorting
const oldSortedGames = `  const sortedGames = useMemo(() => {
    if (!games) return [];
    const val = (g: GamePayoutStats): number | null => {`;

const newSortedGames = `  const sortedGames = useMemo(() => {
    if (!games) return [];
    
    const filteredGames = games.filter((g) => 
      gameCategory === "Rand Game" ? g.kind === "instant" : g.kind === "batch"
    );

    const val = (g: GamePayoutStats): number | null => {`;

content = content.replace(oldSortedGames, newSortedGames);

content = content.replace(
  '    return [...games].sort((a, b) => {',
  '    return [...filteredGames].sort((a, b) => {'
);
content = content.replace(
  '  }, [games, sortKey, sortDir]);',
  '  }, [games, gameCategory, sortKey, sortDir]);'
);

// 3. Replace hero cards with category tabs
const oldHeroCards = `    {/* ---------- Hero stats ---------- */}
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
                <button 
                  onClick={() => setSubTab("Assets")}
                  className="payout-card p-5 flex flex-col text-left hover:bg-black/[0.02] transition-colors group cursor-pointer relative"
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
                    {fmtGcoin(Math.round(heroPaidOut))}
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50) flex items-center justify-between w-full">
                    <span>Across all games, lifetime</span>
                    <span className="text-black font-medium group-hover:text-purple-600 transition-colors whitespace-nowrap ml-2">
                      Asset Tracker
                    </span>
                  </div>
                </button>
                <div className="payout-card p-5">
                  <div className="text-sm font-medium text-(--text-subtle)">
                    Actual RTP
                  </div>
                  <div className="mt-1 text-[24px] font-bold leading-none tracking-tight text-(--text-primary)">
                    {totals.overallActual === null
                      ? "–"
                      : fmtPct(totals.overallActual)}
                  </div>
                  <div className="mt-2 text-xs text-(--color-black-alpha-50)">
                    vs {totals.weightedTheo.toFixed(2)}% weighted theoretical
                  </div>
                </div>
              </div>
            )}`;

const newHeroCards = `    {/* ---------- Category Filter ---------- */}
            <div className="mb-5 flex items-center gap-2">
              <button
                onClick={() => setGameCategory("Rand Game")}
                className={\`px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors \${
                  gameCategory === "Rand Game"
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/60 hover:text-black hover:bg-black/10"
                }\`}
              >
                Rand Game
              </button>
              <button
                onClick={() => setGameCategory("Randball")}
                className={\`px-5 py-2.5 rounded-2xl text-[14px] font-medium transition-colors \${
                  gameCategory === "Randball"
                    ? "bg-black text-white"
                    : "bg-black/5 text-black/60 hover:text-black hover:bg-black/10"
                }\`}
              >
                Randball
              </button>
            </div>`;

content = content.replace(oldHeroCards, newHeroCards);


fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated category filter");
