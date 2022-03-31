import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';
import { MemoryRouter } from 'react-router';

import { Token } from 'modules/common/types/token';

import {
  IStakedABNBCData,
  useStakedABNBCData,
} from '../../StakedTokens/hooks/BNB/useStakedABNBCData';
import { StakedABNBC } from '../StakedABNBC';
import {
  IUseStakedABNBCAnalytics,
  useStakedABNBCAnalytics,
} from '../useStakedABNBCAnalytics';

jest.mock('../../StakedTokens/hooks/BNB/useStakedABNBCData', () => ({
  useStakedABNBCData: jest.fn(),
}));

jest.mock('../useStakedABNBCAnalytics.ts', () => ({
  useStakedABNBCAnalytics: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedABNBC', () => {
  const defaultStakedBNBHookData: IStakedABNBCData = {
    amount: new BigNumber(1),
    network: 'BSC',
    stakeLink: 'stake',
    isLoading: false,
    isStakeLoading: false,
    isShowed: false,
    tokenAddress: '0x22',
    token: Token.aBNBc,
    onAddTokenToWallet: jest.fn(),
  };

  const defaultStakedABNBCAnalyticsData: IUseStakedABNBCAnalytics = {
    onAddStakingClick: jest.fn(),
  };

  beforeEach(() => {
    (useStakedABNBCData as jest.Mock).mockReturnValue(defaultStakedBNBHookData);

    (useStakedABNBCAnalytics as jest.Mock).mockReturnValue(
      defaultStakedABNBCAnalyticsData,
    );
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

    const symbol = await screen.findByText('aBNBc');
    const network = await screen.findByText('BSC');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
