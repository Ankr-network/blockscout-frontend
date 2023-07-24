import { t } from '@ankr.com/common';

import { Project } from 'domains/projects/utils/getAllProjects';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { SoonLabel } from 'modules/common/components/SoonLabel';

import { ActiveLabel } from '../../ActiveLabel';
import { ProjectName } from '../../ProjectName';
import { BlockchainIcon } from '../../BlockchainIcon';
import { formatBlockchainToString } from '../utils/whitelistUtils';

export const useColumns = () => {
  const columns = useLocaleMemo((): VirtualTableColumn<Project>[] => [
    {
      align: 'left',
      field: 'name',
      headerName: t('projects.list-project.table.column-1'),
      render: ({ name, userEndpointToken, tokenIndex }) => (
        <ProjectName
          projectName={name}
          userEndpointToken={userEndpointToken}
          tokenIndex={tokenIndex}
        />
      ),
      sortable: false,
    },
    {
      align: 'left',
      field: 'status',
      headerName: t('projects.list-project.table.column-2'),
      render: () => <ActiveLabel />,
      sortable: false,
    },
    {
      align: 'left',
      field: 'list',
      headerName: t('projects.list-project.table.column-3'),
      render: ({ whitelist }) => {
        const label = whitelist?.length ? 'installed' : 'not-installed';

        return (
          <SoonLabel
            label={t(`projects.list-project.${label}`)}
            component="span"
          />
        );
      },
      sortable: false,
    },
    {
      align: 'left',
      field: 'chains',
      headerName: t('projects.list-project.table.column-4'),
      render: ({ whitelist }) => {
        const blockchains = formatBlockchainToString(whitelist);

        return blockchains && <BlockchainIcon blockchains={blockchains} />;
      },
      sortable: false,
    },
  ]);

  return { columns };
};
