import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useDialog } from 'modules/dialogs';

import {
  IStakedBNBTxHistory,
  useStakedBNBTxHistory,
} from '../../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory';
import { StakedABNBC } from '../StakedABNBC';
import {
  IUseStakedABNBCAnalytics,
  useStakedABNBCAnalytics,
} from '../useStakedABNBCAnalytics';
import { IStakedABNBCData, useStakedABNBCData } from '../useStakedABNBCData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ BNB: { label: '' } }),
}));

jest.mock('../useStakedABNBCData', () => ({
  useStakedABNBCData: jest.fn(),
}));

jest.mock('../useStakedABNBCAnalytics.ts', () => ({
  useStakedABNBCAnalytics: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/BNB/useStakedBNBTxHistory', () => ({
  useStakedBNBTxHistory: jest.fn(),
}));

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBC', () => {
  const defaultStakedBNBHookData: IStakedABNBCData = {
    amount: new BigNumber(1),
    chainId: EEthereumNetworkId.smartchainTestnet,
    network: 'BSC',
    stakeLink: 'stake',
    isLoading: false,
    isStakeLoading: false,
    tokenAddress: '0x22',
    token: Token.aBNBc,
    tradeLink: '/defi',
    unstakeLink: 'unstake',
    isUnstakeLoading: false,
    ratio: ZERO,
    onAddTokenToWallet: jest.fn(),
  };

  const defaultStakedABNBCAnalyticsData: IUseStakedABNBCAnalytics = {
    onAddStakingClick: jest.fn(),
  };

  const defaultTxHistoryHookData: IStakedBNBTxHistory = {
    pendingCertUnstakeHistory: [],
    pendingBondUnstakeHistory: [],
    isHistoryDataLoading: false,
    pendingBondAmount: ZERO,
    pendingCertAmount: ZERO,
  };

  const defaultUseDialogHookData = {
    handleOpen: jest.fn(),
  };

  beforeEach(() => {
    (useStakedABNBCData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

    (useStakedABNBCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedABNBCAnalyticsData,
    );

    (useStakedBNBTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedABNBC />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('ankrBNB');
    const network = await screen.findByText('BSC');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
