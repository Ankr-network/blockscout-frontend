import { makeStyles } from 'tss-react/mui';

export const useProjectRequestsActivityStyles = makeStyles<boolean>()(
  (theme, isMoreRequestsTodayThanYesterday) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      color: theme.palette.grey[600],
    },
    count: {
      color: theme.palette.grey[900],
      margin: theme.spacing(0, 2),
    },
    percent: {
      color: isMoreRequestsTodayThanYesterday
        ? theme.palette.success.main
        : theme.palette.error.main,
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: 14,
      color: isMoreRequestsTodayThanYesterday
        ? theme.palette.success.main
        : theme.palette.error.main,
    },
  }),
);
