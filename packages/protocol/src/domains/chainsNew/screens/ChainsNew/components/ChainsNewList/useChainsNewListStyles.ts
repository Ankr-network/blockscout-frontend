import { Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useChainsNewListStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(2 * 3.5),

    [`@media (max-width: 1930px)`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
