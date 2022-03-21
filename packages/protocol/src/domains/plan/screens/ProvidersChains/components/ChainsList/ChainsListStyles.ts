import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const CARD_MIN_WIDTH = 158;

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    flexShrink: 0,
    width: '100%',
    margin: 0,

    display: 'grid',
    gridGap: theme.spacing(2.5),

    gridTemplateColumns: `repeat(4, minmax(${CARD_MIN_WIDTH}px, 1fr))`,

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_MIN_WIDTH}px, 1fr))`,
    },
  },
  wrapper: {
    height: '100%',
    overflow: 'hidden',

    borderRadius: 18,
    transition: 'box-shadow 0.2s',

    '&:hover': {
      boxShadow:
        '0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)',
    },
  },
}));
