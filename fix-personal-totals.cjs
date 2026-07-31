const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

// We need to calculate filtered totals for personal summary
const oldMyGameRows = `  const myGameRows = useMemo(() => {
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
  }, [myStats, games, gameCategory]);`;

const newMyGameRows = `  const myGameRows = useMemo(() => {
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
  }, [myStats, myGameRows]);`;

content = content.replace(oldMyGameRows, newMyGameRows);

// Replace myStats usage with filteredMyStats in the personal summary header
content = content.replace(/myStats && setMyExpanded/g, 'filteredMyStats && setMyExpanded');
content = content.replace(/myStats && \(/g, 'filteredMyStats && (');
content = content.replace(/myStats\n                          \? \`\$\{myStats\.plays\} plays · \$\{myStats\.games\.length\} games\`/g, 'filteredMyStats\n                          ? `${filteredMyStats.plays} plays · ${filteredMyStats.games.length} games`');
content = content.replace(/fmtGcoin\(myStats\.wonUsd/g, 'fmtGcoin(filteredMyStats.wonUsd');
content = content.replace(/myStats\.wonUsd \/ myStats\.wageredUsd/g, 'filteredMyStats.wonUsd / (filteredMyStats.wageredUsd || 1)');
content = content.replace(/myExpanded && myStats/g, 'myExpanded && filteredMyStats');

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated personal totals");
