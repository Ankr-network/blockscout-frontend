import { InlineAlert } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { useWaitingBlockBannerStyles } from './useWaitingBlockBannerStyles';

export interface IWaitingBlockBannerProps {
  blocks: number;
}

export const WaitingBlockBanner = ({ blocks }: IWaitingBlockBannerProps) => {
  const { classes } = useWaitingBlockBannerStyles();

  return (
    <InlineAlert severity="info" className={classes.root}>
      <Typography variant="body3">
        {t('account.crypto-payment-deposit-dialog.waiting-blocks-banner', {
          blocks,
        })}
      </Typography>
    </InlineAlert>
  );
};
