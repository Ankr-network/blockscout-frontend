import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChainCardStyles = makeStyles<
  void,
  'button' | 'information' | 'title'
>()((theme, _params, classes) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 30,
    padding: theme.spacing(5),
    minHeight: theme.spacing(52),
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      [`& .${classes.button}`]: {
        opacity: 1,
      },

      [`& .${classes.information}`]: {
        bottom: 104,
      },

      [`& .${classes.title}`]: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        textOverflow: 'ellipsis',
      },
    },
  },
  mainInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },
  info: {
    overflow: 'hidden',
  },
  title: {
    color: theme.palette.text.primary,
    display: 'block',
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    wordBreak: 'break-all',
  },
  subtitle: {
    color: theme.palette.grey[isLightTheme(theme) ? 800 : 500],
    display: 'block',
    fontSize: 14,
    lineHeight: '20.02px',
    fontWeight: 400,
    marginBottom: theme.spacing(1.5),
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  icon: {
    width: 80,
    height: 80,
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
    '&&': {
      fontSize: 12,
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
  button: {
    opacity: 0,
    transition: 'opacity 0.5s ease 0s',

    [theme.breakpoints.down('md')]: {
      opacity: 1,
    },
  },
}));
