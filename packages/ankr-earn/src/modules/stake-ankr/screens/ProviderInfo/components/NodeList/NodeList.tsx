import { t } from '@ankr.com/common';
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';
import { useMemo } from 'react';
import { uid } from 'react-uid';

import {
  Table as BasicTable,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'modules/common/components/TableComponents';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { useNodeListData } from '../../hooks/useNodeListData';
import { LocationItem } from '../LocationItem';
import { NodeItem } from '../NodeItem';

import { useNodeListStyles } from './useNodeListStyles';

const SKELETON_ROWS_COUNT = 3;
const SKELETON_COLUMN_WIDTHS = [300, 200, 200, 200, 200, 200];
const SKELETON_ROWS = new Array<number[]>(SKELETON_ROWS_COUNT).fill(
  SKELETON_COLUMN_WIDTHS,
);

enum ELabel {
  node,
  location,
  blockHeight,
  totalRequests,
  uptime,
  totalLatency,
}

export const NodeList = (): JSX.Element | null => {
  const classes = useNodeListStyles();

  const { data, isLoading } = useNodeListData();

  const captions = useLocaleMemo(
    () => [
      {
        label: t('stake-ankr.provider-info.node-list.node'),
      },
      {
        label: t('stake-ankr.provider-info.node-list.location'),
      },
      {
        label: t('stake-ankr.provider-info.node-list.block-height'),
      },
      {
        label: t('stake-ankr.provider-info.node-list.total-requests'),
      },
      {
        label: t('stake-ankr.provider-info.node-list.30d-uptime'),
      },
      {
        label: t('stake-ankr.provider-info.node-list.latency'),
      },
    ],
    [],
  );

  const renderedSkeletonRows = useMemo(
    () =>
      SKELETON_ROWS.map((columnWidths, i) => (
        <TableRow key={uid(i)}>
          {columnWidths.map((width, j) => (
            <TableBodyCell key={uid(`${i}-${j}`)} label={captions[j].label}>
              <Skeleton width={width} />
            </TableBodyCell>
          ))}
        </TableRow>
      )),
    [captions],
  );

  if (!data?.length && !isLoading) {
    return null;
  }

  return (
    <BasicTable
      dense
      columnsCount={captions.length}
      customCell="1.5fr 1fr 1fr 1fr 1fr 1fr"
      minWidth={1200}
    >
      <TableHead>
        {captions.map(({ label }, i) => (
          <TableHeadCell
            key={uid(i)}
            classes={{
              content: classes.thContent,
            }}
            label={<>{label}</>}
          />
        ))}
      </TableHead>

      <TableBody>
        {isLoading && renderedSkeletonRows}

        {!isLoading &&
          data.map((row, i) => (
            <TableRow key={uid(i)}>
              <TableBodyCell label={`${captions[ELabel.node].label}`}>
                <NodeItem
                  description={row.nodeDescription}
                  firstValue={row.nodeName}
                  iconSlot={<EthIcon />}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.location].label}`}>
                <LocationItem
                  country={row.location}
                  countryCode={row.countryCode}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.blockHeight].label}`}>
                <Typography className={classes.simpleText}>
                  {row.blockHeight.toFormat()}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.totalRequests].label}`}>
                {/*  TODO: change formatting to M and K letters */}

                <NodeItem
                  description={t(
                    'stake-ankr.provider-info.node-list.paid-value',
                    {
                      value: row.totalPaid.toFixed(),
                    },
                  )}
                  firstValue={row.totalRequests.toFixed()}
                />
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.uptime].label}`}>
                <Typography
                  className={classNames(classes.simpleText, {
                    [classes.green]: row.uptime.isGreaterThanOrEqualTo(
                      row.minUptime,
                    ),
                    [classes.red]: row.uptime.isLessThanOrEqualTo(
                      row.minUptime,
                    ),
                  })}
                >
                  {t('unit.percentage-value', { value: row.uptime.toFixed() })}
                </Typography>
              </TableBodyCell>

              <TableBodyCell label={`${captions[ELabel.totalLatency].label}`}>
                <Typography
                  className={classNames(classes.simpleText, {
                    [classes.green]: row.latency.isLessThanOrEqualTo(
                      row.maxLatency,
                    ),
                    [classes.red]: row.latency.isGreaterThanOrEqualTo(
                      row.maxLatency,
                    ),
                  })}
                >
                  {t('unit.milliseconds-value', {
                    value: row.latency.toFixed(),
                  })}
                </Typography>
              </TableBodyCell>
            </TableRow>
          ))}
      </TableBody>
    </BasicTable>
  );
};
