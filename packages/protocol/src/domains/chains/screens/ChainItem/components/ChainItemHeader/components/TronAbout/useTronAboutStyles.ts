import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTronAboutStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(3.75),
  },
  about: {
    fontWeight: 400,
    fontSize: 17,
    lineHeight: '24px',
  },
  link: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: theme.palette.primary.main,
    marginLeft: '1em',
    '&&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
