import { useMemo } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { selectHasUserGroups } from 'domains/userGroup/store';
import { ThemeSwitcher } from 'modules/layout/components/ThemeSwitcher';
import { UserGroupSelector } from 'domains/userGroup/components/UserGroupSelector';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { Header } from 'modules/layout/const';

interface HeaderContentProps {
  type?: Header;
}

export const HeaderContent = ({
  type = Header.Default,
}: HeaderContentProps) => {
  const isDefaultType = type === Header.Default;
  const isSidebarType = type === Header.Sidebar;
  const isMobileType = type === Header.Mobile;

  const { isLoggedIn } = useAuth();

  const hasUserGroups = useAppSelector(selectHasUserGroups);

  const shouldShowSignupButton = useMemo(() => {
    if (isSidebarType && !isLoggedIn) return false;

    return true;
  }, [isSidebarType, isLoggedIn]);

  const shouldShowUserGroupSelector = useMemo(() => {
    if (!hasUserGroups) return false;

    if (isMobileType) return false;

    return true;
  }, [hasUserGroups, isMobileType]);

  const shouldShowThemeSwitcher = useMemo(() => {
    const shouldHide = isMobileType && !isSidebarType;

    return !shouldHide;
  }, [isMobileType, isSidebarType]);

  return (
    <>
      {isLoggedIn && (
        <AccountDetailsButton
          isMobileType={isMobileType}
          isSidebarType={isSidebarType}
        />
      )}
      {shouldShowSignupButton && (
        <SignupButton
          isDefaultType={isDefaultType}
          isSidebarType={isSidebarType}
          isMobileType={isMobileType}
        />
      )}
      {(isDefaultType || isSidebarType) && <UserGroupDialog />}
      {shouldShowThemeSwitcher && (
        <ThemeSwitcher isSidebarType={isSidebarType} />
      )}
      {shouldShowUserGroupSelector && <UserGroupSelector />}
    </>
  );
};
