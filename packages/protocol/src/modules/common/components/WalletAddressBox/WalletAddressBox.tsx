import { Box, IconButtonOwnProps, Typography } from '@mui/material';
import { WalletIcon } from '@ankr.com/ui';
import { Web3Address } from 'multirpc-sdk';

import { CopyButton } from 'uiKit/CopyButton';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

import { useWalletAddressBoxStyles } from './useWalletAddressBoxStyles';

export type TWalletAddressBoxClasses = Partial<
  ReturnType<typeof useWalletAddressBoxStyles>['classes']
>;

export interface IWalletAddressBoxProps {
  address: Web3Address;
  className?: string;
  classes?: TWalletAddressBoxClasses;
  copyButtonSize?: IconButtonOwnProps['size'];
  walletIcon?: string;
}

export const WalletAddressBox = ({
  address,
  className,
  classes: classesOverrides,
  walletIcon,
  copyButtonSize,
}: IWalletAddressBoxProps) => {
  const { classes, cx } = useWalletAddressBoxStyles(undefined, {
    props: { classes: classesOverrides },
  });

  return (
    <Box className={cx(classes.root, className)}>
      {walletIcon && <WalletIcon className={classes.icon} icon={walletIcon} />}
      <Typography className={classes.address} variant="body2">
        {shrinkAddress(address)}
      </Typography>
      <CopyButton
        className={classes.copyButton}
        size={copyButtonSize}
        text={address}
      />
    </Box>
  );
};
