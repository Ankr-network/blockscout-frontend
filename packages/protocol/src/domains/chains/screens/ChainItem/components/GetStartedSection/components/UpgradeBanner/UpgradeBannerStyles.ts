import { Theme, makeStyles } from '@material-ui/core';

export const useUpgradeBannerStyles = makeStyles<Theme>(theme => ({
  upgradeBanner: {
    borderRadius: theme.spacing(3.75),

    background:
      'linear-gradient(to left, #013CD3, #6235D0, #AF34B1, #E85658, #FF7710)',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(3.75),

    margin: 3,
    padding: theme.spacing(3.75),

    borderRadius: 27,

    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  message: {
    maxWidth: theme.spacing(74.25),

    color: theme.palette.grey[700],

    fontWeight: 700,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
  button: {
    flexShrink: 0,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
