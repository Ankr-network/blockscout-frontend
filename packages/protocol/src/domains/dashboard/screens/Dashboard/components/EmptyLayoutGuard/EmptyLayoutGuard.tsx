import { EmptyLayout } from '../EmptyLayout';

export interface EmptyLayoutGuardProps {
  children: JSX.Element;
  hasPlaceholder: boolean;
}

export const EmptyLayoutGuard = ({
  children,
  hasPlaceholder,
}: EmptyLayoutGuardProps) => {
  if (hasPlaceholder) {
    return <EmptyLayout />;
  }

  return children;
};
