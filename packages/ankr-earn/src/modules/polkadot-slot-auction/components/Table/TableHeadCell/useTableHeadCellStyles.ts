import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTableHeadCellStyles = makeStyles<
  Theme,
  { dense?: boolean; paddingCollapse?: boolean; on?: boolean },
  'cell' | 'headCell' | 'centerCell' | 'leftCell' | 'rightCell' | 'content'
>(theme =>
  createStyles({
    cell: {
      display: 'inline-grid',
      alignItems: 'center',
      fontWeight: 400,
      textAlign: 'left',

      '&:first-child': {
        paddingLeft: props => (props.paddingCollapse ? 0 : theme.spacing(3.75)),
      },

      '&:last-child': {
        paddingRight: props =>
          props.paddingCollapse ? 0 : theme.spacing(3.75),
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
      padding: theme.spacing(1.5),
      boxSizing: 'border-box',
      fontSize: 12,
      lineHeight: 1.5,
      color: theme.palette.text.secondary,
    },

    centerCell: {},
    leftCell: {},
    rightCell: {},

    content: {
      fontSize: 14,
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  }),
);
