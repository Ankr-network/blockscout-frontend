import { makeStyles, Theme } from '@material-ui/core';

import { FONTS } from 'modules/themes/const';

import background from './assets/background.png';
import backgroundRetina from './assets/background-retina.png';

export const ANKR_COLOR = '#356DF3';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 6),
    borderRadius: 20,
    marginTop: theme.spacing(6),

    background: `${ANKR_COLOR} url(${background}) no-repeat top right`,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)': {
      background: `${ANKR_COLOR} url(${backgroundRetina}) no-repeat top right`,
      backgroundSize: '450px 100%',
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  title: {
    color: '#E7EBF3',
    fontSize: 28,

    fontFamily: FONTS.ttFirsNeueSemiBold,
    marginRight: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(1),
    },
  },
  button: {
    width: 190,
    height: '48px !important',
    fontSize: '16px !important',
    color: `${ANKR_COLOR} !important`,
    backgroundColor: `${theme.palette.common.white} !important`,

    '&:hover': {
      color: `${ANKR_COLOR} !important`,
      backgroundColor: '#E7EBF3 !important',
    },
  },
}));
