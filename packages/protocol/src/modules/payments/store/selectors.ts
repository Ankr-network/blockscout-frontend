import BigNumber from 'bignumber.js';
import { CONFIRMATION_BLOCKS, EBlockchain } from 'multirpc-sdk';
import { createSelector } from '@reduxjs/toolkit';

import { CONFIG } from 'modules/api/MultiService';
import { DEFAULT_TOKEN_DECIMALS } from 'modules/common/constants/const';
import { RootState } from 'store';
import { selectUserGroupConfigByAddress } from 'domains/userGroup/store';

import { ANKR_PAYMENT_NETWORK, MIN_ANKR_AMOUNT } from '../const';
import {
  ECryptoDepositStep,
  INetwork,
  ECryptoDepositStepStatus,
  ECurrency,
} from '../types';
import { selectPaymentOptions } from '../actions/fetchPaymentOptions';

export const selectPaymentsState = (state: RootState) => state.payments;

export const selectCryptoTransactions = createSelector(
  selectPaymentsState,
  state => state.cryptoTransactions,
);

export const selectOngoingCryptoTransactions = createSelector(
  selectCryptoTransactions,
  selectUserGroupConfigByAddress,
  (transactions, { selectedGroupAddress }) =>
    transactions.filter(
      tx =>
        Boolean(tx.depositTxHash) &&
        selectedGroupAddress?.toLowerCase() === tx.accountAddress.toLowerCase(),
    ),
);

export const selectCryptoTxById = createSelector(
  (_state: RootState, txId: string) => txId,
  selectCryptoTransactions,
  (txId, transactions) => transactions.find(({ id }) => id === txId),
);

export const selectPaymentOptionsByNetworkAndCurrency = createSelector(
  (_state: RootState, network: EBlockchain, currency: ECurrency) => ({
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

    if (currency === ECurrency.ANKR) {
      return {
        confirmationBlocksNumber: CONFIRMATION_BLOCKS,
        depositContractAddress: CONFIG.payAsYouGoContractAddress,
        tokenAddress: CONFIG.ankrTokenContractAddress,
        tokenDecimals: DEFAULT_TOKEN_DECIMALS,
      };
    }

    const options = paymentOptions?.options || [];
    const paymentOption = options.find(option => option.blockchain === network);

    const tokens = paymentOption?.tokens;
    const confirmationBlocksNumber =
      paymentOption?.confirmation_blocks || CONFIRMATION_BLOCKS;
    const depositContractAddress = paymentOption?.deposit_contract_address;

    const currentToken = tokens?.find(
      token => token.token_symbol === currency.toString(),
    );

    const tokenAddress = currentToken?.token_address;
    const tokenDecimals = currentToken?.token_decimals;

    return {
      confirmationBlocksNumber: confirmationBlocksNumber || CONFIRMATION_BLOCKS,
      depositContractAddress,
      tokenAddress,
      tokenDecimals,
    };
  },
);

export const selectMinCryptoPaymentAmount = createSelector(
  (_state: RootState, currency: ECurrency, network: EBlockchain) => ({
    currency,
    network,
  }),
  selectPaymentOptions,
  ({ currency, network }, paymentOptions) => {
    const networkOptions = paymentOptions?.options?.find(
      networkOption => networkOption.blockchain === network,
    );

    const networkTokenOptions = networkOptions?.tokens.find(
      token => token.token_symbol === currency.toString(),
    );

    if (networkTokenOptions) {
      const { min_amount: minAmount, token_decimals: tokenDecimals } =
        networkTokenOptions;

      return new BigNumber(minAmount).dividedBy(10 ** tokenDecimals).toNumber();
    }

    return MIN_ANKR_AMOUNT;
  },
);

export const selectNetworks = createSelector(
  (_state: RootState, currency: ECurrency) => currency,
  selectPaymentOptions,
  (currency, paymentOptionsResult): INetwork[] => {
    if (currency === ECurrency.ANKR) {
      return [{ blockchain: ANKR_PAYMENT_NETWORK }];
    }

    const paymentOptions = paymentOptionsResult?.options || [];

    return paymentOptions
      .filter(({ tokens }) =>
        tokens.some(token => token.token_symbol === currency.toString()),
      )
      .map<INetwork>(({ blockchain }) => ({ blockchain }));
  },
);

export const selectCryptoDepositStep = createSelector(
  selectCryptoTxById,
  tx => {
    if (tx) {
      const {
        depositError,
        depositTxHash,
        isApproved,
        isConfirmed,
        isDepositConfirming,
        isDepositing,
      } = tx;

      const isDepositStep =
        Boolean(depositError) ||
        Boolean(depositTxHash) ||
        isDepositConfirming ||
        isDepositing ||
        isConfirmed ||
        isApproved;

      if (isDepositStep) {
        return ECryptoDepositStep.Deposit;
      }
    }

    return ECryptoDepositStep.Allowance;
  },
);

export const selectAllowanceStepStatus = createSelector(
  selectCryptoTxById,
  tx => {
    if (tx) {
      const { allowanceError, isAllowanceConfirming, isApproved, isApproving } =
        tx;

      if (isApproved) {
        return ECryptoDepositStepStatus.Complete;
      }

      if (allowanceError) {
        return ECryptoDepositStepStatus.Error;
      }

      if (isApproving || isAllowanceConfirming) {
        return ECryptoDepositStepStatus.Pending;
      }
    }

    return ECryptoDepositStepStatus.Initializing;
  },
);

export const selectDepositStepStatus = createSelector(
  selectCryptoTxById,
  selectCryptoDepositStep,
  (tx, step) => {
    if (step === ECryptoDepositStep.Allowance) {
      return undefined;
    }

    if (tx) {
      const { depositError, isConfirmed, isDepositConfirming, isDepositing } =
        tx;

      if (isConfirmed) {
        return ECryptoDepositStepStatus.Complete;
      }

      if (depositError) {
        return ECryptoDepositStepStatus.Error;
      }

      if (isDepositConfirming) {
        return ECryptoDepositStepStatus.Confirming;
      }

      if (isDepositing) {
        return ECryptoDepositStepStatus.Pending;
      }

      return ECryptoDepositStepStatus.Initializing;
    }

    return undefined;
  },
);

export const selectIsCryptoTxOngoing = createSelector(selectCryptoTxById, tx =>
  Boolean(tx?.depositTxHash),
);
