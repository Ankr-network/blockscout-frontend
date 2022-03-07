import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Success } from '..';
import {
  useEth2SwapSuccessHook,
  IEth2SwapSuccessHookData,
} from '../useEth2SwapSuccessHook';

jest.mock('../useEth2SwapSuccessHook', () => ({
  useEth2SwapSuccessHook: jest.fn(),
}));

describe('modules/eth2Swap/screens/Success', () => {
  const defaultHookData: IEth2SwapSuccessHookData = {
    txHash: 'hash',
    swapOption: 'aETHb',
    chainId: 1,
    handleAddTokenToWallet: jest.fn(),
  };

  beforeEach(() => {
    (useEth2SwapSuccessHook as jest.Mock).mockReturnValue(defaultHookData);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <Success />
      </MemoryRouter>,
    );

    const title = await screen.findByText('Swap successful!');
    expect(title).toBeInTheDocument();

    const description = await screen.findByText('Add aETHc to wallet');
    expect(description).toBeInTheDocument();
  });
});
