import {
  IApprovalAttributeProps,
  IPartialApprovalAttributeProps,
} from '../types';

export const hasPartialApproval = (
  props: IApprovalAttributeProps,
): props is IPartialApprovalAttributeProps =>
  typeof props.approvedAmount === 'number' &&
  typeof props.feeDetails === 'object' &&
  props.approvedAmount !== 0 &&
  props.feeDetails !== null;
