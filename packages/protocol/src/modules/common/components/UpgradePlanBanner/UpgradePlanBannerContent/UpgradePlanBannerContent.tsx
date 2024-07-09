import { useMemo } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useUpgradePlanBannerContentStyles } from './useUpgradePlanBannerContentStyles';
import { getBannerContent } from '../utils';
import { UpgradePublicBanner } from '../UpgradePublicBanner';

interface IBannerContentProps {
  hasPremium: boolean;
  isAdvancedApi: boolean;
  isPublicUser: boolean;
  handleOpen: () => void;
}

export const UpgradePlanBannerContent = ({
  handleOpen,
  hasPremium,
  isAdvancedApi,
  isPublicUser,
}: IBannerContentProps) => {
  const { isLightTheme } = useThemes();
  const { classes } = useUpgradePlanBannerContentStyles(isLightTheme);

  const {
    actionProps = {},
    actionText,
    image,
    planDescription,
    planTitle,
    proposalDescription,
    proposalTitle,
  } = useMemo(
    () => getBannerContent(hasPremium, isAdvancedApi),
    [hasPremium, isAdvancedApi],
  );

  if (isPublicUser) {
    return <UpgradePublicBanner onGetPremiumButtonClick={handleOpen} />;
  }

  return (
    <Paper className={classes.wrapper}>
      <Box className={classes.image}>
        <img src={image} alt="" />
      </Box>
      <Box className={classes.plan}>
        <Typography variant="subtitle1" className={classes.planTitle}>
          {planTitle}
          <Typography variant="caption" className={classes.yourPlanBadge}>
            {t('banner.your-plan-badge')}
          </Typography>
        </Typography>
        <Box className={classes.planDescription}>{planDescription}</Box>
      </Box>
      <Box className={classes.proposal}>
        <Typography variant="subtitle1" className={classes.proposalTitle}>
          {proposalTitle}
        </Typography>
        <Box className={classes.proposalDescription}>{proposalDescription}</Box>
      </Box>
      <Button
        {...actionProps}
        size="large"
        variant="contained"
        color="info"
        className={classes.action}
        onClick={handleOpen}
      >
        {actionText}
      </Button>
    </Paper>
  );
};
