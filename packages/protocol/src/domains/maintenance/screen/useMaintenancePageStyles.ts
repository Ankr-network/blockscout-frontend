import { makeStyles } from 'tss-react/mui';

export const useMaintenancePageStyles = makeStyles<boolean>()(
  (theme, isLight) => ({
    maintenanceBody: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      textAlign: 'center',
      color: isLight ? theme.palette.text.primary : theme.palette.common.white,
    },
  }),
);
