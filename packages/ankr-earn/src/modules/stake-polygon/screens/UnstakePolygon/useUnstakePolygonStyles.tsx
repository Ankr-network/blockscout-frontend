import { makeStyles, Theme } from '@material-ui/core/styles';

export const useUnstakePolygonStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(8, 0, 0),
    backgroundColor: theme.palette.background.paper,
    maxWidth: 600,
    margin: '0 auto',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0, 6),
    },
  },

  container: {
    '&&': {
      maxWidth: 520 + theme.spacing(4),
      padding: theme.spacing(0, 4),
    },
  },

  titleArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  apyValueArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 13,
    margin: '4px 0 0 0',
  },

  apyValue: {
    fontSize: 13,
    opacity: 0.5,
  },
  apyTooltip: {
    margin: '-1px 0 0 4px',
    padding: '0 0 0 0',
  },

  fee: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  questionBtn: {
    margin: theme.spacing(0.5),
  },

  ankrValue: {
    marginRight: theme.spacing(0.5),
    fontSize: 14,
  },

  willGet: {
    fontWeight: 'bold',
    fontSize: 14,
  },
}));
