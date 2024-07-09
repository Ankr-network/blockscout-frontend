import { useTheme } from '@mui/material';

import { GradientedBorder } from 'modules/common/components/GradientedBorder';

import { BaseChainsCard, IBaseChainCardProps } from '../BaseChainsCard';

export const PremiumOnlyChainCard = (props: IBaseChainCardProps) => {
  const theme = useTheme();

  return (
    <GradientedBorder
      styles={{
        backgroundColor: theme.palette.background.default,
        borderRadius: 30,
        borderWidth: 2,
      }}
    >
      <BaseChainsCard isPremiumOnly {...props} />
    </GradientedBorder>
  );
};
