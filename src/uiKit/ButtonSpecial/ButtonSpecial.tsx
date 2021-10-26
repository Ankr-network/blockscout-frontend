import React from 'react';
import { Button } from '@material-ui/core';
import { ReactComponent as MetamaskIcon } from '../../assets/img/metamask.svg';
import { useButtonSpecialStyles } from './ButtonSpecialStyles';

interface IButtonSpecialProps {
  onClick: () => void;
}

export const ButtonSpecial = ({ onClick }: IButtonSpecialProps) => {
  const classes = useButtonSpecialStyles();

  return (
    <>
      <Button className={classes.button} onClick={onClick}>
        <MetamaskIcon />
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
      </Button>
    </>
  );
};
