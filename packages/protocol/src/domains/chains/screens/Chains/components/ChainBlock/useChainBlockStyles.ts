import { makeStyles, Theme } from '@material-ui/core';

export const useChainBlockStyles = makeStyles<Theme>(theme => ({
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
    paddingBottom: 8,
  },
  text: {
    minHeight: 24,
  },
  skeleton: {
    width: 160,
    height: 24,
    marginTop: -4,
    transform: 'none',
  },
}));
