import { makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 0;

export const useLayoutStyles = makeStyles((theme: Theme) => ({
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(6),
  },
  content: {
    flexGrow: 1,
    background: theme.palette.background.default,
    minHeight: '100vh',
    paddingBottom: theme.spacing(4),
  },
}));
