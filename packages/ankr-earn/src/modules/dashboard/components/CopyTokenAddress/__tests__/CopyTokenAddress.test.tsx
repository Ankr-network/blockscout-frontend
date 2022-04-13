import { render, screen } from '@testing-library/react';

import { CopyTokenAddress } from '..';
import { useCopyTokenAddressHook } from '../useCopyTokenAddressHook';

jest.mock('../useCopyTokenAddressHook', () => ({
  useCopyTokenAddressHook: jest.fn(),
}));

describe('modules/dashboard/components/CopyTokenAddress', () => {
  beforeEach(() => {
    (useCopyTokenAddressHook as jest.Mock).mockReturnValue({
      isCopied: false,
      handleCopy: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly with default state', async () => {
    render(<CopyTokenAddress address="address" />);

    const title = await screen.findByText('Copy token address');

    expect(title).toBeInTheDocument();
  });

  test('should render properly with copied state', async () => {
    (useCopyTokenAddressHook as jest.Mock).mockReturnValue({
      isCopied: true,
      handleCopy: jest.fn(),
    });

    render(<CopyTokenAddress address="address" />);

    const title = await screen.findByText('Copied!');

    expect(title).toBeInTheDocument();
  });
});
