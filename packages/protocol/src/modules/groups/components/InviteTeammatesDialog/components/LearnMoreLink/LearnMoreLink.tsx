import { Link } from '@mui/material';
import { t } from '@ankr.com/common';

import { ANKR_DOCS_INVITE_TEAMMATE_LINK } from 'modules/common/constants/const';

import { useLearnMoreLinkStyles } from './useLearnMoreLinkStyles';

const intlKey =
  'teams.invite-teammates-dialog.invitee-role-selector.learn-more-link';

export const LearnMoreLink = () => {
  const { classes } = useLearnMoreLinkStyles();

  return (
    <Link
      className={classes.root}
      href={ANKR_DOCS_INVITE_TEAMMATE_LINK}
      target="_blank"
      variant="button3"
    >
      {t(intlKey)}
    </Link>
  );
};
