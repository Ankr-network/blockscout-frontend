import { makeStyles } from 'tss-react/mui';

export const useGroupsSelectorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
  },
}));
