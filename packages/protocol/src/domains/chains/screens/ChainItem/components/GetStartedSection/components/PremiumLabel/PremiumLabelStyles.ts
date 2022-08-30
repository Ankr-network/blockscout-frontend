import { Theme, makeStyles } from '@material-ui/core';

export const usePremiumLabelStyles = makeStyles<Theme>(theme => ({
  premiumLabel: {
    padding: `${theme.spacing(0.25)}px ${theme.spacing(1)}px`,

    borderRadius: theme.spacing(1),

    backgroundColor: theme.palette.background.default,
  },
  gradient: {
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',

    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',

    letterSpacing: '0.01em',

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
}));
