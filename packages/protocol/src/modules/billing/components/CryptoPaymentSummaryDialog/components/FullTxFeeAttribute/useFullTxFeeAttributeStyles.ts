import { makeStyles } from 'tss-react/mui';

export const useFullTxFeeAttributeStyles = makeStyles()(theme => ({
  label: {
    span: {
      span: {
        color: theme.palette.text.secondary,
      },
    },
  },
  placeholder: {
    color: theme.palette.text.secondary,
  },
}));
