import { useAuth } from 'domains/auth/hooks/useAuth';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { UserAccountSelector } from 'domains/userGroup/components/UserAccountSelector';
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

  return (
    <>
      {(isDefaultType || isSidebarType) && <UserGroupDialog />}

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
