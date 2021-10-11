import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LOGO_WIDTH = 50;
const LOGO_MARGIN = 15;

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
  top: { display: 'flex', marginBottom: theme.spacing(2) },
  logo: {
    width: LOGO_WIDTH,
    marginRight: LOGO_MARGIN,
  },
  title: {
    marginBottom: theme.spacing(1),
    transition: 'color 0.2s',
  },
  right: {
    maxWidth: `calc(100% - ${LOGO_WIDTH}px - ${LOGO_MARGIN}px)`,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginLeft: theme.spacing(1),
    border: '1px solid rgba(31, 34, 38, 0.1)',
    borderRadius: 18,
    lineHeight: 1,
    padding: '4px 6px',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(1.5),
  },
}));
