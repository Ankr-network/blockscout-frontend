import { makeStyles } from 'tss-react/mui';

const name = 'BonusPurposeTable';

export const useBonusPurposeTableStyles = makeStyles({ name })(theme => ({
  headCell: {
    [theme.breakpoints.down('sm')]: {
      height: 52,
    },
  },
  bodyCell: {
    [theme.breakpoints.down('sm')]: {
      height: 66,
    },
  },
}));
