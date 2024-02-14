import { makeStyles } from 'tss-react/mui';

export const useChainsSortSelectStyles = makeStyles()(theme => ({
  root: {
    border: `2px solid ${theme.palette.grey[300]}`,
  },
}));
