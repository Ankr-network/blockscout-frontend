import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import {
  AvalancheSDK,
  BinanceSDK,
  EthereumSDK,
  FantomSDK,
  MaticEthSDK,
  MaticPolygonSDK,
} from '@ankr.com/staking-sdk';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { AnkrStakingSDK } from 'modules/stake-ankr/api/AnkrStakingSDK';
import { PolkadotStakeSDK } from 'modules/stake-polkadot/api/PolkadotStakeSDK';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';

import { CALC_ACTIONS_PREFIX } from '../const';
import { TCalcToken } from '../types';

interface IGetBalance {
  balance: BigNumber;
  staked: BigNumber;
}

export const getBalance = createAction<
  RequestAction<IGetBalance, IGetBalance>,
  [TCalcToken]
>(`${CALC_ACTIONS_PREFIX}getBalance`, token => ({
  request: {
    promise: (async (): Promise<IGetBalance> => {
      switch (token) {
        case Token.ANKR: {
          const sdk = await AnkrStakingSDK.getInstance();
          const provider = await sdk.getProvider();
          const latestBlockNumber = await provider.getBlockNumber();

          const [balance, staked] = await Promise.all([
            sdk.getAnkrBalance(),
            sdk.getMyTotalDelegatedAmount(latestBlockNumber),
          ]);

          return {
            balance,
            staked,
          };
        }
        case Token.AVAX: {
          const sdk = await AvalancheSDK.getInstance();
          const [nativeBalance, bondBalance, certBalance, ratio] =
            await Promise.all([
              sdk.getAVAXBalance(),
              sdk.getABBalance(),
              sdk.getACBalance(),
              sdk.getACRatio(),
            ]);

          return {
            balance: nativeBalance,
            staked: bondBalance.plus(certBalance.dividedBy(ratio)),
          };
        }
        case Token.BNB: {
          const sdk = await BinanceSDK.getInstance();
          const [nativeBalance, bondBalance, certBalance, ratio] =
            await Promise.all([
              sdk.getBNBBalance(),
              sdk.getABBalance(),
              sdk.getACBalance(),
              sdk.getACRatio(),
            ]);

          return {
            balance: nativeBalance,
            staked: bondBalance.plus(certBalance.dividedBy(ratio)),
          };
        }
        case Token.ETH: {
          const sdk = await EthereumSDK.getInstance();
          const isFormatted = true;
          const [nativeBalance, bondBalance, certBalance, ratio] =
            await Promise.all([
              sdk.getEthBalance(),
              sdk.getABBalance(isFormatted),
              sdk.getACBalance(isFormatted),
              sdk.getACRatio(isFormatted),
            ]);

          return {
            balance: nativeBalance,
            staked: bondBalance.plus(certBalance.dividedBy(ratio)),
          };
        }
        case Token.FTM: {
          const sdk = await FantomSDK.getInstance();
          const [nativeBalance, bondBalance, certBalance, ratio] =
            await Promise.all([
              sdk.getFtmBalance(),
              sdk.getABBalance(),
              sdk.getACBalance(),
              sdk.getACRatio(),
            ]);

          return {
            balance: nativeBalance,
            staked: bondBalance.plus(certBalance.dividedBy(ratio)),
          };
        }
        case Token.MATIC: {
          const ethSdk = await MaticEthSDK.getInstance();
          const polygonSdk = await MaticPolygonSDK.getInstance();
          const [
            polygonMaticBalance,
            polygonMaticBondBalance,
            polygonMaticCertBalance,
            ethereumMaticBalance,
            ethereumMaticBondBalance,
            ethereumMaticCertBalance,
            ratio,
          ] = await Promise.all([
            polygonSdk.getMaticBalance(),
            polygonSdk.getABBalance(),
            polygonSdk.getACBalance(),
            ethSdk.getMaticBalance(),
            ethSdk.getABBalance(),
            ethSdk.getACBalance(),
            ethSdk.getACRatio(),
          ]);

          const bonds = polygonMaticBondBalance.plus(ethereumMaticBondBalance);
          const certs = polygonMaticCertBalance.plus(ethereumMaticCertBalance);

          return {
            balance: polygonMaticBalance.plus(ethereumMaticBalance),
            staked: bonds.plus(certs.dividedBy(ratio)),
          };
        }

        case Token.WND:
        case Token.KSM:
        case Token.DOT: {
          const sdk = await PolkadotStakeSDK.getInstance();
          const network = EPolkadotNetworks[token];

          const [balance, staked] = await Promise.all([
            sdk.getPolkadotAccountFullBalance(network),
            sdk.getETHTokenBalance(network),
          ]);

          return {
            balance,
            staked,
          };
        }

        default:
          return {
            balance: ZERO,
            staked: ZERO,
          };
      }
    })(),
  },
  meta: {
    showNotificationOnError: false,
    requestKey: token,
  },
}));
