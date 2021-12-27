import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStakeFormStyles = makeStyles<Theme>(theme => {
  return {
    box: {
      margin: theme.spacing(0, 'auto', 4, 'auto'),
    },

    body: {
      padding: theme.spacing(6, 0, 4.5),
    },

    footer: {
      padding: theme.spacing(0, 0, 7.5, 0),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 0, 2.5, 0),
      },
    },

    wrapper: {
      padding: theme.spacing(0, 7.5),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0, 2),
        margin: '0 auto',
      },
    },

    footerWrapper: {
      display: 'flex',
    },

    title: {
      textAlign: 'center',
      margin: theme.spacing(0, 0, 6),
      fontSize: 30,

      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(7.5),
      },
    },

    cancel: {
      position: 'absolute',
      top: 0,
      left: 0,

      [theme.breakpoints.up('sm')]: {
        top: 0,
        left: 0,
      },

      '& svg': {
        display: 'block',
      },
    },

    formButtonWrapper: {
      position: 'relative',
    },

    range: {
      display: 'flex',
      flexDirection: 'column',
    },

    label: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(1.5),
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
      fontSize: 14,
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
      [theme.breakpoints.down('sm')]: {
        textAlign: 'left',
      },
    },

    info: {
      alignSelf: 'center',
      paddingLeft: theme.spacing(2.5),
      borderLeft: `2px solid ${theme.palette.primary.main}`,

      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },

    submit: {
      width: '100%',
      height: 54,
    },

    stakingTypes: {
      display: 'flex',
      marginTop: theme.spacing(2.5),

      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(3.5),
        flexDirection: 'column',
      },
    },

    stakingType: {
      display: 'flex',
      color: '#9AA1B0',
      alignItems: 'center',
      fontSize: 14,
      marginRight: theme.spacing(3),
      fontWeight: 600,
      userSelect: 'none',

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },

      '&:before': {
        content: '""',
        display: 'block',
        width: 22,
        height: 22,
        borderRadius: '50%',
        backgroundColor: '#E6ECF5',
        marginRight: theme.spacing(1),
      },

      '&.active': {
        color: '#356DF3',
        '&:before': {
          backgroundColor: '#356DF3',
        },
      },
    },
  };
});
