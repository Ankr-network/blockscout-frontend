import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { TransactionInfo } from '..';

describe('modules/common/components/TransactionInfo', () => {
  test('should render properly', async () => {
    render(
      <MemoryRouter>
        <TransactionInfo
          type="success"
          chainId={1}
          txHash="hash"
          onClose={jest.fn()}
        />
      </MemoryRouter>,
    );

    const link = await screen.findByText('View on explorer');
    expect(link).toBeInTheDocument();
  });

  test('should render properly default state', async () => {
    render(
      <MemoryRouter>
        <TransactionInfo
          type="default"
          chainId={1}
          txHash="hash"
          onClose={jest.fn()}
        />
      </MemoryRouter>,
    );

    const link = await screen.findByText('View on explorer');
    expect(link).toBeInTheDocument();
  });

  test('should render properly without tx hash', () => {
    render(
      <MemoryRouter>
        <TransactionInfo type="failed" chainId={1} onClose={jest.fn()} />
      </MemoryRouter>,
    );

    const link = screen.queryByText('View on explorer');
    expect(link).not.toBeInTheDocument();
  });

  test('should render properly failed status with tx hash', () => {
    render(
      <MemoryRouter>
        <TransactionInfo
          type="failed"
          txHash="hash"
          chainId={1}
          onClose={jest.fn()}
        />
      </MemoryRouter>,
    );

    const title = screen.queryByText('Transaction failed.');
    expect(title).toBeInTheDocument();
  });

  test('should not render if there is no error and tx hash', () => {
    render(
      <MemoryRouter>
        <TransactionInfo type="failed" chainId={1} onClose={jest.fn()} />
      </MemoryRouter>,
    );

    const title = screen.queryByText('Transaction failed.');
    expect(title).not.toBeInTheDocument();
  });
});
