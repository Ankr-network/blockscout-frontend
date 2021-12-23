import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { BlockchainNetworkId } from 'modules/common/types';
import { Store } from 'redux';
import { createAction as createSmartAction } from 'redux-smart-actions';
//import { StkrSdk } from 'modules/api';
import { IStoreState } from 'store/store';
import { IUserInfo } from '../apiMappers/userApi';
//import { BridgeSdk } from 'modules/bridge-sdk';

interface IConnectResult {
  chainId: BlockchainNetworkId;
}

export const UserActionTypes = {
  FETCH_ACCOUNT_DATA: 'FETCH_ACCOUNT_DATA',
  CALC_STAKING_FEE: 'CALC_STAKING_FEE',
  STAKE_AND_CLAIM: 'STAKE_AND_CLAIM',
};

export const UserActions = {
  fetchAccountData: createSmartAction<RequestAction<IUserInfo, IUserInfo>>(
    UserActionTypes.FETCH_ACCOUNT_DATA,
    () => ({
      request: {
        promise: (async function () {
          /*const stkrSdk = StkrSdk.getForEnv();
          let networkName;
          try {
            const { name } = stkrSdk.getCrossChainBridge().getCurrentNetwork();
            networkName = name;
          } catch (error) {
            console.error(`fetchAccountData: ${error}`);
          }

          const keyProvider = stkrSdk.getKeyProvider();
          const address = keyProvider.currentAccount();
          const ethereumBalance = await stkrSdk.getEthBalance();
          const nativeBalance = await stkrSdk.getNativeBalance();
          // todo: remove hardcode
          const dotBalance = new BigNumber(0.1);
          const walletMeta = stkrSdk.getWalletMeta();
          let walletType = Provider.metamask,
            blockchainType = Blockchain.ethereum;
          let bnbBalance = undefined,
            ankrBalance = undefined;
          if (keyProvider.isBinanceWallet()) {
            walletType = Provider.binance;
          }
          if (keyProvider.isBinanceSmartChain()) {
            bnbBalance = nativeBalance;
            blockchainType = Blockchain.binance;
          } else if (keyProvider.isAvalancheChain()) {
            blockchainType = Blockchain.avalanche;
          } else {
            ankrBalance = await stkrSdk.getAnkrBalance();
          }
          return {
            networkName,
            address,
            blockchainType,
            walletType,
            ankrBalance,
            nativeBalance,
            dotBalance,
            bnbBalance,
            ethereumBalance: new BigNumber(ethereumBalance),
            walletIcon: walletMeta?.icons ? walletMeta.icons[0] : undefined,
            walletName: walletMeta?.name,
          } as IUserInfo;
          */
          return {};
        })(),
      },
      meta: {
        asMutation: false,
        getData: data => data,
        onSuccess: (
          request: { data: IConnectResult },
          action: RequestAction,
          store: Store<IStoreState>,
        ) => {
          store.dispatch(UserActions.calcStakingFee());
          return request;
        },
      },
    }),
  ),
  calcStakingFee: () => ({
    type: UserActionTypes.CALC_STAKING_FEE,
    request: {
      promise: (async function () {
        /*
        const stkrSdk = StkrSdk.getForEnv();
        let stakingFeeRate = new BigNumber('0');
        if (stkrSdk.getKeyProvider().isBinanceSmartChain()) {
          const bridgeSdk = new BridgeSdk(stkrSdk);
          stakingFeeRate = await bridgeSdk.calcStakingFeeRate();
        }
        return {
          stakingFeeRate: stakingFeeRate,
        } as IStakingFeeInfo;
        */
        return {};
      })(),
    },
  }),
  stakeAndClaim: (amount: BigNumber | string, token: string) => ({
    type: UserActionTypes.STAKE_AND_CLAIM,
    request: {
      promise: (async function () {
        /*
        const stkrSdk = StkrSdk.getForEnv();

        if (stkrSdk.getKeyProvider().isBinanceSmartChain()) {
          const bridgeSdk = new BridgeSdk(stkrSdk);
          const stakingFeeRate = await bridgeSdk.calcStakingFeeRate();
          const fee = stakingFeeRate.multipliedBy(amount).dividedBy(32);

          amount = new BigNumber(amount).plus(fee);

          console.log(`New staking amount is: ${amount.toString(10)}`);
        }

        return stkrSdk.stake(amount, token, true);
        */
        return true;
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
};
