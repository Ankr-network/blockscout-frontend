import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { StakeBinanceSteps } from '../StakeBinanceSteps';
import { useStakeBinanceStepsHook } from '../useStakeBinanceStepsHook';

jest.mock('modules/auth/common/hooks/useConnectedData', () => ({
  useConnectedData: () => ({ chainId: 1 }),
}));

jest.mock('../useStakeBinanceStepsHook', () => ({
  useStakeBinanceStepsHook: jest.fn(),
}));

describe('modules/stake-bnb/screens/StakeBinanceSteps', () => {
  const defaultData = {
    txHash: 'hash',
    symbol: 'aBNBb',
    amount: ZERO,
    destinationAddress: 'address',
    isLoading: false,
    isPending: false,
    handleAddTokenToWallet: jest.fn(),
  };

  beforeEach(() => {
    (useStakeBinanceStepsHook as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <StakeBinanceSteps />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Stake successful!');
    expect(title).toBeInTheDocument();
  });
});
