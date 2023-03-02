import { makeStyles } from 'tss-react/mui';

export const useLearnMoreCardStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(7.5),

    width: '100%',
    padding: theme.spacing(7.5),

    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.primary.main,

    fontSize: 40,
  },
  title: {
    color: theme.palette.grey[900],

    letterSpacing: '-0.02em',

    fontWeight: 700,
    fontSize: 20,
    lineHeight: '28px',
  },
}));
