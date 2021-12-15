import { alpha, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableHeadCellStyles = makeStyles<
  Theme,
  { dense?: boolean; paddingCollapse?: boolean },
  'cell' | 'headCell' | 'centerCell' | 'leftCell' | 'rightCell' | 'content'
>(theme =>
  createStyles({
    cell: {
      display: 'inline-grid',
      alignItems: 'center',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      fontWeight: 400,
      textAlign: 'left',

      '&:first-child': {
        paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3)),
      },

      '&:last-child': {
        paddingRight: props => (props.paddingCollapse ? 0 : theme.spacing(3)),
      },

      '&$centerCell': {
        textAlign: 'center',
        justifyContent: 'center',
      },

      '&$leftCell': {
        textAlign: 'left',
      },

      '&$rightCell': {
        textAlign: 'right',
        justifyContent: 'flex-end',
      },
    },

    headCell: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      boxSizing: 'border-box',
      fontSize: 12,
      lineHeight: 1.5,
      color: theme.palette.text.secondary,
      borderBottom: ({ dense }) =>
        dense ? `1px solid ${alpha(theme.palette.text.secondary, 0.1)}` : '',
    },

    centerCell: {},
    leftCell: {},
    rightCell: {},

    content: {
      fontSize: 14,
      width: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  }),
);
