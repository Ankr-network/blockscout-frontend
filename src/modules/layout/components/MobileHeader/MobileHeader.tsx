import React from 'react';
import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { useStyles } from './useStyles';
import { Logo } from '../Logo';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className = '' }: MobileHeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <ConnectButton isMobile />
      </Container>
    </header>
  );
};
