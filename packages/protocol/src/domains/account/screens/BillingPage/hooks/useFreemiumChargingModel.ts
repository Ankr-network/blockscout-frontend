import { useAppSelector } from 'store/useAppSelector';
import { selectHasFreemium } from 'domains/auth/store';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

export const useFreemiumChargingModel = () => {
  const isFreePremium = useAppSelector(selectHasFreemium);
  const hasAccountStatusAccess = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });
  const hasBillingAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });
  const shouldShowFreemium =
    isFreePremium && hasAccountStatusAccess && hasBillingAccess;

  return { shouldShowFreemium };
};
