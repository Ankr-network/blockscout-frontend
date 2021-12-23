import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableBodyCellStyles = makeStyles<
  Theme,
  {
    dense?: boolean;
    paddingCollapse?: boolean;
    on?: boolean;
  }
>(theme => ({
  cell: {
    fontWeight: 400,
    display: 'inline-grid',
    alignItems: 'center',

    '&:first-child': {
      paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
    },

    '&:last-child': {
      paddingRight: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
    },

    '&$centerCell': {
      textAlign: 'center',
    },

    '&$leftCell': {
      textAlign: 'left',
    },

    '&$rightCell': {
      textAlign: 'right',
    },
  },

  bodyCell: {
    padding: theme.spacing(2.25, 1.5, 2.25, 1.5),
    fontSize: 16,
    lineHeight: 1.3,
    color: theme.palette.text.primary,

    paddingTop: props =>
      props.dense ? theme.spacing(1.5) : theme.spacing(2.25),
    paddingBottom: props =>
      props.dense ? theme.spacing(1.5) : theme.spacing(2.25),

    minHeight: props => (props.dense ? 0 : theme.spacing(11)),
  },

  centerCell: {},
  leftCell: {},
  rightCell: {},

  cellWrapper: {
    width: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: 14,
  },

  tableCell: {
    position: 'relative',
    transitionTimingFunction: 'linear',
    transitionDuration: '200ms',
    transitionProperty: 'background-color',
  },
}));
