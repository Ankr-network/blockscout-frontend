import { makeStyles, Theme } from '@material-ui/core/styles';

export const useUnstakePolygonStyles = makeStyles<Theme>(theme => ({
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
