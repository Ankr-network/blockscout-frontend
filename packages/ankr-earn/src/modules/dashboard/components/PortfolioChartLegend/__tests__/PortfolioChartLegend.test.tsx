import { render, screen } from '@testing-library/react';
import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';

import { PortfolioChartLegend, IPortfolioChartLegendProps } from '..';

describe('modules/dashboard/components/PortfolioChartLegend', () => {
  const defaultProps: IPortfolioChartLegendProps = {
    apr: new BigNumber(7.1),
    isLoading: false,
    totalAmount: new BigNumber(50_600),
    yearlYield: new BigNumber(10_200),
    totalPercent: new BigNumber(50),
    legendItems: [
      {
        name: Token.aETHb,
        percent: 30,
        usdAmount: new BigNumber(3_000),
        amount: new BigNumber(1),
        icon: AETHBIcon,
        color: '#000',
        link: 'link',
        yieldAmount: new BigNumber(1),
        yieldAmountUsd: new BigNumber(1),
        apy: new BigNumber(0.3),
        isNative: false,
      },
    ],
    onMouseOver: jest.fn(),
    onMouseLeave: jest.fn(),
  };

  test('should render properly', async () => {
    render(<PortfolioChartLegend {...defaultProps} />);

    const title = await screen.findByText(/Staked assets/);

    expect(title).toBeInTheDocument();
  });

  test('should render with loading state', async () => {
    render(<PortfolioChartLegend {...defaultProps} isLoading />);

    const section = await screen.findByTestId('loading-state');

    expect(section).toBeInTheDocument();
  });

  // todo: uncomment it and refact. it was made temprorary for release

  // test('should render properly with synthetic mode', async () => {
  //   render(<PortfolioChartLegend {...defaultProps} isNative />);

  //   const title = await screen.findByText(/Available to stake/);

  //   expect(title).toBeInTheDocument();
  // });

  // test('should not render stake button', async () => {
  //   render(
  //     <PortfolioChartLegend
  //       {...defaultProps}
  //       isNative
  //       legendItems={[
  //         {
  //           name: Token.aETHb,
  //           percent: 30,
  //           usdAmount: new BigNumber(3_000),
  //           amount: new BigNumber(1),
  //           yieldAmount: new BigNumber(1),
  //           yieldAmountUsd: new BigNumber(1),
  //           apy: new BigNumber(0.3),
  //           icon: AETHBIcon,
  //           color: '#000',
  //           isNative: false,
  //         },
  //       ]}
  //     />,
  //   );

  //   const item = await screen.findByTestId('legend-aETHb');

  //   act(() => {
  //     userEvent.hover(item);
  //   });

  //   const stakeButton = screen.queryByText('Stake');

  //   expect(stakeButton).not.toBeInTheDocument();
  // });

  // test('should hover legend item', async () => {
  //   render(<PortfolioChartLegend {...defaultProps} isNative />);

  //   const item = await screen.findByTestId('legend-aETHb');

  //   act(() => {
  //     userEvent.hover(item);
  //   });

  //   const stakeButton = await screen.findByText('Stake');

  //   expect(stakeButton).toBeInTheDocument();

  //   act(() => {
  //     userEvent.unhover(item);
  //   });

  //   expect(defaultProps.onMouseLeave).toBeCalledTimes(1);
  //   expect(defaultProps.onMouseOver).toBeCalledTimes(1);
  // });
});
