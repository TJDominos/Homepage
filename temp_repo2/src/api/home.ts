import { useState, useEffect } from 'react';

// Mock game logos (using Unsplash game-related images)
const gameLogo1 = "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop";
const gameLogo2 = "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?w=200&h=200&fit=crop";
const gameLogo3 = "https://images.unsplash.com/photo-1556438064-2d7646166914?w=200&h=200&fit=crop";
const gameLogo4 = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop";
const gameLogo5 = "https://images.unsplash.com/photo-1511882150382-421056c89033?w=200&h=200&fit=crop";

export interface Banner {
  id: number;
  imageUrl: string;
  title?: string;
  linkUrl?: string;
  linkType?: number; // 0: internal, 1: external
}

export interface Game {
  id: number;
  name: string;
  description: string;
  logo: string;
  status: 'available' | 'coming_soon';
  route?: string;
  frontend_route?: string;
}

export function useHomeData() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [games, setGames] = useState<[string, Game[]][]>([]);
  const [bannersLoading, setBannersLoading] = useState(true);
  const [gamesLoading, setGamesLoading] = useState(true);

  console.log('useHomeData:', { bannersLoading, gamesLoading, bannersCount: banners.length, gamesCount: games.length });

  useEffect(() => {
    // Simulate API call delay
    const loadBanners = setTimeout(() => {
      setBanners([
        {
          id: 1,
          imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80',
          title: 'Welcome Banner',
          linkUrl: '/community/wltoken',
          linkType: 0
        },
        {
          id: 2,
          imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
          title: 'Daily 4 Banner',
          linkUrl: '/games/daily4',
          linkType: 0
        }
      ]);
      setBannersLoading(false);
    }, 500);

    const loadGames = setTimeout(() => {
      setGames([
        [
          'Rand Ball',
          [
            {
              id: 1,
              name: 'Daily 4',
              description: 'Just $0.5 to play! $4,500+ Daily 4 Jackpot',
              logo: gameLogo1,
              status: 'available',
              frontend_route: '/game/daily4'
            }
          ]
        ],
        [
          'Rand Game',
          [
            {
              id: 2,
              name: 'Lucky Nicky',
              description: 'Our most well-balanced, high win rate game!',
              logo: gameLogo2,
              status: 'available',
              frontend_route: '/game/lucky-nicky'
            },
            {
              id: 3,
              name: 'Quick Quid',
              description: '1 in 100 shot at a quick $50 win in our rapid-fire draw!',
              logo: gameLogo3,
              status: 'available',
              frontend_route: '/game/quick-quid'
            },
            {
              id: 4,
              name: 'Triple Jokers',
              description: 'Three times the fun with triple jackpot opportunities!',
              logo: gameLogo4,
              status: 'available',
              frontend_route: '/game/triple-jokers'
            },
            {
              id: 5,
              name: 'Lucky Nicky Combo',
              description: 'Our most well-balanced, high win rate game!',
              logo: gameLogo2,
              status: 'available',
              frontend_route: '/game/lucky-nicky-combo'
            },
            {
              id: 6,
              name: 'Power Play',
              description: 'Maximum excitement with power multipliers!',
              logo: gameLogo5,
              status: 'coming_soon'
            },
            {
              id: 7,
              name: 'Mega Millions Mini',
              description: 'Big jackpots, small entry fees!',
              logo: gameLogo1,
              status: 'available',
              frontend_route: '/game/mega-mini'
            },
            {
              id: 8,
              name: 'Speed Ball',
              description: 'Fast-paced action with instant results!',
              logo: gameLogo3,
              status: 'available',
              frontend_route: '/game/speed-ball'
            },
            {
              id: 9,
              name: 'Golden Ticket',
              description: 'Your chance at life-changing prizes!',
              logo: gameLogo4,
              status: 'coming_soon'
            },
            {
              id: 10,
              name: 'Diamond Draw',
              description: 'Premium game with exclusive rewards!',
              logo: gameLogo5,
              status: 'available',
              frontend_route: '/game/diamond-draw'
            },
            {
              id: 11,
              name: 'Bonus Blast',
              description: 'Extra bonuses on every play!',
              logo: gameLogo1,
              status: 'available',
              frontend_route: '/game/bonus-blast'
            },
            {
              id: 12,
              name: 'Super Seven',
              description: 'Lucky number 7 brings good fortune!',
              logo: gameLogo2,
              status: 'coming_soon'
            },
            {
              id: 13,
              name: 'Cash Cascade',
              description: 'Watch the cash flow in!',
              logo: gameLogo3,
              status: 'available',
              frontend_route: '/game/cash-cascade'
            },
            {
              id: 14,
              name: 'Fortune Wheel',
              description: 'Spin to win amazing prizes!',
              logo: gameLogo4,
              status: 'available',
              frontend_route: '/game/fortune-wheel'
            },
            {
              id: 15,
              name: 'Jackpot Joy',
              description: 'Pure joy with every jackpot!',
              logo: gameLogo5,
              status: 'coming_soon'
            }
          ]
        ]
      ]);
      setGamesLoading(false);
    }, 800);

    return () => {
      clearTimeout(loadBanners);
      clearTimeout(loadGames);
    };
  }, []);

  return {
    banners,
    games,
    bannersLoading,
    gamesLoading
  };
}
