import { useAutoconnect } from 'hooks/useAutoconnect';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useCheckChangedSignupUserSettingsAndUpdate } from 'hooks/useCheckChangedSignupUserSettingsAndUpdate';
import { useJwtManagerInitializer } from 'domains/jwtToken/hooks/useJwtManagerInitializer';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useEnterpriseStatusFetch } from 'domains/auth/hooks/useEnterpriseStatus';
import { useBlockchainsLoader } from 'hooks/useBlockchainsLoader';

export const useInitialization = (isLoggedIn: boolean) => {
  const hasBillingRoleAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const hasJwtReadRoleAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const shouldInitialize = !isReactSnap && isLoggedIn;

  const { isEnterpriseClient, isLoadingEnterpriseStatus } =
    useEnterpriseStatusFetch(shouldInitialize);

  const skipFetchingBase =
    isReactSnap ||
    !isLoggedIn ||
    isEnterpriseClient ||
    isLoadingEnterpriseStatus;

  const skipFetchingBilling = skipFetchingBase || !hasBillingRoleAccess;

  const skipFetchingJwt = skipFetchingBase || !hasJwtReadRoleAccess;

  useAutoconnect();

  useBalance({ skipFetching: skipFetchingBilling });
  useMyBundles({ skipFetching: skipFetchingBilling });

  useCheckChangedSignupUserSettingsAndUpdate();
  useJwtManagerInitializer({ skipFetching: skipFetchingJwt });

  usePremiumStatusSubscription();

  useBlockchainsLoader();
};
