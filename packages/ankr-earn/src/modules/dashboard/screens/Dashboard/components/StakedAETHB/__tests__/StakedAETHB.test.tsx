import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ONE_ETH, ZERO } from 'modules/common/const';
import { StakedAETHB } from '..';
import { useStakedAETHBData, IStakedAETHBData } from '../useStakedAETHBData';

jest.mock('../useStakedAETHBData', () => ({
  useStakedAETHBData: jest.fn(),
}));

describe('modules/dashboard/screens/Dashboard/components/StakedAETHB', () => {
  const defaultStakedAETHBHookData: IStakedAETHBData = {
    amount: ONE_ETH.dividedBy(10 ** 18),
    pendingValue: ZERO,
    network: 'Ethereum Mainnet',
    tradeLink: '/trade',
    isShowed: true,
    isBalancesLoading: false,
  };

  beforeEach(() => {
    (useStakedAETHBData as jest.Mock).mockReturnValue(
      defaultStakedAETHBHookData,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const symbol = await screen.findByText('aETHb');
    const network = await screen.findByText('Ethereum Mainnet');

    expect(symbol).toBeInTheDocument();
    expect(network).toBeInTheDocument();
  });

  test('should not render if there is no data to show', () => {
    (useStakedAETHBData as jest.Mock).mockReturnValue({
      ...defaultStakedAETHBHookData,
      isShowed: false,
    });

    render(
      <MemoryRouter>
        <StakedAETHB />
      </MemoryRouter>,
    );

    const networkTitle = screen.queryByText('Ethereum Mainnet');
    expect(networkTitle).not.toBeInTheDocument();
  });
});
