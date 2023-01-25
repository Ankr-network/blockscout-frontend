import { Container } from '@mui/material';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { Logo } from '../Logo';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { useStyles } from './useStyles';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ThemeSwitcher } from '../ThemeSwitcher';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = ({ className = '' }: MobileHeaderProps) => {
  const { classes, cx } = useStyles();

  const { hasPremium, hasWeb3Connection } = useAuth();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <Logo />
        <div className={classes.buttons}>
          {hasPremium && <AccountDetailsButton isMobile />}
          <SignupButton isMobile />
          {hasWeb3Connection && <ThemeSwitcher />}
        </div>
      </Container>
    </header>
  );
};
