import { Container } from '@mui/material';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useStyles } from './useStyles';

interface HeaderProps {
  className?: string;
  isChainItemPage?: boolean;
}

export const Header = ({ className = '', isChainItemPage }: HeaderProps) => {
  const { classes, cx } = useStyles();
  const { hasWeb3Connection, isLoggedIn } = useAuth();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs isChainItemPage={isChainItemPage} />
        <div className={classes.right}>
          <NoReactSnap>
            <div className={classes.buttons}>
              {isLoggedIn && <AccountDetailsButton />}
              <UserGroupDialog />
              <SignupButton />
              {hasWeb3Connection && <ThemeSwitcher />}
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
