import { Skeleton } from '@mui/material';
import { BlueDot } from '../BlueDot';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  allRequestsTitle: string;
  isLoading: boolean;
  requestsTitle: string;
  title: string;
}

export const Header = ({
  allRequestsTitle,
  isLoading,
  requestsTitle,
  title,
}: HeaderProps) => {
  const { classes } = useHeaderStyles();

  const requests = isLoading ? (
    <Skeleton width={130} height={24} variant="text" />
  ) : (
    requestsTitle
  );

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.requests}>
        <div className={classes.detailedRequests}>
          <BlueDot />
          {requests}
        </div>
        <div className={classes.detailedRequests}>{allRequestsTitle}</div>
      </div>
    </div>
  );
};
