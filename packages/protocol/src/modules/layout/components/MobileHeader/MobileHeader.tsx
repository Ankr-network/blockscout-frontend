import React from 'react';
import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { ConnectButton } from 'domains/auth/components/ConnectButton';
import { useStyles } from './useStyles';
import { Logo } from '../Logo';

interface MobileHeaderProps {
  className?: string;
  hasAccountDetailsButton?: boolean;
}

export const MobileHeader = ({
  hasAccountDetailsButton,
  className = '',
}: MobileHeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <div className={classes.buttons}>
          {hasAccountDetailsButton && <AccountDetailsButton isMobile />}
          <ConnectButton isMobile />
        </div>
      </Container>
    </header>
  );
};
