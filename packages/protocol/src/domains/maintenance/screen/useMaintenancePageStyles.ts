import { makeStyles } from 'tss-react/mui';

export const useMaintenancePageStyles = makeStyles()(() => ({
  maintenanceBody: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    textAlign: 'center',
  },
}));
