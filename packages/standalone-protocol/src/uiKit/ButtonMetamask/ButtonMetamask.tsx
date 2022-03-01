import React from 'react';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { ReactComponent as MetamaskIcon } from '../../assets/img/metamask.svg';
import { useButtonMetamaskStyles } from './ButtonMetamaskStyles';

interface IButtonSpecialProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  isDisabled?: boolean;
  size?: 'large' | 'medium';
  className?: string;
  hasPlusIcon?: boolean;
  chainId?: string;
}

export const ButtonMetamask = ({
  onClick,
  isDisabled,
  size = 'large',
  className,
  chainId,
  hasPlusIcon = false,
}: IButtonSpecialProps) => {
  const classes = useButtonMetamaskStyles();

  return (
    <Button
      disabled={isDisabled}
      className={classNames(
        classes.button,
        isDisabled && classes.disabled,
        {
          [classes[`size_${size}`]]: size,
        },
        className,
        chainId,
      )}
      onClick={onClick}
    >
      <MetamaskIcon />
      {hasPlusIcon && (
        <span className={classes.plusIconWrapper}>
          <svg
            className={classes.plusIcon}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 0H4V4L0 4V6H4V10H6V6H10V4L6 4V0Z"
              fill="white"
            />
          </svg>
        </span>
      )}
    </Button>
  );
};
