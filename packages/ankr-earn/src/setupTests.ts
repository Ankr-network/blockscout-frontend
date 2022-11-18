// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import intl from 'react-intl-universal';

import { locales } from './modules/i18n';

intl.init({
  currentLocale: 'en-US',
  locales,
  fallbackLocale: 'en-US',
});

const sessionStorageMock = (function mock() {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string => {
      return store[key];
    },

    setItem: (key: string, value: unknown): void => {
      store[key] = String(value);
    },

    clear: (): void => {
      store = {};
    },

    removeItem: (key: string): void => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

Object.defineProperty(window, 'zE', {
  value: jest.fn(),
  writable: true,
});

// Mocks for libraries
jest.mock('web3modal', () => ({
  isMobile: () => true,
}));

jest.mock('polkadot', () => ({
  EPolkadotNetworkId: {
    kusama: 'KSM',
    polkadot: 'DOT',
    rococo: 'ROC',
    westend: 'WND',
  },
}));

jest.mock('@ankr.com/provider', () => {
  return {
    ProviderManager: function ProviderManager() {
      const defaultProvider = {
        currentAccount: 'account',
        isConnected: jest.fn(),
        connect: jest.fn(),
        getWeb3: jest.fn(),
        createContract: jest.fn(),
      };

      return {
        getWriteProviderById: jest.fn(() => defaultProvider),
        getETHWriteProvider: jest.fn(() => defaultProvider),
        getETHReadProvider: jest.fn(() => defaultProvider),
      };
    },
    AvailableWriteProviders: {
      ethCompatible: 'ethCompatible',
      polkadotCompatible: 'polkadotCompatible',
    },
    AvailableReadProviders: {
      ethMainnet: 'ethMainnetHttpProvider',
      ethGoerli: 'ethGoerliHttpProvider',
      mumbai: 'polygonHttpWeb3KeyProvider',
      polygon: 'polygonHttpWeb3KeyProvider',
      avalancheChain: 'avalancheChainHttpProvider',
      avalancheChainTest: 'avalancheChainTestHttpProvider',
      binanceChain: 'binanceChainHttpProvider',
      binanceChainTest: 'binanceChainTestHttpProvider',
      ftmOpera: 'ftmOperaHttpProvider',
      ftmTestnet: 'ftmTestnetHttpProvider',
      gnosis: 'gnosisHttpProvider',
      sokol: 'sokolHttpProvider',
    },
    EEthereumNetworkId: {
      mainnet: 1,
      ropsten: 3,
      rinkeby: 4,
      goerli: 5,
      dev: 2018,
      classic: 61,
      mordor: 63,
      kotti: 6,
      smartchain: 56,
      smartchainTestnet: 97,
      avalanche: 43114,
      avalancheTestnet: 43113,
      polygon: 137,
      fantom: 250,
      fantomTestnet: 4002,
      mumbai: 80001,
    },
    EWalletId: {
      huobi: 'custom-huobi',
      imtoken: 'custom-imtoken',
      injected: 'injected',
      math: 'custom-math',
      trust: 'custom-trust',
      walletconnect: 'walletconnect',
    },
    getIsMetaMaskInjected: () => true,
    getIsCoinbaseInjected: () => false,
    getIsOKXInjected: () => false,
    getIsCoin98Injected: () => false,
    getWalletName: () => 'MetaMask',
  };
});

jest.mock('mixpanel-browser', () => ({
  default: { init: jest.fn(), track: jest.fn() },
}));
