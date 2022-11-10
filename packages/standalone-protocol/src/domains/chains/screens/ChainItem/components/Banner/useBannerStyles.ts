import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MENU_WIDTH } from '../CrossMenu/CrossMenuStyles';

export const RATE_LIMIT_BANNER_HEIGHT = 88;

export const useBannerStyles = makeStyles<Theme>(theme => ({
  root: {
    width: `calc(100% - ${MENU_WIDTH}px)`,
    minHeight: RATE_LIMIT_BANNER_HEIGHT,
    position: 'fixed',
    top: 0,
    left: MENU_WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: '100%',
      left: 0,
      fontSize: 18,
    },
    background: 'linear-gradient(90deg, #A169F6 0%, #70EB9E 100%)',
  },
  content: {
    fontSize: 14,
    color: theme.palette.common.black,
    marginLeft: theme.spacing(3),
    fontWeight: 400,
    lineHeight: '28px',
    maxWidth: 620,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
    },
    '& a': {
      fontWeight: 700,
      lineHeight: '28px',
      textDecoration: 'underline',
    },
  },
}));
