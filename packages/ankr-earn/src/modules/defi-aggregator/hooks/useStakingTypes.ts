import { t } from 'common';

export enum StakingType {
  All = 'All',
  LiquidStaking = 'Liquid Staking',
  LiquidityPool = 'Liquidity Pool',
  Farming = 'Farming',
  Vault = 'Vault',
  Borrowing = 'Borrowing',
}

export type StakingTypeOption = {
  label: string;
  value: StakingType;
  separate?: boolean;
};

export const useStakingTypes = (): StakingTypeOption[] => [
  {
    label: t('defi.all'),
    value: StakingType.All,
    separate: true,
  },
  {
    label: t('defi.liquidity-pool'),
    value: StakingType.LiquidityPool,
  },
  {
    label: t('defi.farming'),
    value: StakingType.Farming,
  },
  {
    label: t('defi.vault'),
    value: StakingType.Vault,
  },
];
