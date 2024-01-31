import { Info } from '@ankr.com/ui';
import { Button, Skeleton, Tooltip, Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { ProjectTable } from 'domains/projects/utils/getAllProjects';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { ProjectStatusLabel } from 'domains/projects/components/ProjectStatusLabel';

import { ActionsMenu } from '../../ActionsMenu';
import { AllBlockchainsIcons } from '../../AllBlockchainsIcons';
import { BlockchainIcon } from '../../BlockchainIcon';
import { ProjectName } from '../../ProjectName';
import { ProjectRequestsActivity } from '../../ProjectRequestsActivity';
import { WhitelistStatus } from '../components/WhitelistStatus';
import { useColumnsStyles } from './useColumnsStyles';

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
        width: '20%',
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
        render: ({ projectStatus, isLoading }) => {
          if (isLoading) {
            return <Skeleton width={70} height={22} variant="rounded" />;
          }

          const hasData = Object.keys(projectStatus).length !== 0;

          if (!hasData) {
            return t('common.no-data');
          }

          return <ProjectStatusLabel data={projectStatus} />;
        },
        width: '15%',
        minWidth: '15%',
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
        render: ({ whitelist = [], isLoading }) => (
          <WhitelistStatus isLoading={isLoading} whitelist={whitelist} />
        ),
        width: '20%',
        minWidth: '20%',
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
        render: ({ blockchains = [], isLoading }) => {
          if (isLoading) {
            return <Skeleton width={32} height={32} variant="circular" />;
          }

          if (blockchains?.length === 0) {
            return <AllBlockchainsIcons />;
          }

          return (
            <BlockchainIcon isPaddingLeftIgnored blockchains={blockchains} />
          );
        },
        width: '30%',
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
        render: ({ projectActivity, projectStatus, isLoading }) => {
          if (isLoading) {
            return <Skeleton width="100px" variant="text" />;
          }

          if (projectStatus.draft && hasAccessForManaging) {
            return (
              <Button size="small" className={classes.resumeSetupLabel}>
                {t(`projects.list-project.resume-setup`)}
              </Button>
            );
          }

          if (!projectActivity?.hasData) {
            return t('common.no-data');
          }

          if (projectActivity?.isEmpty) {
            return (
              <Typography variant="body3">
                {t('projects.list-project.no-requests-yet')}
              </Typography>
            );
          }

          return <ProjectRequestsActivity {...projectActivity} />;
        },
        width: '15%',
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
        width: '5%',
      });
    }

    return result;
  });

  return { columns };
};
