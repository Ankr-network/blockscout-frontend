import { t } from '@ankr.com/common';

export const OStakingType = {
  all: 'all',
  stablePool: 'stablePool',
  volatilePool: 'volatilePool',
  farming: 'farming',
  vault: 'vault',
  landing: 'landing',
} as const;

type TStakingType = typeof OStakingType[keyof typeof OStakingType];

export type StakingTypeOption = {
  label: string;
  value: TStakingType;
  separate?: boolean;
};

export const useStakingTypes = (): StakingTypeOption[] => [
  {
    label: t('defi.all-types'),
    value: OStakingType.all,
    separate: true,
  },
  {
    label: t('defi.stable-pool'),
    value: OStakingType.stablePool,
  },
  {
    label: t('defi.volatile-pool'),
    value: OStakingType.volatilePool,
  },
  {
    label: t('defi.farming'),
    value: OStakingType.farming,
  },
  {
    label: t('defi.vault'),
    value: OStakingType.vault,
  },
  {
    label: t('defi.lending'),
    value: OStakingType.landing,
  },
];
