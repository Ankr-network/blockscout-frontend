import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainOverviewStyles = makeStyles()((theme: Theme) => ({
  chainOverview: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: {
    display: 'flex',
    gap: theme.spacing(2 * 2),
  },
  description: {
    margin: 0,
  },
  chainDocsLink: {
    [theme.breakpoints.down('xs')]: {
      '&&': { display: 'none' },
    },
  },
}));
