import React from "react";
import { useWltPrice } from "../hooks/useWltPrice";
import { formatSmallPrice } from "../utils/format";

export const WltHeaderPrice: React.FC = () => {
  const { stats } = useWltPrice();
  const isPositive = (stats.change24h ?? 0) >= 0;

  return (
    <span
      className={`text-[14px] font-bold ${isPositive ? "text-[#00e676]" : "text-red-500"}`}
    >
      {formatSmallPrice(stats.price)}
    </span>
  );
};
