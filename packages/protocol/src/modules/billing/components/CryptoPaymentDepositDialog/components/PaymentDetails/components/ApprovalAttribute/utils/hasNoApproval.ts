import { IApprovalAttributeProps, INoApprovalAttributeProps } from '../types';

export const hasNoApproval = (
  props: IApprovalAttributeProps,
): props is INoApprovalAttributeProps =>
  typeof props.approvedAmount === 'undefined' &&
  typeof props.feeDetails === 'object' &&
  props.feeDetails !== null;
