import { makeStyles } from 'tss-react/mui';

export const useEmptyLayoutStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    height: '100%',
    gap: theme.spacing(5),

    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: 218,
  },
  title: {
    letterSpacing: '-0.03em',

    color: theme.palette.grey[900],

    fontWeight: 700,
    fontSize: 28,
    lineHeight: '32px',
  },
  description: {
    letterSpacing: '-0.01em',

    color: theme.palette.grey[600],

    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
  },
}));
