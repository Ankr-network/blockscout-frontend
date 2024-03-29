import { makeStyles } from 'tss-react/mui';

export const useTabStyles = makeStyles()(theme => ({
  tabRoot: {
    whiteSpace: 'nowrap',

    color: theme.palette.text.primary,

    '&:not(:last-child)': {
      marginRight: theme.spacing(0),
    },

    '& span': {
      fontWeight: 500,
    },
  },
  tooltipTitle: {
    color: theme.palette.grey[900],
  },
}));
