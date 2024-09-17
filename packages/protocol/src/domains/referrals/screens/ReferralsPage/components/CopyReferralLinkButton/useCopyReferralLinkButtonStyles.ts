import { makeStyles } from 'tss-react/mui';

const name = 'CopyReferralLinkButton';

export const useCopyReferralLinkButtonStyles = makeStyles({ name })(theme => ({
  root: {
    padding: theme.spacing(1.5, 3, 1.5, 2),
  },
}));
