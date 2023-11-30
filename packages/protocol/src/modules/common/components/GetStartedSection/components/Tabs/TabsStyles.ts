import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    marginRight: theme.spacing(8.75),
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(6),
    display: 'block',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(5),
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(5),
    },
  },
  classNameTabsInner: {
    border: `2px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[100],
    borderRadius: 11,
    marginTop: theme.spacing(3),
  },
  classNameTabsWrapper: {
    display: 'block',
  },
}));
