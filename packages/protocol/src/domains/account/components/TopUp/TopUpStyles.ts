import { makeStyles } from 'tss-react/mui';

interface TopUpStyleProps {
  canPayOnlyByCard?: boolean;
}

export const useTopUpStyles = makeStyles<TopUpStyleProps>()((theme, props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    borderRadius: 30,
  },
  tab: {
    borderRadius: 17,
  },
  tabs: {
    display: 'inline-flex',

    width: '100%',

    border: props.canPayOnlyByCard
      ? ''
      : `2px solid ${theme.palette.background.default}`,
    borderRadius: 17,

    background: theme.palette.background.default,

    marginBottom: theme.spacing(4),

    '& > div': {
      width: '100%',

      '& > div': {
        width: '100%',
      },
    },
  },
}));
