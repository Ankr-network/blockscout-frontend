import { t } from '@ankr.com/common';

import { BaseChainsCard, IBaseChainCardProps } from '../BaseChainsCard';
import { GradientedBorder } from 'modules/common/components/GradientedBorder';
import { GradientedText } from 'modules/common/components/GradientedText';
import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { useDialog } from 'modules/common/hooks/useDialog';
import { usePremiumOnlyChainCardStyles } from './PremiumOnlyChainCardStyles';
import { useLocaleMemo } from '../../../../../../modules/i18n/utils/useLocaleMemo';

export const PremiumOnlyChainCard = (props: IBaseChainCardProps) => {
  const { isOpened, onOpen, onClose } = useDialog();

  const { classes, theme } = usePremiumOnlyChainCardStyles();

  const buttonText = useLocaleMemo(() => t('chains.premium-only'), []);

  return (
    <>
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
          onClick={onOpen}
        />
      </GradientedBorder>
      <PremiumChainDialog onClose={onClose} open={isOpened} />
    </>
  );
};
