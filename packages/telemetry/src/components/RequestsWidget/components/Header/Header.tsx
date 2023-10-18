import { BlueDot } from '../BlueDot';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  requestsTitle: string;
  allRequestsTitle: string;
  title: string;
}

export const Header = ({
  allRequestsTitle,
  requestsTitle,
  title,
}: HeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.requests}>
        <div className={classes.detailedRequests}>
          <BlueDot />
          {requestsTitle}
        </div>
        <div className={classes.detailedRequests}>{allRequestsTitle}</div>
      </div>
    </div>
  );
};
