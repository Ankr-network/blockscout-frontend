import { makeStyles, Theme } from '@material-ui/core/styles';

export const useTopUpTabsStyles = makeStyles<
  Theme,
  { canPayOnlyByCard: boolean }
>(theme => ({
  root: {
    display: 'inline-flex',

    border: props =>
      props.canPayOnlyByCard
        ? ''
        : `2px solid ${theme.palette.background.default}`,
    borderRadius: theme.spacing(1.75),

    background: theme.palette.background.default,

    marginBottom: theme.spacing(1.5),

    '& > div': {
      width: '100%',

      '& > div': {
        width: '100%',
      },
    },
  },
}));
