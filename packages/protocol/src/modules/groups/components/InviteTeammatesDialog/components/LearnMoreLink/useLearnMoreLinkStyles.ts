import { makeStyles } from 'tss-react/mui';

export const useLearnMoreLinkStyles = makeStyles()(theme => ({
  root: {
    '&&': {
      color: theme.palette.primary.main,

      ':hover': {
        textDecoration: 'none',
      },
    },
  },
}));
