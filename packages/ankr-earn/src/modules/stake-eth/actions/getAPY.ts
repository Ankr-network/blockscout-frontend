import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';

import { configFromEnv } from 'modules/api/config';
import { ACTION_CACHE_SEC, isMainnet, RPC_GOERLI } from 'modules/common/const';

import { ETH_ACTIONS_PREFIX } from '../const';
import { getAprFromBalance } from '../utils/getAprFromBalance';

export const getAPY = createAction<RequestAction<number, number>>(
  `${ETH_ACTIONS_PREFIX}getAPY`,
  () => ({
    request: {
      promise: (async () => {
        const {
          contractConfig: { globalPoolDepositContract },
        } = configFromEnv();
        const url = isMainnet ? 'https://eth-03.dccn.ankr.com/' : RPC_GOERLI;

        if (!url) {
          throw new Error('getAPY: the url is not specified');
        }

        try {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_getBalance',
              params: [globalPoolDepositContract, 'latest'],
              id: 1,
            }),
          };

          const response = await fetch(url, requestOptions);
          const { result } = await response.json();

          const balance = Web3.utils.fromWei(
            Web3.utils.hexToNumberString(result),
          );

          return parseFloat(balance);
        } catch (error) {
          throw new Error(
            `Unable to fetch global pool ethereum balance; ${error}`,
          );
        }
      })(),
    },
    meta: {
      showNotificationOnError: true,
      asMutation: false,
      cache: ACTION_CACHE_SEC,
      getData: getAprFromBalance,
    },
  }),
);
