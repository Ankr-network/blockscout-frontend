import { makeStyles } from 'tss-react/mui';

export const useTwoFAQRCodeStyles = makeStyles()(theme => ({
  root: {
    margin: theme.spacing(10, 0),

    '& img': {
      display: 'block',
      margin: '0 auto',
    },
  },
}));
