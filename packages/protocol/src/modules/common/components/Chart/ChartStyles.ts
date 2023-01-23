import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: '100%',
  },
  chart: {
    '& .recharts-cartesian-axis-tick-value': {
      fontSize: 12,
      color: theme.palette.text.primary,
    },
  },
  loading: {
    opacity: 0.5,
  },
}));
