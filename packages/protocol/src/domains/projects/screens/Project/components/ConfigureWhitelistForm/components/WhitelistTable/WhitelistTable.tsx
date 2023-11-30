import { TableContainer } from '@mui/material';

import { Placeholder } from 'modules/common/components/Placeholder';

import {
  UseWhitelistTableParams,
  useWhitelistTable,
} from './hooks/useWhitelistTable';
import { WhitelistPlaceholder } from '../WhitelistPlaceholder';
import { WhitelistTableBody } from './components/WhitelistTableBody';
import { WhitelistTableHead } from './components/WhitelistTableHead';

export interface WhitelistTableProps extends UseWhitelistTableParams {}

export const WhitelistTable = ({
  handleEditSidebarOpening,
  whitelist,
  whitelistType,
}: WhitelistTableProps) => {
  const { columns, data } = useWhitelistTable({
    handleEditSidebarOpening,
    whitelist,
    whitelistType,
  });

  return (
    <Placeholder
      hasPlaceholder={data.length === 0}
      placeholder={<WhitelistPlaceholder />}
    >
      <TableContainer cellSpacing={0} component="table">
        <WhitelistTableHead columns={columns} />
        <WhitelistTableBody columns={columns} data={data} />
      </TableContainer>
    </Placeholder>
  );
};
