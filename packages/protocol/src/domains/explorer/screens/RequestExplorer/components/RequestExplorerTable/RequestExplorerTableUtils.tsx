import { Box, capitalize } from '@material-ui/core';
import { t } from 'common';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { IRequestsEntity } from 'multirpc-sdk';
import { VirtualTableExpander, VirtualTableColumn } from 'ui';
import { StatusCircle } from 'uiKit/StatusCircle';
import { Tooltip2 } from 'uiKit/Tooltip2/Tooltip2';
import { getChainIcon } from 'uiKit/utils/getTokenIcon';

export const REQUEST_EXPLORER_TABLE_PAGE_SIZE = 10;

export const useRequestExplorerTableColumns = () =>
  useLocaleMemo(
    () =>
      [
        {
          field: 'number',
          headerName: t('explorer.request-explorer.table.col-1'),
          render: 'number',
          width: 50,
          align: 'left',
        },
        {
          field: 'method',
          headerName: t('explorer.request-explorer.table.col-2'),
          render: row => (
            <Box display="flex" alignItems="center">
              <Tooltip2 icon={false} title={capitalize(row.chainId)}>
                <img
                  width={18}
                  alt={row.chainId}
                  src={getChainIcon(row.chainId)}
                />
              </Tooltip2>

              <Box ml={1}>{row.method}</Box>
            </Box>
          ),
          width: 250,
          align: 'left',
        },
        {
          field: 'errorCode',
          headerName: t('explorer.request-explorer.table.col-3'),
          render: row => {
            return (
              <StatusCircle
                size="md"
                status={row.errorCode >= 400 ? 'error' : 'success'}
              />
            );
          },
          align: 'center',
        },
        {
          field: 'httpCode',
          headerName: t('explorer.request-explorer.table.col-4'),
          render: 'httpCode',
          align: 'center',
        },
        {
          field: 'responseTime',
          headerName: t('explorer.request-explorer.table.col-5'),
          render: row => `${row.responseTime}ms`,
          align: 'center',
        },
        {
          field: 'dateTime',
          headerName: t('explorer.request-explorer.table.col-6'),
          render: row =>
            t('explorer.request-explorer.date-time', {
              value: new Date(row.dateTime),
            }),
          sortable: true,
          align: 'right',
          width: 200,
        },
        {
          field: 'costUsd',
          headerName: t('explorer.request-explorer.table.col-7'),
          render: ({ costUsd }) => <b>-{costUsd}</b>,
          align: 'right',
          width: 100,
        },
        {
          field: 'expand',
          headerName: '',
          render: (_row, index) => <VirtualTableExpander index={index} />,
          width: 30,
          align: 'right',
        },
      ] as VirtualTableColumn<IRequestsEntity>[],
    [],
  );
