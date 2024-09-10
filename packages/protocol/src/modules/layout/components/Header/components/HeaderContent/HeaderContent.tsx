import { BalanceMenuButton } from 'modules/layout/components/BalanceMenuButton';
import { Header } from 'modules/layout/const';
import {
  ReferralCodeButton,
  useReferralCodeButton,
} from 'modules/referralProgram/components/ReferralCodeButton';
import { SignupButton } from 'domains/auth/components/SignupButton';
import { UserAccountSelector } from 'domains/userGroup/components/UserAccountSelector';
import { UserGroupDialog } from 'domains/userGroup/components/UserGroupDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

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

  const isMobile = useIsSMDown();

  const { referralCodeButtonProps } = useReferralCodeButton();

  return (
    <>
      {!isMobile && <ReferralCodeButton {...referralCodeButtonProps} />}
      {(isDefaultType || isSidebarType) && <UserGroupDialog />}

      {!isMobileType && isLoggedIn && !isEnterpriseClient && (
        <BalanceMenuButton />
      )}

      {isLoggedIn ? <UserAccountSelector /> : <SignupButton />}
    </>
  );
};
