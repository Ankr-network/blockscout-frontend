import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSampleCodeStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    width: 98,
    top: -54,
    right: theme.spacing(2.75),
    backgroundColor: theme.palette.text.primary,
    padding: '6px 12px',
    borderRadius: 11,
  },
  codeContainer: {
    height: 360,
  },
  code: {
    counterReset: 'step',
    counterIncrement: 'step 0',
    padding: theme.spacing(0, 5.25, 2.25, 2.75),
    margin: 0,
    marginLeft: '5em',

    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',

    position: 'relative',

    '& .token-line:before': {
      content: `counter(step)`,
      counterIncrement: 'step',
      position: 'absolute',
      left: '-3em',
    },

    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'pre',
      wordBreak: 'normal',
    },
  },
}));
