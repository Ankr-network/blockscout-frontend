import React from 'react';
import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { useStyles } from './useStyles';
import { Logo } from '../Logo';
import { SignupButton } from 'domains/auth/components/SignupButton';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className = '' }: MobileHeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <div className={classes.buttons}>
          <AccountDetailsButton isMobile />
          <SignupButton isMobile />
        </div>
      </Container>
    </header>
  );
};
