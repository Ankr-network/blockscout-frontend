import { makeStyles } from 'tss-react/mui';

export const useLoadingStateStyles = makeStyles({ name: 'LoadingState' })(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'hidden',
      height: 345,
      padding: theme.spacing(0, 4),
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
      width: '100%',
      padding: theme.spacing(4, 0),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    textWrapper: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      gap: theme.spacing(1),
    },
    icon: {
      height: 40,
      width: 40,
      minWidth: 40,
    },
    title: {
      height: 19,
      width: 150,
    },
    description: {
      height: 19,
      width: '100%',
    },
  }),
);
