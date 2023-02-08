import BigNumber from 'bignumber.js';

import {
  ApprovalOption,
  IApprovalSettingsFormValues,
} from '../ApprovalSettingsDialog/types';

export interface IUseApprovalForm {
  isApproveLoading: boolean;
  allowance: BigNumber;
  approvalSettingsMode: ApprovalOption;
  onApprovalSettingsFormSubmit: (form: IApprovalSettingsFormValues) => void;
  onApproveSubmit: (amount: BigNumber) => void;
}
