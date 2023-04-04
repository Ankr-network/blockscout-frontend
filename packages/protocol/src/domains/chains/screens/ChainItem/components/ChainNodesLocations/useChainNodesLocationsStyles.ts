import { makeStyles } from 'tss-react/mui';

export const TABLE_WIDTH = 275;

export const useChainNodesLocationsStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(2 * 3.2),
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2 * 3.75),
  },
  title: {
    color: theme.palette.text.primary,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing(7.5),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  table: {
    maxWidth: TABLE_WIDTH,
    position: 'relative',
    top: -20,

    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
  mapContainer: {
    position: 'relative',
    width: `calc(100% - ${TABLE_WIDTH}px)`,

    '& path:focus': {
      outline: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
