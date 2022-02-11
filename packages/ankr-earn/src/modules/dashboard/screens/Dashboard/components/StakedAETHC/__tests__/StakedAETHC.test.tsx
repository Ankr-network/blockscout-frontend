import { render, screen } from '@testing-library/react';
import { ONE_ETH, ZERO } from 'modules/common/const';
import { MemoryRouter } from 'react-router';
import { StakedAETHC } from '..';
import {
  IStakedAETHCData,
  useStakedAETHCData,
} from '../../StakedTokens/hooks/useStakedAETHCData';

jest.mock('../../StakedTokens/hooks/useStakedAETHCData', () => ({
  useStakedAETHCData: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHC', () => {
  const defaultStakedAETHCHookData: IStakedAETHCData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    pendingValue: ZERO,
    network: 'Ethereum Mainnet',
    tradeLink: '/trade',
    isShowed: true,
    isBalancesLoading: false,
  };

  beforeEach(() => {
    (useStakedAETHCData as jest.Mock).mockReturnValue(
      defaultStakedAETHCHookData,
    );
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

    const symbol = await screen.findByText('aETHc');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });
});
