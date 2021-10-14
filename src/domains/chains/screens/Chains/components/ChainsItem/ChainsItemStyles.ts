import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(2.5),
    transition: 'box-shadow 0.2s',

    '&:hover': {
      boxShadow:
        '0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)',

      '& $title': {
        color: theme.palette.primary.main,
      },
    },
  },
  mainInfo: {
    marginBottom: theme.spacing(2),
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(1.5),
  },
  links: {
    '& $copyItem:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  copyItem: {},
}));
