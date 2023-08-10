import { ReactNode } from 'react';

import { SecondaryTab } from 'modules/common/components/SecondaryTab';

import { usePriceTabStyles } from './PriceTabStyles';

export interface PriceTabProps {
  isSelected: boolean;
  label: ReactNode;
}

export const PriceTab = ({ isSelected, label }: PriceTabProps) => {
  const { classes } = usePriceTabStyles();

  return (
    <SecondaryTab
      className={classes.root}
      isSelected={isSelected}
      label={label}
    />
  );
};
