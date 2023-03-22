import { makeStyles, Theme } from '@material-ui/core';

import { ChainId } from 'domains/chains/api/chain';
import { MENU_WIDTH } from 'domains/chains/screens/ChainItem/components/CrossMenu/CrossMenuStyles';
import { HEADER_HEIGHT } from './HeaderLogo/HeaderLogoStyles';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';
import { hasAnkrsInfo } from 'domains/chains/screens/ChainItem/ChainItemUtils';

const { REACT_APP_CHAIN_ID } = process.env;

const POLYGON_ZKEVM_TITLE_WIDTH = 1068;

interface HeaderStylesProps {
  chainId?: string;
  bannerHeight: number;
  hasInfo: boolean;
}

export const BANNER_HEIGHT = 88;

export const useStyles = makeStyles<Theme, HeaderStylesProps>(theme => ({
  root: {
    width: '100%',
    paddingTop: IS_REACT_SNAP
      ? `${theme.spacing(3) + BANNER_HEIGHT}px !important`
      : ({ bannerHeight }) => `${theme.spacing(3) + bannerHeight}px !important`,
    paddingBottom: theme.spacing(6),
    textAlign: 'center',
  },
  banner: {
    position: 'fixed',
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
    // it's not possible to pass a separate function with this logic for react snap
    paddingTop: IS_REACT_SNAP
      ? hasAnkrsInfo(REACT_APP_CHAIN_ID as ChainId)
        ? HEADER_HEIGHT
        : 40
      : ({ hasInfo }: HeaderStylesProps) => (hasInfo ? HEADER_HEIGHT : 40),
    marginBottom: 20,
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
    },

    [`&.${ChainId.POLYGON_ZKEVM}`]: {
      width: POLYGON_ZKEVM_TITLE_WIDTH,
      position: 'relative',
      left: '50%',
      marginLeft: -POLYGON_ZKEVM_TITLE_WIDTH / 2,

      [theme.breakpoints.down('md')]: {
        width: '100%',
        position: 'static',
        marginLeft: 0,
      },

      '& span span': {
        color: theme.palette.primary.main,
      },
    },

    [`&.${ChainId.Harmony}`]: {
      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },

    [`&.${ChainId.Avalanche} span span`]: {
      color: theme.palette.primary.main,
    },

    [`&.${ChainId.BSC} span`]: {
      color: theme.palette.primary.main,
    },

    [`&.${ChainId.Fantom}`]: {
      background: `linear-gradient(to right, #ec4574, #7db6e0)`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',

      '& > span > span': {
        background: `linear-gradient(to right, #7db6e0, #8dfbc5)`,
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
      },
    },
  },
  description: {
    [`&.${ChainId.Avalanche} span`]: {
      color: theme.palette.text.primary,
    },
    [`&.${ChainId.Moonbeam} span`]: {
      color: theme.palette.text.primary,
    },

    [`&.${ChainId.POLYGON_ZKEVM} span`]: {
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
