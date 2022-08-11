import { Theme, makeStyles } from '@material-ui/core';

export const useChainSubtitleStyles = makeStyles<Theme>(theme => ({
  chainSubtitle: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  description: {
    fontWeight: 400,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
  archiveLabel: {
    display: 'flex',
    alignItems: 'center',

    borderRadius: theme.spacing(1),

    fontWeight: 400,
    fontSize: theme.spacing(1.75),
    lineHeight: `${theme.spacing(2.5)}px`,
  },
}));
