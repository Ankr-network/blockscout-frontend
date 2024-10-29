import { Info } from '@ankr.com/ui';
import { Tooltip } from '@mui/material';
import { t } from '@ankr.com/common';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';

import { ActionsMenu } from '../../ActionsMenu';
import { Chains } from '../components/Chains';
import { ProjectName } from '../../ProjectName';
import { ProjectStatus } from '../components/ProjectStatus';
import { Requests } from '../components/Requests';
import { WhitelistStatus } from '../components/WhitelistStatus';
import { useColumnsStyles } from './useColumnsStyles';

interface TableColumnsProps {
  onProjectDialogOpen: () => void;
}

export const useProjectsTableColumns = ({
  onProjectDialogOpen,
}: TableColumnsProps) => {
  const { classes, cx } = useColumnsStyles();

  const hasAccessForManaging = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerWrite,
  });

  const columns = useLocaleMemo(() => {
    const result: VirtualTableColumn<JWT>[] = [
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
        render: ({ userEndpointToken }) => (
          <ProjectStatus userEndpointToken={userEndpointToken} />
        ),
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
        render: ({ userEndpointToken }) => (
          <WhitelistStatus userEndpointToken={userEndpointToken} />
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
        render: ({ userEndpointToken }) => (
          <Chains userEndpointToken={userEndpointToken} />
        ),
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
        render: ({ userEndpointToken }) => (
          <Requests userEndpointToken={userEndpointToken} />
        ),
        width: '15%',
      },
    ];

    if (hasAccessForManaging) {
      result.push({
        field: 'menu',
        headerName: '',
        render: ({ userEndpointToken }) => (
          <ActionsMenu
            onProjectDialogOpen={onProjectDialogOpen}
            userEndpointToken={userEndpointToken}
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
