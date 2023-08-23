import { useAutoconnect } from 'hooks/useAutoconnect';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useCheckChangedSignupUserSettingsAndUpdate } from 'hooks/useCheckChangedSignupUserSettingsAndUpdate';
import { useJwtManagerInitializer } from 'domains/jwtToken/hooks/useJwtManagerInitializer';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';
import { useBlockchainsLoader } from 'hooks/useBlockchainsLoader';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

export const useInitialization = (isLoggedIn: boolean) => {
  const hasRoleAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const skipFetching = isReactSnap || !isLoggedIn || !hasRoleAccess;

  useAutoconnect();

  useBalance({ skipFetching });
  useMyBundles({ skipFetching });

  useCheckChangedSignupUserSettingsAndUpdate();
  useJwtManagerInitializer(!isReactSnap && isLoggedIn);

  usePremiumStatusSubscription();
  useBlockchainsLoader();
};
