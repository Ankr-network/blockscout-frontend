import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, boolean>(theme => ({
  accountDetailsButtonRoot: isMobile =>
    isMobile
      ? {
          padding: theme.spacing(1.25, 1.5),
          border: '2px solid #E7EBF3',
          borderRadius: theme.spacing(1.5),
        }
      : {},
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile => (isMobile ? theme.spacing(0.75) : theme.spacing(1)),
  },
  label: isMobile =>
    isMobile
      ? {
          fontWeight: 600,
          fontSize: 11,
          lineHeight: `${theme.spacing(2)}px`,
        }
      : {
          // fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: theme.spacing(2),
          lineHeight: `${theme.spacing(3)}px`,
        },
  currency: {
    display: isMobile => (isMobile ? 'none' : ''),
    color: theme.palette.grey[600],
  },
}));
