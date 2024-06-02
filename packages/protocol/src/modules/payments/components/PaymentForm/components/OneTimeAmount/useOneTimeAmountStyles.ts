import { makeStyles } from 'tss-react/mui';

export const useOneTimeAmountStyles = makeStyles()(theme => ({
  oneTimeAmountRoot: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));
