import { makeStyles } from 'tss-react/mui';

export const useAddressStyles = makeStyles()(theme => ({
  root: {
    paddingRight: theme.spacing(4),

    letterSpacing: 'normal',

    lineHeight: '140%',
  },
}));
