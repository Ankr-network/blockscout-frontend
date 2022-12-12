import { t } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';

import { TWITTER_ANKR_STATUS_LINK } from 'modules/common/const';
import bnb3DIcon from 'modules/stake/components/StakeTokenInfo/assets/bnb.png';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { Dialog } from 'uiKit/Dialog';

import { useNewBNBModal } from './useNewBNBModal';
import { useNewBNBModalStyles } from './useNewBNBStylesModal';

export const NewBNBModal = (): JSX.Element | null => {
  const classes = useNewBNBModalStyles();

  const { isActive, handleClose } = useNewBNBModal();

  return (
    <Dialog className={classes.root} open={isActive}>
      <Box textAlign="left">
        <Box className={classes.imgWrapper} display="flex">
          <img alt="bnb-icon" className={classes.img} src={bnb3DIcon} />
        </Box>

        <Typography className={classes.title} variant="h3">
          {t('new-bnb-info.title')}
        </Typography>

        <Typography align="center" className={classes.text} variant="body2">
          {t('new-bnb-info.description')}
        </Typography>

        <Typography align="center" className={classes.text} variant="body2">
          <a href={TWITTER_ANKR_STATUS_LINK} rel="noreferrer" target="_blank">
            {t('new-bnb-info.check-on-twitter')}
          </a>
        </Typography>

        <Box mt={2.5}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={handleClose}
          >
            {t('new-bnb-info.close')}
          </Button>
        </Box>
      </Box>

      <CloseButton onClose={handleClose} />
    </Dialog>
  );
};
