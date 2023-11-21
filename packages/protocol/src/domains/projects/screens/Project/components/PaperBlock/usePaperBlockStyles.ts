import { makeStyles } from 'tss-react/mui';

export const usePaperBlockStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(8),
    backgroundImage: 'none',
    borderRadius: 20,
  },
}));
