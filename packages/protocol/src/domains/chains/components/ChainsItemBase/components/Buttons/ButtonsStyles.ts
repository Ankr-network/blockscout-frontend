import { makeStyles } from 'tss-react/mui';

export const useButtonsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',

    marginTop: theme.spacing(3),
  },
  button: {
    width: '100%',

    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
}));
