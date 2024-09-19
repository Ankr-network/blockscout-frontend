import { makeStyles } from 'tss-react/mui';

export const useLearnMoreCardsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    gap: theme.spacing(7),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
