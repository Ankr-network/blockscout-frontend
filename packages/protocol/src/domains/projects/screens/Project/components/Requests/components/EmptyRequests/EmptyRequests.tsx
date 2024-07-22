import { Box, Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';
import { NoDataCoinStack } from '@ankr.com/ui';

import { useAppSelector } from 'store/useAppSelector';
import { selectHasFreemium } from 'domains/auth/store';
import { useUpgradePlanDialog } from 'modules/common/components/UpgradePlanDialog';
import { PlansDialog } from 'modules/common/components/PlansDialog';

import { useEmptyLayoutStyles } from './EmptyRequestsStyles';

export const EmptyRequests = () => {
  const { classes } = useEmptyLayoutStyles();

  const isFreePremium = useAppSelector(selectHasFreemium);

  const { isOpened, onClose, onOpen } = useUpgradePlanDialog();

  if (isFreePremium) {
    return (
      <>
        <Box className={classes.rootFreemium}>
          <Typography
            variant="body3"
            component="p"
            className={classes.freemiumMessage}
          >
            {tHTML('project.total-requests.freemium-message')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.freemiumButton}
            onClick={onOpen}
          >
            {t('project.total-requests.freemium-button')}
          </Button>
        </Box>
        <PlansDialog onClose={onClose} open={isOpened} />
      </>
    );
  }

  return (
    <Box className={classes.root}>
      <NoDataCoinStack className={classes.icon} />
      <Typography variant="body3" color="textSecondary">
        {t('project.total-requests.empty')}
      </Typography>
    </Box>
  );
};
