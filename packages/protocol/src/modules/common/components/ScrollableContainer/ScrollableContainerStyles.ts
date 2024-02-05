import { makeStyles } from 'tss-react/mui';

export const useScrollableContainerStyles = makeStyles()(theme => ({
  view: {
    paddingRight: theme.spacing(3),
  },
}));
