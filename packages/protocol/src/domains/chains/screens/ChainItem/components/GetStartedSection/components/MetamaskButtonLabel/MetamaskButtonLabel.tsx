import { root } from '../../const';
import { t } from 'modules/i18n/utils/intl';
import { useMetamaskButtonLabelStyles } from './MetamaskButtonLabelStyles';

const label = t(`${root}.endpoints.add-network-label`);

export const MetamaskButtonLabel = () => {
  const classes = useMetamaskButtonLabelStyles();

  return <span className={classes.metamaskButtonLabel}>{label}</span>;
};
