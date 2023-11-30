import { useMemo } from 'react';

import { BlockchainIcon } from 'domains/projects/screens/Projects/components/BlockchainIcon';

import { ActionsButton } from '../components/ActionsButton';
import { Address } from '../components/Address';
import { WhitelistTableColumn } from '../types';

export interface UseColumnsParams {
  handleEditSidebarOpening: (value: string) => void;
}

export const useColumns = ({ handleEditSidebarOpening }: UseColumnsParams) => {
  const columns = useMemo(
    (): WhitelistTableColumn[] => [
      {
        align: 'left',
        headerCell: 'Address',
        render: ({ address }) => <Address value={address} />,
        width: 315,
      },
      {
        align: 'left',
        headerCell: 'Chains',
        render: ({ chains }) => (
          <BlockchainIcon
            blockchains={chains}
            moreLabelKey="project.configure-whitelist-form.whitelist-table.more-chains"
          />
        ),
      },
      {
        align: 'right',
        headerCell: '',
        render: ({ address }) => (
          <ActionsButton
            address={address}
            handleEditSidebarOpening={handleEditSidebarOpening}
          />
        ),
        width: 24,
      },
    ],
    [handleEditSidebarOpening],
  );

  return columns;
};
