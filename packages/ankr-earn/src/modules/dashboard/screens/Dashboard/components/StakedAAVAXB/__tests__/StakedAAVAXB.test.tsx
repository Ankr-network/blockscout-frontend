import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { EEthereumNetworkId } from '@ankr.com/provider';
import { EAvalanchePoolEventsMap } from '@ankr.com/staking-sdk';

import { ONE_ETH as ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { StakedAAVAXB } from '..';
import {
  ITxHistoryData,
  useStakedAVAXTxHistory,
} from '../../../hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory';
import { IStakedAAVAXBData, useStakedAAVAXBData } from '../useStakedAAVAXBData';

jest.mock('../useStakedAAVAXBData', () => ({
  useStakedAAVAXBData: jest.fn(),
}));

jest.mock('modules/stake/hooks/useUnstakePendingTimestamp', () => ({
  useUnstakePendingTimestamp: () => ({ AVAX: { label: '' } }),
}));

jest.mock('../../../hooks/liquid-tokens/AVAX/useStakedAVAXTxHistory', () => ({
  useStakedAVAXTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAAVAXB', () => {
  const networkName = 'Avalanche';

  const defaultStakedAAVAXBHookData: IStakedAAVAXBData = {
    amount: ONE.dividedBy(10 ** 18),
    chainId: EEthereumNetworkId.avalancheTestnet,
    pendingValue: ONE.dividedBy(10 ** 17),
    network: networkName,
    tradeLink: 'trade',
    unstakeLink: 'unstake',
    stakeLink: 'stake',
    stakeType: EAvalanchePoolEventsMap.StakePending,
    unstakeType: EAvalanchePoolEventsMap.AvaxClaimPending,
    isBalancesLoading: false,
    isStakeLoading: false,
    isUnstakeLoading: false,
    handleAddTokenToWallet: jest.fn(),
    isPendingUnstakeLoading: false,
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    pendingUnstakeHistoryAAVAXB: [],
    transactionHistoryAAVAXB: {
      staked: [],
      stakedToken: Token.aAVAXb,
      unstaked: [],
      unstakedToken: Token.aAVAXb,
    },
    hasHistory: false,
    isHistoryDataLoading: false,
    handleLoadTxHistory: jest.fn(),
    transactionHistoryAAVAXC: {
      staked: [],
      stakedToken: Token.aAVAXc,
      unstaked: [],
      unstakedToken: Token.aAVAXc,
    },
    pendingUnstakeHistoryAAVAXC: [],
  };

  beforeEach(() => {
    (useStakedAAVAXBData as jest.Mock).mockReturnValue(
      defaultStakedAAVAXBHookData,
    );

    (useStakedAVAXTxHistory as jest.Mock).mockReturnValue(
      defaultTxHistoryHookData,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAAVAXB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText(Token.aAVAXb);
    const network = await screen.findByText(networkName);

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should open history dialog properly', async () => {
    render(
      <MemoryRouter>
        <StakedAAVAXB />
      </MemoryRouter>,
    );

    const menuButton = await screen.findByTestId('menu-button');
    menuButton.click();

    // TODO: uncomment after splitting history
    // const historyButton = await screen.findByText('Staking history');
    // historyButton.click();

    // const historyDialog = await screen.findByTestId('history-dialog');
    // expect(historyDialog).toBeInTheDocument();
  });
});
