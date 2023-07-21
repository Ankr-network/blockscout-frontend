import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { text } from '../../utils/text';
import { useAddressStyles } from './AddressStyles';

export interface AddressProps {
  className: string;
}

export const Address = ({ className }: AddressProps) => {
  const { classes, cx } = useAddressStyles();

  const { address } = useAuth();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.description}>{text('address-description')}</div>
      <div className={classes.address}>{shrinkAddress(address)}</div>
    </div>
  );
};
