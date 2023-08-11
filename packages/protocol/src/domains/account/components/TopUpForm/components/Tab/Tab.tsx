import { ReactNode } from 'react';

import { SecondaryTab } from 'modules/common/components/SecondaryTab';

import { useTabStyles } from './TabStyles';

export interface TabProps {
  icon: ReactNode;
  isSelected: boolean;
  label: string;
}

export const Tab = ({ icon, isSelected, label }: TabProps) => {
  const { classes } = useTabStyles();

  return (
    <SecondaryTab
      className={classes.root}
      isSelected={isSelected}
      label={label}
      startIcon={icon}
    />
  );
};
