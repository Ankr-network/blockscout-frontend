import { makeStyles } from 'tss-react/mui';

export const useTableWidgetStyles = makeStyles()(theme => {
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

      /* TODO: reuse this styles in other scrollable widgets */
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
      marginBottom: theme.spacing(4),
      paddingRight: theme.spacing(3),
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      gap: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.grey[100]}`,
    },
    rowHeader: {
      color: theme.palette.text.secondary,
      borderTop: `none`,
    },
    longText: {
      overflow: 'hidden',

      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };
});
