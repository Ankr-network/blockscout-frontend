import { alpha, Theme } from '@material-ui/core';
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

    [theme.breakpoints.up('sm')]: {
      display: 'inline-grid',
      alignItems: 'center',
      paddingLeft: theme.spacing(4.5),
      paddingRight: theme.spacing(4.5),
      borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    },

    '&:first-child': {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
      },
    },

    '&:last-child': {
      [theme.breakpoints.up('sm')]: {
        paddingRight: props =>
          props.paddingCollapse ? 0 : theme.spacing(3.75),
      },
    },

    '&$centerCell': {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'center',
      },
    },

    '&$leftCell': {
      textAlign: 'left',
    },

    '&$rightCell': {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
      },
    },
  },

  withCaption: {
    display: 'grid',
    gridTemplateColumns: '0.4fr 0.6fr',
    gap: theme.spacing(0, 2),
    textAlign: 'right',

    [theme.breakpoints.up('sm')]: {
      display: 'inline-grid',
      textAlign: 'left',
      gridTemplateColumns: 'auto',
      gap: 0,
    },

    '&::before': {
      content: 'attr(data-label)',
      display: 'block',
      maxWidth: '100%',
      fontSize: 14,
      color: theme.palette.text.secondary,
      textAlign: 'left',

      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  },

  bodyCell: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    fontSize: 16,
    lineHeight: 1.3,
    color: theme.palette.common.white,

    [theme.breakpoints.up('sm')]: {
      paddingTop: props =>
        props.dense ? theme.spacing(1.5) : theme.spacing(2.5),
      paddingBottom: props =>
        props.dense ? theme.spacing(1.5) : theme.spacing(2.5),

      minHeight: props => (props.dense ? 0 : theme.spacing(10)),
    },
  },

  centerCell: {},
  leftCell: {},
  rightCell: {},

  cellWrapper: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
