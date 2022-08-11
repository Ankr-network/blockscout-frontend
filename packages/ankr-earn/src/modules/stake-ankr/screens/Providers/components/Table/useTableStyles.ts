import { makeStyles, Theme } from '@material-ui/core';

import { FONTS } from 'ui';

export const useTableStyles = makeStyles<Theme>(
  theme => ({
    thContent: {
      display: 'flex',
      alignItems: 'center',
    },

    btnSkeleton: {
      borderRadius: 12,
    },

    expandLogo: {
      maxWidth: '274px',
      margin: 0,

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 14, 0, 6),
      },
    },

    bannerWrapper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background:
        'linear-gradient(180deg, rgba(242, 245, 250, 0) 0%, #F2F5FA 100%), linear-gradient(270deg, #F4E7DE 0%, #E3DCFA 50%, #D0DCF9 100%, #DBE5F9 100%)',
      borderRadius: 18,

      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
    },

    expandDescription: {
      fontSize: 36,
      textAlign: 'center',
      alignItems: 'center',
      fontFamily: FONTS.ttFirsNeueSemiBold,
      marginTop: theme.spacing(4.5),
      marginBottom: theme.spacing(2.5),
      letterSpacing: '-0.02em',
      '& > span > span': {
        background:
          'linear-gradient(270.06deg, #FF820E 7.8%, #7926FF 52.51%, #356DF3 91.97%), #1F2226',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-webkit-box-decoration-break': 'clone',
      },

      [theme.breakpoints.down('sm')]: {
        fontSize: 34,
        lineHeight: '40px',
        minWidth: '334px',
        '& br': {
          display: 'none',
        },
      },
    },
  }),
  { index: 1 },
);
