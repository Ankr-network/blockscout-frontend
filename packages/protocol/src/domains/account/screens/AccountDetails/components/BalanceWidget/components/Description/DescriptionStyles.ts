import { makeStyles } from 'tss-react/mui';

export const useDescriptionStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    color: theme.palette.text.secondary,

    whiteSpace: 'pre-wrap',

    fontSize: 12,
    fontWeight: 500,
    lineHeight: '135%',
  },
  blue: {
    svg: {
      color: theme.palette.primary.main,
    },
  },
  yellow: {
    svg: {
      color: theme.palette.warning.main,
    },
  },
  red: {
    svg: {
      color: theme.palette.error.main,
    },
  },
}));
