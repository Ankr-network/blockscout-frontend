import { useAuth } from 'domains/auth/hooks/useAuth';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { UserAccountSelector } from 'domains/userGroup/components/UserAccountSelector';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { Header } from 'modules/layout/const';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { BalanceMenuButton } from 'modules/layout/components/BalanceMenuButton';

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

      {!isMobileType && isLoggedIn && !isEnterpriseClient && (
        <BalanceMenuButton />
      )}

      {isLoggedIn ? <UserAccountSelector /> : <SignupButton />}
    </>
  );
};
