import { alpha, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeFormStyles = makeStyles<Theme>(theme => {
  return {
    root: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateColumns: '100%',
      gridTemplateRows: '100%',
      padding: theme.spacing(5, 0),
      boxSizing: 'border-box',

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(8, 0, 5),
      },
    },

    container: {
      '&&': {
        [theme.breakpoints.down('xs')]: {
          padding: theme.spacing(0, 2),
        },
      },
    },

    box: {
      position: 'relative',
      padding: 0,
      maxWidth: 1132,
      margin: '0 auto',

      [theme.breakpoints.up('lg')]: {
        borderRadius: 65,
      },
    },

    body: {
      padding: theme.spacing(3, 0, 4),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0, 8),
      },
    },

    footer: {
      borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
      padding: theme.spacing(3.5, 0, 5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(6, 0),
      },
    },

    wrapper: {
      padding: theme.spacing(0, 2.5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 5),
        maxWidth: 880,
        margin: '0 auto',
      },
    },

    footerWrapper: {
      display: 'grid',
      gridRowGap: theme.spacing(3),

      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '1fr minmax(auto, 214px)',
        gridColumnGap: theme.spacing(4),
      },
    },

    title: {
      textAlign: 'left',
      margin: theme.spacing(0, 0, 5.5),

      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },

      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
        marginBottom: theme.spacing(10),
      },
    },

    cancel: {
      position: 'absolute',
      top: 15,
      right: 10,

      [theme.breakpoints.up('sm')]: {
        right: 24,
        top: 24,
      },

      '& svg': {
        display: 'block',
      },
    },

    range: {
      display: 'grid',
      gridRowGap: theme.spacing(1),
    },

    label: {
      display: 'flex',
      flexDirection: 'column',

      '&&': {
        [theme.breakpoints.down('xs')]: {
          fontSize: 16,
          fontWeight: 500,
        },
      },

      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
      },
    },

    amount: {
      display: 'flex',
      margin: theme.spacing(2, 0, 1.5),
      fontSize: 38,
      fontWeight: 700,

      [theme.breakpoints.up('sm')]: {
        margin: 0,
      },
    },

    labelText: {
      width: 'max-content',
    },

    inputAmount: {
      color: 'white',
      background: 'transparent',
      outline: 'none',
      border: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      textAlign: 'right',
      lineHeight: 1.3,
      padding: 0,
      marginRight: 10,
      '-moz-appearance': 'textfield',

      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },

    amountError: {
      textAlign: 'right',
      [theme.breakpoints.down('xs')]: {
        textAlign: 'left',
      },
    },

    info: {
      alignSelf: 'center',
      paddingLeft: theme.spacing(2.5),
      borderLeft: `2px solid ${theme.palette.primary.main}`,

      [theme.breakpoints.down('xs')]: {
        fontSize: 14,
      },
    },

    submit: {
      maxWidth: 230,
      height: 54,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 'none',
      },
    },
  };
});
