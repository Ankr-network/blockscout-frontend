import { t } from '@ankr.com/common';
import { Box } from '@mui/material';

import { GradientedText } from 'modules/common/components/GradientedText';

import { BaseChainsCard, IBaseChainCardProps } from '../BaseChainsCard';
import { useComingSoonChainCardStyles } from './ComingSoonChainCardStyles';

export const ComingSoonChainCard = (props: IBaseChainCardProps) => {
  const { classes } = useComingSoonChainCardStyles();

  return (
    <BaseChainsCard
      {...props}
      className={classes.root}
      badge={
        <Box className={classes.badge}>
          <GradientedText>{t('chains.soon')}</GradientedText>
        </Box>
      }
    />
  );
};
