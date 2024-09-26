import { EBlockchain } from 'multirpc-sdk';

import { isMainnet } from 'modules/common/constants/const';

import {
  ECurrency,
  EPaymentType,
  ICryptoTransaction,
  IFeeDetails,
  TCryptoCurrency,
  TStablecoinCurrency,
  EChargingModel,
  DEAL_UPGRADE_PAYMENT_TYPE,
  TPaymentTypeExtended,
} from './types';

export const ALLOWANCE_CONFIRMATION_BLOCKS = 1;

export const MIN_ANKR_AMOUNT = 200;
export const MIN_USD_AMOUNT = 10;

export const MAX_USD_DECIMALS = 1;
export const MAX_CRYPTO_DECIMALS = 2;

export const USD_FEE_DECIMALS = 2;
export const CRYPTO_FEE_DECIMALS = 5;

export const MAX_USD_DIGITS = 6;
export const MAX_CRYPTO_DIGITS = 8;

export const USD_TO_REQUESTS_RATE = 50_000;

export const REVOKE_CASH_URL = 'https://revoke.cash';

export const MIN_USD_FEE = 0.01;

export const MIN_CRYPTO_FEE = 0.00001;

export const PRICES_PER_REQUEST_URL =
  'https://www.ankr.com/docs/rpc-service/pricing';

export const ONE_BUNDLE_ITEM_PRICE = 100000;

export const API_CREDITS_COUNT_PER_500_USD_BUNDLE = 5_000_000_000;

export const DEFAULT_SELECTED_RECURRING_USD_AMOUNT = 50;

export const MINIMAL_DEAL_AMOUNT = 500;

export const chargigModelTitlesMap: Record<EChargingModel, string> = {
  [EChargingModel.Deal]: 'account.charging-model.deal.title',
  [EChargingModel.Free]: 'account.charging-model.free.title',
  [EChargingModel.PAYG]: 'account.charging-model.payg.title',
  [EChargingModel.Package]: 'account.charging-model.package.title',
  [EChargingModel.Promo]: 'account.charging-model.promo.title',
};

export const ANKR_PAYMENT_NETWORK = isMainnet
  ? EBlockchain.eth
  : EBlockchain.eth_holesky;

export const currencyLabelsMap: Record<ECurrency, string> = {
  [ECurrency.ANKR]: 'account.currencies.ankr',
  [ECurrency.USD]: 'account.currencies.usd',
  [ECurrency.USDT]: 'account.currencies.usdt',
  [ECurrency.USDC]: 'account.currencies.usdc',
};

export const paymentTypeTooltipsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: 'account.payment-types.deal.tooltip',
  [EPaymentType.OneTime]: 'account.payment-types.one-time.tooltip',
  [EPaymentType.Recurring]: 'account.payment-types.recurring.tooltip',
};

export const paymentTypeTitlesMap: Record<TPaymentTypeExtended, string> = {
  [EPaymentType.Deal]: 'account.payment-types.deal.payment-summary-title',
  [DEAL_UPGRADE_PAYMENT_TYPE]:
    'account.payment-types.deal-upgrade.payment-summary-title',
  [EPaymentType.OneTime]:
    'account.payment-types.one-time.payment-summary-title',
  [EPaymentType.Recurring]:
    'account.payment-types.recurring.payment-summary-title',
};

export const paymentTypeDescriptionsMap: Record<TPaymentTypeExtended, string> =
  {
    [EPaymentType.Deal]:
      'account.payment-types.deal.payment-summary-description',
    [DEAL_UPGRADE_PAYMENT_TYPE]:
      'account.payment-types.deal-upgrade.payment-summary-description',
    [EPaymentType.OneTime]:
      'account.payment-types.one-time.payment-summary-description',
    [EPaymentType.Recurring]:
      'account.payment-types.recurring.payment-summary-description',
  };

export const stablecoinCurrencies: TStablecoinCurrency[] = [
  ECurrency.USDC,
  ECurrency.USDT,
];

export const cryptoCurrencies: TCryptoCurrency[] = [
  ECurrency.ANKR,
  ...stablecoinCurrencies,
];

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

export const defaultFeeDetails: IFeeDetails = { feeCrypto: 0, feeUSD: 0 };

export const defaultCryptoTx: ICryptoTransaction = {
  accountAddress: '',
  allowanceAmount: 0,
  allowanceError: undefined,
  allowanceFeeDetailsEstimated: undefined,
  allowanceFeeDetailsPaid: undefined,
  allowanceTxHash: '',
  amount: MIN_ANKR_AMOUNT,
  currency: ECurrency.ANKR,
  depositError: undefined,
  depositFeeDetailsEstimated: undefined,
  depositFeeDetailsPaid: undefined,
  depositTxHash: undefined,
  from: '',
  hadAllowance: false,
  id: '',
  isAllowanceConfirming: false,
  isApproved: false,
  isApproving: false,
  isConfirmed: false,
  isDepositConfirming: false,
  isDepositing: false,
  network: ANKR_PAYMENT_NETWORK,
  to: '',
};
