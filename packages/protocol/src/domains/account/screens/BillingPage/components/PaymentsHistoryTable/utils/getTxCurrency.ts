import { Address } from '@ankr.com/provider';
import { EBlockchain, IGetCryptoPaymentOption, Token } from 'multirpc-sdk';

interface IGetTxCurrencyParams {
  currencyAddress?: Address;
  network?: EBlockchain;
  paymentOptions?: IGetCryptoPaymentOption[];
}

export const getTxCurrency = ({
  currencyAddress,
  network,
  paymentOptions,
}: IGetTxCurrencyParams) => {
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

  return Token.ANKR;
};
