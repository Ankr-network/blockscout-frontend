import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { BRIDGE_AUDIT_LINK } from 'modules/common/const';

import { AuditedLabel } from '..';

describe('modules/bridge/components/AuditedLabel', () => {
  test('should render properly', () => {
    render(
      <MemoryRouter>
        <AuditedLabel auditLink={BRIDGE_AUDIT_LINK} />
      </MemoryRouter>,
    );

    const title = screen.getByText('Audited by Beosin');

    expect(title).toBeInTheDocument();
  });
});
