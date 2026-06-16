export const pay_center = {
  get_winners: async (pages: bigint[], sizes: bigint[]) => {
    return new Promise<{ rankings: any[], total_winners: bigint }>((resolve) => {
      setTimeout(() => {
        const page = Number(pages[0]);
        const size = Number(sizes[0]);
        const start = (page - 1) * size;
        
        const rankings = Array.from({ length: size }).map((_, i) => ({
          id: start + i,
          principal_id: `principal_${start + i}`,
          playtimes: BigInt(Math.floor(Math.random() * 500) + 10),
          total_win_amount: (Math.random() * 1000 + 50).toFixed(2)
        }));

        resolve({ rankings, total_winners: 135n });
      }, 500);
    });
  }
};

export const user = {
  query_user_by_principal_id: async (principal_id: string) => {
    return new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve([{
          user_name: `Player_${principal_id.split('_')[1]}`,
          logo: ['01', '02', '03', '04', '05', '06', '07'][Math.floor(Math.random() * 7)],
          country: [['US', 'GB', 'CA', 'AU', 'JP'][Math.floor(Math.random() * 5)]],
          create_time: BigInt(Date.now() * 1000000)
        }]);
      }, 200);
    });
  }
};
