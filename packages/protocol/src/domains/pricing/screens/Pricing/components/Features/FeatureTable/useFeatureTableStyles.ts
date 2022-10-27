import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useFeatureTableStyles = makeStyles<Theme>(theme => ({
  root: {
    '& th, & td': {
      padding: 0,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    '& tr th:first-child, & tr td:first-child': {
      textAlign: 'left',
    },
    '& tr td:not(:first-child)': {
      width: 290,
      maxWidth: 290,
      padding: '20px 17.5px',
    },

    '& td': {
      padding: '20px 0',
    },
  },
  header: {
    '& th': {
      fontSize: 28,
      lineHeight: '32.2px',
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: 4,
    },
    '& th:nth-child(3)': {
      background:
        'linear-gradient(270.26deg, #013CD3 0.23%, #6235D0 26.13%, #AF34B1 49.87%, #E85658 76.96%, #FF7710 99.78%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      '-webkit-box-decoration-break': 'clone',
    },
  },
  headerSummary: {
    '& th': {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 700,
      color: theme.palette.grey[600],
      paddingBottom: 20,
    },
    '& th:first-child': {
      fontWeight: 400,
    },
    '& th:last-child': {
      color: theme.palette.text.primary,
    },
  },
  button: {
    '& th': {
      paddingBottom: 20,
    },
    '& button, & a': {
      fontSize: 16,
    },
  },
  cellRow: {
    '&:first-child td': {
      borderTop: `1px solid ${theme.palette.grey[900]}`,
    },
    '& td': {
      lineHeight: '24px',
      fontWeight: 400,
      fontSize: 16,
    },
    '& td:first-child': {
      fontWeight: 700,
    },
    '& td em': {
      fontStyle: 'normal',
      fontWeight: 400,
    },

    '&:last-child td': {
      borderBottom: 'none',
    },
  },
  tip: {
    verticalAlign: 'bottom',
    marginLeft: 4,
  },
  checkIcon: {
    width: 24,
    height: 24,
    color: theme.palette.primary.main,
  },
  crossIcon: {
    width: 24,
    height: 24,
    color: theme.palette.grey[600],
  },
  link: {
    padding: 0,
    height: 'auto',
    fontSize: 16,
    alignSelf: 'center',
    background: 'none',
    position: 'relative',
    top: -1,

    '&:hover': {
      background: 'none',
    },

    '& svg': {
      marginLeft: 8,
      color: theme.palette.grey[600],
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}));
