import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSubscriptionsStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2 * 3.5),
    borderRadius: theme.spacing(2 * 3),
    background: theme.palette.background.paper,
    gap: theme.spacing(2 * 2.5),
  },
  title: {
    fontSize: 14,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: theme.spacing(2 * 1.5),
  },
  textContainer: {
    display: 'flex',
    gap: theme.spacing(2 * 1.5),
  },
  text: {
    fontSize: 20,
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
