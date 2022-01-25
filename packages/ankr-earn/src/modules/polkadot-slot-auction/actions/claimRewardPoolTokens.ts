import { RequestAction } from '@redux-requests/core';
import { TStore } from 'modules/common/types/ReduxRequests';
import { SlotAuctionSdk } from 'polkadot';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store/store';
import { SlotAuctionSdkSingleton } from '../api/SlotAuctionSdkSingleton';
import { validETHChainId } from '../const';
import { getETHNetworkErrMsg } from '../utils/getETHNetworkErrMsg';
import { setErrorMsg } from '../utils/setError';
import { fetchCrowdloanBalances } from './fetchCrowdloanBalances';
import { fetchProjectsListCrowdloans } from './fetchProjectsListCrowdloans';

interface IClaimRewardPoolTokensData {
  transactionHash: string;
  transactionReceipt: any;
}

interface IReq {
  data: IClaimRewardPoolTokensData;
}

const refreshData = (
  store: TStore<IStoreState>,
  polkadotAccount: string,
): void => {
  const { dispatchRequest } = store;

  dispatchRequest(fetchCrowdloanBalances(polkadotAccount));
  dispatchRequest(fetchProjectsListCrowdloans());
};

export const claimRewardPoolTokens = createAction<
  RequestAction<IClaimRewardPoolTokensData, IClaimRewardPoolTokensData>
>(
  'CLAIM_REWARD_POOL_TOKENS',
  (polkadotAccount: string, loanId: number): RequestAction => ({
    request: {
      promise: (async (): Promise<IClaimRewardPoolTokensData> => {
        const slotAuctionSdk: SlotAuctionSdk =
          await SlotAuctionSdkSingleton.getInstance();

        try {
          // Note: This is an external method for calling the "injectedWeb3KeyProvider()" in a "safe" mode
          await slotAuctionSdk.getEthereumAccount();
        } catch (e: any | string) {
          throw new Error(e?.message ?? e);
        }

        const currChainId: number = await slotAuctionSdk
          .getKeyProvider()
          .getWeb3()
          .eth.getChainId();

        /**
         *  TODO Please remove this mechanism when you switch to the "Guard"
         */
        if (validETHChainId !== currChainId) {
          throw new Error(getETHNetworkErrMsg());
        }

        let data: IClaimRewardPoolTokensData;

        try {
          data = await slotAuctionSdk.claimRewardPoolTokens(
            polkadotAccount,
            loanId,
          );
        } catch (e: any | string) {
          throw new Error(e?.message ?? e);
        }

        return data;
      })(),
    },
    meta: {
      asMutation: true,
      showNotificationOnError: true,
      onError: (
        error: Error,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): Error => {
        refreshData(store, polkadotAccount);

        error.message = setErrorMsg(error.message);

        throw error;
      },
      onSuccess: (
        request: IReq,
        _action: RequestAction,
        store: TStore<IStoreState>,
      ): IReq => {
        refreshData(store, polkadotAccount);

        return request;
      },
    },
  }),
);
