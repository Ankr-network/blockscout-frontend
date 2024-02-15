import { makeStyles } from 'tss-react/mui';

export const useCopyButtonStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.secondary,
    border: 'unset',

    '&&': {
      padding: theme.spacing(2),
    },
  },
}));
