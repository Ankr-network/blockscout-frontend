import { t } from '@ankr.com/common';

import { SelectedChainCard } from 'domains/projects/components/SelectedChainCard';
import {
  NetworksSelector,
  NetworksSelectorProps,
} from 'domains/projects/components/NetworksSelector';

import { ProjectSidebarDescription } from '../ProjectSidebarDescription';
import { ProjectSidebarTitle } from '../ProjectSidebarTitle';
import { useConfigureNetworksFormStyles } from './useConfigureNetworksFormStyles';

export interface ConfigureNetworksFormProps extends NetworksSelectorProps {}

export const ConfigureNetworksForm = ({
  allSubchainPaths,
  chain,
  handleUpdateNetworksPaths,
  selectedSubchainPaths,
}: ConfigureNetworksFormProps) => {
  const { classes } = useConfigureNetworksFormStyles();

  return (
    <div className={classes.root}>
      <ProjectSidebarTitle className={classes.title}>
        {t('project.configure-networks-form.title')}
      </ProjectSidebarTitle>
      <ProjectSidebarDescription className={classes.description}>
        {t('project.configure-networks-form.description')}
      </ProjectSidebarDescription>
      <SelectedChainCard chain={chain} />
      <NetworksSelector
        allSubchainPaths={allSubchainPaths}
        chain={chain}
        handleUpdateNetworksPaths={handleUpdateNetworksPaths}
        selectedSubchainPaths={selectedSubchainPaths}
      />
    </div>
  );
};
