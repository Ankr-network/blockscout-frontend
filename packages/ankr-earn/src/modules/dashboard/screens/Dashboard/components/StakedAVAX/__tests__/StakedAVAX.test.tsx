import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ONE_ETH as ONE } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { EAvalanchePoolEventsMap } from 'modules/stake-avax/api/AvalancheSDK';

import { StakedAVAX } from '..';
import {
  IStakedAVAXData,
  useStakedAVAXData,
} from '../../StakedTokens/hooks/useStakedAVAXData';
import {
  ITxHistoryData,
  useStakedAVAXTxHistory,
} from '../../StakedTokens/hooks/useStakedAVAXTxHistory';

jest.mock('store/useAppDispatch', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/useStakedAVAXData', () => ({
  useStakedAVAXData: jest.fn(),
}));

jest.mock('../../StakedTokens/hooks/useStakedAVAXTxHistory', () => ({
  useStakedAVAXTxHistory: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAVAX', () => {
  const networkName = 'Avalanche';

  const defaultStakedAVAXHookData: IStakedAVAXData = {
    amount: ONE.dividedBy(10 ** 18),
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
    isShowed: false,
  };

  const defaultTxHistoryHookData: ITxHistoryData = {
    txHistory: null,
    pendingUnstakeHistory: [],
    transactionHistory: {
      token: Token.aAVAXb,
      staked: [],
      unstaked: [],
    },
    hasHistory: false,
    isHistoryDataLoading: false,
  };

  beforeEach(() => {
    (useStakedAVAXData as jest.Mock).mockReturnValue(defaultStakedAVAXHookData);

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
        <StakedAVAX />
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
        <StakedAVAX />
      </MemoryRouter>,
    );

    const menuButton = await screen.findByTestId('menu-button');
    menuButton.click();

    const historyButton = await screen.findByText('Staking history');
    historyButton.click();

    const historyDialog = await screen.findByTestId('history-dialog');
    expect(historyDialog).toBeInTheDocument();
  });
});
