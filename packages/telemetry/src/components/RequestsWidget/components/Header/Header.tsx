import { Skeleton } from '@mui/material';
import { BlueDot } from '../BlueDot';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  allRequestsLoading?: boolean;
  allRequestsTitle: string;
  isLoading: boolean;
  requestsTitle: string;
  title: string;
}

const requestsSkeleton = <Skeleton width={150} height={24} variant="text" />;

export const Header = ({
  allRequestsLoading,
  allRequestsTitle,
  isLoading,
  requestsTitle,
  title,
}: HeaderProps) => {
  const { classes } = useHeaderStyles();

  const requests = isLoading ? requestsSkeleton : requestsTitle;

  const allRequests = allRequestsLoading ? requestsSkeleton : allRequestsTitle;

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.requests}>
        <div className={classes.detailedRequests}>
          <BlueDot />
          {requests}
        </div>
        <div className={classes.detailedRequests}>{allRequests}</div>
      </div>
    </div>
  );
};
