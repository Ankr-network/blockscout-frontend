import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTimeframeSectionStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    gap: theme.spacing(2 * 3),
    justifyContent: 'space-between',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  left: {
    display: 'flex',
    gap: theme.spacing(2 * 3),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  timeframe: {
    '&&': {
      borderRadius: 17,
    },
  },
  tab: {
    '&&': {
      borderRadius: 15,
    },
  },
}));
