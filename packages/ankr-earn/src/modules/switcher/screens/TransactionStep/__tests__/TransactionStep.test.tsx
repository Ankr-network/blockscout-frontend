import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { TransactionStep } from '../TransactionStep';
import { useTransactionStepHook } from '../useTransactionStepHook';

jest.mock('modules/auth/common/hooks/useAuth', () => ({
  useAuth: () => ({ chainId: 1 }),
}));

jest.mock('../useTransactionStepHook', () => ({
  useTransactionStepHook: jest.fn(),
}));

describe('modules/switcher/screens/TransactionStep', () => {
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
    (useTransactionStepHook as jest.Mock).mockReturnValue(defaultData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <TransactionStep />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Switch successful!');
    expect(title).toBeInTheDocument();
  });
});
