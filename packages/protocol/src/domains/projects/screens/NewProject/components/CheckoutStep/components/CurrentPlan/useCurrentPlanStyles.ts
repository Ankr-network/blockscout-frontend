import { makeStyles } from 'tss-react/mui';

export const useCurrentPlanStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: theme.spacing(6),
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 700,
    lineHeight: '135%',
  },
  usage: {
    color: theme.palette.text.secondary,

    fontSize: 12,
    fontWeight: 500,
    lineHeight: '135%',
  },
  price: {
    flexShrink: 0,

    letterSpacing: '-0.01em',

    fontSize: 16,
    fontWeight: 700,
    lineHeight: '135%',

    span: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: theme.spacing(0.5),

      span: {
        color: theme.palette.grey[600],

        fontSize: 12,
        fontWeight: 500,
        lineHeight: '135%',
      },
    },
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(),

    color: theme.palette.grey[900],

    fontSize: 12,
    fontWeight: 500,
    lineHeight: '135%',

    ul: {
      margin: 0,
      paddingLeft: theme.spacing(3),
    },
  },
}));
