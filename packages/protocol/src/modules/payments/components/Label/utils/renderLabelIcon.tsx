import { CircleCheck, Clock, Mark, OverlaySpinner } from '@ankr.com/ui';
import { ReactNode } from 'react';

import { ECryptoDepositStepStatus } from 'modules/payments/types';

const { Complete, Confirming, Error, Initializing, Pending } =
  ECryptoDepositStepStatus;

const labelIconsMap: Record<ECryptoDepositStepStatus, ReactNode> = {
  [Complete]: <CircleCheck color="success" size={20} />,
  [Initializing]: (
    <Clock size={20} sx={theme => ({ color: theme.palette.text.secondary })} />
  ),
  [Error]: <Mark color="error" size={20} />,
  [Pending]: <OverlaySpinner size={20} />,
  [Confirming]: <CircleCheck color="success" size={20} />,
};

export const renderLabelIcon = (status?: ECryptoDepositStepStatus) =>
  status ? labelIconsMap[status] : undefined;
