import { useAuth } from 'domains/auth/hooks/useAuth';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { UserAccountSelector } from 'domains/userGroup/components/UserAccountSelector';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { Header } from 'modules/layout/const';
import { AccountDetailsButton } from 'domains/account/components/AccountDetailsButton';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

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

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  return (
    <>
      {(isDefaultType || isSidebarType) && <UserGroupDialog />}

      {isLoggedIn && !isEnterpriseClient && (
        <AccountDetailsButton
          isSidebarType={isSidebarType}
          isMobileType={isMobileType}
        />
      )}

      {isLoggedIn ? (
        <UserAccountSelector />
      ) : (
        <SignupButton
          isDefaultType={isDefaultType}
          isSidebarType={isSidebarType}
          isMobileType={isMobileType}
        />
      )}
    </>
  );
};
