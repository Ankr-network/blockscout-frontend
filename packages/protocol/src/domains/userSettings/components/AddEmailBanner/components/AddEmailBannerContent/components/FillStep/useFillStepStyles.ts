import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useFillStepStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& *': {
      lineHeight: theme.spacing(2 * 3),
    },
  },
  featureContainer: {
    display: 'grid',
    justifyContent: 'space-evenly',
    marginBottom: theme.spacing(2 * 3.75),

    gridTemplateColumns: 'repeat(4, 110px)',
    gridGap: theme.spacing(2 * 3.75),

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 110px)',
    },

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      gridGap: theme.spacing(2 * 1.5),
      gridTemplateColumns: '1fr',
    },
  },
  feature: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      gridGap: theme.spacing(2 * 2),
    },
  },
  featureIcon: {
    width: 28,
    height: 28,
    color: theme.palette.primary.main,
  },
  featureText: {
    fontSize: 17,
  },
}));
