import { render, screen } from '@testing-library/react';

import { loadComponent } from '../loadComponent';

describe('modules/common/utils/loadComponent', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should load component properly', async () => {
    const Result = loadComponent(() =>
      Promise.resolve(() => <div>Component Text</div>),
    );
    render(<Result />);

    const title = await screen.findByText('Component Text');
    expect(title).toBeInTheDocument();
  });

  test('should load component after retry', async () => {
    const error = new Error('error');
    const loadFn = jest
      .fn()
      .mockResolvedValue(() => <div>Component Text</div>)
      .mockRejectedValueOnce(error);

    const Result = loadComponent(loadFn);
    render(<Result />);
    jest.runAllTimers();

    const title = await screen.findByText('Component Text');
    expect(title).toBeInTheDocument();
  });
});
