import { Container } from '@mui/material';

import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { UserGroupSelector } from 'domains/userGroup/components/UserGroupSelector';
import { selectHasUserGroups } from 'domains/userGroup/store';
import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useStyles } from './useStyles';

interface HeaderProps {
  className?: string;
  isChainItemPage?: boolean;
}

export const Header = ({ className = '', isChainItemPage }: HeaderProps) => {
  const { classes, cx } = useStyles();
  const { hasWeb3Connection, isLoggedIn } = useAuth();

  const hasUserGroups = useAppSelector(selectHasUserGroups);

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
              {hasUserGroups && <UserGroupSelector />}
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
