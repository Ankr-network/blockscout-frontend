import { makeStyles } from 'tss-react/mui';

export const useAddChainsButtonStyles = makeStyles()(theme => ({
  root: {
    marginLeft: 'auto',
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
  },
  startIcon: {
    marginRight: theme.spacing(1),
  },
}));
