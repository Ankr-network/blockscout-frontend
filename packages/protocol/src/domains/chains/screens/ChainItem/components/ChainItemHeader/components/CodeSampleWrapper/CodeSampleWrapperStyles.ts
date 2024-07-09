import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const codeWrapperBackgroundDark = '#17191C';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    root: {
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
      backgroundImage: 'none',
    },
    header: {
      width: '50%',
      padding: theme.spacing(8),
      gap: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    copyButton: {
      boxShadow: 'none',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.secondary,

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    btnDocs: {
      border: 'none',
      borderRadius: theme.shape.borderRadius,

      '&:hover': {
        color: isLightTheme
          ? theme.palette.background.paper
          : theme.palette.text.primary,
      },

      '&:active, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    codeSampleWrapper: {
      margin: 0,
      background: isLightTheme
        ? theme.palette.text.primary
        : codeWrapperBackgroundDark,
      width: '50%',
      padding: theme.spacing(6),
      alignSelf: 'stretch',
      fontSize: 12,
      minHeight: '466px',
      lineBreak: 'anywhere',

      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    sandboxHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tabsWrapper: {
      backgroundColor: isLightTheme
        ? theme.palette.background.default
        : theme.palette.secondary.dark,
      padding: theme.spacing(0.75),
      borderRadius: 11,
    },
    tab: {
      borderRadius: 9,
      overflow: 'hidden',
    },
    codeSample: {
      whiteSpace: 'pre-wrap',
    },
  }),
);
