import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useStyles } from './useStyles';

export const IS_I18N_ENABLED = false;

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const classes = useStyles();
  const { credentials } = useAccountAuth();

  const hasCredentials = Boolean(credentials);

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs />
        <div className={classes.right}>
          {IS_I18N_ENABLED && <LocaleSwitcher className={classes.switcher} />}
          <NoReactSnap>
            <div className={classes.buttons}>
              {hasCredentials && <AccountDetailsButton />}
              <SignupButton />
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
