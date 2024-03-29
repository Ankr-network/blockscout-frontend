import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles()(theme => ({
  widgetTitle: {
    marginBottom: theme.spacing(8),
    color: theme.palette.text.primary,
  },
}));
