import React from 'react';
import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './useStyles';

export const IS_I18N_ENABLED = false;

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const classes = useStyles();

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs />
        <div className={classes.right}>
          {IS_I18N_ENABLED && <LocaleSwitcher className={classes.switcher} />}
          <ConnectButton />
        </div>
      </Container>
    </header>
  );
};
