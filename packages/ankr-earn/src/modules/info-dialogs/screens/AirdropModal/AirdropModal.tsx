import { t, tHTML } from '@ankr.com/common';
import { Box, Typography } from '@material-ui/core';

import { TWITTER_ANKR_STATUS_LINK } from 'modules/common/const';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';
import { Dialog } from 'uiKit/Dialog';

import { useAirdropModal } from './useAirdropModal';
import { useAirdropModalStyles } from './useAirdropModalStyles';

const LINK =
  'https://bscscan.com/token/0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827';

export const AirdropModal = (): JSX.Element | null => {
  const classes = useAirdropModalStyles();

  const {
    isActive,
    isAddTokenLoading,
    isConnected,
    handleAddToken,
    handleClose,
  } = useAirdropModal();

  if (!isConnected) {
    return null;
  }

  return (
    <Dialog className={classes.root} open={isActive}>
      <Box textAlign="left">
        <Typography className={classes.title} variant="h3">
          {t('airdrop-info.title')}
        </Typography>

        <Typography className={classes.text} variant="body2">
          {tHTML('airdrop-info.text.p1', { href: LINK })}
        </Typography>

        <Typography className={classes.text} variant="body2">
          <a href={TWITTER_ANKR_STATUS_LINK} rel="noreferrer" target="_blank">
            {t('airdrop-info.text.p2')}
          </a>
        </Typography>

        <Box mt={4}>
          <Button
            fullWidth
            disabled={isAddTokenLoading}
            isLoading={isAddTokenLoading}
            size="large"
            onClick={handleAddToken}
          >
            {t('airdrop-info.add-button')}
          </Button>
        </Box>

        <Box mt={2.5}>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            onClick={handleClose}
          >
            {t('airdrop-info.close-button')}
          </Button>
        </Box>
      </Box>

      <CloseButton onClose={handleClose} />
    </Dialog>
  );
};
