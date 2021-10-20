import React from 'react';
import { Container } from '@material-ui/core';

import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { useStyles } from './useStyles';
import { Logo } from '../Logo';

export const MobileHeader = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <ConnectButton isMobile />
      </Container>
    </header>
  );
};
