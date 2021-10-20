import React from 'react';
import { Container } from '@material-ui/core';

import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './useStyles';

const IS_I18N_ENABLED = false;

export const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Breadcrumbs />
        <div className={classes.right}>
          {IS_I18N_ENABLED && <LocaleSwitcher className={classes.switcher} />}
          <ConnectButton />
        </div>
      </Container>
    </header>
  );
};
