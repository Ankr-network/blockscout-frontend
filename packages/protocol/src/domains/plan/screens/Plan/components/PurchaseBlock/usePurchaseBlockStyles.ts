import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DeskCardLeftImg from 'assets/img/premium/desk-card-left.png';
import DeskCardRightImg from 'assets/img/premium/desk-card-right.png';
import MobileHeaderImg from 'assets/img/premium/mobile-fold-header-2.png';
import MobileFooterImg from 'assets/img/premium/mobile-fold-footer.png';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(3.5),
    padding: theme.spacing(7.6, 15.2),
    paddingBottom: 0,
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(7.5, 8.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  unlockContainer: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(18),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(3.5),
      marginBottom: theme.spacing(4),
    },
  },
  centerBlock: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2.5),
    },
  },
  iconPrimary: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  featureText: {
    fontSize: 17,
    color: theme.palette.grey[700],
  },
  title: {
    fontSize: 45,
    [theme.breakpoints.down('xs')]: {
      fontSize: 34,
      marginTop: theme.spacing(4),
    },
  },
  subTitle: {
    fontSize: 20,
    marginTop: theme.spacing(2.5),
    color: theme.palette.grey[700],
    [theme.breakpoints.down('xs')]: {
      fontSize: 17,
      marginTop: theme.spacing(1),
    },
  },
  featureContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& > *:not(:first-child)': {
      marginLeft: theme.spacing(3),
    },

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      '& > *:not(:first-child)': {
        marginTop: theme.spacing(2),
        marginLeft: 0,
      },
    },
  },
  unlockBtn: {
    fontSize: 16,
    '& svg': {
      fontSize: '24px !important',
    },
  },
  mobileHeaderImg: {
    width: '100%',
    height: 156,
    background: `url(${MobileHeaderImg}) no-repeat`,
    backgroundSize: 'cover',
  },
  mobileFooterImg: {
    width: '100%',
    height: 139,
    background: `url(${MobileFooterImg}) no-repeat`,
    backgroundSize: 'cover',
  },
  imgLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 272,
    height: 187,
    background: `url(${DeskCardLeftImg}) no-repeat`,
    backgroundSize: 'contain',
  },
  imgRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 236,
    height: 253,
    background: `url(${DeskCardRightImg}) no-repeat`,
    backgroundSize: 'contain',
  },
}));
