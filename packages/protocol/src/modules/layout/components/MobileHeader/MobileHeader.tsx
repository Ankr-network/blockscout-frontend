import { Container } from '@mui/material';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton';
import { Logo } from '../Logo';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useStyles } from './useStyles';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className = '' }: MobileHeaderProps) => {
  const { classes, cx } = useStyles();

  const { hasWeb3Connection, isLoggedIn } = useAuth();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <div className={classes.buttons}>
          {isLoggedIn && <AccountDetailsButton isMobile />}
          <SignupButton isMobile />
          {hasWeb3Connection && <ThemeSwitcher />}
        </div>
      </Container>
    </header>
  );
};
