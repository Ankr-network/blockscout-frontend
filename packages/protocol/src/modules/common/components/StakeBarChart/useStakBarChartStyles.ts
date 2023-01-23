import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStakeBarChartStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2 * 20),
    '& .recharts-legend-wrapper': {
      top: `${theme.spacing(2 * -18)} !important`,
    },
  },
  legendRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  legend: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2 * 0.25, 2 * 1),
    borderRadius: theme.spacing(2 * 1),
    marginRight: theme.spacing(2 * 1),
    marginBottom: theme.spacing(2 * 1),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: theme.spacing(2 * 2.5),
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
  selected: {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.grey[900],
  },
}));
