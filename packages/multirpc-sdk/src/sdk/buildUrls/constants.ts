export const ENABLED_SECRET_NETWORK_IDS = [
  'scrt-cosmos-grpc-web',
  'scrt-cosmos-rest',
  'scrt-rest',
];

export const ENABLED_ZETACHAIN_IDS = [
  'zetachain-tendermint-rest-testnet',
  'zetachain-cosmos-rest-testnet',
  'zetachain-tendermint-rest-athens-testnet',
  'zetachain-cosmos-rest-athens-testnet',
];

// Sei ids which have different public and private endpoints
export const SEI_IDS = [
  'sei-cosmos-grpc-web',
  'sei-cosmos-rest',
  'sei-rest',

  'sei-rest-testnet',
  'sei-cosmos-rest-testnet',
  'sei-cosmos-grpc-web-testnet',
];

// Stellar ids which have different public and private endpoints
export const STELLAR_IDS = ['stellar-horizon', 'stellar-testnet-horizon'];

export const APTOS_IDS = ['aptos', 'aptos_testnet'];

export const blockchainNameTemplate = '{blockchain}';

export const userNameTemplate = '{user}';
