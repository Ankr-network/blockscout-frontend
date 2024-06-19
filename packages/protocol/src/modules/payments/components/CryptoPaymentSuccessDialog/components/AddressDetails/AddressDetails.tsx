import { Typography } from '@mui/material';
import { Web3Address } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { WalletAddressBox } from 'modules/common/components/WalletAddressBox';

import { useAddressDetailsStyles } from './useAddressDetailsStyles';

export interface IAddressDetailsProps {
  className?: string;
  from: Web3Address;
  to: Web3Address;
}

export const AddressDetails = ({
  className,
  from,
  to,
}: IAddressDetailsProps) => {
  const { classes, cx } = useAddressDetailsStyles();

  const addressBoxClasses = useMemo(
    () => ({
      root: classes.addressBoxRoot,
    }),
    [classes],
  );

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.box}>
        <Typography className={classes.label} variant="subtitle2">
          {t('account.success-crypto-payment-dialog.from-title')}
        </Typography>
        <WalletAddressBox
          address={from}
          classes={addressBoxClasses}
          copyButtonSize="extraSmall"
        />
      </div>
      <div className={classes.box}>
        <Typography className={classes.label} variant="subtitle2">
          {t('account.success-crypto-payment-dialog.to-title')}
        </Typography>
        <WalletAddressBox
          address={to}
          classes={addressBoxClasses}
          copyButtonSize="extraSmall"
        />
      </div>
    </div>
  );
};
