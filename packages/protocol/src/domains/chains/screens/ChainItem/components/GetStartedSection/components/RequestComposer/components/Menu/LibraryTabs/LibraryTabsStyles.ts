import { makeStyles, Theme } from '@material-ui/core/styles';

export const useTopUpTabsStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'inline-flex',

    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(1.75),

    background: theme.palette.background.default,

    marginBottom: theme.spacing(1.5),
    width: '100%',

    '& > div': {
      width: '100%',

      '& > div, button': {
        width: '100%',
      },
    },
  },
}));
