import { IApprovalAttributeProps, INoApprovalAttributeProps } from '../types';

export const hasNoApproval = (
  props: IApprovalAttributeProps,
): props is INoApprovalAttributeProps =>
  !props.approvedAmount &&
  typeof props.feeDetails === 'object' &&
  props.feeDetails !== null;
