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

import classNames from 'classnames';
import ReactCountryFlag from 'react-country-flag';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { useStyles } from './useStyles';
import { ChainNodesTableProps } from './ChainNodesTableProps';
import { getRows, isHeightColVisibleStatus } from './ChainNodesTableUtils';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { StatusCircle } from 'uiKit/StatusCircle';
import { getStatusColor } from 'uiKit/utils/styleUtils';
import { getStatusByNodeScore } from 'modules/common/utils/node';

export const ChainNodesTable = ({
  data,
  nodesWeight,
}: ChainNodesTableProps) => {
  const theme = useTheme();
  const classes = useStyles();

  const rows = useMemo(() => getRows(data, nodesWeight), [data, nodesWeight]);

  if (rows.length === 0) return null;

  return (
    <TableContainer component={Paper} className={classes.root} elevation={0}>
      <TooltipWrapper
        hasIcon
        tooltipText={tHTML('chain-item.nodes-table.tooltip-text')}
      >
        <Typography variant="h5" className={classes.header}>
          {t('chain-item.nodes-table.header')}
        </Typography>
      </TooltipWrapper>

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
                className={classNames(classes.cell, classes.cellThead)}
                key={item}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {item}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            const nodeStatus = getStatusByNodeScore(row.score);

            return (
              <>
                {!!row.height && (
                  <TableRow key={row.id} className={classes.row}>
                    <TableCell padding="none" className={classes.nodeCell}>
                      <Box display="flex" alignItems="center">
                        <StatusCircle mr={1.25} status={nodeStatus} />

                        {capitalize(row.organization || '')}
                      </Box>
                    </TableCell>

                    <TableCell padding="none" className={classes.heightCell}>
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
                        &nbsp; &nbsp;
                        {row.city}
                        &nbsp; ({t(`continents.${row.continent}`)})
                      </TableCell>
                    )}

                    <TableCell className={classes.weightCell}>
                      {`${row?.weight?.toFixed(0)}%`}
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Box>
    </TableContainer>
  );
};
