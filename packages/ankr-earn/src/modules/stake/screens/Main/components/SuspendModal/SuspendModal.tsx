import { t, tHTML } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';

import { TWITTER_ANKR_STATUS_LINK } from 'modules/common/const';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { Dialog } from 'uiKit/Dialog';

import { useSuspendModal } from './useSuspendModal';
import { useSuspendModalStyles } from './useSuspendModalStyles';

export const SuspendModal = (): JSX.Element => {
  const classes = useSuspendModalStyles();

  const { isActive, handleClose } = useSuspendModal();

  return (
    <Dialog className={classes.root} open={isActive}>
      <Box textAlign="left">
        <Typography className={classes.title} variant="h3">
          {t('suspend-info.title')}
        </Typography>

        <Typography className={classes.text} variant="body2">
          {t('suspend-info.p1')}
        </Typography>

        <Typography className={classes.text} variant="body2">
          {tHTML('suspend-info.p2', { link: TWITTER_ANKR_STATUS_LINK })}
        </Typography>

        <Box mt={{ xs: 4, md: 6 }}>
          <Button fullWidth size="large" onClick={handleClose}>
            {t('suspend-info.button')}
          </Button>
        </Box>
      </Box>

      <CloseButton onClose={handleClose} />
    </Dialog>
  );
};
