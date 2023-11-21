import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    gap: theme.spacing(4),
  },
  amountLabel: {
    marginBottom: theme.spacing(2),

    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    lineHeight: '135%',
  },
  tabs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  tab: {
    borderRadius: 17,

    '& > div': {
      width: 'auto',
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    gap: theme.spacing(3),
  },
  button: {
    height: 48,

    borderRadius: 17,
  },
  cancelLabel: {
    color: theme.palette.grey[600],

    textAlign: 'center',

    fontSize: 14,
    lineHeight: '140%',
  },
  cancelLabelHidden: {
    visibility: 'hidden',
  },
}));
