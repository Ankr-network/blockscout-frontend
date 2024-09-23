import { makeStyles } from 'tss-react/mui';

export const useCardInfoStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },
  title: {
    marginBottom: theme.spacing(2.5),

    color: theme.palette.grey[900],

    letterSpacing: '-0.02em',

    fontWeight: 700,
    fontSize: 20,
    lineHeight: '28px',
  },
  descriptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.75),
  },
  description: {
    paddingBottom: theme.spacing(1.75),

    borderBottom: `1px solid ${theme.palette.grey[100]}`,

    color: theme.palette.grey[800],

    fontWeight: 400,
    fontSize: 13,
    lineHeight: '24px',
  },
}));
