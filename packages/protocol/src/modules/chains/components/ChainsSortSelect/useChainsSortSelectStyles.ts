import { makeStyles } from 'tss-react/mui';

export const useChainsSortSelectStyles = makeStyles()(theme => ({
  sortSelectRoot: {
    height: 32,
  },
  sortIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  sortValue: {
    display: 'flex',
    alignItems: 'center',
  },
}));
