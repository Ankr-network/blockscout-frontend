import { makeStyles } from 'tss-react/mui';

export const useAddProjectStyles = makeStyles()(theme => ({
  root: {
    width: theme.spacing(52),
    height: theme.spacing(21),
    borderRadius: 20,
    padding: theme.spacing(4.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderStyle: 'solid',
    color: theme.palette.text.primary,
    borderColor: theme.palette.grey[200],
    cursor: 'pointer',
    backgroundColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      flexShrink: 0,
    },

    '&:hover': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      backgroundColor: 'transparent',

      '& svg': {
        color: theme.palette.primary.main,
      },
    },
  },
  title: {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 700,
  },
  button: {
    minHeight: 20,
    minWidth: 20,
    width: 20,

    '& svg': {
      width: 16,
      height: 16,
    },
  },
}));
