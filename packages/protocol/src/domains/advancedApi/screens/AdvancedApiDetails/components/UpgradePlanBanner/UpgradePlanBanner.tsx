import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useThemes } from 'uiKit/Theme/hook/useThemes';
import { UpgradePlanBannerSkeleton } from '../UpgradePlanBannerSkeleton';
import { getBannerContent } from './utils';
import { useUpgradePlanBannerStyles } from './useUpgradePlanBannerStyles';

interface IUpgradePlanBannerProps {
  hasPrivateAccess: boolean;
  loading: boolean;
}

export const UpgradePlanBanner = ({
  hasPrivateAccess,
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
    actionLink,
    actionHash,
    actionProps,
    actionText,
  } = useMemo(() => getBannerContent(hasPrivateAccess), [hasPrivateAccess]);

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
          component={actionProps ? Button : NavLink}
          size="large"
          variant="contained"
          color="info"
          className={classes.action}
          href={actionLink}
          to={{
            pathname: actionLink,
            hash: actionHash,
          }}
          {...actionProps}
        >
          {actionText}
        </Button>
      </Paper>
    </Box>
  );
};
