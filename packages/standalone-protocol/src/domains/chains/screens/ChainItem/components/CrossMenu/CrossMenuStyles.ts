import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useCrossMenuStyles = makeStyles<Theme>(theme => ({
  dropMenu: {
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 200,
    display: 'none',
    border: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  root: {
    width: 60,
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  open: {
    display: 'block',
    width: `calc(100% - 20px)`,
    paddingBottom: 0,
    '& $menu': {
      left: 20,
    },
    '& $name': {
      display: 'block',
      left: 40,
      fontSize: 18,
      fontWeight: 600,
    },
    '& $item': {
      width: 'auto',
      marginBottom: 12,
    },
    '&& $item svg': {
      width: 28,
      height: 28,
    },
    '& $logo': {
      opacity: 1,
    },
    '& $protocol': {
      display: 'flex',
    },
    '& $desc': {
      display: 'inline-block',
      position: 'static',
      borderRadius: 0,
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
  menu: {
    height: 432,
    position: 'fixed',
    top: `calc(50% - 33px)`,
    marginTop: -216,
    '@media (max-height: 500px)': {
      top: 0,
      marginTop: 0,
      height: `calc(100vh - 66px)`,
      overflow: 'auto',
      '& $name': {
        position: 'fixed',
      },
    },
  },
  item: {
    width: 60,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 0',
    position: 'relative',
    '&:hover $name': {
      display: 'block',
    },
    '&:hover svg': {
      width: 36,
      height: 36,
    },
    '&:hover $logo': {
      opacity: 1,
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.4,
    '& svg': {
      width: 24,
      height: 24,
      borderRadius: '50%',
    },
  },
  current: {
    opacity: 1,
    '& svg': {
      width: 36,
      height: 36,
    },
  },
  name: {
    fontSize: 19,
    lineHeight: 1,
    borderRadius: 8,
    padding: theme.spacing(1, 1.5),
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: 6,
    left: 62,
    backgroundColor: theme.palette.background.default,
    display: 'none',
  },
  protocol: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    width: 48,
    padding: '18px 0',
    margin: '0 6px',
    borderTop: `1px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    '&:hover $desc': {
      display: 'inline',
    },
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - 40px)`,
      boxSizing: 'border-box',
      textAlign: 'left',
      margin: '0 20px',
    },
  },
  desc: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 18,
    display: 'none',
    opacity: 0.8,
    whiteSpace: 'nowrap',
    borderRadius: 8,
    padding: theme.spacing(1, 1.5),
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    top: 6,
    left: 50,
  },
}));
