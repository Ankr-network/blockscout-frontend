import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { MAX_UINT256, ZERO } from 'modules/common/const';

import { ApprovalOption, IApprovalSettingsFormValues } from './types';

type TApproveCallback = (amount: BigNumber) => void;
type TApproveFormCallback = (params: IApprovalSettingsFormValues) => void;

interface IApprovalSettingsForm {
  onApprovalSettingsFormSubmit: (form: IApprovalSettingsFormValues) => void;
  approvalSettingsMode: ApprovalOption;
}

interface IApprovalSettingsFormProps {
  approve: TApproveCallback;
  allowance?: BigNumber;
}

export const useApprovalSettingsFormData = ({
  approve,
  allowance,
}: IApprovalSettingsFormProps): IApprovalSettingsForm => {
  const onApprovalSettingsFormSubmit = useCallback<TApproveFormCallback>(
    (params: IApprovalSettingsFormValues): void => {
      if (params.type === ApprovalOption.UNLIMITED) {
        approve(MAX_UINT256);
      } else if (params.type === ApprovalOption.CUSTOM) {
        const amount = params.amount
          ? new BigNumber(params.amount.toString())
          : ZERO;
        approve(amount);
      }
    },
    [approve],
  );

  const approvalSettingsMode = useMemo<ApprovalOption>(() => {
    if (allowance?.isGreaterThanOrEqualTo(MAX_UINT256.dividedBy(2))) {
      return ApprovalOption.UNLIMITED;
    }
    if (allowance?.isGreaterThan(ZERO)) {
      return ApprovalOption.CUSTOM;
    }
    return ApprovalOption.CURRENT;
  }, [allowance]);

  return {
    onApprovalSettingsFormSubmit,
    approvalSettingsMode,
  };
};
