import { Box, Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { PremiumChainDialog } from 'domains/chains/components/PremiumChainDialog';
import { UpgradePlanBannerSkeleton } from '../UpgradePlanBannerSkeleton';
import { getBannerContent } from './utils';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { useUpgradePlanBannerStyles } from './useUpgradePlanBannerStyles';

interface IUpgradePlanBannerProps {
  hasPremium: boolean;
  loading: boolean;
}

export const UpgradePlanBanner = ({
  hasPremium,
  loading,
}: IUpgradePlanBannerProps) => {
  const { isLightTheme } = useThemes();
  const { classes } = useUpgradePlanBannerStyles(isLightTheme);

  const {
    image,
    planTitle,
    planDescription,
    proposalTitle,
    proposalDescription,
  } = useMemo(() => getBannerContent(hasPremium), [hasPremium]);

  const { isOpened, onOpen, onClose } = useDialog();

  if (loading) return <UpgradePlanBannerSkeleton />;

  return (
    <Box className={classes.root}>
      <Paper className={classes.wrapper}>
        <img className={classes.image} src={image} alt="" />
        <Box className={classes.plan}>
          <Typography variant="subtitle1" className={classes.planTitle}>
            {planTitle}
            <Typography variant="caption" className={classes.yourPlanBadge}>
              {t('advanced-api.banner.your-plan-badge')}
            </Typography>
          </Typography>
          <Box className={classes.planDescription}>{planDescription}</Box>
        </Box>
        <Box className={classes.proposal}>
          <Typography variant="subtitle1" className={classes.proposalTitle}>
            {proposalTitle}
          </Typography>
          <Box className={classes.proposalDescription}>
            {proposalDescription}
          </Box>
        </Box>
        <Button
          className={classes.action}
          color="info"
          onClick={onOpen}
          size="large"
          variant="contained"
        >
          {t('advanced-api.banner.action-text')}
        </Button>
      </Paper>
      <PremiumChainDialog onClose={onClose} open={isOpened} />
    </Box>
  );
};
