import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { selectHasUserGroups } from 'domains/userGroup/store';
import { ThemeSwitcher } from 'modules/layout/components/ThemeSwitcher';
import { UserGroupSelector } from 'domains/userGroup/components/UserGroupSelector';
import { SignupButton } from 'domains/auth/components/SignupButton';

interface HeaderContentProps {
  isMobile?: boolean;
  isMobileSideBar?: boolean;
}

export const HeaderContent = ({
  isMobile = false,
  isMobileSideBar = false,
}: HeaderContentProps) => {
  const { isLoggedIn, hasWeb3Connection } = useAuth();

  const hasUserGroups = useAppSelector(selectHasUserGroups);

  const shouldShowSignupButton = useMemo(() => {
    if (isMobileSideBar && !isLoggedIn) return false;

    return true;
  }, [isMobileSideBar, isLoggedIn]);

  const shouldShowUserGroupSelector = useMemo(() => {
    if (!hasUserGroups) return false;

    if (isMobile && !isMobileSideBar) return false;

    return true;
  }, [hasUserGroups, isMobile, isMobileSideBar]);

  const shouldShowThemeSwitcher = useMemo(() => {
    if (!hasWeb3Connection) return false;

    if (isMobile && !isMobileSideBar) return false;

    return true;
  }, [hasWeb3Connection, isMobile, isMobileSideBar]);

  return (
    <>
      {isLoggedIn && (
        <AccountDetailsButton
          isMobile={isMobile}
          isMobileSideBar={isMobileSideBar}
        />
      )}
      {shouldShowSignupButton && (
        <SignupButton isMobile={isMobile} isMobileSideBar={isMobileSideBar} />
      )}
      {!isMobile && <UserGroupDialog />}
      {shouldShowThemeSwitcher && (
        <ThemeSwitcher isMobileSideBar={isMobileSideBar} />
      )}
      {shouldShowUserGroupSelector && <UserGroupSelector />}
    </>
  );
};
