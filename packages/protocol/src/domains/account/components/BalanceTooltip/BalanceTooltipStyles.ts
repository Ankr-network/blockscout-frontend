import { makeStyles } from 'tss-react/mui';

export const useBalanceTooltipStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
}));
