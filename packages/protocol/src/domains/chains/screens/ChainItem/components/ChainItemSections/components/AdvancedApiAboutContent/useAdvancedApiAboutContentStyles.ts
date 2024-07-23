import { makeStyles } from 'tss-react/mui';

import { getLinkStyles } from '../AdvancedApiInfoTabs/useAdvancedApiInfoTabsStyles';

export const useAdvancedApiAboutContentStyles = makeStyles()(theme => ({
  advancedApiAboutSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(4),
    maxWidth: 425,
  },
  advancedApiLearnMoreLink: getLinkStyles(theme),
}));
