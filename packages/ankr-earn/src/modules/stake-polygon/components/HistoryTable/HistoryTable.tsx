import { Typography } from '@material-ui/core';
import { QueryState } from '@redux-requests/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { uid } from 'react-uid';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { AlignType } from 'modules/common/components/TableComponents/types';
import { getShortStr } from 'modules/common/utils/getShortStr';
import { getTxLink } from 'modules/common/utils/getTxLink';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'uiKit/NavLink';

import {
  ITxEventsHistoryData,
  TTxEventsHistoryGroupData,
} from '../../api/PolygonSDK';

import { useHistoryTableStyles } from './useHistoryTableStyles';

type TTableData = ITableDataItem[];

interface IHistoryTableProps {
  query: QueryState<ITxEventsHistoryData>;
}

interface ITableDataItem {
  amount: string;
  date: string;
  shortTxHash: string;
  txHash: string;
  txLink: string;
  type: string;
}

const DEFAULT_ACTIVE_SWITCHER_ID = 0;

function getPreparedData(data?: TTxEventsHistoryGroupData): TTableData {
  if (!Array.isArray(data) || !data.length) {
    return [];
  }

  return data.map(({ txAmount, txDate, txHash, txType }) => ({
    amount: t('unit.matic-value', { value: txAmount.toNumber() }),
    date: t('format.date-time-24', { value: txDate }),
    shortTxHash: getShortStr(txHash),
    txHash,
    txLink: getTxLink(txHash),
    type: typeof txType === 'string' ? t(`stake-statuses.${txType}`) : '',
  }));
}

export const HistoryTable = ({
  query: { data: queryData, loading },
}: IHistoryTableProps): JSX.Element | null => {
  const [activeSwitcherId, setActiveSwitcherId] = useState<number>(
    DEFAULT_ACTIVE_SWITCHER_ID,
  );
  const [completedData, setCompletedData] = useState<TTableData>([]);
  const [pendingData, setPendingData] = useState<TTableData>([]);
  const [data, setData] = useState<TTableData>([]);
  const classes = useHistoryTableStyles();

  const switcherCaptions = useLocaleMemo(
    () => [
      {
        label: t('stake-polygon-dashboard.switcher.completed-title'),
      },
      {
        label: t('stake-polygon-dashboard.switcher.pending-title'),
      },
    ],
    [],
  );

  const headerCaptions = useLocaleMemo(
    () => [
      {
        label: t('stake-polygon-dashboard.column.tx-date'),
      },
      {
        label: t('stake-polygon-dashboard.column.tx-hash'),
      },
      {
        label: t('stake-polygon-dashboard.column.tx-type'),
      },
      {
        align: 'right',
        label: t('stake-polygon-dashboard.column.amount'),
      },
    ],
    [],
  );

  const onSwitcherItemClick = (captionId: number) => (): void => {
    if (activeSwitcherId === captionId) {
      return;
    }

    const newData: TTableData =
      captionId === DEFAULT_ACTIVE_SWITCHER_ID ? completedData : pendingData;

    setActiveSwitcherId(captionId);
    setData(newData);
  };

  useEffect((): void => {
    setActiveSwitcherId(DEFAULT_ACTIVE_SWITCHER_ID);

    const newCompletedData: TTableData = getPreparedData(queryData?.completed);
    const newPendingData: TTableData = getPreparedData(queryData?.pending);

    setCompletedData(newCompletedData);
    setPendingData(newPendingData);

    setData(newCompletedData);
  }, [queryData]);

  if (loading) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.switcherArea}>
        {switcherCaptions.map(
          ({ label }, idx): JSX.Element => (
            <Typography
              key={uid(idx)}
              className={classNames(
                classes.switcherTitle,
                idx === activeSwitcherId && classes.switcherTitleActive,
              )}
              variant="body1"
              onClick={onSwitcherItemClick(idx)}
            >
              {label}
            </Typography>
          ),
        )}
      </div>

      <Table
        paddingCollapse
        columnsCount={headerCaptions.length}
        customCell="1fr 1fr 1fr 1fr"
        minWidth={0}
      >
        <TableHead>
          {headerCaptions.map(
            (headerCaption, idx): JSX.Element => (
              <TableHeadCell
                key={uid(idx)}
                align={headerCaption.align as AlignType | undefined}
                classes={{ content: classes.tableHeadCellContent }}
                label={headerCaption.label}
              />
            ),
          )}
        </TableHead>

        <TableBody>
          {data.map(
            ({
              amount,
              date,
              shortTxHash,
              txHash,
              txLink,
              type,
            }): JSX.Element => (
              <TableRow key={txHash}>
                <TableBodyCell>{date}</TableBodyCell>

                <TableBodyCell>
                  <NavLink href={txLink}>{shortTxHash}</NavLink>
                </TableBodyCell>

                <TableBodyCell>{type}</TableBodyCell>

                <TableBodyCell align="right">{amount}</TableBodyCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};
