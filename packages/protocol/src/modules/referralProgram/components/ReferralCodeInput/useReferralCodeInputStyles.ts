import { makeStyles } from 'tss-react/mui';

export const useReferralCodeInputStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },
  inputRoot: {
    paddingLeft: theme.spacing(4),
  },
}));
