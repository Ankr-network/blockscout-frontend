import { makeStyles } from 'tss-react/mui';

export const useChainCellStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    cursor: 'pointer',
  },
  checkbox: {
    marginRight: theme.spacing(2),
  },
}));
