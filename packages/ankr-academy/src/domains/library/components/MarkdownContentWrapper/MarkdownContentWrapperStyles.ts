import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useMarkdownContentWrapperStyles = makeStyles<Theme>(theme => ({
  root: {},
  messageMarkdown: {
    fontSize: 16,
    '&+&': {
      marginTop: theme.spacing(3),
    },
    '& a': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },
  },
  glossary: {
    display: 'inline',
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.text.primary,
    backgroundColor: '#F4E9D0',
    padding: 4,
    borderRadius: 4,
    transition: 'background-color .3s',

    '&:hover': {
      backgroundColor: '#EEA941',
    },
  },
}));
