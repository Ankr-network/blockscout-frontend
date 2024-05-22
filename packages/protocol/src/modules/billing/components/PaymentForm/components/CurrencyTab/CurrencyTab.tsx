import { ReactNode, useMemo } from 'react';

import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
import { PromoLabel } from 'modules/common/components/PromoLabel/PromoLabel';

import { useCurrencyTabStyles } from './useCurrencyTabStyles';

export interface ICurrencyTabProps {
  icon: ReactNode;
  isDisabled?: boolean;
  isSelected: boolean;
  label: string;
  promo?: string;
}

export const CurrencyTab = ({
  icon,
  isDisabled,
  isSelected,
  label,
  promo,
}: ICurrencyTabProps) => {
  const { classes } = useCurrencyTabStyles();

  const labelWithPromo = useMemo(() => {
    if (promo) {
      return (
        <>
          {label}
          <PromoLabel label={promo} />
        </>
      );
    }

    return label;
  }, [label, promo]);

  return (
    <SecondaryTab
      className={classes.currencyTabRoot}
      disabled={isDisabled}
      isSelected={isSelected}
      label={labelWithPromo}
      size={TabSize.Smallest}
      startIcon={icon}
    />
  );
};
