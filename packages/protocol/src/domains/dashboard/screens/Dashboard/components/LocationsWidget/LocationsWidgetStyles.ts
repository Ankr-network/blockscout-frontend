import { makeStyles } from 'tss-react/mui';

export const useLocationsWidgetStyles = makeStyles()(theme => {
  const offsetValue = theme.spacing(6);

  return {
    root: {
      backgroundImage: 'none',
      padding: offsetValue,
      paddingBottom: 0,
      overflow: 'auto',
      position: 'relative',

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
    },
    details: {
      display: 'flex',
      color: theme.palette.text.secondary,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    locationItem: {
      display: 'flex',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.grey[100]}`,
      alignItems: 'center',
    },
    checkIcon: {
      color: theme.palette.primary.main,
      width: 16,
      height: 16,
    },
  };
});
