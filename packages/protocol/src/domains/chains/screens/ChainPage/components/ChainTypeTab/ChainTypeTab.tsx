import { ReactNode } from 'react';

import { SecondaryTab } from 'modules/common/components/SecondaryTab';

import { useChainTypeTabStyles } from './useChainTypeTabStyles';

export interface ChainTypeTabProps {
  isLast?: boolean;
  isSelected: boolean;
  label: ReactNode | string;
  onClick?: () => void;
}

export const ChainTypeTab = ({
  isLast,
  isSelected,
  label,
  onClick,
}: ChainTypeTabProps) => {
  const { classes } = useChainTypeTabStyles();

  return (
    <SecondaryTab
      className={classes.root}
      isLast={isLast}
      isSelected={isSelected}
      label={label}
      onClick={onClick}
    />
  );
};
