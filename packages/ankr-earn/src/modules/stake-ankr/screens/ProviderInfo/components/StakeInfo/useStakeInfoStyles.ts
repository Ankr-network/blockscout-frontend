import { alpha, makeStyles } from '@material-ui/core';

export const useStakeInfoStyles = makeStyles(
  theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.background.default,
      borderRadius: 12,
    },

    tabRoot: {
      display: 'flex',
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '100%',
      borderBottom: `1px solid ${alpha(theme.palette.text.secondary, 0.1)}`,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      '& .MuiTabs-indicator': {
        display: 'none',
      },

      [theme.breakpoints.up('md')]: {},
    },

    tabSelected: {
      '&.Mui-selected': {
        borderBottom: 'none',
      },
    },

    tabArea: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing(4.5),

      '&:first-of-type': {
        marginLeft: 0,
      },
    },

    btn: {
      height: 40,
      width: 100,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      margin: theme.spacing(0.5, 0, 0.5, 0.5),
      backgroundColor: '#fff',

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, 0, 0, 1.5),
      },
    },

    table: {
      width: '100%',
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(1, 2),

      '& > table > thead > td > th': {
        color: 'red',
      },
    },

    thContent: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: 'none',
    },

    cell: {
      border: 'none',
    },
  }),
  { index: 1 },
);
