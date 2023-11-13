import { Info } from '@ankr.com/ui';
import { Tooltip } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProjectTable } from 'domains/projects/utils/getAllProjects';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { SoonLabel } from 'modules/common/components/SoonLabel';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';

import { ActionsMenu } from '../../ActionsMenu';
import { BlockchainIcon } from '../../BlockchainIcon';
import { ProjectName } from '../../ProjectName';
import { ProjectRequestsActivity } from '../../ProjectRequestsActivity';
import { getRequests } from '../ProjectTableUtils';
import { useColumnsStyles } from './useColumnsStyles';
import { ProjectStatusLabel } from '../../ProjectStatusLabel';

interface TableColumnsProps {
  onProjectDialogOpen: () => void;
}

/* eslint-disable max-lines-per-function */
export const useProjectsTableColumns = ({
  onProjectDialogOpen,
}: TableColumnsProps) => {
  const { classes, cx } = useColumnsStyles();

  const hasAccessForManaging = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerWrite,
  });

  const columns = useLocaleMemo((): VirtualTableColumn<ProjectTable>[] => {
    const result: VirtualTableColumn<ProjectTable>[] = [
      {
        align: 'left',
        field: 'name',
        headerName: (
          <span className={cx(classes.header, classes.name)}>
            {t('projects.list-project.table.column-1')}
          </span>
        ),
        render: ({ name, userEndpointToken }) => (
          <ProjectName
            projectName={name}
            userEndpointToken={userEndpointToken}
          />
        ),
        sortable: false,
      },
      {
        align: 'left',
        field: 'status',
        headerName: (
          <span className={classes.header}>
            {t('projects.list-project.table.column-2')}
          </span>
        ),
        render: ({ projectStatus }) => {
          const hasData = Object.keys(projectStatus).length !== 0;

          if (!hasData) {
            return t('common.no-data');
          }

          return <ProjectStatusLabel data={projectStatus} />;
        },
        sortable: false,
      },
      {
        align: 'left',
        field: 'list',
        headerName: (
          <span className={classes.header}>
            {t('projects.list-project.table.column-3')}
          </span>
        ),
        render: ({ whitelist }) => {
          const label = whitelist?.length ? 'implemented' : 'not-implemented';

          return (
            <SoonLabel
              label={t(`projects.list-project.${label}`)}
              component="span"
            />
          );
        },
        minWidth: '150px',
        sortable: false,
      },
      {
        align: 'left',
        field: 'chains',
        headerName: (
          <span className={classes.header}>
            {t('projects.list-project.table.column-4')}
          </span>
        ),
        render: ({ blockchains }) => {
          return blockchains && <BlockchainIcon blockchains={blockchains} />;
        },
        sortable: false,
      },
      {
        align: 'left',
        field: 'statsData',
        headerName: (
          <span className={classes.header}>
            {t('projects.list-project.table.column-5')}
            <Tooltip
              title={t('projects.list-project.table.column-5-tooltip')}
              placement="top"
              className={classes.tooltip}
            >
              <Info className={classes.infoIcon} />
            </Tooltip>
          </span>
        ),
        render: ({ statsByRange }) => {
          if (Object.keys(statsByRange).length === 0) {
            return t('common.no-data');
          }

          const requests = getRequests(statsByRange);

          const [todayRequests, yesterdayRequests] = requests;

          const isEmpty = requests.length === 0 || todayRequests === 0;

          if (isEmpty) {
            return t('projects.list-project.no-requests-yet');
          }

          return (
            <ProjectRequestsActivity
              todayRequests={todayRequests}
              yesterdayRequests={yesterdayRequests}
            />
          );
        },
      },
    ];

    if (hasAccessForManaging) {
      result.push({
        field: 'menu',
        headerName: '',
        render: rowData => (
          <ActionsMenu
            rowData={rowData}
            onProjectDialogOpen={onProjectDialogOpen}
          />
        ),
        align: 'right',
        width: '60px',
      });
    }

    return result;
  });

  return { columns };
};
