import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUsageSummaryStyles = makeStyles()((theme: Theme) => ({
  usageSummary: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
    width: '35%',
    padding: theme.spacing(2 * 2, 2 * 2.75),

    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.down('md')]: {
      width: '40%',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  stat: {
    flex: 1,
  },
}));
