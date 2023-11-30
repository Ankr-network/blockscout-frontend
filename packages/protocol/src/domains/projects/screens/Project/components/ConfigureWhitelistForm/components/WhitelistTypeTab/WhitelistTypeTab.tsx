import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { SecondaryTab, TabSize } from 'modules/common/components/SecondaryTab';
import { whitelistTypeLabelMap } from 'domains/projects/const';

import { useWhitelistTypeTabStyles } from './useWhitelistTypeTabStyles';

export interface WhitelistTypeTabProps {
  isSelected: boolean;
  type: UserEndpointTokenMode;
}

export const WhitelistTypeTab = ({
  isSelected,
  type,
}: WhitelistTypeTabProps) => {
  const { classes } = useWhitelistTypeTabStyles();

  return (
    <SecondaryTab
      className={classes.root}
      isSelected={isSelected}
      label={t(whitelistTypeLabelMap[type], { plurals: 2 })}
      size={TabSize.Small}
    />
  );
};
