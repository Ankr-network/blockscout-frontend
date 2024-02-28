import { t } from '@ankr.com/common';

import { GradientedBorder } from 'modules/common/components/GradientedBorder';
import { GradientedText } from 'modules/common/components/GradientedText';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { BaseChainsCard, IBaseChainCardProps } from '../BaseChainsCard';
import { usePremiumOnlyChainCardStyles } from './PremiumOnlyChainCardStyles';

export const PremiumOnlyChainCard = (props: IBaseChainCardProps) => {
  const { classes, theme } = usePremiumOnlyChainCardStyles();

  const buttonText = useLocaleMemo(() => t('chains.premium-only'), []);

  return (
    <GradientedBorder
      styles={{
        backgroundColor: theme.palette.background.default,
        borderRadius: 30,
        borderWidth: 2,
      }}
    >
      <BaseChainsCard
        {...props}
        buttonClassName={classes.button}
        buttonText={<GradientedText>{buttonText}</GradientedText>}
        className={classes.root}
      />
    </GradientedBorder>
  );
};
