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

export const ENABLED_KAVA_IDS = [
  'kava-tendermint-rest',
  'kava-tendermint-rest-testnet',
  'kava-cosmos-rest',
  'kava-cosmos-rest-testnet',
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

export const KAVA_IDS = [
  'kava-cosmos-rest',
  'kava-cosmos-rest-testnet',
  'kava-evm',
  'kava-evm-testnet',
  'kava-tendermint-rest',
  'kava-tendermint-rest-testnet',
  'kava-tendermint-rpc',
  'kava-tendermint-rpc-testnet',
];

// Allora ids which have different public and private endpoints
export const ALLORA_IDS = ['allora_testnet-rest', 'allora_testnet-cosmos-rest'];
// 0g ids which have different public and private endpoints
export const ZERO_G_IDS = [
  '0g_newton-cosmos-rest',
  '0g_newton-tendermint-rest',
];

export const blockchainNameTemplate = '{blockchain}';

export const userNameTemplate = '{user}';
