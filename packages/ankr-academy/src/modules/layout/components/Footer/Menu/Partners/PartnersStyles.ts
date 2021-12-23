import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const usePartnersStyles = makeStyles<Theme>(theme => ({
  coinWrapper: {
    [theme.breakpoints.down('lg')]: {
      width: '33%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(4),
    },
  },

  links: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',

    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      width: 'auto',
    },
  },

  coinCaption: {
    '&&': {
      width: '100%',
      '& span': {
        color: theme.palette.text.hint,
      },
    },
  },

  coin: {
    '&&': {
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(3),
      justifyContent: 'flex-start',
      color: theme.palette.text.primary,
      opacity: 0.5,
      transitionTimingFunction: 'linear',
      transitionDuration: '250ms',
      transitionProperty: 'opacity',

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },

      '& svg': {
        '--color-1': 'currentColor',
        '--color-2': '#959595',
        '--color-3': '#D5D5D5',
        '--color-4': '#58595B',
        '--color-5': '#CECECE',
        '--color-6': '#FDFDFD',
      },

      '&:hover, &:focus': {
        opacity: 1,
      },

      '&:hover svg, &:focus svg': {
        '--color-1': 'currentColor',
        '--color-2': '#009345',
        '--color-3': '#8BC53F',
        '--color-4': '#58595B',
        '--color-5': '#8DC63F',
        '--color-6': '#F9E988',
      },
    },
  },
}));
