import React from 'react';
import { Button } from '@material-ui/core';
import cn from 'classnames';
import { ReactComponent as MetamaskIcon } from '../../assets/img/metamask.svg';
import { useButtonMetamaskStyles } from './ButtonMetamaskStyles';

interface IButtonSpecialProps {
  onClick: () => void;
  isDisabled?: boolean;
  size?: 'large' | 'medium';
  className?: string;
  hasPlusIcon?: boolean;
}

export const ButtonMetamask = ({
  onClick,
  isDisabled,
  size = 'large',
  className,
  hasPlusIcon = true,
}: IButtonSpecialProps) => {
  const classes = useButtonMetamaskStyles();

  return (
    <>
      <Button
        disabled={isDisabled}
        className={cn(
          classes.button,
          isDisabled && classes.disabled,
          {
            [classes[`size_${size}`]]: size,
          },
          className,
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
    </>
  );
};
