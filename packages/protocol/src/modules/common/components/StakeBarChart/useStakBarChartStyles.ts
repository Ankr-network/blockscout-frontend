import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeBarChartStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: theme.spacing(20),
    '& .recharts-legend-wrapper': {
      top: `-${theme.spacing(18)}px !important`,
    },
  },
  legendRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  legend: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.25, 1),
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  selected: {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.grey[900],
  },
}));
