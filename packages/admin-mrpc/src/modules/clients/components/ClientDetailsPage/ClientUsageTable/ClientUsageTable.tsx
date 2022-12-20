import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { CSVLink } from 'react-csv';
import { Spinner } from 'ui';
import { PrivateStatsInterval } from 'multirpc-sdk';
import { useClientDetailsStyles } from '../ClientDetailsStyles';
import {
  useClientUsageTable,
  IClientUsageTableProps,
} from './useClientUsageTable';
import { ClientUsageTotal } from './ClientUsageTotal';
import { ClientUsageChainFilter } from './ClientUsageChainFilter';
import { formatNumber } from 'modules/common/utils/renderBalance';
import {
  currentMonthName,
  previousMonthName,
} from 'modules/clients/utils/dates';
import { Chart } from 'modules/common/components/Chart';
import { useRequestsChart } from '../RequestsChart/hooks/useRequestsChart';
import { Tooltip } from '../RequestsChart/components/Tooltip';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box>
          <Typography>
            <>{children}</>
          </Typography>
        </Box>
      )}
    </div>
  );
}

export const ClientUsageTable = ({
  fileName,
  currentPeriod,
  stats,
  usage,
  onUpdateTimeframe,
  isLoadingStats,
  handleSwitchCurrent,
  isCurrentDayIncluded,
  isRangePeriod,

  isChartDataLoading,
  timeframe,
}: IClientUsageTableProps) => {
  const {
    activeTimeframeTabIndex,
    handleChangeActiveTab,
    totalCost,
    filterByChainValue,
    availableChains,
    handleFilterByChain,
    dataToRender,
    TAB_INDEXES,
    totalRequestsValue,
    totalCostsValue,
    maxCountTotal,
    csvMappedUsage,
    totalRequestsHistory,
  } = useClientUsageTable({ onUpdateTimeframe, stats, usage, currentPeriod });

  const { chartProps } = useRequestsChart({
    isChartDataLoading,
    timeframe,
    totalRequestsHistory,
  });

  const { classes } = useClientDetailsStyles();

  return (
    <>
      <Box display="flex">
        <Tabs
          value={activeTimeframeTabIndex}
          onChange={handleChangeActiveTab}
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
          className={classes.tabsWrapper}
        >
          <Tab className={classes.tabUsagePeriod} disableRipple label="24h" />
          <Tab className={classes.tabUsagePeriod} disableRipple label="7d" />
          <Tab className={classes.tabUsagePeriod} disableRipple label="30d" />
          <Tab
            className={classes.tabUsagePeriod}
            disableRipple
            label={previousMonthName}
          />
          <Tab
            className={classes.tabUsagePeriod}
            disableRipple
            label={currentMonthName}
          />
        </Tabs>

        {csvMappedUsage && (
          <CSVLink
            className={classes.csvLink}
            filename={fileName}
            data={csvMappedUsage}
          >
            Download CSV
          </CSVLink>
        )}
      </Box>

      <br />
      {!isRangePeriod && (
        <FormControlLabel
          control={
            <Switch
              checked={isCurrentDayIncluded}
              value={isCurrentDayIncluded}
              onChange={handleSwitchCurrent}
            />
          }
          label={`Include current ${
            currentPeriod === PrivateStatsInterval.DAY ? 'hour' : 'day'
          }`}
        />
      )}

      {isLoadingStats ? (
        <>
          <br />
          <Spinner centered={false} size={42} />
        </>
      ) : (
        <ClientUsageChainFilter
          stats={stats}
          filterByChainValue={filterByChainValue}
          handleFilterByChain={handleFilterByChain}
          availableChains={availableChains}
        />
      )}

      <ClientUsageTotal
        currentPeriod={currentPeriod}
        isLoadingStats={isLoadingStats}
        totalRequestsValue={totalRequestsValue}
        totalCostsValue={totalCostsValue}
        totalCost={totalCost}
      />

      {usage
        ? TAB_INDEXES.map(tab => {
            return (
              <TabPanel key={tab} value={activeTimeframeTabIndex} index={+tab}>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="actions table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Blockchain</b>
                        </TableCell>
                        <TableCell>
                          <b>Method</b>
                        </TableCell>
                        <TableCell>
                          <b>Requests Count</b>
                        </TableCell>
                        <TableCell>
                          <b>Total Cost</b>
                        </TableCell>
                        <TableCell>
                          <b>Usage Percentage</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoadingStats ? (
                        <TableRow>
                          <TableCell>loading...</TableCell>
                        </TableRow>
                      ) : (
                        dataToRender?.map(usageEntity =>
                          usageEntity.details.map((details, index) => {
                            const usagePercent = maxCountTotal
                              ? (+details.count * 100) / maxCountTotal
                              : 0;
                            return (
                              <TableRow key={details.method || index}>
                                <TableCell>{usageEntity.blockchain}</TableCell>
                                <TableCell>{details.method}</TableCell>
                                <TableCell>
                                  {formatNumber(details.count)}
                                </TableCell>
                                <TableCell>
                                  {formatNumber(details.totalCost)}
                                </TableCell>
                                <TableCell>
                                  <Box
                                    className={classes.progressbar}
                                    style={{ width: `${usagePercent}%` }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          }),
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            );
          })
        : isLoadingStats
        ? 'Loading'
        : 'Not found'}

      {totalRequestsHistory && (
        <Paper sx={{ p: 4 }}>
          <Chart {...chartProps} tooltipContent={<Tooltip />} />
        </Paper>
      )}
    </>
  );
};
