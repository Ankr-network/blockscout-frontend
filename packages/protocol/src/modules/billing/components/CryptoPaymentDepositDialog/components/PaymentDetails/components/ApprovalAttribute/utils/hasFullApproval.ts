import { IApprovalAttributeProps, IFullApprovalAttributeProps } from '../types';

export const hasFullApproval = (
  props: IApprovalAttributeProps,
): props is IFullApprovalAttributeProps =>
  typeof props.approvedAmount === 'number' &&
  typeof props.feeDetails === 'undefined' &&
  props.approvedAmount > 0;
