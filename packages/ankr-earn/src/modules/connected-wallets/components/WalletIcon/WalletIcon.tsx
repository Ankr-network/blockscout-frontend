import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { useWalletIconStyles } from './WalletIconStyles';

interface IWalletIconProps {
  icon?: string;
  className?: string;
}

export const WalletIcon = ({ icon, className }: IWalletIconProps) => {
  const [imgError, setImgError] = useState(false);
  const onError = useCallback(() => setImgError(true), []);
  const classes = useWalletIconStyles();
  const commonClassName = classNames(classes.icon, className);

  return icon && !imgError ? (
    <img className={commonClassName} src={icon} alt="" onError={onError} />
  ) : (
    <img
      className={commonClassName}
      src="https://via.placeholder.com/22x22"
      alt=""
    />
  );
};
