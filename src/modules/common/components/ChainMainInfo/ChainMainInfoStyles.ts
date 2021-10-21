import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const LOGO_WIDTH = 50;
const LOGO_MARGIN = 15;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(2.5),
      borderBottom: `2px solid ${theme.palette.background.paper}`,
      marginBottom: theme.spacing(2.5),
    },
  },
  logo: {
    width: LOGO_WIDTH,
    marginRight: LOGO_MARGIN,
  },
  title: {
    marginBottom: 2,
    transition: 'color 0.2s',
  },
  right: {
    maxWidth: `calc(100% - ${LOGO_WIDTH}px - ${LOGO_MARGIN}px)`,
  },
}));
