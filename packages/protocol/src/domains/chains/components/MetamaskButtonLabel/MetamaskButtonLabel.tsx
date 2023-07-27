import { t } from '@ankr.com/common';

import { useMetamaskButtonLabelStyles } from './MetamaskButtonLabelStyles';

export const MetamaskButtonLabel = () => {
  const { classes } = useMetamaskButtonLabelStyles();

  return (
    <span className={classes.metamaskButtonLabel}>
      {t('chain-item.get-started.endpoints.add-network-label')}
    </span>
  );
};
