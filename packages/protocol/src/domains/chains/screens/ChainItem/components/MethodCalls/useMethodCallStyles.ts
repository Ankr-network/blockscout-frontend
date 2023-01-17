import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMethodCallStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(2 * 4, 2 * 3.75, 2 * 3.125, 2 * 3.125),
    borderRadius: theme.spacing(2 * 3),
    background: theme.palette.background.paper,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2 * 2.5),
    },
    '& .recharts-tooltip-wrapper': {
      zIndex: 100,
    },
  },
  loading: {
    height: theme.spacing(2 * 30),
  },
  content: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    paddingTop: theme.spacing(2 * 4),
    marginTop: theme.spacing(2 * 4),
  },
  noData: {
    height: theme.spacing(2 * 30),
  },
}));
