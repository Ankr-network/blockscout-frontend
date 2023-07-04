import { makeStyles } from 'tss-react/mui';

export const useSubscriptionsStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5),

    padding: theme.spacing(7),
    maxHeight: '100%',

    borderRadius: theme.spacing(6),
    background: theme.palette.background.paper,
  },
  title: {
    fontSize: 14,

    color: theme.palette.text.primary,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: theme.spacing(3),

    flexWrap: 'wrap',
  },
  textContainer: {
    display: 'flex',
    gap: theme.spacing(3),
  },
  text: {
    fontSize: 20,

    color: theme.palette.text.primary,
  },
  cancel: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: 14,
    color: theme.palette.error.main,
    cursor: 'pointer',
    lineHeight: '22px',
  },
}));
