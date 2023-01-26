import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<void, 'rowColumn' | 'row'>()(
  (theme, _params, classes) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(0, 2 * 3),
      backgroundImage: 'none',
    },
    listContainer: {
      flex: '1 0 auto',
    },
    row: {
      display: 'flex',
      breakInside: 'avoid',
      alignItems: 'center',
      height: 56,
      flexShrink: 0,
    },
    vRow: {
      [`&:last-child .${classes.rowColumn}`]: {
        borderBottom: 'none',
      },
    },
    rowColumn: {
      display: 'flex',
      flexDirection: 'column',
      borderBottom: `1px solid ${theme.palette.divider}`,
      height: '100%',
      justifyContent: 'flex-start',
    },
    rowExpanded: {
      [`&:.${classes.row}`]: {
        fontWeight: 600,
      },
    },
    rowExpand: {
      padding: theme.spacing(0, 0, 2 * 2),
      maxHeight: 444,
      overflow: 'auto',
    },
    rowHead: {
      height: 49,
      flexShrink: 0,
      paddingTop: theme.spacing(2 * 1),
      fontSize: 11,
      color: theme.palette.grey[600],
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    col: {
      wordWrap: 'break-word',
      padding: theme.spacing(2 * 1),

      '&:first-of-type': {
        paddingLeft: 0,
      },
      '&:last-of-type': {
        paddingRight: 0,
      },
    },
    colGrow: {
      flex: '1 0 auto',
    },
    colSortable: {
      cursor: 'pointer',
      position: 'relative',
    },
    sortIconActive: {
      '&:after': {
        display: 'block',
        position: 'absolute',
        content: 'attr(data-content)',
        top: -2,
        right: -16,
      },
    },
    moreRow: {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    moreBtn: {
      '&&': {
        width: '100%',
        height: '100%',
        padding: 0,
        background: 'none',
      },
    },
    empty: {
      textAlign: 'center',
      padding: theme.spacing(2 * 3),

      fontSize: theme.spacing(2 * 1.75),
    },
  }),
);
