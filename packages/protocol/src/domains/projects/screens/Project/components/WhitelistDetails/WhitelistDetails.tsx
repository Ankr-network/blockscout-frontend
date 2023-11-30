import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { Placeholder } from 'modules/common/components/Placeholder';
import { ProjectSidebarDescription } from 'domains/projects/screens/Project/components/ProjectSidebarDescription';
import { ProjectSidebarTitle } from 'domains/projects/screens/Project/components/ProjectSidebarTitle';
import { WhitelistItemsCounters } from 'domains/projects/components/WhitelistItemsCounters';

import { WhitelistTable } from '../ConfigureWhitelistForm/components/WhitelistTable';
import {
  WhitelistTableControls,
  WhitelistTableControlsProps,
} from '../ConfigureWhitelistForm/components/WhitelistTableControls';
import { WhitelistTablePlaceholder } from '../ConfigureWhitelistForm/components/WhitelistTablePlaceholder';
import { useWhitelistDetailsStyles } from './useWhitelistDetailsStyles';

export interface WhitelistDetailsProps extends WhitelistTableControlsProps {
  domainsCount: number;
  handleEditSidebarOpening: (value: string) => void;
  ipsCount: number;
  smartContractsCount: number;
  whitelistType: UserEndpointTokenMode;
}

export const WhitelistDetails = ({
  domainsCount,
  handleEditSidebarOpening,
  ipsCount,
  selectedWhitelistTypeTab,
  setAddDomainContent,
  setAddIPContent,
  setAddSmartContractContent,
  smartContractsCount,
  whitelist,
  whitelistType,
  whitelistTypeTabs,
}: WhitelistDetailsProps) => {
  const hasPlaceholder = useMemo(
    () => [...new Set(whitelist.flatMap(item => item.list))].length === 0,
    [whitelist],
  );

  const { classes } = useWhitelistDetailsStyles();

  return (
    <div>
      <ProjectSidebarTitle className={classes.title}>
        {t('project.configure-whitelist-form.title')}
      </ProjectSidebarTitle>
      <ProjectSidebarDescription className={classes.description}>
        {t('project.configure-whitelist-form.description')}
      </ProjectSidebarDescription>
      <WhitelistItemsCounters
        className={classes.whitelistItemsCounters}
        domainsCount={domainsCount}
        ipsCount={ipsCount}
        smartContractsCount={smartContractsCount}
      />
      <Placeholder
        hasPlaceholder={hasPlaceholder}
        placeholder={
          <WhitelistTablePlaceholder
            setAddDomainContent={setAddDomainContent}
            setAddIPContent={setAddIPContent}
            setAddSmartContractContent={setAddSmartContractContent}
            whitelist={whitelist}
          />
        }
      >
        <WhitelistTableControls
          selectedWhitelistTypeTab={selectedWhitelistTypeTab}
          setAddDomainContent={setAddDomainContent}
          setAddIPContent={setAddIPContent}
          setAddSmartContractContent={setAddSmartContractContent}
          whitelist={whitelist}
          whitelistTypeTabs={whitelistTypeTabs}
        />
        <WhitelistTable
          handleEditSidebarOpening={handleEditSidebarOpening}
          whitelist={whitelist}
          whitelistType={whitelistType}
        />
      </Placeholder>
    </div>
  );
};
