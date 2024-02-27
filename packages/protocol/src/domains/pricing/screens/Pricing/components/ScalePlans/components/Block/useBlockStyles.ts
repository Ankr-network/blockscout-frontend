import { makeStyles } from 'tss-react/mui';

import { MAX_WIDTH, MIDDLE_WIDTH } from '../../useScalePlansStyles';

export const useBlockStyles = makeStyles()(theme => ({
  block: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(7),
    borderRadius: 9,

    [theme.breakpoints.down(MAX_WIDTH)]: {
      width: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
    columnGap: theme.spacing(5),
    flexWrap: 'wrap',

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      flexDirection: 'row',
      columnGap: 0,
      rowGap: theme.spacing(3),
    },
  },
  headerItem: {
    flexShrink: 0,
    letterSpacing: -1,
    color: theme.palette.text.primary,

    [`&:first-of-type`]: {
      width: theme.spacing(52),
    },

    [`&:nth-of-type(2)`]: {
      textAlign: 'right',
      width: theme.spacing(46),
    },

    [`&:last-of-type`]: {
      textAlign: 'right',
      width: theme.spacing(40),
    },

    [theme.breakpoints.down(MAX_WIDTH)]: {
      [`&:first-of-type`]: {
        width: theme.spacing(21),
      },

      [`&:nth-of-type(2)`]: {
        textAlign: 'right',
        width: theme.spacing(52),
      },
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      [`&:first-of-type`]: {
        width: '100%',
      },

      [`&:not(:first-of-type)`]: {
        width: '50%',
        fontWeight: 400,
        textAlign: 'left',
      },

      [`&:last-of-type`]: {
        textAlign: 'right',
      },
    },
  },
  cellRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: theme.spacing(6),
    flexWrap: 'wrap',

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      flexDirection: 'row',
      columnGap: 0,
      rowGap: theme.spacing(3),
    },
  },
  cell: {
    color: theme.palette.text.primary,
    display: 'block',
    marginBottom: theme.spacing(1),
    flexShrink: 0,
    letterSpacing: -1,

    [`&:first-of-type`]: {
      width: theme.spacing(52),
    },

    [`&:nth-of-type(2)`]: {
      width: theme.spacing(46),
      textAlign: 'right',
    },

    [`&:last-of-type`]: {
      width: theme.spacing(40),
      textAlign: 'right',
    },

    [theme.breakpoints.down(MAX_WIDTH)]: {
      [`&:nth-of-type(2)`]: {
        width: theme.spacing(21),
      },
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      [`&:first-of-type`]: {
        fontWeight: 700,
        width: '100%',
      },

      [`&:not(:first-of-type)`]: {
        width: '50%',
        textAlign: 'left',
      },

      [`&:last-of-type`]: {
        textAlign: 'right',
      },
    },
  },
}));
