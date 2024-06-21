import { EBlockchain } from 'multirpc-sdk';
import { InlineAlert } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { networkNameByPathMap } from 'modules/payments/const';

import { useSwitchNetworkBannerStyles } from './useSwitchNetworkBannerStyles';

interface ISwitchNetworkBannerProps {
  network: EBlockchain;
}

export const SwitchNetworkBanner = ({ network }: ISwitchNetworkBannerProps) => {
  const { classes } = useSwitchNetworkBannerStyles();

  return (
    <InlineAlert severity="warning" className={classes.root}>
      <Typography variant="body3">
        {tHTML('account.crypto-payment-deposit-dialog.switch-network-banner', {
          network: t(networkNameByPathMap[network]),
        })}
      </Typography>
    </InlineAlert>
  );
};
