import { makeStyles, Theme } from '@material-ui/core';
import { ChainId } from 'domains/chains/api/chain';
import { RATE_LIMIT_BANNER_HEIGHT } from 'domains/chains/screens/ChainItem/components/Banner/useBannerStyles';
import { MENU_WIDTH } from 'domains/chains/screens/ChainItem/components/CrossMenu/CrossMenuStyles';

export const useStyles = makeStyles<
  Theme,
  { chainId?: string; bannerHeight: number }
>(theme => ({
  root: {
    width: '100%',
    paddingTop: ({ bannerHeight }) =>
      `${theme.spacing(3) + bannerHeight + RATE_LIMIT_BANNER_HEIGHT}px`,
    paddingBottom: theme.spacing(8),
    textAlign: 'center',
  },
  banner: {
    position: 'fixed',
    top: RATE_LIMIT_BANNER_HEIGHT,
    left: MENU_WIDTH,
    width: `calc(100% - ${MENU_WIDTH}px)`,
    zIndex: 100,
    textAlign: 'center',
    padding: '1em',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main,
    fontSize: 16,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: 0,
    },

    [`&.${ChainId.Moonbeam}`]: {
      backgroundColor: theme.palette.primary.dark,
    },

    [`&.${ChainId.Klaytn}`]: {
      background: 'linear-gradient(90deg, #FFDEC6 0%, #FFFBF5 100%)',
      color: theme.palette.text.primary,
    },
  },
  title: {
    marginBottom: 20,
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
    },

    [`&.${ChainId.Harmony}`]: {
      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },

    [`&.${ChainId.Avalanche} span span`]: {
      color: theme.palette.primary.main,
    },
  },
  description: {
    [`&.${ChainId.Avalanche} span`]: {
      color: theme.palette.text.primary,
    },
    [`&.${ChainId.Moonbeam} span`]: {
      color: theme.palette.text.primary,
    },

    '& span': {
      color: theme.palette.grey['500'],

      '& span': {
        color: theme.palette.text.primary,
      },

      '& p': {
        display: 'inline',
        textTransform: 'capitalize',
      },
    },
  },
}));
