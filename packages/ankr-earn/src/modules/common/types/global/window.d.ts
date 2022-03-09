import Web3 from 'web3';

declare global {
  interface Window {
    BinanceChain: unknown;
    web3: Web3;
    injectedWeb3?: {
      clover?: unknown;
      'polkadot-js': unknown;
    };
  }
}
