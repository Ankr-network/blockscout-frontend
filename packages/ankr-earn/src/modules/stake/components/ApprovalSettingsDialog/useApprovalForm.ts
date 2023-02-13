import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { ZERO } from '@ankr.com/staking-sdk';

import { useDialog } from 'modules/common/hooks/useDialog';

import { IApprovalSettingsFormValues } from './types';

interface IApprovalSettingDialogArgs {
  allowance?: BigNumber;
  amount?: BigNumber;
  onApproveSubmit?: (amount: BigNumber) => void;
  onApprovalSettingsFormSubmit?: (values: IApprovalSettingsFormValues) => void;
}

interface IApprovalSettingDialog {
  isApproved: boolean;
  notZero: boolean;
  isOpened: boolean;
  onClose: () => void;
  onOpen: () => void;
  onApproveClick: () => void;
  onApprovalSettingsSubmit?: (values: IApprovalSettingsFormValues) => void;
}

export const useApprovalForm = ({
  allowance = ZERO,
  amount = ZERO,
  onApproveSubmit,
  onApprovalSettingsFormSubmit,
}: IApprovalSettingDialogArgs): IApprovalSettingDialog => {
  const isApproved = allowance.isGreaterThanOrEqualTo(amount);

  const notZero = ZERO.isLessThan(amount);

  const { isOpened, onClose, onOpen } = useDialog();

  const onApproveClick = useCallback(
    () => onApproveSubmit && onApproveSubmit(amount),
    [amount, onApproveSubmit],
  );

  const onApprovalSettingsSubmit = onApprovalSettingsFormSubmit
    ? (form: IApprovalSettingsFormValues) => {
        if (onApprovalSettingsFormSubmit) {
          onApprovalSettingsFormSubmit(form);
          onClose();
        }
      }
    : undefined;

  return {
    isApproved,
    notZero,
    isOpened,
    onClose,
    onOpen,
    onApproveClick,
    onApprovalSettingsSubmit,
  };
};
