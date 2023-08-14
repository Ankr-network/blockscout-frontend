import { t } from '@ankr.com/common';
import { Skeleton, Tooltip } from '@mui/material';
import { Info } from '@ankr.com/ui';

import { Project } from 'domains/projects/utils/getAllProjects';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { VirtualTableColumn } from 'uiKit/VirtualTable';
import { SoonLabel } from 'modules/common/components/SoonLabel';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';

import { ActiveLabel } from '../../ActiveLabel';
import { ProjectName } from '../../ProjectName';
import { BlockchainIcon } from '../../BlockchainIcon';
import { ActionsMenu } from '../../ActionsMenu';
import {
  formatBlockchainToString,
  getProjectActivity,
  formatStatsByRangeToProjectActivityStats,
  getTodaysRequests,
} from '../ProjectTableUtils';
import {
  ProjectRequestsActivity,
  ProjectRequestsActivityProps,
} from '../../ProjectRequestsActivity';
import { useColumnsStyles } from './useColumnsStyles';

export const useColumns = (isProjectsActivityLoading: boolean) => {
  const { classes } = useColumnsStyles();

  const columns = useLocaleMemo((): VirtualTableColumn<Project>[] => [
    {
      align: 'left',
      field: 'name',
      headerName: (
        <span className={classes.header}>
          {t('projects.list-project.table.column-1')}
        </span>
      ),
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
      headerName: (
        <span className={classes.header}>
          {t('projects.list-project.table.column-2')}
        </span>
      ),
      render: () => <ActiveLabel />,
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
      headerName: (
        <span className={classes.header}>
          {t('projects.list-project.table.column-4')}
        </span>
      ),
      render: ({ whitelist }) => {
        const blockchains = formatBlockchainToString(whitelist);

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
            <Info />
          </Tooltip>
        </span>
      ),
      render: ({ statsData }) => {
        if (isProjectsActivityLoading) {
          return <Skeleton variant="rectangular" style={{ borderRadius: 8 }} />;
        }

        const { statsByRange, hasError } = statsData;

        if (hasError) {
          return t('common.no-data');
        }

        const stats = formatStatsByRangeToProjectActivityStats(
          statsByRange ?? {},
        );

        const activitiesToday = getTodaysRequests(stats);

        const isEmpty = stats.length === 0 || activitiesToday.isZero();

        if (isEmpty) {
          return t('projects.list-project.no-requests-yet');
        }

        const activityToday: ProjectRequestsActivityProps =
          getProjectActivity(stats);

        return <ProjectRequestsActivity {...activityToday} />;
      },
      sortable: false,
    },
    {
      field: 'menu',
      headerName: '',
      render: ({ tokenIndex }) => (
        <ActionsMenu
          isPrimary={tokenIndex === PRIMARY_TOKEN_INDEX}
          tokenIndex={tokenIndex}
        />
      ),
      align: 'right',
      width: '60px',
    },
  ]);

  return { columns };
};
