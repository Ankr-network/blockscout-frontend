import { EBlockchain } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { ECurrency } from 'modules/billing/types';
import { RootState } from 'store';

import { selectPaymentOptions } from '../actions/fetchPaymentOptions';

export const selectPaymentsState = (state: RootState) => state.payments;

export const selectCryptoTransactions = createSelector(
  selectPaymentsState,
  state => state.cryptoTransactions,
);

export const selectCryptoTxById = createSelector(
  (_state: RootState, txId: string) => txId,
  selectCryptoTransactions,
  (txId, transactions) => transactions.find(({ id }) => id === txId),
);

export const selectPaymentOptionsByNetworkAndCurrency = createSelector(
  (_state: RootState, network?: EBlockchain, currency?: ECurrency) => ({
    currency,
    network,
  }),
  selectPaymentOptions,
  ({ currency, network }, paymentOptions) => {
    if (!network || !currency) {
      return {
        confirmationBlocksNumber: 0,
        depositContractAddress: undefined,
        tokenAddress: undefined,
        tokenDecimals: 0,
      };
    }

    const options = paymentOptions?.options ?? [];
    const paymentOption = options.find(option => option.blockchain === network);

    const tokens = paymentOption?.tokens;
    const confirmationBlocksNumber = paymentOption?.confirmation_blocks;
    const depositContractAddress = paymentOption?.deposit_contract_address;

    const currentToken = tokens?.find(
      token => token.token_symbol === currency.toString(),
    );

    const tokenAddress = currentToken?.token_address;
    const tokenDecimals = currentToken?.token_decimals;

    return {
      confirmationBlocksNumber,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    };
  },
);
