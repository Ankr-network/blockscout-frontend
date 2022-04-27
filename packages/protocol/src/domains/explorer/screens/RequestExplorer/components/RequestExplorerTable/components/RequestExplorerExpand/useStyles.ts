import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 18,

    '& $block:last-child': {
      borderLeft: `1px solid ${theme.palette.grey[400]}`,
    },
  },

  block: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 50%',
    padding: theme.spacing(3),
  },

  tab: {
    '&&': {
      minHeight: 26,
      height: 26,
      fontWeight: 700,
      fontSize: 14,
      color: theme.palette.primary.main,
      padding: theme.spacing(1),
      '&:not(:first-child)': {
        marginLeft: theme.spacing(2),
      },
    },
  },
  tabSelected: {
    '&.Mui-selected': {
      color: `${theme.palette.common.white} !important`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 6,
    },
  },
  rawText: {
    wordBreak: 'break-all',
  },
}));
