import { makeStyles } from 'tss-react/mui';

export const useButtonCopyStyles = makeStyles()(theme => ({
  root: {
    minWidth: 0,
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.text.primary,

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
