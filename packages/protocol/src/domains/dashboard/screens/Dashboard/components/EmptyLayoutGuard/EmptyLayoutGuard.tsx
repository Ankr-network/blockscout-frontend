import { EmptyLayout } from '../EmptyLayout';

export interface EmptyLayoutGuardProps<T> {
  children: JSX.Element;
  data: T;
}

export const EmptyLayoutGuard = <T extends Array<any>>({
  children,
  data,
}: EmptyLayoutGuardProps<T>) => {
  if (data.length === 0) {
    return <EmptyLayout />;
  }

  return children;
};
