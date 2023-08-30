import { makeStyles } from 'tss-react/mui';

export const usePlanFeaturesStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  features: {
    color: theme.palette.text.primary,

    fontWeight: 500,
    fontSize: 12,

    '& ul': {
      margin: 0,
      paddingLeft: theme.spacing(3),

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
