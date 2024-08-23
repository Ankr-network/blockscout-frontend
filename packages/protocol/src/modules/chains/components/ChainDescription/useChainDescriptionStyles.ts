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
  },
  top: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: 0,
  },
  topWithMargin: {
    marginBottom: theme.spacing(2.5),
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
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
  },
  premiumChip: {
    height: 20,
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    display: 'flex',
    alignItems: 'center',
    '&::after': {
      marginLeft: theme.spacing(1),
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
