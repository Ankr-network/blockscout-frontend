import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { MOBILE_LAYOUT_PADDING } from 'modules/layout/components/DefautLayout/DefaultLayoutStyles';
import { HEADER_HEIGHT } from 'modules/layout/components/Header';
import { MOBILE_HEADER_HEIGHT } from 'modules/layout/components/MobileHeader';

export const usePricingStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginTop: -HEADER_HEIGHT,
    height: '100%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      marginTop: -(MOBILE_HEADER_HEIGHT + MOBILE_LAYOUT_PADDING),
    },
  },
  content: {
    padding: theme.spacing(0, 2 * 2),
    [theme.breakpoints.down('sm')]: {
      background: `linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%),linear-gradient(270deg, #D0DCF9 0%, #E3DCFA 50%, #F4E7DE 100%)`,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2 * 15.5),
    padding: 0,
    '&&': {
      maxWidth: 1020,
      padding: 0,
    },

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2 * 7.5),
    },
  },
  featureBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: theme.spacing(2 * -2.5, 0, 0, 2 * -2.5),
    '& > *': {
      margin: theme.spacing(2 * 2.5, 0, 0, 2 * 2.5),
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
    paddingBottom: theme.spacing(2 * 6),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 100%, 100% 100%',
    backgroundSize: 'auto 100%',
    [theme.breakpoints.between(768, 960)]: {
      backgroundSize: '40% auto',
    },
    [theme.breakpoints.down(768)]: {
      marginBottom: theme.spacing(2 * -6),
      paddingBottom: 0,
    },
  },
}));
