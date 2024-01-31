import { makeStyles } from 'tss-react/mui';

export const usePersonalAccountInfoCopyButtonStyles = makeStyles()(theme => ({
  root: {
    width: 40,
    minWidth: 'unset',

    color: theme.palette.text.secondary,

    '&&': {
      padding: theme.spacing(2),
    },
  },
}));
