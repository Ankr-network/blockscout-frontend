import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUsageSummaryStyles = makeStyles()((theme: Theme) => ({
  usageSummary: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    padding: theme.spacing(2 * 3.75),

    borderRadius: 24,

    backgroundColor: theme.palette.background.paper,
  },
  stat: {
    flex: 1,
  },
}));