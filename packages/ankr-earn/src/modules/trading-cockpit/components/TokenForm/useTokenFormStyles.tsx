import { alpha, makeStyles, Theme } from '@material-ui/core/styles';

export const useTokenFormStyles = makeStyles<Theme>(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.up('md')]: {
        flexWrap: 'nowrap',
      },
    },

    swap: {
      display: 'flex',
      justifyContent: 'center',

      [theme.breakpoints.up('md')]: {
        marginTop: 10,
      },
    },

    swapBtn: {
      opacity: 0.5,
      transition: '200ms ease-in-out',
      fontSize: 24,
      height: 40,
      padding: theme.spacing(1, 1),

      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(1, 2),
      },

      '&:hover': {
        opacity: 1,
      },
    },

    swapIcon: {
      width: '1em',
      height: '1em',
    },

    amount: {
      width: '100%',

      [theme.breakpoints.up('md')]: {
        maxWidth: 200,
      },
    },

    amountInputBase: {
      borderRadius: '12px 0 0 12px',
      borderRight: 'none',
      height: 60,
    },

    amountInput: {
      padding: theme.spacing(0, 2.5),
    },

    tokenFrom: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
    },

    tokenFromSelect: {
      borderLeft: 'none',
      borderRadius: '0 12px 12px 0',

      '&:before': {
        content: `''`,
        height: '60%',
        width: '1px',
        backgroundColor: alpha(theme.palette.text.primary, 0.1),
      },
    },
  }),
  { index: 1 },
);
