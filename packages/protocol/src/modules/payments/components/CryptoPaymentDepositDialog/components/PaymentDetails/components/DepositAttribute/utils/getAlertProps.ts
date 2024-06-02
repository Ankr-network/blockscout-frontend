import { ECryptoDepositStepStatus } from 'modules/billing/types';

import { IAlertProps } from '../../../../../../Alert';

export interface IGetAlertPropsParams {
  error?: string;
  status?: ECryptoDepositStepStatus;
}

export const getAlertProps = ({
  error,
  status,
}: IGetAlertPropsParams): IAlertProps | undefined => {
  const hasErrorStatus = status === ECryptoDepositStepStatus.Error;

  if (hasErrorStatus && error) {
    return { text: error, hasIcon: true, severity: 'error' };
  }

  return undefined;
};
