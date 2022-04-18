import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { AuditedLabel } from '..';

describe('modules/bridge/components/AuditedLabel', () => {
  test('should render properly', () => {
    render(
      <MemoryRouter>
        <AuditedLabel />
      </MemoryRouter>,
    );

    const title = screen.getByText('Audited by Beosin');

    expect(title).toBeInTheDocument();
  });
});
