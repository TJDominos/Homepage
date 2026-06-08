import React, { useEffect, useMemo, useState } from "react";
import { Activity, ArrowUpRight, DatabaseZap, Sparkles } from "lucide-react";
import "./WltStats.scss";

interface WltMarketData {
  price: number | null;
  change24h: number | null;
  fdv: number | null;
}

const FALLBACK_STATS: WltMarketData = {
  price: 0.1452,
  change24h: 8.42,
  fdv: 145_200_000,
};

const formatCurrency = (value: number | null, compact = false) => {
  if (value === null || Number.isNaN(value)) return "--";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: compact ? 1 : value < 1 ? 4 : 2,
    maximumFractionDigits: compact ? 1 : value < 1 ? 4 : 2,
    notation: compact ? "compact" : "standard",
  }).format(value);
};

const formatChange = (value: number | null) => {
  if (value === null || Number.isNaN(value)) return "--";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

const parseMarketPayload = (payload: unknown): WltMarketData | null => {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as Record<string, any>;

  if (typeof data.price === "number" || typeof data.change24h === "number" || typeof data.fdv === "number") {
    return {
      price: typeof data.price === "number" ? data.price : null,
      change24h: typeof data.change24h === "number" ? data.change24h : null,
      fdv: typeof data.fdv === "number" ? data.fdv : null,
    };
  }

  const firstCoin = Object.values(data)[0] as Record<string, unknown> | undefined;
  if (!firstCoin || typeof firstCoin !== "object") return null;

  return {
    price: typeof firstCoin.usd === "number" ? firstCoin.usd : null,
    change24h: typeof firstCoin.usd_24h_change === "number" ? firstCoin.usd_24h_change : null,
    fdv: typeof firstCoin.usd_fdv === "number" ? firstCoin.usd_fdv : null,
  };
};

const WltStats: React.FC = () => {
  const [stats, setStats] = useState<WltMarketData>(FALLBACK_STATS);
  const [isLive, setIsLive] = useState(false);

  const priceEndpoint = useMemo(() => {
    const configuredEndpoint = import.meta.env.VITE_WLT_PRICE_URL as string | undefined;
    return configuredEndpoint || "https://api.coingecko.com/api/v3/simple/price?ids=world-liberty-financial&vs_currencies=usd&include_24hr_change=true&include_fdv=true";
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadPrice = async () => {
      try {
        const response = await fetch(priceEndpoint, {
          signal: controller.signal,
          headers: { accept: "application/json" },
        });

        if (!response.ok) return;

        const parsed = parseMarketPayload(await response.json());
        if (!parsed) return;

        setStats({
          price: parsed.price ?? FALLBACK_STATS.price,
          change24h: parsed.change24h ?? FALLBACK_STATS.change24h,
          fdv: parsed.fdv ?? FALLBACK_STATS.fdv,
        });
        setIsLive(true);
      } catch (error) {
        if (!controller.signal.aborted) setIsLive(false);
      }
    };

    loadPrice();
    return () => controller.abort();
  }, [priceEndpoint]);

  const isPositive = (stats.change24h ?? 0) >= 0;

  return (
    <section className="wlt-stats" aria-label="$WLT market statistics">
      <div className="wlt-panel">
        <div className="wlt-panel-copy">
          <div className="wlt-kicker"><Sparkles aria-hidden="true" /> Randseed Token Layer</div>
          <h2>$WLT powers the game economy</h2>
          <p>Track token momentum while exploring verifiable randomness, public ledgers, and original Rand Games.</p>
          <a className="wlt-panel-link" href="/community/wltoken">
            View token details
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="wlt-metrics" aria-label="$WLT live metrics">
          <div className="wlt-live-row">
            <span className={`wlt-live-dot${isLive ? " live" : ""}`}></span>
            {isLive ? "Live public market feed" : "Reference market snapshot"}
          </div>
          <div className="wlt-metric primary">
            <span className="wlt-metric-label">$WLT Price</span>
            <strong>{formatCurrency(stats.price)}</strong>
          </div>
          <div className="wlt-metric-grid">
            <div className="wlt-metric compact">
              <span className="wlt-metric-icon"><Activity aria-hidden="true" /></span>
              <span className="wlt-metric-label">24H</span>
              <strong className={isPositive ? "positive" : "negative"}>{formatChange(stats.change24h)}</strong>
            </div>
            <div className="wlt-metric compact">
              <span className="wlt-metric-icon"><DatabaseZap aria-hidden="true" /></span>
              <span className="wlt-metric-label">FDV</span>
              <strong>{formatCurrency(stats.fdv, true)}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WltStats;
