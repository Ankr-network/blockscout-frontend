import { render, screen } from '@testing-library/react';

import { useIsXSDown } from 'ui';

import { Zendesk } from '..';
import { useZendeskHook, IUseZendeskData } from '../useZendeskHook';

jest.mock('ui', () => ({
  useIsXSDown: jest.fn(),
}));

jest.mock('../useZendeskHook', () => ({
  useZendeskHook: jest.fn(),
}));

describe('modules/common/components/Zendesk', () => {
  const defaultHookData: IUseZendeskData = {
    isLoaded: true,
    onOpen: jest.fn(),
    onHide: jest.fn(),
    onShow: jest.fn(),
  };

  beforeEach(() => {
    (useZendeskHook as jest.Mock).mockReturnValue(defaultHookData);

    (useIsXSDown as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should render properly', async () => {
    render(<Zendesk />);

    const help = await screen.findByText('Help');
    const icon = await screen.findByTestId('zendesk-circle-icon');

    expect(help).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('should not render if is not loaded', () => {
    (useZendeskHook as jest.Mock).mockReturnValue({
      ...defaultHookData,
      isLoaded: false,
    });

    render(<Zendesk />);

    const help = screen.queryByText('Help');
    const icon = screen.queryByTestId('zendesk-circle-icon');

    expect(help).not.toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });

  test('should render properly for desktop viewport', async () => {
    (useIsXSDown as jest.Mock).mockReturnValue(false);

    render(<Zendesk />);

    const help = await screen.findByText('Help');
    const icon = await screen.findByTestId('zendesk-help-icon');

    expect(help).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
