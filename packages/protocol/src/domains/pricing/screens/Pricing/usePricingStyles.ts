import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePricingStyles = makeStyles<Theme>(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(19.5),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(7.5),
    },
  },
  contactBlock: {
    alignSelf: 'center',
    maxWidth: 375,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: 290,
    },
  },
  contactBlockHeader: {
    fontSize: 34,
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
  },
  contactBlockBtn: {
    marginTop: theme.spacing(2.5),
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: `${theme.palette.common.white}`,
      color: theme.palette.text.primary,
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
}));
