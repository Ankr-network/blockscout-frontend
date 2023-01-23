import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useFeatureTableStyles = makeStyles()((theme: Theme) => ({
  root: {
    '& th, & td': {
      padding: 0,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    '& tr th:first-of-type, & tr td:first-of-type': {
      textAlign: 'left',
    },
    '& tr td:not(:first-of-type)': {
      width: 290,
      maxWidth: 290,
      padding: theme.spacing(2 * 2.5, 2 * 2.1875),
    },

    '& th': {
      borderBottom: 'none',
    },
    '& td': {
      padding: theme.spacing(2 * 2.5, 0),
      borderBottomColor: theme.palette.grey[200],
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
    '& a': {
      '& svg': {
        color: 'inherit',
      },
      '&:hover, &:hover svg': {
        color: theme.palette.primary.main,
      },
    },
  },
  header: {
    '& th': {
      fontSize: 28,
      lineHeight: '32.2px',
      fontWeight: 700,
      color: theme.palette.text.primary,
      paddingBottom: theme.spacing(2 * 0.5),
    },
    '& th:nth-of-type(3)': {
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
      paddingBottom: theme.spacing(2 * 2.5),
    },
    '& th:first-of-type': {
      fontWeight: 400,
    },
    '& th:last-child': {
      color: theme.palette.text.primary,
    },
  },
  button: {
    '& th': {
      paddingBottom: theme.spacing(2 * 2.5),
    },
    '& button, & a': {
      fontSize: 16,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
  },
  cellRow: {
    '&:first-of-type td': {
      borderTop: `1px solid ${theme.palette.grey[200]}`,
    },
    '& td': {
      lineHeight: theme.spacing(2 * 3),
      fontWeight: 400,
      fontSize: 16,
    },
    '& td:first-of-type': {
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
    marginLeft: theme.spacing(2 * 0.5),
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
      marginLeft: theme.spacing(2 * 1),
      color: theme.palette.grey[600],
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}));
