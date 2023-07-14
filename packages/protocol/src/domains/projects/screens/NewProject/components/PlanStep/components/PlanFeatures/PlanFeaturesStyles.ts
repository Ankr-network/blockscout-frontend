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

    '& ul': {
      padding: 0,
      margin: 0,

      listStyle: 'none',

      '& li': {
        marginBottom: theme.spacing(1),

        '& span': {
          fontWeight: 400,
        },
      },
    },
  },
  soonLabel: {
    alignSelf: 'flex-end',
  },
}));
