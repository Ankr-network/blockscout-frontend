import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'icon'>()(
  (theme: Theme, _params, classes) => ({
    title: {
      fontWeight: 700,
      marginTop: theme.spacing(2 * 3.5),
      fontSize: 14,

      color: theme.palette.text.primary,
    },

    domainRows: {
      marginTop: theme.spacing(2 * 3),
    },
    domainRow: {
      fontSize: 14,
      display: 'inline-grid',
      width: '100%',
      alignItems: 'center',
      gridTemplateColumns: '1fr auto',

      '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
    content: {
      fontSize: 14,
      fontWeight: 400,

      color: theme.palette.text.primary,
    },
    deleteButton: {
      padding: 0,
      margin: theme.spacing(2 * 0.25, 0),

      '&:hover ': {
        background: theme.palette.background.default,

        [`& .${classes.icon}`]: {
          fill: theme.palette.primary.main,
        },
      },
    },
    icon: {
      width: 18,

      fill: theme.palette.grey[400],
    },
  }),
);
