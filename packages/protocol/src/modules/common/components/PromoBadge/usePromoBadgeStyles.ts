import { makeStyles } from 'tss-react/mui';

export const usePromoBadgeStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(0.5, 2),

    borderRadius: 8,

    backgroundColor: theme.palette.purple.light,

    color: theme.palette.purple.main,
  },
}));
