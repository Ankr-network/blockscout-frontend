import { makeStyles } from 'tss-react/mui';

export const useActionsButtonStyles = makeStyles()(theme => ({
  root: {
    paddingLeft: theme.spacing(4),
  },
  button: {
    '& > svg': {
      color: theme.palette.text.secondary,
    },
  },
}));
