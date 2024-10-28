import { makeStyles } from 'tss-react/mui';

export const useEmptyNotificationsStyles = makeStyles({ name: 'Empty' })(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.text.secondary,
    },
    iconWrapper: {
      height: 60,
      width: 60,
      backgroundColor: theme.palette.primary.light,
      borderRadius: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(5),
    },
    icon: {
      height: 24,
      width: 24,
    },
  }),
);
