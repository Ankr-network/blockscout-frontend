import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { removeAvoidGuestTeamInvitationDialog } from 'domains/userSettings/screens/TeamInvitation/utils/teamInvitationUtils';
import { useAutologin } from 'hooks/useAutologin';
import { useBalance } from 'domains/account/hooks/useBalance';
import { useBlockchainsLoader } from 'hooks/useBlockchainsLoader';
import { useBundlePaymentPlans } from 'domains/account/hooks/useBundlePaymentPlans';
import { useCheckChangedSignupUserSettingsAndUpdate } from 'hooks/useCheckChangedSignupUserSettingsAndUpdate';
import { useEnterpriseStatusFetch } from 'domains/auth/hooks/useEnterpriseStatus';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useJwtManagerInitializer } from 'domains/jwtToken/hooks/useJwtManagerInitializer';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';
import { useMyBundlesStatus } from 'domains/account/hooks/useMyBundlesStatus';
import { useMySubscriptions } from 'domains/account/hooks/useMySubscriptions';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { usePaymentOptions } from 'modules/payments/hooks/usePaymentOptions';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';
import { useRedirectToTeamsSettings } from 'modules/groups/hooks/useRedirectToTeamsSettings';
import { useUserGroupFetchCreationAllowanceQuery } from 'domains/userGroup/actions/fetchGroupCreationAllowance';

export const useInitialization = (isLoggedIn: boolean) => {
  const hasBillingRoleAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });

  const hasJwtReadRoleAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  const shouldInitialize = !isReactSnap && isLoggedIn;

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseStatusFetch(shouldInitialize);

  const skipFetchingBase =
    isReactSnap ||
    !isLoggedIn ||
    isEnterpriseClient ||
    isEnterpriseStatusLoading;

  const skipFetchingBilling = skipFetchingBase || !hasBillingRoleAccess;

  const skipFetchingJwt = skipFetchingBase || !hasJwtReadRoleAccess;

  useAutologin();

  useBalance({ skipFetching: skipFetchingBilling });
  useMyBundles({ skipFetching: skipFetchingBilling });
  useMyBundlesStatus({ skipFetching: skipFetchingBilling });
  useMySubscriptions({ skipFetching: skipFetchingBilling });
  useBundlePaymentPlans({ skipFetching: skipFetchingBilling });

  useCheckChangedSignupUserSettingsAndUpdate();
  useJwtManagerInitializer({ skipFetching: skipFetchingJwt });

  usePremiumStatusSubscription();

  useBlockchainsLoader();

  useUserGroupFetchCreationAllowanceQuery(undefined, {
    skip: !shouldInitialize,
  });

  usePaymentOptions({ skipFetching: !isLoggedIn });

  useRedirectToTeamsSettings();

  useOnMount(() => {
    removeAvoidGuestTeamInvitationDialog();
  });
};
