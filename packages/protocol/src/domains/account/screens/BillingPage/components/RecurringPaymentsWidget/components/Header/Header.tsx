import { t } from '@ankr.com/common';

import { WidgetTitle } from '../../../WidgetTitle';
import { useHeaderStyles } from './useHeaderStyles';

export const Header = () => {
  const { classes } = useHeaderStyles();

  return (
    <WidgetTitle className={classes.widgetTitle}>
      {t('account.account-details.subscriptions.title')}
    </WidgetTitle>
  );
};
