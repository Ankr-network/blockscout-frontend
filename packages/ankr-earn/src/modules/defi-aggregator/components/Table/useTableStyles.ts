import { makeStyles } from '@material-ui/core';

export const useTableStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3.5, 4, 4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 28,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: 1040,
  },

  tr: {
    borderBottom: `1px solid #E2E8F3`,
    '&:hover $protocolButton': {
      opacity: 1,
    },
  },

  vertAligned: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  protocolButton: {
    marginLeft: theme.spacing(5),

    [theme.breakpoints.up('md')]: {
      opacity: 0,
    },
  },

  rewardCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  arrowIconActive: {
    transform: 'rotate(180deg)',
  },

  shareIcon: {
    '& svg': {
      color: theme.palette.primary.main,
      fill: 'transparent',
    },
  },

  tokenIcon: {
    fontSize: 24,
    width: '1em',
    height: '1em',

    '& + &': {
      marginLeft: theme.spacing(-2),
    },
  },
}));
