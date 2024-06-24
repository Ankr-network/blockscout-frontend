import { useAppSelector } from 'store/useAppSelector';
import { selectHasFreemium } from 'domains/auth/store';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { IChargingModelData } from 'modules/payments/types';

export const useFreemiumChargingModel = (
  currentChargingModel: IChargingModelData,
) => {
  const isFreePremium = useAppSelector(selectHasFreemium);
  const hasAccountStatusAccess = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });
  const hasBillingAccess = useGuardUserGroup({
    blockName: BlockWithPermission.Billing,
  });
  const shouldShowFreemium =
    isFreePremium &&
    hasAccountStatusAccess &&
    hasBillingAccess &&
    currentChargingModel?.balance?.balanceInRequests === 0;

  return { shouldShowFreemium };
};
