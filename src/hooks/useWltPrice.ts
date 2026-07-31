import { useState, useEffect } from 'react';

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
const DEXSCREENER_API_URL = `https://api.dexscreener.com/latest/dex/tokens/${WLT_TOKEN_MINT}`;
const POLL_INTERVAL_MS = 300000;

export function useWltPrice() {
  const [stats, setStats] = useState<WltMarketData>(FALLBACK_STATS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadPrice = async () => {
      try {
        const response = await fetch(DEXSCREENER_API_URL, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        
        const json = await response.json();
        if (!json.pairs || json.pairs.length === 0) return;
        
        // DexScreener returns the most liquid pair first
        const pair = json.pairs[0];
        
        const fdv = Number(pair.fdv) || FALLBACK_STATS.fdv;
        const price = Number(pair.priceUsd) || FALLBACK_STATS.price;
        const change24h = pair.priceChange?.h24 !== undefined && pair.priceChange?.h24 !== null 
          ? Number(pair.priceChange.h24) 
          : FALLBACK_STATS.change24h;

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
