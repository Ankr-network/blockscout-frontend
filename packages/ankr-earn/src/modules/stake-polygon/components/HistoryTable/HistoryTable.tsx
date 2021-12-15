import { Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import { QueryState } from '@redux-requests/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { getShortStr } from 'modules/common/utils/getShortStr';
import { getTxLink } from 'modules/common/utils/getTxLink';
import { t } from 'modules/i18n/utils/intl';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'components/TableComponents';
import { AlignType } from 'components/TableComponents/types';
import { NavLink } from 'uiKit/StakefiUiKit/NavLink';
import {
  ITxEventsHistoryData,
  ITxEventsHistoryGroupItem,
  TTxEventsHistoryGroupData,
} from '../../api/PolygonSDK';
import { useHistoryTableStyles } from './useHistoryTableStyles';

type TTableData = Array<ITableDataItem | void>;

interface IHistoryTableProps {
  query: QueryState<ITxEventsHistoryData>;
}

interface ISwitcherCaptionsItem {
  label: string;
}

interface IHeaderCaptionsItem {
  align?: AlignType;
  label: string;
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

  return (data as Array<ITxEventsHistoryGroupItem>).map(
    ({
      txAmount,
      txDate,
      txHash,
      txType,
    }: ITxEventsHistoryGroupItem): ITableDataItem => ({
      amount: t('unit.matic-value', { value: txAmount.toNumber() }),
      date: t('format.date-time-24', { value: txDate }),
      shortTxHash: getShortStr(txHash),
      txHash,
      txLink: getTxLink(txHash),
      type: typeof txType === 'string' ? t(`stake-statuses.${txType}`) : '',
    }),
  );
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
  const classes: ClassNameMap = useHistoryTableStyles();

  const switcherCaptions: Array<ISwitcherCaptionsItem> = useLocaleMemo(
    (): Array<ISwitcherCaptionsItem> => [
      {
        label: t('stake-polygon-dashboard.switcher.completed-title'),
      },
      {
        label: t('stake-polygon-dashboard.switcher.pending-title'),
      },
    ],
    [],
  );

  const headerCaptions: Array<IHeaderCaptionsItem> = useLocaleMemo(
    (): Array<IHeaderCaptionsItem> => [
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
          ({ label }: ISwitcherCaptionsItem, idx: number): JSX.Element => (
            <Typography
              className={classNames(
                classes.switcherTitle,
                idx === activeSwitcherId && classes.switcherTitleActive,
              )}
              key={idx}
              onClick={onSwitcherItemClick(idx)}
              variant="body1"
            >
              {label}
            </Typography>
          ),
        )}
      </div>

      <Table
        columnsCount={headerCaptions.length}
        customCell="1fr 1fr 1fr 1fr"
        minWidth={0}
        paddingCollapse
      >
        <TableHead>
          {headerCaptions.map(
            (headerCaption: IHeaderCaptionsItem, idx: number): JSX.Element => (
              <TableHeadCell
                align={headerCaption.align}
                classes={{ content: classes.tableHeadCellContent }}
                key={idx}
                label={headerCaption.label}
              />
            ),
          )}
        </TableHead>

        <TableBody>
          {(data as Array<ITableDataItem>).map(
            ({
              amount,
              date,
              shortTxHash,
              txHash,
              txLink,
              type,
            }: ITableDataItem): JSX.Element => (
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
