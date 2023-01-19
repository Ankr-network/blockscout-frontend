import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isExpanded: boolean) => ({
    codeSnippet: {
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',

      width: '100%',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2 * 2.5),

      marginBottom: theme.spacing(2 * 2.25),
    },
    title: {
      color: theme.palette.text.primary,

      letterSpacing: '0.01em',

      fontWeight: 700,
      fontSize: theme.spacing(2 * 1.75),
      lineHeight: theme.spacing(2 * 2.5),
    },
    codeContainer: {
      borderRadius: theme.spacing(2 * 3),

      backgroundColor: theme.palette.grey[800],
    },
    codeView: {
      maxHeight: isExpanded ? 'none' : theme.spacing(2 * 56.25),
    },
    code: {
      padding: theme.spacing(2 * 2.25, 2 * 5.25, 2 * 2.25),
      paddingLeft: theme.spacing(2 * 2.625),
      margin: 0,

      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',

      [theme.breakpoints.down('sm')]: {
        whiteSpace: 'pre',
        wordBreak: 'normal',
      },
    },
    expandButton: {
      marginTop: theme.spacing(2 * 2),
    },
  }),
);
