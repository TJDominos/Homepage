import { useState, useEffect } from 'react';

export const TOKEN_ADDRESSES = {
  WLT: 'G45pgo5kzUMPnXGqrLeDXXgxSrVx6ssXJiJTDWpHjups',
  Bonk: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  TRUMP: '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  Fartcoin: '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',
  ANSEM: '9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump',
  PUMP: 'pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn'
};

export const SUPPORTED_ASSETS = ['Gcoin', 'WLT', 'Bonk', 'JUP', 'TRUMP', 'RAY', 'Fartcoin', 'ANSEM', 'PUMP'];

export interface TokenPrice {
  priceUsd: number;
  change24h: number;
}

export const FALLBACK_PRICES: Record<string, TokenPrice> = {
  Gcoin: { priceUsd: 1, change24h: 0 },
  WLT: { priceUsd: 0.00015, change24h: 0 },
  Bonk: { priceUsd: 0.000003, change24h: 0 },
  JUP: { priceUsd: 0.2, change24h: 0 },
  TRUMP: { priceUsd: 0.00001, change24h: 0 },
  RAY: { priceUsd: 1.5, change24h: 0 },
  Fartcoin: { priceUsd: 0.000005, change24h: 0 },
  ANSEM: { priceUsd: 0.00002, change24h: 0 },
  PUMP: { priceUsd: 0.00001, change24h: 0 },
};

export function useTokenPrices() {
  const [prices, setPrices] = useState<Record<string, TokenPrice>>(FALLBACK_PRICES);

  useEffect(() => {
    let active = true;
    const fetchPrices = async () => {
      try {
        const addresses = Object.values(TOKEN_ADDRESSES).join(',');
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${addresses}`);
        if (!res.ok) return;
        const json = await res.json();
        
        const newPrices = { ...FALLBACK_PRICES };
        const symbols = Object.keys(TOKEN_ADDRESSES);
        
        for (const symbol of symbols) {
          const address = TOKEN_ADDRESSES[symbol as keyof typeof TOKEN_ADDRESSES];
          const pair = json.pairs?.find((p: any) => p.baseToken?.address === address);
          if (pair) {
            newPrices[symbol] = {
              priceUsd: Number(pair.priceUsd) || newPrices[symbol].priceUsd,
              change24h: Number(pair.priceChange?.h24) || 0
            };
          }
        }
        
        if (active) {
          setPrices(newPrices);
        }
      } catch (e) {
        console.error("Failed to fetch token prices", e);
      }
    };
    
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return prices;
}
