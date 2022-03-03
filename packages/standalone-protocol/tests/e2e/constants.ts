export const TIMEOUTS = {
  tiny: 100,
  fast: 1000,
  small: 3 * 1000,
  medium: 5 * 1000,
  big: 30 * 1000,
  huge: 45 * 1000,
  oneMinute: 60 * 1000,
};

export const SECONDS_IN_A_DAY = 86_400;

export const NON_LEGACY_STANDALONES = [
  { network: 'solana', endPoint: 'https://solana.public-rpc.com/' },
  { network: 'near', endPoint: 'https://near.public-rpc.com/' },
  { network: 'arbitrum', endPoint: 'https://arbitrum.public-rpc.com/' },
  { network: 'iotex', endPoint: 'https://iotex.public-rpc.com/' },
  { network: 'avalanche', endPoint: 'https://avalanche.public-rpc.com/' },
  { network: 'nervos', endPoint: 'https://nervos.public-rpc.com/' },
  { network: 'erigonbsc', endPoint: 'https://erigonbsc.public-rpc.com/' },
];

export const LEGACY_STANDALONES = [
  { network: 'bsc', endPoint: 'https://bscrpc.com/' },
  { network: 'polygon', endPoint: 'https://polygon-rpc.com/' },
  { network: 'fantom', endPoint: 'https://rpc.ftm.tools/' },
];
