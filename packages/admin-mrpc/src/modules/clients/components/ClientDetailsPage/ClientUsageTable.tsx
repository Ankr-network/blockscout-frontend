import { useState } from 'react';
import {
  Paper,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { IUsageEntity } from 'multirpc-sdk';
import { useClientDetailsStyles } from './ClientDetailsStyles';
import { TimeframeUsage } from './types';

type TabIndex = 0 | 1 | 2;
/* key is tab index, value is dayOffset param */
const timeframeParams: Record<TabIndex, TimeframeUsage> = {
  0: '0',
  1: '7',
  2: '30',
};

interface IClientUsageTableProps {
  usage?: IUsageEntity[];
  onUpdateTimeframe: (timeframe: TimeframeUsage) => void;
  isLoading?: boolean;
}

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const TAB_INDEXES = Object.keys(timeframeParams);

export const ClientUsageTable = ({
  usage,
  onUpdateTimeframe,
  isLoading,
}: IClientUsageTableProps) => {
  const [value, setValue] = useState<TabIndex>(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: TabIndex) => {
    onUpdateTimeframe(timeframeParams[newValue]);
    setValue(newValue);
  };

  const { classes } = useClientDetailsStyles();

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        className={classes.tabsWrapper}
      >
        <Tab className={classes.tabUsagePeriod} disableRipple label="24h" />
        <Tab
          // temporary disabled: waiting fix from backend for day_offset param
          disabled // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-1707
          className={classes.tabUsagePeriod}
          disableRipple
          label="7d"
        />
        <Tab
          // temporary disabled: waiting fix from backend for day_offset param
          disabled // TODO: https://ankrnetwork.atlassian.net/browse/MRPC-1707
          className={classes.tabUsagePeriod}
          disableRipple
          label="30d"
        />
      </Tabs>
      <br />
      {usage
        ? TAB_INDEXES.map(tab => {
            return (
              <TabPanel key={tab} value={value} index={+tab}>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="actions table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>BlockChain</b>
                        </TableCell>
                        <TableCell>
                          <b>Method</b>
                        </TableCell>
                        <TableCell>
                          <b>Count</b>
                        </TableCell>
                        <TableCell>
                          <b>Total cost</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {usage.map(i =>
                        i.details.map(d => (
                          <TableRow key={d.method}>
                            <TableCell>{i.blockchain}</TableCell>
                            <TableCell>{d.method}</TableCell>
                            <TableCell>{d.count}</TableCell>
                            <TableCell>{d.totalCost}</TableCell>
                          </TableRow>
                        )),
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
            );
          })
        : isLoading
        ? 'Loading'
        : 'Not found'}
    </>
  );
};
