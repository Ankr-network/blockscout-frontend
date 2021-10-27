import { getQuery, RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../api/MultiService';
// eslint-disable-next-line import/no-cycle
import { connect } from './connect';
// eslint-disable-next-line import/no-cycle
import { fetchEncryptionKey } from './fetchEncryptionKey';
import { fetchCredentialsStatus } from './fetchCredentialsStatus';
import { DEFAULT_DEPOSIT } from '../conts';
import { withStore } from '../utils/withStore';

// Request encryption public key
// Allowance
// Deposit
// Blocks counting
// Request encryption public key (optional)
// Decrypt request

export enum DepositStep {
  publicKey,
  allowance,
  deposit,
  waitTransactionConfirming,
  login,
  done,
}

interface IFetchDepositStatus {
  step: DepositStep;
}

export const fetchDepositStatus = createSmartAction<
  RequestAction<IFetchDepositStatus, IFetchDepositStatus>
>('auth/fetchDepositStatus', () => ({
  request: {
    promise: async (store: RequestsStore) => {
      const { service } = MultiService.getInstance();
      const currentAccount = service.getKeyProvider().currentAccount();

      const { data: connectData } = getQuery(store.getState(), {
        type: connect.toString(),
        action: connect,
      });

      if (connectData?.credentials) {
        return { step: DepositStep.done };
      }

      const isUserHasDeposit = await service.isUserHasDeposit(currentAccount);

      if (!isUserHasDeposit) {
        const userHasEnoughAllowance = await service
          .getContractManager()
          .checkUserHaveEnoughAllowance(DEFAULT_DEPOSIT);

        if (!userHasEnoughAllowance) {
          return { step: DepositStep.allowance };
        }
      }

      const { data: encryptionKeyData } = getQuery(store.getState(), {
        type: fetchEncryptionKey.toString(),
        action: fetchEncryptionKey,
      });

      if (!encryptionKeyData?.key) {
        return { step: DepositStep.publicKey };
      }

      if (!isUserHasDeposit) {
        return { step: DepositStep.deposit };
      }

      const { data: credentialsStatusData } = getQuery(store.getState(), {
        type: fetchCredentialsStatus.toString(),
        action: fetchCredentialsStatus,
      });

      if (!credentialsStatusData?.isReady) {
        return { step: DepositStep.waitTransactionConfirming };
      }

      throw new Error('Unexpected status');
    },
  },
  meta: {
    onRequest: withStore,
    asQuery: true,
  },
}));
