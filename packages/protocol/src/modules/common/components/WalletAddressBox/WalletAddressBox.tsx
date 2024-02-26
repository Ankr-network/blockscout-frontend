import { Box, Typography } from '@mui/material';
import { WalletIcon } from '@ankr.com/ui';
import { Web3Address } from 'multirpc-sdk';

import { CopyButton } from 'uiKit/CopyButton';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

import { useWalletAddressBoxStyles } from './useWalletAddressBoxStyles';

export interface IWalletAddressBoxProps {
  address: Web3Address;
  className?: string;
  walletIcon?: string;
}

export const WalletAddressBox = ({
  address,
  className,
  walletIcon,
}: IWalletAddressBoxProps) => {
  const { classes, cx } = useWalletAddressBoxStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <WalletIcon className={classes.icon} icon={walletIcon} />
      <Typography className={classes.address} variant="body2">
        {shrinkAddress(address)}
      </Typography>
      <CopyButton className={classes.copyButton} text={address} />
    </Box>
  );
};
