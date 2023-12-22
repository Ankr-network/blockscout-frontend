import React, { useMemo } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  capitalize,
  Box,
  useTheme,
} from '@material-ui/core';
import ReactCountryFlag from 'react-country-flag';
import classNames from 'classnames';
import { Variant } from '@material-ui/core/styles/createTypography';

import { t } from 'modules/i18n/utils/intl';
import { getStatusByNodeScore } from 'modules/common/utils/node';
import { StatusCircle } from 'uiKit/StatusCircle';
import { getStatusColor } from 'uiKit/utils/styleUtils';

import { useStyles } from './useStyles';
import { ChainNodesTableProps } from './ChainNodesTableProps';
import { getRows, isHeightColVisibleStatus } from './ChainNodesTableUtils';

export const ChainNodesTable = ({
  nodesDetail,
  className = '',
}: ChainNodesTableProps) => {
  const theme = useTheme();
  const classes = useStyles();

  const rows = useMemo(() => getRows(nodesDetail), [nodesDetail]);

  if (rows.length === 0) return null;

  return (
    <TableContainer
      component={Paper}
      className={classNames(classes.root, className)}
      elevation={0}
      data-test-id="node-in-operation"
    >
      <Typography variant="body1" className={classes.header}>
        {t('chain-item.nodes-table.header')}
      </Typography>
      <Typography variant="body2" className={classes.description}>
        {t('chain-item.nodes-table.description')}
      </Typography>
      <Box component={Table} minWidth={600}>
        <TableHead className={classes.thead}>
          <TableRow>
            {[
              t('chain-item.nodes-table.head.node'),
              t('chain-item.nodes-table.head.height'),
              t('chain-item.nodes-table.head.location'),
              t('chain-item.nodes-table.head.weight'),
            ].map(item => (
              <TableCell
                padding="none"
                className={classNames(classes.cellThead, className)}
                key={item}
              >
                <Typography variant={'body3' as Variant}>{item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const nodeStatus = getStatusByNodeScore(row.score);

            return (
              <TableRow
                key={`${row.id}-${row.continent}-${row.height}-${index}`}
                className={classes.row}
              >
                <TableCell padding="none" className={classes.nodeCell}>
                  <Box display="flex" alignItems="center">
                    <StatusCircle size="md" mr={1.25} status={nodeStatus} />

                    {capitalize(row.organization || '')}
                  </Box>
                </TableCell>

                <TableCell padding="none" className={classes.cell}>
                  <Typography
                    style={{
                      color: isHeightColVisibleStatus(nodeStatus)
                        ? getStatusColor(theme, nodeStatus)
                        : 'inherit',
                    }}
                    variant="inherit"
                  >
                    {row.height}
                  </Typography>
                </TableCell>

                {row.country && (
                  <TableCell padding="none" className={classes.countryCell}>
                    <ReactCountryFlag
                      svg
                      className={classes.flag}
                      countryCode={row.country}
                    />
                    {t(`continents.${row.continent}`)}
                  </TableCell>
                )}

                <TableCell className={classes.cell}>
                  {`${row?.weight?.toFixed(0)}%`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Box>
    </TableContainer>
  );
};
