import { makeStyles } from 'tss-react/mui';

export const useCurrencySelectorStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(2 * 1.75),

    background: theme.palette.background.default,

    '& > div': {
      width: '100%',

      '& > div': {
        width: '100%',
      },
    },
  },
}));
