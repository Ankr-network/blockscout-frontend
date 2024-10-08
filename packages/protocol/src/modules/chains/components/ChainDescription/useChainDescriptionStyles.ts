import { makeStyles } from 'tss-react/mui';

export const useChainDescriptionStyles = makeStyles()(theme => ({
  chainDescriptionRoot: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  top: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: 0,
  },
  topWithMargin: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  chainName: {
    fontSize: 28,
    lineHeight: 1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  chainNameSmall: {
    fontSize: 16,
  },
  coinName: {
    fontWeight: 400,
    fontSize: 20,
    display: 'flex',
    marginLeft: theme.spacing(2),
    lineHeight: 1.1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: 1,
    },
  },
  coinNameSmall: {
    fontSize: 14,
  },
  archiveLabel: {
    height: 20,
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.spacing(2),
    fontWeight: 400,
    fontSize: theme.spacing(3.5),
    lineHeight: theme.spacing(5),

    [theme.breakpoints.down('xs')]: {
      height: 16,
      padding: theme.spacing(1),
      fontSize: 9,
      lineHeight: 1,
      borderRadius: 4,
    },
  },
  chips: {
    display: 'flex',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
  },
  premiumChip: {
    height: 20,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      height: 16,
      borderRadius: 4,
    },

    span: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.down('xs')]: {
        padding: 0,
        fontSize: 9,
        lineHeight: 1,
      },
    },
  },
  dot: {
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      content: '""',
      width: 2,
      height: 2,
      borderRadius: '50%',
      backgroundColor: theme.palette.text.secondary,
    },
  },
  noMargin: {
    '&::after': {
      marginLeft: 0,
    },
  },
}));
