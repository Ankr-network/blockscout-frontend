import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'cellThead' | 'row'>()(
  (theme: Theme, _params, classes) => ({
    root: {
      paddingRight: theme.spacing(2 * 0.5),

      [theme.breakpoints.down('md')]: {
        paddingRight: 0,
      },

      '& table': {
        borderCollapse: 'collapse',
      },

      '& th, & td': {
        borderBottom: 'none',
      },
      '& th:first-of-type, & td:first-of-type': {
        paddingLeft: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      '& th:last-of-type,  & td:last-of-type': {
        paddingRight: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    subtitle2: {
      fontSize: 12,
    },

    table: {
      background: theme.palette.background.paper,
      borderRadius: 0,
    },
    cellThead: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2 * 0, 0, 2 * 1.5),
    },

    thead: {
      [`& .${classes.cellThead}:last-child`]: {
        textAlign: 'right',
      },
      borderBottom: `1px solid ${theme.palette.background.default}`,
    },
    row: {
      '& td': { border: 0 },
    },
    requests: {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 1.75,
    },
    selected: {
      '& h6': {
        color: theme.palette.primary.main,
      },
    },

    country: {
      display: 'flex',
    },
    firstCell: {
      display: 'inline-flex',
      alignItems: 'center',
      minWidth: theme.spacing(2 * 15),
      paddingTop: theme.spacing(2 * 0.5),
      paddingBottom: theme.spacing(2 * 0.5),
    },
    name: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1.75,
    },
    secondCell: {
      fontSize: 14,
      minWidth: '40%',
      paddingTop: theme.spacing(2 * 0.5),
      paddingBottom: theme.spacing(2 * 0.5),
      textAlign: 'right',
      textTransform: 'uppercase',
    },
    body: {
      [`& .${classes.row}:first-of-type td`]: {
        paddingTop: theme.spacing(2 * 1.5),
      },
    },
  }),
);
