import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { RootState } from 'store';

import { getExtendedErrorText } from 'modules/api/utils/getExtendedErrorText';
import { queryFnNotifyWrapper, web3Api } from 'modules/api/web3Api';
import { ZERO } from 'modules/common/const';

import { AnkrStakingSDK } from '../api/AnkrStakingSDK';
import {
  IActiveStakingByValidator,
  IApyData,
  IDelegation,
  IStakingReward,
} from '../api/AnkrStakingSDK/types';
import { CacheTags } from '../cacheTags';
import { EProviderStatus } from '../const';

import { getAllclaimableRewards } from './getAllclaimableRewards';
import { selectAnkrPrice } from './getANKRPrice';
import { getAPY } from './getAPY';
import { selectLatestBlockNumber } from './getLatestBlockNumber';

export interface IAdditionalActiveStakingData {
  lockingPeriod: number;
  lockingPeriodPercent?: number;
  isUnlocked: boolean;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  isUnknownPeriod?: boolean;
}

export interface IActiveStakingData {
  provider: string;
  apy: BigNumber;
  isUnlocked: boolean;
  isPartiallyUnlocked: boolean;
  lockingPeriod?: number;
  lockingPeriodPercent?: number;
  stakeAmount: BigNumber;
  usdStakeAmount: BigNumber;
  rewards: BigNumber;
  usdRewards: BigNumber;
  detailedData?: IAdditionalActiveStakingData[];
  status: EProviderStatus;
}

// TODO Likelly bind to the current address: add providerTags argument
export const { useLazyGetActiveStakingDataQuery } = web3Api.injectEndpoints({
  endpoints: build => ({
    getActiveStakingData: build.query<IActiveStakingData[], void>({
      queryFn: queryFnNotifyWrapper<void, never, IActiveStakingData[]>(
        async (_, { getState, dispatch }) => {
          const sdk = await AnkrStakingSDK.getInstance();
          const state = getState() as RootState;
          const { data: tokenPrice = ZERO } = selectAnkrPrice(state);

          const [{ data: allclaimableRewards }, { data: apyByValidator }] =
            await Promise.all([
              dispatch(getAllclaimableRewards.initiate()),
              dispatch(getAPY.initiate()),
            ]);

          const { data: latestBlockNumber } = selectLatestBlockNumber(state);
          const blockNumber = latestBlockNumber ?? (await sdk.getBlockNumber());

          const activeStaking = await sdk.getActiveStaking(blockNumber);

          const data = activeStaking.map(
            getMapActiveStaking({
              tokenPrice,
              allclaimableRewards: allclaimableRewards ?? [],
              apyByValidator: apyByValidator ?? [],
            }),
          );

          return { data };
        },
        error =>
          getExtendedErrorText(error, t('stake-ankr.errors.active-staking')),
      ),
      providesTags: [CacheTags.history],
    }),
  }),
});

interface IGetMapActiveStakingArgs {
  tokenPrice: BigNumber;
  allclaimableRewards: IStakingReward[];
  apyByValidator: IApyData[];
}

function getMapActiveStaking({
  tokenPrice,
  allclaimableRewards,
  apyByValidator,
}: IGetMapActiveStakingArgs) {
  return (activeStaking: IActiveStakingByValidator): IActiveStakingData => {
    const {
      validator,
      activeDelegations,
      delegatedAmount,
      unlockedDelegatedByValidator,
    } = activeStaking;

    const apy =
      apyByValidator.find(apyItem => apyItem.validator === validator)?.apy ??
      ZERO;

    const rewards =
      allclaimableRewards.find(
        reward => reward.validator.validator === validator,
      )?.amount ?? ZERO;

    const isOneDelegation = activeDelegations.length === 1;
    const { lockingPeriod = 0, totalLockPeriod = 0 } =
      activeDelegations[0] ?? {};

    const daysLeft = isOneDelegation ? lockingPeriod : 0;

    const usdRewards = rewards.multipliedBy(tokenPrice);
    const usdStakeAmount = delegatedAmount.multipliedBy(tokenPrice);
    const detailedData = activeDelegations.map(getMapDetailedData(tokenPrice));
    const hasUnlockedAmount = !unlockedDelegatedByValidator.isZero();
    const isUnlocked = delegatedAmount.isEqualTo(unlockedDelegatedByValidator);

    return {
      detailedData,
      lockingPeriod: daysLeft,
      apy,
      isPartiallyUnlocked:
        !isUnlocked && detailedData.length > 1 && hasUnlockedAmount,
      isUnlocked,
      lockingPeriodPercent: (daysLeft / totalLockPeriod) * 100,
      provider: validator,
      rewards,
      stakeAmount: delegatedAmount,
      status: EProviderStatus.active,
      usdRewards,
      usdStakeAmount,
    };
  };
}

function getMapDetailedData(tokenPrice: BigNumber) {
  return (delegation: IDelegation): IAdditionalActiveStakingData => {
    const { lockingPeriod, amount, totalLockPeriod, isUnknownPeriod } =
      delegation;

    return {
      isUnknownPeriod,
      lockingPeriod,
      lockingPeriodPercent: (lockingPeriod / totalLockPeriod) * 100,
      isUnlocked: lockingPeriod === 0 && !isUnknownPeriod,
      stakeAmount: amount,
      usdStakeAmount: amount.multipliedBy(tokenPrice),
    };
  };
}