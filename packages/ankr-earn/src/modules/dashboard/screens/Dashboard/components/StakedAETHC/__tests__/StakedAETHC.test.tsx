import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';

import { ONE_ETH, ZERO } from 'modules/common/const';
import {
  IUseHistoryData,
  useHistory,
} from 'modules/dashboard/screens/Dashboard/hooks/useHistory';
import { useDialog } from 'modules/dialogs';

import { StakedAETHC } from '..';
import { useStakedTxHistoryETH } from '../../../hooks/liquid-tokens/ETH/useStakedTxHistoryETH';
import { IStakedAETHCData, useStakedAETHCData } from '../useStakedAETHCData';

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ ETH: { label: '' } }),
}));

jest.mock('modules/common/const', () => ({
  ...jest.requireActual('modules/common/const'),
  featuresConfig: {
    stakeETH: true,
  },
}));

jest.mock('../useStakedAETHCData', () => ({
  useStakedAETHCData: jest.fn(),
}));

jest.mock('../../../hooks/liquid-tokens/ETH/useStakedTxHistoryETH', () => ({
  useStakedTxHistoryETH: jest.fn(),
}));

jest.mock('modules/dashboard/screens/Dashboard/hooks/useHistory', () => ({
  useHistory: jest.fn(),
}));

jest.mock('modules/dialogs', () => ({
  useDialog: jest.fn(),
  EKnownDialogs: { history: 'history' },
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHC', () => {
  const defaultStakedAETHCHookData: IStakedAETHCData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.goerli,
    pendingValue: ZERO,
    network: 'Ethereum Mainnet',
    tradeLink: '/defi',
    isBalancesLoading: false,
    isStakeLoading: false,
    ratio: ZERO,
    handleAddTokenToWallet: jest.fn(),
  };

  const defaultStakedTxHistoryData = {
    stakedAETB: [],
    stakedAETC: [],
    pendingUnstakeHistory: [],
    hasHistory: false,
    isHistoryLoading: false,
    pendingValue: ONE_ETH.dividedBy(10 ** 17),
    handleLoadTxHistory: jest.fn(),
  };

  const defaultUseHistoryHookData: IUseHistoryData = {
    loading: false,
    weeksAmount: 1,
    handleShowMore: jest.fn(),
    stakeEvents: [],
    unstakeEvents: [],
  };

  const defaultUseDialogHookData = {
    handleOpen: jest.fn(),
  };

  beforeEach(() => {
    (useStakedAETHCData as jest.Mock).mockReturnValue(
      defaultStakedAETHCHookData,
    );

    (useStakedTxHistoryETH as jest.Mock).mockReturnValue(
      defaultStakedTxHistoryData,
    );

    (useHistory as jest.Mock).mockReturnValue(defaultUseHistoryHookData);

    (useDialog as jest.Mock).mockReturnValue(defaultUseDialogHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHC />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('ankrETH');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('unstake should be with custom tooltip', async () => {
    render(
      <MemoryRouter>
        <StakedAETHC />
      </MemoryRouter>,
    );

    const unstakeTitleBox = await screen.findByTitle(
      /Unstaking will become available after Ethereum enables it in their network/,
    );

    expect(unstakeTitleBox).toBeInTheDocument();
  });
});
