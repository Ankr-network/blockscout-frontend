import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChainCardStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&&': {
      padding: theme.spacing(6),
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: 32,
    minHeight: 180,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',

    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  secondInfo: {
    width: '100%',
  },
  information: {
    color: theme.palette.grey[isLightTheme(theme) ? 800 : 500],
    display: 'inline-block',
    fontSize: 14,
    lineHeight: '20.02px',
    fontWeight: 400,
    position: 'absolute',
    width: 200,
    bottom: theme.spacing(5),
    transition: 'bottom 0.5s ease 0s',
    '&& button': {
      boxShadow: 'none',
    },

    [theme.breakpoints.down('md')]: {
      position: 'static',
      marginBottom: theme.spacing(2),
    },
  },
  timeSwitcher: {
    marginLeft: theme.spacing(1.5),

    '&&&': {
      fontSize: 12,
      borderRadius: 8,
      padding: theme.spacing(0.5, 2),
      border: `2px solid ${theme.palette.background.default}`,
    },
    '&:hover': {
      color: theme.palette.grey[600],
      backgroundColor: 'inherit',
    },
  },
  skeleton: {
    width: '100%',
    maxWidth: 140,
    marginTop: theme.spacing(1),
    height: 21,
    transform: 'none',
  },
}));
