import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSampleCodeStyles = makeStyles<boolean>()(
  (theme: Theme, isLightTheme: boolean) => ({
    root: {
      position: 'relative',
    },
    copyButton: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: -66,
      right: theme.spacing(5.5),
      backgroundColor: theme.palette.background.paper,
      borderRadius: 11,
      [theme.breakpoints.down(540)]: {
        position: 'relative',
        top: -10,
        left: 22,
      },
    },
    codeContainer: {
      height: 360,
      backgroundColor: isLightTheme
        ? theme.palette.grey[800]
        : theme.palette.background.default,
    },
    code: {
      counterReset: 'step',
      counterIncrement: 'step 0',
      padding: theme.spacing(0, 10.5, 4.5, 5.5),
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
    },
  }),
);
