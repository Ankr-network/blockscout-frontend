import { ECryptoDepositStepStatus } from 'modules/billing/types';

import { IApprovalAttributeProps, IFullApprovalAttributeProps } from '../types';

export const hasFullApproval = (
  props: IApprovalAttributeProps,
): props is IFullApprovalAttributeProps =>
  typeof props.approvedAmount === 'number' &&
  props.approvedAmount > 0 &&
  props.status === ECryptoDepositStepStatus.Complete;
