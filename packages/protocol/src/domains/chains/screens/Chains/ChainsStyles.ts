import { makeStyles, Theme } from '@material-ui/core';

export const useChainsStyles = makeStyles<Theme>(theme => ({
  title: {
    marginBottom: 30,
  },
  blockList: {
    display: 'grid',
    gap: 28,
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: 46,
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 18,
    padding: 20,
    backgroundColor: theme.palette.common.white,
  },
  subtitle: {
    color: theme.palette.text.primary,
    opacity: 0.5,
    paddingBottom: 20,
  },
}));
