import { alpha, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { relative } from 'path';

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
      maxWidth: 700,
      margin: theme.spacing(0, 'auto', 4, 'auto'),
      borderRadius: 18,
      border: 'none',
    },

    body: {
      padding: theme.spacing(6, 0, 4.5),
    },

    footer: {
      padding: theme.spacing(0, 0, 7.5, 0),
    },

    wrapper: {
      padding: theme.spacing(0, 2.5),

      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0, 7.5),
        margin: '0 auto',
      },
    },

    footerWrapper: {
      display: 'flex',
    },

    title: {
      textAlign: 'left',
      margin: theme.spacing(0, 0, 5.5),
      fontSize: 30,

      [theme.breakpoints.down('xs')]: {
        fontSize: 24,
      },

      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
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

      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1.5),
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
      width: '100%',
      height: 54,
    },

    // stats

    statisticWrapper: {
      display: 'flex',
      justifyContent: 'space-evenly',
      width: '100%',
      padding: theme.spacing(4.5, 0),
    },

    statistic: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    statisticLabel: {
      color: `${theme.palette.text.secondary}`,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },

    statisticValue: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    statisticDivider: {
      backgroundColor: `${theme.palette.background.default}`,
      height: theme.spacing(8.5),
      width: theme.spacing(0.25),
    },

    // faq

    faqWrapper: {},
  };
});
