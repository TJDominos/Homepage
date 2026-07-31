const fs = require('fs');
let content = fs.readFileSync('src/frontend/PayoutPage.tsx', 'utf-8');

const oldMyGameRows = `  const myGameRows = useMemo(() => {
    if (!myStats) return [];
    const byId = new Map(games?.map((g) => [g.gameId, g]));
    return myStats.games
      .map((g) => ({`;

const newMyGameRows = `  const myGameRows = useMemo(() => {
    if (!myStats) return [];
    const byId = new Map(games?.map((g) => [g.gameId, g]));
    return myStats.games
      .filter((g) => {
        const kind = byId.get(g.gameId)?.kind;
        if (!kind) return true;
        return gameCategory === "Rand Game" ? kind === "instant" : kind === "batch";
      })
      .map((g) => ({`;

content = content.replace(oldMyGameRows, newMyGameRows);

content = content.replace(
  '  }, [myStats, games]);',
  '  }, [myStats, games, gameCategory]);'
);

fs.writeFileSync('src/frontend/PayoutPage.tsx', content, 'utf-8');
console.log("Updated personal summary filtering");
