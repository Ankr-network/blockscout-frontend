import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useReminderDialogStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      marginTop: theme.spacing(-9),
    },
    title: {
      textAlign: 'center',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7.5),
    },
    content: {
      fontSize: 20,
      lineHeight: '28px',
      textAlign: 'center',
      marginBottom: theme.spacing(10),
      color: theme.palette.grey['500'],
    },
    button: {
      marginBottom: theme.spacing(3),
      color: isLightTheme ? undefined : theme.palette.background.paper,

      '&:hover': {
        color: theme.palette.common.white,
      },
    },
  }),
);
