import { makeStyles } from '@material-ui/core';

import { getImgRatioPct } from 'modules/common/utils/styles/getImgRatioPct';

export const useProviderBannerStyles = makeStyles(theme => ({
  banner: {
    padding: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1.5, 3),
    },
  },

  imgWrap: {
    display: 'block',
    position: 'relative',
    width: 40,

    [theme.breakpoints.up('md')]: {
      width: 66,
    },

    '&:before': {
      content: `''`,
      display: 'block',
      paddingTop: getImgRatioPct(66, 50),
    },
  },

  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',

    objectFit: 'scale-down',
  },

  closeCol: {
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },

  text: {
    fontWeight: 400,
    fontSize: 14,

    [theme.breakpoints.up('md')]: {
      fontSize: 16,
    },
  },

  btn: {
    fontSize: 14,

    [theme.breakpoints.up('md')]: {
      width: 122,
    },
  },
}));
