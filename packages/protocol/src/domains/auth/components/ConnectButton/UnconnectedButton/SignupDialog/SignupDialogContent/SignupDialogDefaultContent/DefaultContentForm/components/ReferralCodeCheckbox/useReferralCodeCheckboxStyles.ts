import { makeStyles } from 'tss-react/mui';

export const useReferralCodeCheckboxStyles = makeStyles()(theme => ({
  root: {
    width: 'fit-content',
  },
  label: {
    '&&': {
      margin: 0,
      marginLeft: theme.spacing(2),

      lineHeight: 1.4,
    },
  },
}));
