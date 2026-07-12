import { useState, useEffect } from 'react';
import quickQuidLogo from '../imports/image-1.png';

const LOGO_BASE_URL = "https://storage.randseed.org/Product/Logo/";

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
              logo: `${LOGO_BASE_URL}daily4logosmall.png`,
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
              logo: `${LOGO_BASE_URL}LNlogo.jpg`,
              status: 'available',
              frontend_route: '/game/lucky-nicky'
            },
            {
              id: 3,
              name: 'Roulette',
              description: 'Classic roulette action with a crypto twist!',
              logo: `${LOGO_BASE_URL}Roulette.png`,
              status: 'available',
              frontend_route: '/game/roulette'
            },
            {
              id: 4,
              name: 'Fruits Garden',
              description: 'Match fruits for sweet rewards!',
              logo: `${LOGO_BASE_URL}Fruitsgardenlogosmall.png`,
              status: 'available',
              frontend_route: '/game/fruits-garden'
            },
            {
              id: 5,
              name: 'Mines',
              description: 'Navigate the minefield and multiply your winnings!',
              logo: `${LOGO_BASE_URL}Mineslogo.png`,
              status: 'available',
              frontend_route: '/game/mines'
            },
            {
              id: 6,
              name: 'Keno',
              description: 'Pick your lucky numbers in this fast-paced draw!',
              logo: `${LOGO_BASE_URL}Kenologosmall.png`,
              status: 'available',
              frontend_route: '/game/keno'
            },
            {
              id: 7,
              name: 'Quick Quid',
              description: 'Pick Number Grid Together. Beat the Odds！',
              logo: '/qqlogo.png',
              status: 'available',
              frontend_route: '/game/quick-quid'
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
