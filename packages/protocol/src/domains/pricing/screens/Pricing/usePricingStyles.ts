import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MOBILE_LAYOUT_PADDING } from 'modules/layout/components/DefautLayout/DefaultLayoutStyles';
import { HEADER_HEIGHT } from 'modules/layout/components/Header';
import { MOBILE_HEADER_HEIGHT } from 'modules/layout/components/MobileHeader';

export const usePricingStyles = makeStyles<Theme>(theme => ({
  root: {
    marginTop: -HEADER_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: -(MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING),
    },
  },
  content: {
    background: `linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%);`,
    padding: theme.spacing(0, 2),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(15.5),
    maxWidth: 1020,
    padding: 0,

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
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
  },
  background: {
    background: `linear-gradient(180deg, #F2F5FA 0%, rgba(242, 245, 250, 0) 100%), linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`,
  },
}));
