import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useChainCardStyles = makeStyles<void, 'information' | 'title'>()(
  (theme, _params, classes) => ({
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
        boxShadow:
          '0px 2px 5px 0px rgba(31, 34, 38, 0.10), 0px 3px 15px 0px rgba(31, 34, 38, 0.10)',
        backgroundColor: theme.palette.background.paper,
        textDecoration: 'none',

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
      alignItems: 'center',
      position: 'relative',
      width: '100%',
    },
    info: {
      overflow: 'hidden',
    },
    title: {
      color: theme.palette.text.primary,
      display: 'flex',
      alignItems: 'center',
      wordBreak: 'break-all',
    },
    subtitle: {
      color: theme.palette.text.secondary,
      display: 'block',
      marginBottom: theme.spacing(1.5),
    },
    badge: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
    icon: {
      width: 48,
      height: 48,
      marginRight: theme.spacing(3),
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
    chip: {
      display: 'flex',
      alignItems: 'center',
      height: 20,
      marginLeft: theme.spacing(1),
    },
  }),
);
