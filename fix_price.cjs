const fs = require('fs');
const content = `import { useState, useEffect } from 'react';

export interface WltMarketData {
  price: number | null;
  change24h: number | null;
  fdv: number | null;
}

export const FALLBACK_STATS: WltMarketData = {
  price: 0.00015885,
  change24h: 0.0,
  fdv: 158850,
};

const WLT_TOKEN_MINT = "G45pgo5kzUMPnXGqrLeDXXgxSrVx6ssXJiJTDWpHjups";
const JUPITER_API_URL = \`https://api.jup.ag/price/v2?ids=\${WLT_TOKEN_MINT}\`;
const POLL_INTERVAL_MS = 300000;

export function useWltPrice() {
  const [stats, setStats] = useState<WltMarketData>(FALLBACK_STATS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadPrice = async () => {
      try {
        const response = await fetch(JUPITER_API_URL, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        
        const json = await response.json();
        const data = json.data?.[WLT_TOKEN_MINT];
        
        if (!data) return;
        
        const price = Number(data.price) || FALLBACK_STATS.price;
        const change24h = FALLBACK_STATS.change24h;
        const fdv = FALLBACK_STATS.fdv;
        
        setStats({
          price,
          change24h,
          fdv,
        });
        setIsLive(true);
      } catch (error) {
        if (!controller.signal.aborted) setIsLive(false);
      }
    };

    loadPrice();
    const interval = setInterval(loadPrice, POLL_INTERVAL_MS);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  return { stats, isLive };
}
`;
fs.writeFileSync('src/hooks/useWltPrice.ts', content);
