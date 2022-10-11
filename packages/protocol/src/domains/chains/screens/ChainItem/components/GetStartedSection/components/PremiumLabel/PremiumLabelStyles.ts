import { Theme, makeStyles } from '@material-ui/core';

interface Props {
  size: 's' | 'm' | 'l';
}

export const usePremiumLabelStyles = makeStyles<Theme, Props>(theme => ({
  premiumLabel: {
    padding: (props: Props) =>
      props.size === 's' ? `${theme.spacing(0.25)}px ${theme.spacing(1)}px` : 0,

    borderRadius: theme.spacing(1),

    backgroundColor: 'transparent',
  },
  gradient: {
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',

    background:
      'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',

    letterSpacing: '0.01em',

    fontWeight: (props: Props) => (props.size === 's' ? 400 : 700),
    fontSize: (props: Props) =>
      props.size === 'm'
        ? theme.spacing(2.5)
        : props.size === 'l'
        ? 35
        : theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
}));
