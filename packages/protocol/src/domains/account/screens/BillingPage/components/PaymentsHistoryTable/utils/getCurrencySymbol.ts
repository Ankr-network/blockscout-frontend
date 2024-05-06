import { Address } from '@ankr.com/provider';
import { EBlockchain, IGetCryptoPaymentOption } from 'multirpc-sdk';

import { PaymentType } from 'domains/account/types';

import { ECurrencySymbol } from '../types';
import { isCreditAmount } from './amountUtils';

interface IGetCurrencySymbolParams {
  network?: EBlockchain;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  currencyAddress?: Address;
  type: PaymentType;
  paymentOptions?: IGetCryptoPaymentOption[];
}

export const getCurrencySymbol = ({
  network,
  creditAnkrAmount,
  creditUsdAmount,
  currencyAddress,
  type,
  paymentOptions,
}: IGetCurrencySymbolParams) => {
  if (isCreditAmount(type, creditAnkrAmount, creditUsdAmount)) {
    return '';
  }

  if (Number(creditAnkrAmount) > 0) {
    return ECurrencySymbol.ankr;
  }

  if (network && currencyAddress && paymentOptions) {
    const blockchainTokens = paymentOptions.find(
      option => option.blockchain === network,
    )?.tokens;

    if (blockchainTokens) {
      const currencySymbol = blockchainTokens.find(
        token =>
          token.token_address.toLowerCase() === currencyAddress.toLowerCase(),
      )?.token_symbol;

      if (currencySymbol) return currencySymbol;
    }
  }

  if (Number(creditUsdAmount) > 0) {
    return ECurrencySymbol.usd;
  }

  return ECurrencySymbol.ankr;
};
