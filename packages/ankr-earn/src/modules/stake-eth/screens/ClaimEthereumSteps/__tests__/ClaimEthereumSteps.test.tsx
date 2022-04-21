import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { ClaimEthereumSteps } from '../ClaimEthereumSteps';
import { useClaimEthereumSteps } from '../useClaimEthereumSteps';

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: () => ({ chainId: 1 }),
}));

jest.mock('../useClaimEthereumSteps', () => ({
  useClaimEthereumSteps: jest.fn(),
}));

describe('modules/stake-eth/screens/ClaimEthereumSteps', () => {
  const defaultData = {
    txHash: 'hash',
    symbol: 'aETHb',
    amount: ZERO,
    destinationAddress: 'address',
    isLoading: false,
    isPending: false,
    handleAddTokenToWallet: jest.fn(),
  };

  beforeEach(() => {
    (useClaimEthereumSteps as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <ClaimEthereumSteps />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Claim successful!');
    expect(title).toBeInTheDocument();
  });
});
