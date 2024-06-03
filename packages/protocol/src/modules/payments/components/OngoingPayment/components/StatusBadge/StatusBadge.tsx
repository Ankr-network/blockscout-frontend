import { ErrorBadge } from '../ErrorBadge';
import { PendingBadge } from '../PendingBadge';
import { SuccessBadge } from '../SuccessBadge';

export interface IStatusBadgeProps {
  isErrored: boolean;
  isSuccessful: boolean;
}

export const StatusBadge = ({ isErrored, isSuccessful }: IStatusBadgeProps) => {
  if (isErrored) {
    return <ErrorBadge />;
  }

  if (isSuccessful) {
    return <SuccessBadge />;
  }

  return <PendingBadge />;
};
