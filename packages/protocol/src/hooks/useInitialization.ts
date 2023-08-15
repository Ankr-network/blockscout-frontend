import { useAutoconnect } from 'hooks/useAutoconnect';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useWeb3ThemeSwitcher } from 'hooks/useWeb3ThemeSwitcher';
import { useCheckChangedSignupUserSettingsAndUpdate } from 'hooks/useCheckChangedSignupUserSettingsAndUpdate';
import { useJwtManagerInitializer } from 'domains/jwtToken/hooks/useJwtManagerInitializer';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

export const useInitialization = (isLoggedIn: boolean) => {
  const hasRoleAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const skipFetching = isReactSnap || !isLoggedIn || !hasRoleAccess;

  useAutoconnect();
  useWeb3ThemeSwitcher();

  useBalance({ skipFetching });
  useMyBundles({ skipFetching });

  useCheckChangedSignupUserSettingsAndUpdate();
  useJwtManagerInitializer(!isReactSnap && isLoggedIn);

  usePremiumStatusSubscription();
};
