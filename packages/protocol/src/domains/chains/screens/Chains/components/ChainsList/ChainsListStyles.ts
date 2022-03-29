import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useChainListStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3.5),

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  wrapper: {
    height: '100%',
    overflow: 'hidden',

    borderRadius: 18,
    transition: 'box-shadow 0.2s',

    '&:hover': {
      boxShadow:
        '0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)',
    },
  },
  skeleton: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 200,
    cursor: 'pointer',
  },
}));
