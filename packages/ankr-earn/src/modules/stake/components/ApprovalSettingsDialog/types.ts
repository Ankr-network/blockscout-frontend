import { ReactText } from 'react';

export enum ApprovalOption {
  CURRENT = 'CURRENT',
  UNLIMITED = 'UNLIMITED',
  CUSTOM = 'CUSTOM',
}

export interface IApprovalSettingsFormValues {
  amount?: ReactText;
  type: ApprovalOption;
}
