import { alpha, makeStyles, Theme } from '@material-ui/core/styles';

export const useTokenFormStyles = makeStyles<Theme>(
  (theme: Theme) => ({
    root: {
      [theme.breakpoints.up('sm')]: {
        flexWrap: 'nowrap',
      },
    },

    swap: {
      display: 'flex',
      justifyContent: 'center',

      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(1),
      },
    },

    swapIcon: {
      opacity: 0.5,
      transition: '200ms ease-in-out',

      '&:hover': {
        opacity: 1,
      },
    },

    amount: {
      width: '100%',

      [theme.breakpoints.up('md')]: {
        maxWidth: 200,
      },
    },

    amountInputBase: {
      borderRadius: '12px 0 0 12px',
      borderRightColor: alpha('#000', 0),
    },

    amountInput: {
      height: 58,
      padding: theme.spacing(0, 3),
    },

    tokenFrom: {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
    },

    tokenFromSelect: {
      marginLeft: -1,
      borderRadius: '0 12px 12px 0',
    },
  }),
  { index: 1 },
);
