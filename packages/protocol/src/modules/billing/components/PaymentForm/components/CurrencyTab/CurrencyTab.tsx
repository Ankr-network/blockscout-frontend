import { ReactNode } from 'react';

import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';

import { useCurrencyTabStyles } from './useCurrencyTabStyles';

export interface ICurrencyTabProps {
  icon: ReactNode;
  isDisabled?: boolean;
  isSelected: boolean;
  label: string;
}

export const CurrencyTab = ({
  icon,
  isDisabled,
  isSelected,
  label,
}: ICurrencyTabProps) => {
  const { classes } = useCurrencyTabStyles();

  return (
    <SecondaryTab
      className={classes.currencyTabRoot}
      disabled={isDisabled}
      isSelected={isSelected}
      label={label}
      size={TabSize.Smallest}
      startIcon={icon}
    />
  );
};
