import { UserEndpointTokenMode, WhitelistItem } from 'multirpc-sdk';

import { Tab } from 'modules/common/hooks/useTabs';

import {
  AddWhitelistButton,
  AddWhitelistButtonProps,
} from '../AddWhitelistButton';
import { WhitelistTypeSelector } from '../WhitelistTypeSelector';
import { useWhitelistTableControlsStyles } from './useWhitelistTableControlsStyles';

export interface WhitelistTableControlsProps
  extends Omit<AddWhitelistButtonProps, 'className' | 'iconClassName'> {
  selectedWhitelistTypeTab?: Tab<UserEndpointTokenMode>;
  whitelist: WhitelistItem[];
  whitelistTypeTabs: Tab<UserEndpointTokenMode>[];
}

export const WhitelistTableControls = ({
  selectedWhitelistTypeTab,
  setAddDomainContent,
  setAddIPContent,
  setAddSmartContractContent,
  whitelist,
  whitelistTypeTabs,
}: WhitelistTableControlsProps) => {
  const { classes } = useWhitelistTableControlsStyles();

  return (
    <div className={classes.root}>
      <WhitelistTypeSelector
        selectedTab={selectedWhitelistTypeTab}
        tabs={whitelistTypeTabs}
      />
      <AddWhitelistButton
        setAddDomainContent={setAddDomainContent}
        setAddIPContent={setAddIPContent}
        setAddSmartContractContent={setAddSmartContractContent}
        whitelist={whitelist}
      />
    </div>
  );
};
