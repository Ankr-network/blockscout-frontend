import { ANKRLogo, USDCLogo, USDTLogo } from '@ankr.com/ui';
import { useMemo } from 'react';
import { EBlockchain } from 'multirpc-sdk';

import { ECurrency } from 'modules/billing/types';
import { useChainIcon } from 'uiKit/hooks/useChainIcon';
import { ChainID } from 'modules/chains/types';

import { useCurrencyIconStyles } from './useCurrencyIconStyles';

interface ICurrencyIconProps {
  currency: ECurrency;
  currencyClassName?: string;
  network?: EBlockchain;
  networkClassName?: string;
  rootClassName?: string;
}

export const CurrencyIcon = ({
  currency,
  network,
  currencyClassName,
  networkClassName,
  rootClassName,
}: ICurrencyIconProps) => {
  const { classes, cx } = useCurrencyIconStyles();

  const networkIcon = useChainIcon(network as unknown as ChainID);

  const currencyIcon = useMemo(() => {
    switch (currency) {
      case ECurrency.ANKR:
        return <ANKRLogo className={cx(classes.icon, currencyClassName)} />;
      case ECurrency.USDC:
        return <USDCLogo className={cx(classes.icon, currencyClassName)} />;
      case ECurrency.USDT:
        return <USDTLogo className={cx(classes.icon, currencyClassName)} />;
      case ECurrency.USD:
      default:
        return null;
    }
  }, [currency, classes, currencyClassName, cx]);

  return (
    <div className={cx(classes.root, rootClassName)}>
      {currencyIcon}
      {network && networkIcon.length && (
        <img
          src={networkIcon}
          className={cx(classes.networkIcon, networkClassName)}
          alt={network}
        />
      )}
    </div>
  );
};
