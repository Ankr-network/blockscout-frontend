import { makeStyles } from 'tss-react/mui';

export const useMethodCallsWidgetStyles = makeStyles()(theme => {
  const offsetValue = theme.spacing(6);

  return {
    root: {
      borderRadius: 30,
      backgroundImage: 'none',
      padding: offsetValue,
      paddingBottom: 0,
      overflow: 'hidden',
      position: 'relative',

      /* TODO: reuse this styles in other scrollable widgets */
      '&:after': {
        content: '""',
        display: 'block',
        position: 'sticky',
        left: 0,
        bottom: 0,
        width: '100%',
        height: offsetValue,
        backgroundColor: theme.palette.background.paper,
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chartWrapper: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
    },
    chartElement: {
      width: '50%',
    },
    chart: {
      width: 160,
      height: 160,
    },

    amount: {
      fontSize: 20,
    },
    stats: {
      display: 'flex',
      flexDirection: 'column',
    },
    statsLabel: {
      display: 'inline-flex',
      marginBottom: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    row: {
      display: 'flex',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      gap: theme.spacing(1),
      borderTop: `1px solid ${theme.palette.grey[100]}`,
    },
    methodCell: {
      width: '65%',
      display: 'flex',
      alignItems: 'center',
    },
    dot: {
      display: 'inline-flex',
      width: 8,
      height: 8,
      borderRadius: '50%',
      marginRight: theme.spacing(1),
      flexShrink: 0,
    },
    methodName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    countCell: {
      width: '60px',
    },
    usageCell: {
      marginLeft: 'auto',
      width: '40px',
    },
    rowHeader: {
      color: theme.palette.text.secondary,
      borderTop: `none`,
    },
  };
});
