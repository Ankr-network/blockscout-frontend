import { EBlockchain } from 'multirpc-sdk';

import { isMainnet } from 'modules/common/constants/const';

import {
  ECurrency,
  EPaymentType,
  ICryptoTransaction,
  IFeeDetails,
  TCryptoCurrency,
  TStablecoinCurrency,
} from './types';

export const ALLOWANCE_CONFIRMATION_BLOCKS = 1;

export const MIN_ANKR_AMOUNT = 1_000;
export const MIN_USD_AMOUNT = 10;

export const MAX_USD_DECIMALS = 1;
export const MAX_CRYPTO_DECIMALS = 2;

export const MAX_USD_DIGITS = 6;
export const MAX_CRYPTO_DIGITS = 8;

export const USD_TO_REQUESTS_RATE = 50_000;

export const REVOKE_CASH_URL = 'https://revoke.cash';

export const PRICES_PER_REQUEST_URL =
  'https://www.ankr.com/docs/rpc-service/pricing';

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

export const paymentTypeTitlesMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: 'account.payment-types.deal.payment-summary-title',
  [EPaymentType.OneTime]:
    'account.payment-types.one-time.payment-summary-title',
  [EPaymentType.Recurring]:
    'account.payment-types.recurring.payment-summary-title',
};

export const paymentTypeDescriptionsMap: Record<EPaymentType, string> = {
  [EPaymentType.Deal]: 'account.payment-types.deal.payment-summary-description',
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
