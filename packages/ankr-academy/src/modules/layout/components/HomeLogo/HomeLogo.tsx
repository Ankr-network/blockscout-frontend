import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useHomeLogoStyles } from './HomeLogoStyles';
import { AcademyRoutesConfig } from 'domains/academy/Routes';

import { ReactComponent as Logo } from './assets/logo.svg';

interface IHomeLogoProps {
  className?: string;
}

export const HomeLogo = ({ className }: IHomeLogoProps) => {
  const classes = useHomeLogoStyles();

  return (
    <div className={classNames(classes.homeWrap, className)}>
      <Link
        className={classes.home}
        to={AcademyRoutesConfig.academy.path}
        aria-label="ANKR"
      >
        <Logo className={classes.homeIcon} />
      </Link>
    </div>
  );
};
