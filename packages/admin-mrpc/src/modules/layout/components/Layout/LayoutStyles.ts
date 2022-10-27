import { makeStyles } from 'tss-react/mui';

const drawerWidth = 0;

export const useLayoutStyles = makeStyles()(theme => {
  return {
    wrapper: {
      display: 'flex',
      position: 'static',
      background: theme.palette.background.default,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      background: theme.palette.background.default,
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#1F2226',
    },
    navLink: {
      width: '100%',
      justifyContent: 'flex-start',
      border: 'none',
      borderRadius: 0,
      color: 'white',
      fontWeight: 600,
      textTransform: 'none',
      fontSize: 16,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
    navLinkActive: {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
    toolbar: {
      width: '100%',
      marginBottom: theme.spacing(6),
      minHeight: theme.mixins.toolbar.minHeight,
    },
    content: {
      flexGrow: 1,
      background: theme.palette.background.default,
      minHeight: '100vh',
      paddingBottom: theme.spacing(4),
    },
  };
});
