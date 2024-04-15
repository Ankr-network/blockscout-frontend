import { makeStyles } from 'tss-react/mui';

export const useCopyButtonStyles = makeStyles()(theme => ({
  root: {
    border: 'unset',

    '&&': {
      padding: theme.spacing(2),
    },
  },
  copyIcon: {
    color: theme.palette.text.secondary,
  },
}));
