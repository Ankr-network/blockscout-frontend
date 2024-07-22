import { useTheme } from '@mui/material';

import { GradientedBorder } from 'modules/common/components/GradientedBorder';

import { BaseChainsCard, IBaseChainCardProps } from '../BaseChainsCard';
import { ChainCardShadow } from '../ChainCardShadow';

export const PremiumOnlyChainCard = (props: IBaseChainCardProps) => {
  const theme = useTheme();

  return (
    <GradientedBorder
      Component={ChainCardShadow}
      styles={{
        backgroundColor: theme.palette.background.default,
        borderRadius: 30,
        borderWidth: 2,
      }}
    >
      <BaseChainsCard hasShadow={false} isPremiumOnly {...props} />
    </GradientedBorder>
  );
};
