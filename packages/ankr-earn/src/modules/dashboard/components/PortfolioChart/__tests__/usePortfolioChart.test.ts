import { renderHook } from '@testing-library/react-hooks';
import { useRef } from 'react';

import { usePortfolioChart } from '../usePortfolioChart';

jest.mock('react', (): unknown => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));

describe('components/PortfolioChart/usePortfolioChart', () => {
  beforeEach(() => {
    (useRef as jest.Mock).mockReturnValue({ current: {} });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return ref', () => {
    const render = jest.fn();

    const { result } = renderHook(() => usePortfolioChart(render, []));

    expect(result.current.ref.current).toBeDefined();
    expect(render).toBeCalledTimes(1);
  });

  test('should not return ref', () => {
    (useRef as jest.Mock).mockReturnValue({});

    const render = jest.fn();

    const { result } = renderHook(() => usePortfolioChart(render, []));

    expect(result.current.ref.current).toBeUndefined();
    expect(render).not.toBeCalled();
  });
});
