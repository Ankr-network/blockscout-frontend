import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { createAction as createSmartAction } from 'redux-smart-actions';

interface IReqParams {
  limit?: number;
  offset?: number;
}

interface IValidatorItem {
  apr: number | null;
  commissionRate: number;
  creationTime: number;
  delegatorNum: null;
  logoUrl: string | null;
  status: number;
  valName: string | 'Ankr_BSC_validator_1';
  validator: string;
  votingPower: number;
  votingPowerProportion: number;
}

interface IResData {
  total: number;
  validators: IValidatorItem[];
}

const ANKR_BSC_VALIDATOR_NAME = 'Ankr_BSC_validator_1';

export const fetchAPY = createSmartAction<RequestAction<BigNumber, BigNumber>>(
  'bnb/fetchAPY',
  (): RequestAction => ({
    request: {
      method: 'get',
      params: {
        limit: 25,
        offset: 0,
      } as IReqParams,
      url: 'https://api.binance.org/v1/staking/chains/bsc/validators',
    },
    meta: {
      cache: ACTION_CACHE_SEC,
      driver: 'axios',
      showNotificationOnError: true,
      getData: (data: IResData): BigNumber => {
        const ankrValidator: IValidatorItem | undefined =
          data?.validators?.find(
            ({ valName }) => valName === ANKR_BSC_VALIDATOR_NAME,
          );

        return typeof ankrValidator?.apr === 'number'
          ? new BigNumber(ankrValidator.apr).multipliedBy(100)
          : ZERO;
      },
    },
  }),
);
