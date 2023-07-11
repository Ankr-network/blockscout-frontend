import { makeStyles } from 'tss-react/mui';

export const usePlanFeaturesStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),

    color: theme.palette.grey[900],

    letterSpacing: '-0.01em',

    fontWeight: 700,
    fontSize: 16,
    lineHeight: '22px',

    span: {
      span: {
        fontWeight: 400,
      },
    },
  },
  soonLabel: {
    alignSelf: 'flex-end',
  },
}));
