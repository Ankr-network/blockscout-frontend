import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { ZERO } from 'modules/common/const';

import { ProgressStep } from '..';

jest.mock('modules/auth/hooks/useAuth', () => ({
  useAuth: () => ({ chainId: 1 }),
}));

describe('modules/common/components/ProgressStep', () => {
  test('should render properly', async () => {
    const props = {
      amount: ZERO,
      destinationAddress: 'address',
      txHash: 'hash',
      title: 'Switch',
      hint: 'This may take a moment; you can close this window. Once completed you can check out your new aETHb exposure on the Ankr Earn Dashboard.',
      buttonTitle: 'Add aMATICb to wallet',
      isPending: true,
      onAddTokenToWallet: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ProgressStep {...props} />
      </MemoryRouter>,
    );

    const title = await screen.findByText(`Switch is pending...`);
    expect(title).toBeInTheDocument();

    const hint = await screen.findByText(props.hint);
    expect(hint).toBeInTheDocument();

    const dashboardButton = await screen.findByText('Go to dashboard');
    expect(dashboardButton).toBeInTheDocument();

    const buttonTitle = await screen.findByText(props.buttonTitle);
    expect(buttonTitle).toBeInTheDocument();

    const amount = await screen.findByText('Amount:');
    expect(amount).toBeInTheDocument();

    const destinationAddress = await screen.findByText('Destination address:');
    expect(destinationAddress).toBeInTheDocument();

    const txHash = await screen.findByText('Transaction ID:');
    expect(txHash).toBeInTheDocument();
  });

  test('should add token to wallet', async () => {
    const props = {
      title: 'Title',
      hint: 'Hint',
      buttonTitle: 'Button',
      isPending: false,
      onAddTokenToWallet: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ProgressStep {...props} />
      </MemoryRouter>,
    );

    const button = await screen.findByText(props.buttonTitle);
    expect(button).toBeInTheDocument();

    button.click();

    expect(props.onAddTokenToWallet).toBeCalledTimes(1);
  });

  test('should handle copy tx hash', async () => {
    const props = {
      title: 'Title',
      hint: 'Hint',
      buttonTitle: 'Button',
      txHash: 'hash',
      isPending: false,
      onAddTokenToWallet: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ProgressStep {...props} />
      </MemoryRouter>,
    );

    const copyButton = await screen.findByTestId('copy-tx-hash');
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    const completeIcon = await screen.findByTestId('copy-tx-hash-complete');
    expect(completeIcon).toBeInTheDocument();
  });

  test('should handle destination address copy', async () => {
    const props = {
      title: 'Title',
      hint: 'Hint',
      buttonTitle: 'Button',
      destinationAddress: 'address',
      isPending: false,
      onAddTokenToWallet: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ProgressStep {...props} />
      </MemoryRouter>,
    );

    const copyButton = await screen.findByTestId('copy-destination-address');
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    const completeIcon = await screen.findByTestId(
      'copy-destination-address-complete',
    );
    expect(completeIcon).toBeInTheDocument();
  });
});
