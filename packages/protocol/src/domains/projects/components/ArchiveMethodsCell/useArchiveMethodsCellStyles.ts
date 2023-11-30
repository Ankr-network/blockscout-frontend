import { makeStyles } from 'tss-react/mui';

export const useArchiveMethodsCellStyles = makeStyles()(theme => ({
  checkIcon: {
    color: theme.palette.success.dark,
  },
  crossIcon: {
    color: theme.palette.grey[600],
  },
}));
