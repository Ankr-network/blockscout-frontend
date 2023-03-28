import { shrinkAddress } from 'modules/common/utils/shrinkAddress';
import { text } from '../../utils/text';
import { useAddressStyles } from './AddressStyles';
import { useAuth } from 'domains/auth/hooks/useAuth';

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
