import React from "react";
import { useWltPrice } from "../hooks/useWltPrice";
import { formatSmallPrice } from "../utils/format";

export const WltHeaderPrice: React.FC = () => {
  const { stats } = useWltPrice();
  const isPositive = (stats.change24h ?? 0) >= 0;

  return (
    <span className={`text-[14rem] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {formatSmallPrice(stats.price)}
    </span>
  );
};
