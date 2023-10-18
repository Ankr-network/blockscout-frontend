import { makeStyles } from 'tss-react/mui';

export const useUserEndpointDialogStyles = makeStyles()(theme => ({
  title: {
    marginBottom: theme.spacing(0),
  },

  spinnerWrapper: {
    height: 298,
  },
  infoCard: {
    width: 'auto',
    padding: 0,
    background: theme.palette.background.paper,
  },
}));
