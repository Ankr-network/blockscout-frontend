export type DeFiItem = {
  assets: string;
  network: string;
  protocol: string;
  type: string;
  rewardedToken: string;
  protocolLink: string;
};

export const useDeFiData = (): DeFiItem[] => [
  // Ethereum

  {
    assets: 'aETHb/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHb/ETH',
    protocol: 'ACryptoS',
    network: 'BNB Chain',
    protocolLink: 'https://app.acryptos.com/stableswap/deposit/aethb/',
  },
  {
    assets: 'aETHc/ETH Curve LP',
    type: 'Farming',
    rewardedToken: 'aethCRV',
    protocol: 'Convex Finance',
    network: 'Ethereum',
    protocolLink: 'https://www.convexfinance.com/stake',
  },
  {
    assets: 'aETHc/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHc/ETH',
    protocol: 'Curve Finance',
    network: 'Ethereum',
    protocolLink: 'https://curve.fi/ankreth/',
  },
  {
    assets: 'aETHb/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHb/ETH',
    protocol: 'Curve Finance',
    network: 'Ethereum',
    protocolLink: 'https://curve.fi/factory/56/',
  },
  {
    assets: 'aETHb/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHb/ETH',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink: 'https://ellipsis.finance/pool/15',
  },
  {
    assets: 'aETHb/ETH Ellipsis LP',
    type: 'Farming',
    rewardedToken: 'EPX',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink:
      'https://ellipsis.finance/pool/0xE8Dbd92Fbf648a9840a6920378Fe40B5ad762e37',
  },
  {
    assets: 'aETHc/ETH SushiSwap LP',
    type: 'Vault',
    rewardedToken: 'aETHc/ETH',
    protocol: 'OnX Finance',
    network: 'Ethereum',
    protocolLink: 'https://app.onx.finance/vaults',
  },
  {
    assets: 'aETHc/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHc/ETH',
    protocol: 'SushiSwap',
    network: 'Ethereum',
    protocolLink:
      'https://analytics.sushi.com/pairs/0xfa5bc40c3bd5afa8bc2fe6b84562fee16fb2df5f',
  },
  {
    assets: 'aETHc/ETH SushiSwap LP',
    type: 'Farming',
    rewardedToken: 'SUSHI',
    protocol: 'SushiSwap',
    network: 'Ethereum',
    protocolLink:
      'https://analytics.sushi.com/pairs/0xfa5bc40c3bd5afa8bc2fe6b84562fee16fb2df5f',
  },
  {
    assets: 'aETHc/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHc/ETH',
    protocol: 'Uniswap v2',
    network: 'Ethereum',
    protocolLink:
      'https://v2.info.uniswap.org/pair/0x6147805e1011417b93e5d693424a62a70d09d0e5',
  },
  {
    assets: 'aETHc/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHc/ETH',
    protocol: 'Uniswap v3',
    network: 'Ethereum',
    protocolLink:
      'https://info.uniswap.org/#/tokens/0xe95a203b1a91a908f9b9ce46459d101078c2c3cb',
  },
  {
    assets: 'aETHc/ETH Curve LP',
    type: 'Vault',
    rewardedToken: 'aETHc/ETH',
    protocol: 'Yearn Finance',
    network: 'Ethereum',
    protocolLink:
      'https://yearn.finance/#/vault/0x132d8D2C76Db3812403431fAcB00F3453Fc42125',
  },

  // BNB
  {
    assets: 'aBNBb/BNB',
    type: 'Liquidity Pool',
    rewardedToken: 'aBNBb/BNB',
    protocol: 'ACryptoS',
    network: 'BNB Chain',
    protocolLink: 'https://app2.acryptos.com/stableswap/abnbb/',
  },
  {
    assets: 'aBNBc/BNB',
    type: 'Liquidity Pool',
    rewardedToken: 'aBNBc/BNB',
    protocol: 'ApeSwap',
    network: 'BNB Chain',
    protocolLink:
      'https://info.apeswap.finance/pair/0x1C3BFdA8d788689ab2Fb935a9499c67e098A9E84',
  },
  {
    assets: 'aBNBc/BNB ApeSwap LP',
    type: 'Farming',
    rewardedToken: 'BANANA',
    protocol: 'ApeSwap',
    network: 'BNB Chain',
    protocolLink: 'https://apeswap.finance/farms',
  },
  {
    assets: 'aBNBc/BNB PancakeSwap LP',
    type: 'Vault',
    rewardedToken: 'CAKE',
    protocol: 'Beefy Finance',
    network: 'BNB Chain',
    protocolLink: 'https://app.beefy.finance/#/bsc/vault/cakev2-wbnb-abnbc',
  },
  {
    assets: 'aETHb/ETH',
    type: 'Liquidity Pool',
    rewardedToken: 'aETHb/ETH',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink: 'https://ellipsis.finance/pool/15',
  },
  {
    assets: 'aBNBb/BNB',
    type: 'Liquidity Pool',
    rewardedToken: 'aBNBb/BNB',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink: 'https://ellipsis.finance/pool/6',
  },
  {
    assets: 'aBNBb/BNB Ellipsis LP',
    type: 'Farming',
    rewardedToken: 'EPX',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink:
      'https://ellipsis.finance/pool/0xf0d17f404343D7Ba66076C818c9DC726650E2435',
  },
  {
    assets: 'aETHb/ETH Ellipsis LP',
    type: 'Farming',
    rewardedToken: 'EPX',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink:
      'https://ellipsis.finance/pool/0xE8Dbd92Fbf648a9840a6920378Fe40B5ad762e37',
  },
  {
    assets: 'aBNBc/BNB',
    type: 'Liquidity Pool',
    rewardedToken: 'aBNBc/BNB',
    protocol: 'PancakeSwap',
    network: 'BNB Chain',
    protocolLink:
      'https://pancakeswap.finance/add/0xE85aFCcDaFBE7F2B096f268e31ccE3da8dA2990A/BNB',
  },

  // Polygon
  {
    assets: 'aMATICb/wMATIC',
    type: 'Liquidity Pool',
    rewardedToken: 'aMATICb/wMATIC',
    protocol: 'Curve Finance',
    network: 'Polygon',
    protocolLink: 'https://polygon.curve.fi/factory/188',
  },
  {
    assets: 'aMATICc/MATIC',
    type: 'Liquidity Pool',
    rewardedToken: 'aMATICc/MATIC',
    protocol: 'QuickSwap',
    network: 'Polygon',
    protocolLink:
      'https://info.quickswap.exchange/#/pair/0xe7d85cf800119bd280a2e555d3de7f954452a831',
  },
  {
    assets: 'aMATICc/MATIC',
    type: 'Liquidity Pool',
    rewardedToken: 'aMATICc/MATIC',
    protocol: 'Uniswap v3',
    network: 'Polygon',
    protocolLink:
      'https://info.uniswap.org/#/polygon/pools/0xcc8d95cde2840fceda80b46ba873b5d1d6b122dc',
  },
  {
    assets: 'aMATICc/MATIC',
    type: 'Liquidity Pool',
    rewardedToken: 'aMATICc/MATIC',
    protocol: 'Dystopia',
    network: 'Polygon',
    protocolLink:
      'https://www.dystopia.exchange/liquidity/0x7b15d67f1ae2cd229a0ae32be8b6cefaee73bda0',
  },
  {
    assets: 'aMATICb/MATIC',
    type: 'Liquidity Pool',
    rewardedToken: 'aMATICb/MATIC',
    protocol: 'ACryptoS',
    network: 'BNB Chain',
    protocolLink: 'https://app.acryptos.com/stableswap/deposit/amaticb/',
  },
  {
    assets: 'aMATICb/MATIC ACryptoS LP',
    type: 'Vault',
    rewardedToken: 'aMATICb/MATIC',
    protocol: 'ACryptoS',
    network: 'BNB Chain',
    protocolLink: 'https://app.acryptos.com/',
  },
  {
    assets: 'aMATICb/MATIC',
    type: 'Liquidity Pool',
    rewardedToken: 'aMATICb/MATIC',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink: 'https://ellipsis.finance/pool/16',
  },
  {
    assets: 'aMATICb/MATIC Ellipsis LP',
    type: 'Farming',
    rewardedToken: 'EPX',
    protocol: 'Ellipsis Finance',
    network: 'BNB Chain',
    protocolLink:
      'https://ellipsis.finance/pool/0x96a2e42C94d090Afb9D865ac88Ea16a6C5008d97',
  },

  // avalanche
  {
    assets: 'aAVAXb/AVAX',
    type: 'Liquidity Pool',
    rewardedToken: 'aAVAXb/AVAX',
    protocol: 'Curve Finance',
    network: 'Avalanche',
    protocolLink: 'https://avax.curve.fi/factory/44/',
  },
  {
    assets: 'aAVAXb/AVAX Lydia LP',
    type: 'Farming',
    rewardedToken: 'LYD',
    protocol: 'Lydia Finance',
    network: 'Avalanche',
    protocolLink:
      'https://info.lydia.finance/pairs/0xba4486e7a6f74be11fb7159d205f876168c906aa',
  },
  {
    assets: 'aAVAXc/AVAX',
    type: 'Liquidity Pool',
    rewardedToken: 'aAVAXc/AVAX',
    protocol: 'TraderJoe',
    network: 'Avalanche',
    protocolLink:
      'https://analytics.traderjoexyz.com/pairs/0x2909273f8EC8FA6Fb976a2D76f4357E607b8aC66',
  },
  {
    assets: 'aAVAXc/AVAX',
    type: 'Liquidity Pool',
    rewardedToken: 'aAVAXc/AVAX',
    protocol: 'Pangolin',
    network: 'Avalanche',
    protocolLink:
      'https://info.pangolin.exchange/#/pair/0x5f89d2c80Ec0b51E05529b4b5229732f32f549a7',
  },

  // fantom
  {
    assets: 'aFTMb/wFTM',
    type: 'Liquidity Pool',
    rewardedToken: 'aFTMb/wFTM',
    protocol: 'Curve Finance',
    network: 'Fantom',
    protocolLink: 'https://ftm.curve.fi/factory/76',
  },
];
