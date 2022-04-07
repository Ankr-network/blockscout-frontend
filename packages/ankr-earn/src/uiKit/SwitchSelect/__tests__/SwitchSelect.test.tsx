import { render, screen, fireEvent } from '@testing-library/react';

import { Token } from 'modules/common/types/token';
import { ABNBBIcon } from 'uiKit/Icons/ABNBBIcon';
import { ABNBCIcon } from 'uiKit/Icons/ABNBCIcon';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';

import { SwitchSelect } from '../SwitchSelect';

describe('uiKit/SwitchSelect', () => {
  const defaultProps = {
    from: [
      { icon: <AETHBIcon />, value: Token.aETHb },
      { icon: <ABNBBIcon />, value: Token.aBNBb },
    ],
    to: [
      { icon: <AETHCIcon />, value: Token.aETHc },
      { icon: <ABNBCIcon />, value: Token.aBNBc },
    ],
    values: { from: '', to: '' },
    onChangeFrom: jest.fn(),
    onChangeTo: jest.fn(),
    onChangeSwitch: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(<SwitchSelect {...defaultProps} />);

    const tokenA = await screen.findByText(Token.aETHb);
    const tokenB = await screen.findByText(Token.aETHc);
    const switchIcon = await screen.findByTestId('switch-icon');

    expect(tokenA).toBeInTheDocument();
    expect(tokenB).toBeInTheDocument();
    expect(switchIcon).toBeInTheDocument();
  });

  test('should change to and from separately', async () => {
    render(<SwitchSelect {...defaultProps} />);

    {
      const select = await screen.findByTestId('switch-from');
      fireEvent.change(select.childNodes[1], {
        target: { value: Token.aBNBb },
      });

      expect(defaultProps.onChangeFrom).toBeCalledTimes(1);
      expect(defaultProps.onChangeFrom).toBeCalledWith(Token.aBNBb);
    }

    {
      const select = await screen.findByTestId('switch-to');
      fireEvent.change(select.childNodes[1], {
        target: { value: Token.aBNBc },
      });

      expect(defaultProps.onChangeTo).toBeCalledTimes(1);
      expect(defaultProps.onChangeTo).toBeCalledWith(Token.aBNBc);
    }
  });

  test('should change in pairs properly (from)', async () => {
    render(<SwitchSelect {...defaultProps} isPairSelect />);

    const select = await screen.findByTestId('switch-from');
    fireEvent.change(select.childNodes[1], {
      target: { value: Token.aBNBb },
    });

    expect(defaultProps.onChangeFrom).toBeCalledTimes(1);
    expect(defaultProps.onChangeFrom).toBeCalledWith(Token.aBNBb);

    expect(defaultProps.onChangeTo).toBeCalledTimes(1);
    expect(defaultProps.onChangeTo).toBeCalledWith(Token.aBNBc);
  });

  test('should change in pairs properly (to)', async () => {
    render(<SwitchSelect {...defaultProps} isPairSelect />);

    const select = await screen.findByTestId('switch-to');
    fireEvent.change(select.childNodes[1], {
      target: { value: Token.aBNBc },
    });

    expect(defaultProps.onChangeFrom).toBeCalledTimes(1);
    expect(defaultProps.onChangeFrom).toBeCalledWith(Token.aBNBb);

    expect(defaultProps.onChangeTo).toBeCalledTimes(1);
    expect(defaultProps.onChangeTo).toBeCalledWith(Token.aBNBc);
  });
});
