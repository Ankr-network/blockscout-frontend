import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useAccountsListStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: `repeat(3, calc(33.3% - ${theme.spacing(1)}))`,
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `repeat(2, calc(50% - ${theme.spacing(1)}))`,
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `calc(100% - ${theme.spacing(1)})`,
    },
  },
  avatar: {
    width: 48,
    height: 48,

    span: {
      fontSize: 20,
    },
  },
}));
