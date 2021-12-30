import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { TStore } from 'modules/common/types/ReduxRequests';
import { PolkadotProvider, SlotAuctionSdk, TNetworkType } from 'polkadot';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store/store';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';
import { getDepositAddress } from './getDepositAddress';

interface IReq {
  promise: Promise<null>;
}

interface IRes {
  data: IBalanceData;
}

interface IBalanceData {
  balance: BigNumber;
  minSafeBalance: BigNumber;
  symbol: TNetworkType;
}

export const fetchPolkadotBalance = createAction<
  RequestAction<IBalanceData, IBalanceData>
>(
  'FETCH_POLKADOT_BALANCE',
  (senderAddr: string): RequestAction => ({
    request: {
      promise: (async (): Promise<null> => null)(),
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      getData: (data: IBalanceData): IBalanceData => data,
      onRequest: (
        _request: IReq,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ) => ({
        promise: (async (): Promise<IBalanceData> => {
          const slotAuctionSdk: SlotAuctionSdk =
            await SlotAuctionSdkSingleton.getInstance();
          const polkadotProvider: PolkadotProvider =
            slotAuctionSdk.getPolkadotProvider();

          const [{ free: rawSenderBalance }, networkType, minSafeDepositVal] =
            await Promise.all([
              polkadotProvider.getAccountBalance(senderAddr),
              polkadotProvider.getNetworkType(),
              polkadotProvider.getMinSafeDepositVal(),
            ]);

          const recipientAddr: string | null =
            (await store.dispatchRequest(getDepositAddress(networkType)))
              ?.data ?? null;

          const balance: BigNumber =
            typeof recipientAddr !== 'string'
              ? new BigNumber(0)
              : await polkadotProvider.getMaxPossibleSendAmount(
                  senderAddr,
                  recipientAddr,
                  rawSenderBalance,
                );

          return {
            balance,
            minSafeBalance: minSafeDepositVal,
            symbol: networkType,
          };
        })(),
      }),
      onSuccess: (response: IRes): IRes => response,
    },
  }),
);
