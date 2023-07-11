import { makeStyles } from 'tss-react/mui';

export const useFinalPriceStyles = makeStyles()(theme => ({
  root: {
    border: `2px solid ${theme.palette.grey[100]}`,
    borderRadius: 20,
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  price: {
    color: theme.palette.grey[900],
    letterSpacing: '-0.16px',

    '& span span': {
      display: 'inline-block',
      marginLeft: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
  },

  description: {
    marginTop: theme.spacing(5),
  },
}));
