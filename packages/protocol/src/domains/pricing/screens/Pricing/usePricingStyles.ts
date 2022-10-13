import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePricingStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(15.5),

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(7.5),
    },
  },
  featureBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: theme.spacing(-2.5, 0, 0, -2.5),
    '& > *': {
      margin: theme.spacing(2.5, 0, 0, 2.5),
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'nowrap',
      overflowX: 'auto',
      justifyContent: 'flex-start',
      '& > *': {
        flexShrink: 0,
      },
    },
  },
  start: {
    paddingBottom: theme.spacing(6),
  },
  background: {
    background: `linear-gradient(180deg, #F2F5FA 0%, rgba(242, 245, 250, 0) 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`,
  },
}));
