import { EBlockchain } from 'multirpc-sdk';

import {
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/billing/types';

export interface ICommonApprovalAttributeProps {
  amount: number;
  approvedAmount?: number;
  currency: ECurrency;
  error?: string;
  network: EBlockchain;
  status?: ECryptoDepositStepStatus;
}

export interface INoApprovalAttributeProps
  extends ICommonApprovalAttributeProps {
  feeDetails: IFeeDetails;
}

export interface IPartialApprovalAttributeProps
  extends ICommonApprovalAttributeProps {
  feeDetails: IFeeDetails;
  approvedAmount: number;
}

export interface IFullApprovalAttributeProps
  extends ICommonApprovalAttributeProps {
  approvedAmount: number;
}

export interface IApprovalAttributeProps extends ICommonApprovalAttributeProps {
  feeDetails?: IFeeDetails;
  approvedAmount?: number;
}
