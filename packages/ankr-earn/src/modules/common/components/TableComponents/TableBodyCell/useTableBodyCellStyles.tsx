import { alpha, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableBodyCellStyles = makeStyles<
  Theme,
  {
    dense?: boolean;
    paddingCollapse?: boolean;
  }
>(theme => ({
  cell: {
    fontWeight: 400,

    [theme.breakpoints.up('md')]: {
      display: 'inline-grid',
      alignItems: 'center',
      margin: ({ dense }) => (dense ? '' : theme.spacing(1, 0)),
      background: ({ dense }) => (dense ? '' : theme.palette.background.paper),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      borderTop: ({ dense }) =>
        dense ? `1px solid ${alpha(theme.palette.text.secondary, 0.1)}` : '',
    },

    '&:first-child': {
      [theme.breakpoints.up('md')]: {
        paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3)),
        borderRadius: ({ dense }) => (dense ? '' : '18px 0 0 18px'),
      },
    },

    '&:last-child': {
      [theme.breakpoints.up('md')]: {
        paddingRight: props => (props.paddingCollapse ? 0 : theme.spacing(3)),
        borderRadius: ({ dense }) => (dense ? '' : '0 18px 18px 0'),
      },
    },

    '&$centerCell': {
      [theme.breakpoints.up('md')]: {
        textAlign: 'center',
      },
    },

    '&$leftCell': {
      textAlign: 'left',
    },

    '&$rightCell': {
      [theme.breakpoints.up('md')]: {
        textAlign: 'right',
      },
    },
  },

  withCaption: {
    display: 'grid',
    gridTemplateColumns: '0.4fr 0.6fr',
    gap: theme.spacing(0, 2),
    textAlign: 'right',

    [theme.breakpoints.up('md')]: {
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

      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  },

  bodyCell: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    fontSize: 16,
    lineHeight: 1.3,

    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),

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
