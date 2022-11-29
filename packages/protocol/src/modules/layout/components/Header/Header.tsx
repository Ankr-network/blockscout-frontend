import React from 'react';
import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './useStyles';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { SignupButton } from 'domains/auth/components/SignupButton';

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
          <NoReactSnap>
            <div className={classes.buttons}>
              <AccountDetailsButton />
              <SignupButton />
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
