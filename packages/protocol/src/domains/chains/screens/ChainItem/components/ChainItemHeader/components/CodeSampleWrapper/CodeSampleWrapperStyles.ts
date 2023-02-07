import { makeStyles } from 'tss-react/mui';
import { Theme } from '@mui/material/styles';

const codeWrapperBackgroundDark = '#17191C';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    root: {
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
      marginBottom: theme.spacing(10),
    },
    header: {
      width: '50%',
      padding: theme.spacing(2 * 3.75),
      gap: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    buttons: {
      display: 'flex',
      gap: theme.spacing(4),

      [theme.breakpoints.down('md')]: {
        gap: theme.spacing(2),
      },

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    btn: {
      width: '100%',
      whiteSpace: 'nowrap',
      padding: theme.spacing(1),
      '&&': {
        boxShadow: 'none',
        border: `2px solid ${
          isLightTheme
            ? theme.palette.secondary.light
            : theme.palette.secondary.dark
        }`,
      },

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
    tabsWrapper: {
      backgroundColor: isLightTheme
        ? theme.palette.grey[900]
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
