import { EBlockchain } from 'multirpc-sdk';

import { EChargingModel, ECurrency, EPaymentType } from './types';

export const PRICES_PER_REQUEST_URL =
  'https://www.ankr.com/docs/rpc-service/pricing';
export const REVOKE_CASH_URL = 'https://revoke.cash';

export const USD_TO_API_CREDITS_RATE = 10_000_000;
export const USD_TO_REQUESTS_RATE = 50_000;

export const DEFAULT_SELECTED_RECURRING_USD_AMOUNT = 50;

export const MIN_ANKR_AMOUNT = 1_000;
export const MIN_USD_AMOUNT = 10;

export const chargigModelTitlesMap: Record<EChargingModel, string> = {
  [EChargingModel.Deal]: 'account.charging-model.deal.title',
  [EChargingModel.Free]: 'account.charging-model.free.title',
  [EChargingModel.PAYG]: 'account.charging-model.payg.title',
  [EChargingModel.Package]: 'account.charging-model.package.title',
};

export const currencyLabelsMap: Record<ECurrency, string> = {
  [ECurrency.ANKR]: 'account.currencies.ankr',
  [ECurrency.USD]: 'account.currencies.usd',
  [ECurrency.USDT]: 'account.currencies.usdt',
  [ECurrency.USDC]: 'account.currencies.usdc',
};

type TPath = 'deal' | 'one-time' | 'recurring';

const getTitleKey = (path: TPath) =>
  `account.payment-types.${path}.payment-summary-title`;

const getDescriptionKey = (path: TPath) =>
  `account.payment-types.${path}.payment-summary-description`;

const getTooltipKey = (path: TPath) => `account.payment-types.${path}.tooltip`;

export const paymentTypeTitlesMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getTitleKey('deal'),
  [EPaymentType.OneTime]: getTitleKey('one-time'),
  [EPaymentType.Recurring]: getTitleKey('recurring'),
};

export const paymentTypeDescriptionsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getDescriptionKey('deal'),
  [EPaymentType.OneTime]: getDescriptionKey('one-time'),
  [EPaymentType.Recurring]: getDescriptionKey('recurring'),
};

export const paymentTypeTooltipsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: getTooltipKey('deal'),
  [EPaymentType.OneTime]: getTooltipKey('one-time'),
  [EPaymentType.Recurring]: getTooltipKey('recurring'),
};

export const networkNameByPathMap: Record<EBlockchain, string> = {
  [EBlockchain.eth]: 'account.networks.eth',
  [EBlockchain.eth_goerli]: 'account.networks.eth',
  [EBlockchain.eth_holesky]: 'account.networks.eth',
  [EBlockchain.fantom]: 'account.networks.fantom',
  [EBlockchain.fantom_testnet]: 'account.networks.fantom',
  [EBlockchain.avalanche]: 'account.networks.avalanche',
  [EBlockchain.avalanche_fuji]: 'account.networks.avalanche',
  [EBlockchain.bsc]: 'account.networks.bsc',
  [EBlockchain.bsc_testnet_chapel]: 'account.networks.bsc',
  [EBlockchain.base]: 'account.networks.base',
  [EBlockchain.flare]: 'account.networks.flare',
  [EBlockchain.gnosis]: 'account.networks.gnosis',
  [EBlockchain.arbitrum]: 'account.networks.arbitrum',
  [EBlockchain.arbitrum_sepolia]: 'account.networks.arbitrum',
  [EBlockchain.linea]: 'account.networks.linea',
  [EBlockchain.optimism]: 'account.networks.optimism',
  [EBlockchain.optimism_testnet]: 'account.networks.optimism',
  [EBlockchain.polygon]: 'account.networks.polygon',
  [EBlockchain.polygon_mumbai]: 'account.networks.polygon',
  [EBlockchain.polygon_zkevm]: 'account.networks.polygon',
  [EBlockchain.rollux]: 'account.networks.rollux',
  [EBlockchain.syscoin]: 'account.networks.syscoin',
  [EBlockchain.scroll]: 'account.networks.scroll',
};

export const nativeTokenNameMap: Record<EBlockchain, string> = {
  [EBlockchain.eth]: 'account.currencies.eth',
  [EBlockchain.eth_goerli]: 'account.currencies.eth',
  [EBlockchain.eth_holesky]: 'account.currencies.eth',
  [EBlockchain.fantom]: 'account.currencies.ftm',
  [EBlockchain.fantom_testnet]: 'account.currencies.ftm',
  [EBlockchain.avalanche]: 'account.currencies.avax',
  [EBlockchain.avalanche_fuji]: 'account.currencies.avax',
  [EBlockchain.bsc]: 'account.currencies.bnb',
  [EBlockchain.bsc_testnet_chapel]: 'account.currencies.bnb',
  [EBlockchain.base]: 'account.currencies.eth',
  [EBlockchain.flare]: 'account.currencies.flr',
  [EBlockchain.gnosis]: 'account.currencies.xdai',
  [EBlockchain.arbitrum]: 'account.currencies.eth',
  [EBlockchain.arbitrum_sepolia]: 'account.currencies.eth',
  [EBlockchain.linea]: 'account.currencies.eth',
  [EBlockchain.optimism]: 'account.currencies.op',
  [EBlockchain.optimism_testnet]: 'account.currencies.op',
  [EBlockchain.polygon]: 'account.currencies.matic',
  [EBlockchain.polygon_mumbai]: 'account.currencies.matic',
  [EBlockchain.polygon_zkevm]: 'account.currencies.matic',
  [EBlockchain.rollux]: 'account.currencies.sys',
  [EBlockchain.syscoin]: 'account.currencies.sys',
  [EBlockchain.scroll]: 'account.currencies.eth',
};

export const EXPLORER_URLS: Record<EBlockchain, string> = {
  [EBlockchain.eth]: 'https://etherscan.io',
  [EBlockchain.eth_holesky]: 'https://holesky.etherscan.io',
  [EBlockchain.eth_goerli]: 'https://goerli.etherscan.io',
  [EBlockchain.arbitrum]: 'https://arbiscan.io/',
  [EBlockchain.arbitrum_sepolia]: 'https://sepolia.arbiscan.io/',
  [EBlockchain.avalanche]: 'https://snowtrace.io',
  [EBlockchain.avalanche_fuji]: 'https://testnet.snowtrace.io',
  [EBlockchain.bsc]: 'https://bscscan.com',
  [EBlockchain.base]: 'https://basescan.org',
  [EBlockchain.bsc_testnet_chapel]: 'https://testnet.bscscan.com',
  [EBlockchain.fantom]: 'https://ftmscan.com',
  [EBlockchain.fantom_testnet]: 'https://testnet.ftmscan.com',
  [EBlockchain.flare]: 'https://flare-explorer.flare.network',
  [EBlockchain.polygon]: 'https://polygonscan.com',
  [EBlockchain.polygon_mumbai]: 'https://mumbai.polygonscan.com',
  [EBlockchain.gnosis]: 'https://gnosisscan.io',
  [EBlockchain.polygon_zkevm]: 'https://zkevm.polygonscan.com',
  [EBlockchain.optimism]: 'https://optimistic.etherscan.io',
  [EBlockchain.optimism_testnet]: 'https://goerli-explorer.optimism.io/',
  [EBlockchain.linea]: 'https://lineascan.build',
  [EBlockchain.rollux]: 'https://explorer.rollux.com',
  [EBlockchain.syscoin]: 'https://explorer.syscoin.org/',
  [EBlockchain.scroll]: 'https://scrollscan.com',
};
