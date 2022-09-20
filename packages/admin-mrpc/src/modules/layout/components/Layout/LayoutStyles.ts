import { makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 180;

export const useLayoutStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    position: 'static',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'flex-end',
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
}));
