import { SecondaryTab } from 'modules/common/components/SecondaryTab';

import { useGroupTabStyles } from './useGroupTabStyles';

export interface GroupTabProps {
  isLast: boolean;
  isSelected: boolean;
  label: string;
}

export const GroupTab = ({ isLast, isSelected, label }: GroupTabProps) => {
  const { classes } = useGroupTabStyles();

  return (
    <SecondaryTab
      className={classes.root}
      isLast={isLast}
      isSelected={isSelected}
      label={label}
    />
  );
};
