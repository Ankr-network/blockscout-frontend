import { makeStyles } from 'tss-react/mui';

export const usePrivateChainRequestsWidgetStyles = makeStyles()(theme => ({
  totalRequestsWidget: {
    marginBottom: theme.spacing(6),
    padding: theme.spacing(6, 8),
  },
}));
