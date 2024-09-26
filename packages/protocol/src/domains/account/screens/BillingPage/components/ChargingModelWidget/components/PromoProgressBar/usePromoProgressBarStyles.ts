import { makeStyles } from 'tss-react/mui';

export const usePromoProgressBarStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  expiration: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),

    color: theme.palette.text.secondary,

    svg: {
      color: theme.palette.text.secondary,
    },
  },
  tooltip: {
    maxWidth: 'none',
  },
  link: {
    cursor: 'pointer',
    textDecoration: `underline dashed ${theme.palette.primary.main}`,
    textUnderlineOffset: 3,

    '&': {
      color: theme.palette.primary.dark,
    },

    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));
