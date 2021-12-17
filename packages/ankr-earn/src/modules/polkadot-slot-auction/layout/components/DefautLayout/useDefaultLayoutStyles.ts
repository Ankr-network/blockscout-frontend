import { makeStyles } from '@material-ui/core/styles';
import { FONTS } from 'modules/themes/mainTheme';

export const useDefaultLayoutStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    fontFamily: FONTS.primary,
    fontWeight: 400,
    backgroundColor: theme.palette.background.paper,
    '-webkit-backface-visibility': 'hidden',
    '-moz-backface-visibility': 'hidden',
    '-webkit-font-smoothing': 'antialiased',
    '& *': {
      outline: 'none',
      '-webkit-tap-highlight-color': 'transparent',
      '&::-moz-focus-inner': {
        border: 0,
      },
    },
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'initial',
    maxWidth: '100vw',
  },
}));
