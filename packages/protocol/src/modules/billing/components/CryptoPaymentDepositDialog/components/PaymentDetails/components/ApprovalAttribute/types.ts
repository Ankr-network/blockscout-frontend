import {
  ECryptoDepositStepStatus,
  ECurrency,
  ENetwork,
  IFeeDetails,
} from 'modules/billing/types';

export interface ICommonApprovalAttributeProps {
  amount: number;
  currency: ECurrency;
  error?: string;
  network: ENetwork;
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
