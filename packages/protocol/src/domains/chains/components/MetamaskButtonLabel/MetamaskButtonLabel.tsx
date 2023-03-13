import { t } from '@ankr.com/common';
import { useMetamaskButtonLabelStyles } from './MetamaskButtonLabelStyles';

const label = t('chain-item.get-started.endpoints.add-network-label');

export const MetamaskButtonLabel = () => {
  const { classes } = useMetamaskButtonLabelStyles();

  return <span className={classes.metamaskButtonLabel}>{label}</span>;
};
