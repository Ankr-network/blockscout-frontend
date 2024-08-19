import { makeStyles } from 'tss-react/mui';

export const useWidgetStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(8),

    borderRadius: 20,

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),

      borderRadius: 12,
    },
  },
}));
