import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme, boolean>(theme => ({
  codeSnippet: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),

    marginBottom: theme.spacing(2.25),
  },
  title: {
    color: theme.palette.text.primary,

    letterSpacing: '0.01em',

    fontWeight: 700,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
  codeContainer: {
    borderRadius: theme.spacing(3),

    backgroundColor: theme.palette.grey[700],
  },
  codeView: {
    maxHeight: isExpanded => (isExpanded ? 'none' : theme.spacing(56.25)),
  },
  code: {
    padding: `${theme.spacing(2.25)}px ${theme.spacing(5.25)}px ${theme.spacing(
      2.25,
    )}px 21px`,
    margin: 0,

    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',

    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'pre',
      wordBreak: 'normal',
    },
  },
  expandButton: {
    marginTop: theme.spacing(2),
  },
}));
