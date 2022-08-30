import { makeStyles } from '@material-ui/core';

export const useYieldSliderStyles = makeStyles(theme => ({
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translate(-50%, 5px)',
    marginBottom: theme.spacing(1.5),

    maxWidth: 300,
    minWidth: 85,
    padding: theme.spacing(0.75, 1.25),

    background: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    fontSize: 13,
    border: '1px solid #E2E8F3',
    borderRadius: 8,

    opacity: 0,
    transition: 'opacity 0.2s, transform 0.2s',
  },

  tooltipOpen: {
    opacity: 1,
    transform: 'translate(-50%)',
  },

  tooltipTail: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginBottom: '-0.71em',
    marginLeft: '-0.5em',

    width: '1em',
    height: '0.71em',
    overflow: 'hidden',

    color: theme.palette.background.paper,

    '&:before': {
      content: `''`,
      display: 'block',
      width: '100%',
      height: '100%',
      margin: 'auto',

      transform: 'rotate(45deg)',
      transformOrigin: '100% 0',

      backgroundColor: 'currentColor',
      border: '1px solid #E2E8F3',
    },
  },
}));
