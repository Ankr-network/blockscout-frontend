import { makeStyles } from 'tss-react/mui';

export const useLocationsWidgetStyles = makeStyles()(theme => {
  const offsetValue = theme.spacing(5);

  return {
    root: {
      display: 'flex',
      flexDirection: 'column',

      backgroundImage: 'none',
      padding: theme.spacing(5, 2, 5, 5),
      paddingBottom: 0,
      overflow: 'auto',
      position: 'relative',

      borderRadius: theme.spacing(7.5),

      '&:after': {
        content: '""',
        display: 'block',
        position: 'sticky',
        left: 0,
        bottom: -1,
        width: '100%',
        height: offsetValue,
        backgroundColor: theme.palette.background.paper,
      },
    },
    title: {
      marginBottom: theme.spacing(2),
      paddingRight: theme.spacing(3),
    },
    isHidden: {
      [theme.breakpoints.up('xl')]: {
        display: 'none',
      },

      /* for wide screens */
      '@media screen and (min-height: 900px)': {
        display: 'flex',
      },
    },
    details: {
      display: 'flex',
      color: theme.palette.text.secondary,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    locationItem: {
      display: 'flex',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      borderTop: `1px solid ${theme.palette.grey[100]}`,
      alignItems: 'center',

      '&:nth-child(2)': {
        [theme.breakpoints.up('xl')]: {
          borderTop: 'none',
        },

        /* for wide screens */
        '@media screen and (min-height: 900px)': {
          borderTop: `1px solid ${theme.palette.grey[100]}`,
        },
      },
    },
    checkIcon: {
      color: theme.palette.primary.main,
      width: 16,
      height: 16,
    },
  };
});
