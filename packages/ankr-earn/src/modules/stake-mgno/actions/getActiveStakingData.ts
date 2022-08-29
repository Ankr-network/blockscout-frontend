import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';

import { ZERO } from 'modules/common/const';

import { GnosisStakingSDK } from '../api/GnosisStakingSDK/GnosisStakingSDK';
import { IActiveStakingData } from '../api/GnosisStakingSDK/types';
import { MGNO_ACTIONS_PREFIX, SLASHING_PROTECTION_VAR } from '../const';

interface IGetActiveStakingDataArgs {
  usdPrice: BigNumber;
}

export const getActiveStakingData = createAction<
  RequestAction<IActiveStakingData[], IActiveStakingData[]>,
  [IGetActiveStakingDataArgs]
>(
  `${MGNO_ACTIONS_PREFIX}getActiveStakingData`,
  ({ usdPrice }): RequestAction => ({
    request: {
      promise: (async (): Promise<IActiveStakingData[]> => {
        const sdk = await GnosisStakingSDK.getInstance();

        const providers = await sdk.getAllProviderAddresses();

        const providersDataArr = await Promise.all(
          providers.map(async provider => ({
            providerStatsData: await sdk.getProviderStats(provider),
            tipRewards: await sdk.getTipRewards(provider),
            rewards: await sdk.getRewards(provider),
            delegatedAmount: await sdk.getMyDelegatedAmount(provider),
            contributed: await sdk.getContributed(provider),
          })),
        );

        return providersDataArr.reduce((acc, providerData, index) => {
          const {
            contributed,
            delegatedAmount,
            rewards,
            tipRewards,
            providerStatsData,
          } = providerData;

          const slashingProtection = providerStatsData
            ? contributed.dividedBy(
                SLASHING_PROTECTION_VAR * providerStatsData.provider.totalKeys,
              )
            : ZERO;
          const tips = tipRewards ?? ZERO;
          const stakeAmount = delegatedAmount ?? ZERO;

          acc.push({
            provider: providers[index],
            providerName: providerStatsData
              ? providerStatsData.provider.name
              : providers[index],
            apr: providerStatsData
              ? new BigNumber(providerStatsData.apr)
              : ZERO,
            slashingProtection: slashingProtection.integerValue(),
            stakeAmount,
            usdStakeAmount: stakeAmount.multipliedBy(usdPrice),
            tips,
            usdTips: tips.multipliedBy(usdPrice),
            rewards,
            usdRewards: rewards.multipliedBy(usdPrice),
          });
          return acc;
        }, [] as IActiveStakingData[]);
      })(),
    },
    meta: {
      showNotificationOnError: true,
    },
  }),
);
