import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSampleCodeStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    width: 110,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -66,
    right: theme.spacing(2 * 2.75),
    backgroundColor: theme.palette.grey[900],
    padding: theme.spacing(2 * 0.75, 2 * 1.5),
    borderRadius: 11,
    [theme.breakpoints.down(540)]: {
      position: 'relative',
      top: -10,
      left: 22,
    },
  },
  codeContainer: {
    height: 360,
  },
  code: {
    counterReset: 'step',
    counterIncrement: 'step 0',
    padding: theme.spacing(2 * 0, 2 * 5.25, 2 * 2.25, 2 * 2.75),
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
