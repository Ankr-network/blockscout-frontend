import { Box, Paper } from '@material-ui/core';
import { ChangeEvent } from 'react';

import { ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { IHistoryTableRow } from 'modules/dashboard/types';

import { History } from './History';
import { HistoryFooter } from './HistoryFooter';
import { HistorySelect } from './HistorySelect';
import { HistoryTable } from './HistoryTable';
import { HistoryTypeButtons } from './HistoryTypeButtons';

export default {
  title: 'modules/dashboard/components/History',
  component: History,
};

export const Default = (): JSX.Element => {
  const token = Token.aBNBc;
  const isLoading = false;

  const tableData: IHistoryTableRow[] = [];
  tableData.push({
    amount: ONE,
    date: new Date(),
    hash: '0x00000000',
    link: 'https://etherscan.io/tx/0x00000000',
  });

  const isFirstLoading = isLoading && !tableData.length;

  const onShowMoreClick = () => {
    console.log('handleShowMoreClick');
  };

  const onTokenSelectChange = (e: ChangeEvent<{ value: unknown }>) => {
    console.log(e.target.value);
  };

  const options = [
    { label: 'aBNBc', value: Token.aBNBc },
    { label: 'aETHc', value: Token.aETHc },
  ];

  return (
    <Box maxWidth={600} mx="auto">
      <Paper>
        <Box py={4}>
          <History
            footerSlot={
              <HistoryFooter
                footerText="Some text"
                isLoading={isLoading}
                onShowMoreClick={onShowMoreClick}
              />
            }
            isFirstLoading={isFirstLoading}
            tableSlot={<HistoryTable data={tableData} token={token} />}
            tokenSelectSlot={
              <HistorySelect
                isDisabled={isLoading}
                options={options}
                value={token}
                onChange={onTokenSelectChange}
              />
            }
            typeButtonsSlot={<HistoryTypeButtons isStakedActive />}
          />
        </Box>
      </Paper>
    </Box>
  );
};