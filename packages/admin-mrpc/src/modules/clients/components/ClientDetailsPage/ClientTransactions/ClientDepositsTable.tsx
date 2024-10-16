import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material';
import { Web3Address } from 'multirpc-sdk';
import { LoadingButton, OverlaySpinner } from '@ankr.com/ui';

import {
  formatNumber,
  renderBalance,
  renderUSD,
} from 'modules/common/utils/renderBalance';
import { resetEndpoint } from 'modules/common/utils/resetEndpoint';

import { useTransactions } from './useTransactions';

interface IClientTransactionsTable {
  address: Web3Address;
}

export const ClientDepositsTable = ({ address }: IClientTransactionsTable) => {
  const {
    loadMore,
    isLoadingTransactions,
    isFetchingTransactions,
    isUninitialized,
    transactionsData,
  } = useTransactions({
    address,
    types: [
      'TRANSACTION_TYPE_UNKNOWN',
      'TRANSACTION_TYPE_DEPOSIT',
      'TRANSACTION_TYPE_WITHDRAW',
      'TRANSACTION_TYPE_BONUS',
      'TRANSACTION_TYPE_COMPENSATION',
      'TRANSACTION_TYPE_VOUCHER_TOPUP',
      'TRANSACTION_TYPE_VOUCHER_ADJUST',
      'TRANSACTION_TYPE_WITHDRAW_INIT',
      'TRANSACTION_TYPE_WITHDRAW_ADJUST',
    ],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    resetEndpoint('fetchUserTransactions', dispatch);
    return () => resetEndpoint('fetchUserTransactions', dispatch);
  }, [address, dispatch]);

  const renderLoadDataButton = (text = 'Load more') => {
    return (
      <LoadingButton
        sx={{ margin: '20px auto' }}
        size="medium"
        fullWidth
        color="secondary"
        onClick={loadMore}
        loading={isFetchingTransactions}
      >
        {text}
      </LoadingButton>
    );
  };

  if (isUninitialized || !transactionsData) {
    return renderLoadDataButton('Load data');
  }

  if (isLoadingTransactions) {
    return <OverlaySpinner size={50} />;
  }

  if (
    transactionsData?.transactions &&
    transactionsData?.transactions.length === 0 &&
    transactionsData?.cursor &&
    transactionsData?.cursor === -1
  ) {
    return <Typography variant="body2">Not found</Typography>;
  }

  if (!transactionsData) {
    return renderLoadDataButton();
  }

  return (
    <TableContainer sx={{ pl: 6, pr: 6 }} component={Paper}>
      <Table size="small" aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>amount</b>
            </TableCell>
            <TableCell>
              <b>amountAnkr</b>
            </TableCell>
            <TableCell>
              <b>amountUsd</b>
            </TableCell>
            <TableCell>
              <b>blockchain</b>
            </TableCell>
            <TableCell>
              <b>Transaction time</b>
            </TableCell>
            <TableCell>
              <b>type</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionsData?.transactions.map(tx => (
            <TableRow key={tx.timestamp}>
              <TableCell>{formatNumber(tx.amount)}</TableCell>
              <TableCell>{renderBalance(tx.amountAnkr)}</TableCell>
              <TableCell>{renderUSD(tx.amountUsd)}</TableCell>
              <TableCell>{tx.blockchain}</TableCell>
              <TableCell>{tx.createdDate.toLocaleString()}</TableCell>
              <TableCell>{tx.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {transactionsData?.cursor &&
        transactionsData?.cursor > 0 &&
        renderLoadDataButton()}
    </TableContainer>
  );
};
