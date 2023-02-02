import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainItemSkeletonStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    gap: theme.spacing(2 * 3.75),

    [theme.breakpoints.down('lg')]: {
      gap: theme.spacing(2 * 2),
    },
  },
}));
