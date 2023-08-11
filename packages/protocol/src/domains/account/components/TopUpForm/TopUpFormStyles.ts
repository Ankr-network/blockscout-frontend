import { makeStyles } from 'tss-react/mui';

export const useTopUpFormStyles = makeStyles<boolean>()(
  (theme, usdPaymentOnly) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',

      borderRadius: 30,
      padding: theme.spacing(7.5),

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(6),
      },
    },
    tab: {
      borderRadius: 17,
    },
    tabs: {
      display: 'inline-flex',

      width: '100%',

      border: usdPaymentOnly
        ? 'none'
        : `2px solid ${theme.palette.background.default}`,
      borderRadius: 17,

      background: theme.palette.background.default,

      marginBottom: theme.spacing(4),

      '& > div': {
        width: '100%',

        '& > div': {
          width: '100%',
        },
      },
    },
  }),
);
