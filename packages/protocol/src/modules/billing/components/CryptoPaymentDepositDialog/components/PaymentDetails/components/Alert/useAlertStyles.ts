import { makeStyles } from 'tss-react/mui';

export const useAlertStyles = makeStyles()(theme => ({
  text: {
    color: theme.palette.grey[900],
  },
}));
