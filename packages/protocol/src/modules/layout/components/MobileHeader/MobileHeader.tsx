import { Container } from '@material-ui/core';
import classNames from 'classnames';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { Logo } from '../Logo';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useStyles } from './useStyles';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className = '' }: MobileHeaderProps) => {
  const classes = useStyles();

  const { credentials } = useAccountAuth();
  const hasCredentials = Boolean(credentials);

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <div className={classes.buttons}>
          {hasCredentials && <AccountDetailsButton isMobile />}
          <SignupButton isMobile />
        </div>
      </Container>
    </header>
  );
};
