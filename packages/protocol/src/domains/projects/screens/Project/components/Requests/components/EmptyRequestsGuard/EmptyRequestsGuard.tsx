import { EmptyRequests } from '../EmptyRequests';
import { RequestsSkeleton } from '../RequestsSkeleton';

export interface EmptyRequestsProps<T> {
  children: JSX.Element;
  data: T;
  isLoading?: boolean;
}

export const EmptyRequestsGuard = <T extends Array<any>>({
  children,
  data,
  isLoading,
}: EmptyRequestsProps<T>) => {
  if (isLoading) {
    return <RequestsSkeleton />;
  }

  if (data.length === 0) {
    return <EmptyRequests />;
  }

  return children;
};
