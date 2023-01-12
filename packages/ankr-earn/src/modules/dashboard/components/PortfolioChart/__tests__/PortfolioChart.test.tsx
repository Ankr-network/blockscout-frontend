import { render, screen, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';
import { EthIcon } from 'uiKit/Icons/EthIcon';

import { PortfolioChart, IPortfolioChartProps } from '..';

describe('modules/dashboard/components/PortfolioChart', () => {
  const defaultProps: IPortfolioChartProps = {
    data: [
      {
        name: Token.aETHb,
        percent: 50,
        usdAmount: new BigNumber(5_000),
        amount: new BigNumber(1),
        yieldAmount: new BigNumber(1),
        yieldAmountUsd: new BigNumber(1),
        apy: new BigNumber(0.3),
        icon: AETHBIcon,
        link: 'link',
        isNative: false,
      },
      {
        name: Token.aETHc,
        percent: 20,
        usdAmount: new BigNumber(2_000),
        amount: new BigNumber(1),
        yieldAmount: new BigNumber(1),
        yieldAmountUsd: new BigNumber(1),
        apy: new BigNumber(0.3),
        icon: AETHCIcon,
        link: 'link',
        isNative: false,
      },
      {
        name: Token.ETH,
        percent: 30,
        usdAmount: new BigNumber(3_000),
        amount: new BigNumber(1),
        yieldAmount: new BigNumber(1),
        yieldAmountUsd: new BigNumber(1),
        apy: new BigNumber(0.3),
        icon: EthIcon,
        isNative: true,
      },
    ],
    isLoading: false,
    isCurrentAccountPartner: true,
    totalNativeAmountUsd: new BigNumber(3_000),
    totalStakedAmountUsd: new BigNumber(7_000),
    stakedApr: new BigNumber(100),
    nativeApr: new BigNumber(100),
    totalStakedYieldAmountUsd: new BigNumber(1),
    totalNativeYieldAmountUsd: new BigNumber(1),
    height: 350,
    width: 350,
    isSmallBalancesVisible: true,
  };

  test('should render properly', async () => {
    render(<PortfolioChart {...defaultProps} />);

    const chart = await screen.findByTestId('portfolio-chart');

    expect(chart).toBeInTheDocument();
  });

  test('should render loading state properly', async () => {
    render(<PortfolioChart {...defaultProps} isLoading />);

    const loading = await screen.findByTestId('portfolio-chart-loading-state');

    expect(loading).toBeInTheDocument();
  });

  test('should render tooltips on hover properly', async () => {
    render(<PortfolioChart {...defaultProps} />);

    const aETHb = await screen.findByTestId(`${Token.aETHb}-false`);
    const aETHc = await screen.findByTestId(`${Token.aETHc}-false`);
    const eth = await screen.findByTestId(`${Token.ETH}-true`);

    expect(aETHb).toBeInTheDocument();
    expect(aETHc).toBeInTheDocument();
    expect(eth).toBeInTheDocument();

    fireEvent.mouseOver(aETHb);
    const [aETHbPercent] = await screen.findAllByText(/50%/);
    expect(aETHbPercent).toBeInTheDocument();
    fireEvent.mouseOut(aETHb);

    fireEvent.mouseOver(aETHc);
    const [aETHcPercent] = await screen.findAllByText(/20%/);
    expect(aETHcPercent).toBeInTheDocument();
    fireEvent.mouseOut(aETHc);

    fireEvent.mouseOver(eth);
    const [ethPercent] = await screen.findAllByText(/30%/);
    expect(ethPercent).toBeInTheDocument();
    fireEvent.mouseOut(eth);
  });

  test('should hover legend item', async () => {
    render(<PortfolioChart {...defaultProps} />);

    const item = await screen.findByTestId('legend-aETHb');

    act(() => {
      userEvent.hover(item);
    });

    act(() => {
      userEvent.unhover(item);
    });

    expect(item).toBeInTheDocument();
  });

  test('should render with zero values', async () => {
    render(
      <PortfolioChart
        {...defaultProps}
        nativeApr={ZERO}
        stakedApr={ZERO}
        totalNativeAmountUsd={ZERO}
        totalNativeYieldAmountUsd={ZERO}
        totalStakedAmountUsd={ZERO}
        totalStakedYieldAmountUsd={ZERO}
      />,
    );

    const chart = await screen.findByTestId('portfolio-chart');

    expect(chart).toBeInTheDocument();
  });

  test('should not render if there is no data', () => {
    render(<PortfolioChart {...defaultProps} data={[]} />);

    const title = screen.queryByText('My portfolio');
    const chart = screen.queryByTestId('portfolio-chart');

    expect(title).not.toBeInTheDocument();
    expect(chart).not.toBeInTheDocument();
  });
});
