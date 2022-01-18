import { makeStyles, Theme } from '@material-ui/core';

export const useStakableAssetStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center',

    width: 212,

    padding: theme.spacing(2.5),

    '&:hover $onHoverDisplay': {
      opacity: 1,
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(2.25, 2.5),
    },
  },

  defaultDisplay: {
    width: '100%',

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },

  balanceNetworkWrapper: {
    flexGrow: 1,
  },

  icon: {
    height: 44,
    width: 44,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 1.75, 0, 0),
    },
  },
  balance: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: theme.spacing(1),
    lineHeight: '17px',
  },
  network: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 13,
    color: theme.palette.text.secondary,
    lineHeight: '16px',
  },
  networkIcon: {
    height: 18,
    width: 18,
    marginLeft: theme.spacing(-0.25),

    '&:first-of-type': {
      marginLeft: 0,
    },

    '&:last-of-type': {
      marginRight: theme.spacing(1),
    },
  },

  onHoverDisplay: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      height: 'auto',
      borderRadius: 'inherit',

      padding: theme.spacing(2.5, 2.5, 5, 2.5),

      transition: '0.2s opacity',
      opacity: 0,

      color: theme.palette.common.white,
      background: theme.palette.primary.main,

      '&:hover ': {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  },
  onHoverDisplayLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    height: '100%',
    justifyContent: 'space-between',
  },
  apy: {
    fontWeight: 500,
    fontSize: 14,
  },
  stake: {
    display: 'flex',
    alignItems: 'center',

    fontWeight: 700,
    fontSize: 18,
  },
  crossIcon: {
    height: 20,
    width: 20,

    marginRight: theme.spacing(1),

    '&:before, &:after': {
      position: 'absolute',
      left: 10,
      content: '""',
      height: 20,
      width: 2,
      backgroundColor: theme.palette.common.white,
    },

    '&:after': {
      transform: 'rotate(-90deg)',
    },
  },
  mobileStakeLink: {
    height: 44,
    width: 44,
    minWidth: 44,
    padding: 0,
    marginRight: 0,
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: '50%',

    '&:before, &:after': {
      left: 19,
      backgroundColor: theme.palette.primary.main,
    },

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));
