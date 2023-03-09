import { Container } from '@mui/material';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton/AccountDetailsButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { useStyles } from './useStyles';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ThemeSwitcher } from '../ThemeSwitcher';

interface HeaderProps {
  className?: string;
  isChainItemPage?: boolean;
}

export const Header = ({ className = '', isChainItemPage }: HeaderProps) => {
  const { classes, cx } = useStyles();
  const { hasPremium, hasWeb3Connection } = useAuth();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs isChainItemPage={isChainItemPage} />
        <div className={classes.right}>
          <NoReactSnap>
            <div className={classes.buttons}>
              {hasPremium && <AccountDetailsButton />}
              <SignupButton />
              {hasWeb3Connection && <ThemeSwitcher />}
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
