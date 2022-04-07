import { render, screen } from '@testing-library/react';

import { Menu } from '../Menu';

describe('uiKit/Menu', () => {
  test('should render properly', async () => {
    const onClick = jest.fn();

    render(
      <Menu>
        <Menu.Item onClick={onClick}>Item 1</Menu.Item>

        <Menu.Item disabled>Item 2</Menu.Item>
      </Menu>,
    );

    const icon = await screen.findByTestId('menu-button');

    expect(icon).toBeInTheDocument();

    icon.click();

    const item = await screen.findByText('Item 1');

    expect(item).toBeInTheDocument();

    item.click();

    expect(onClick).toBeCalledTimes(1);
  });
});
