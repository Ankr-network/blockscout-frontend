import React from 'react';
import { Container } from '@material-ui/core';

import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './HeaderStyles';

export const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Breadcrumbs />
        <div className={classes.right}>
          <LocaleSwitcher className={classes.switcher} />
          <ConnectButton />
        </div>
      </Container>
    </header>
  );
};
