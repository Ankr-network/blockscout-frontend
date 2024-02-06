import { makeStyles } from 'tss-react/mui';

export const useAccessDeniedDialogStyles = makeStyles()(
  (theme) => ({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    description: {
      textAlign: 'center',
      marginBottom: theme.spacing(8),
    },
  }),
);
