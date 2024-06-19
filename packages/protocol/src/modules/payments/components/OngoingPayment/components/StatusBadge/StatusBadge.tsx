import { ErrorBadge } from '../ErrorBadge';
import { PendingBadge } from '../PendingBadge';
import { SuccessBadge } from '../SuccessBadge';
import { WaitingBadge } from '../WaitingBadge';

export interface IStatusBadgeProps {
  isConfirming: boolean;
  isErrored: boolean;
  isSuccessful: boolean;
}

export const StatusBadge = ({
  isConfirming,
  isErrored,
  isSuccessful,
}: IStatusBadgeProps) => {
  if (isErrored) {
    return <ErrorBadge />;
  }

  if (isSuccessful) {
    return <SuccessBadge />;
  }

  if (isConfirming) {
    return <WaitingBadge />;
  }

  return <PendingBadge />;
};
