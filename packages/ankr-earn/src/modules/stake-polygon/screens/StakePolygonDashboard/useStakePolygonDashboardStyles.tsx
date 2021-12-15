import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStakePolygonDashboardStyles = makeStyles<Theme>(theme => ({
  root: {
    padding: theme.spacing(6, 0),

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10, 0),
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

  title: {},

  apyValue: {
    fontSize: 13,
    opacity: 0.5,
  },
  apyTooltip: {
    margin: '-1px 0 0 4px',
    padding: '0 0 0 0',
  },

  fee: {
    fontSize: 14,
    marginRight: theme.spacing(1),
  },
  questionIcon: {
    alignSelf: 'center',
  },
}));
