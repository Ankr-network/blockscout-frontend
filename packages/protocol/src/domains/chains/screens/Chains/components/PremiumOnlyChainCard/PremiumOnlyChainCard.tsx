import { t } from '@ankr.com/common';

import { BaseChainsCard, IBaseChainCardProps } from '../BaseChainsCard';
import { GradientedBorder } from 'modules/common/components/GradientedBorder';
import { GradientedText } from 'modules/common/components/GradientedText';
import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { usePremiumOnlyChainCardStyles } from './PremiumOnlyChainCardStyles';

export const PremiumOnlyChainCard = (props: IBaseChainCardProps) => {
  const { isOpened, onOpen, onClose } = useUpgradePlanDialog();

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
      <UpgradePlanDialog onClose={onClose} open={isOpened} />
    </>
  );
};
