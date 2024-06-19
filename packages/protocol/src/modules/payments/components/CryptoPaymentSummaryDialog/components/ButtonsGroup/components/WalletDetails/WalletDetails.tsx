import { Typography } from '@mui/material';
import { Web3Address } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { WalletAddressBox } from 'modules/common/components/WalletAddressBox';

import { useWalletDetailsStyles } from './useWalletDetailsStyles';

export interface IWalletDetailsProps {
  connectedAddress: Web3Address;
  walletIcon?: string;
}

export const WalletDetails = ({
  connectedAddress,
  walletIcon,
}: IWalletDetailsProps) => {
  const { classes } = useWalletDetailsStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant="subtitle2">
        {t('account.payment-summary-dialog.crypto.connected-address-label')}
      </Typography>
      <WalletAddressBox address={connectedAddress} walletIcon={walletIcon} />
    </div>
  );
};
