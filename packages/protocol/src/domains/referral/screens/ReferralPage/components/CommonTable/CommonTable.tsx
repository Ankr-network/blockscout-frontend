import { ReactNode } from 'react';
import { Table, TableContainer } from '@mui/material';

import { Widget } from 'domains/referral/screens/ReferralPage/components/Widget';

import { TableBody } from './components/TableBody';
import { TableHead } from './components/TableHead';
import { useCommonTableStyles } from './useCommonTableStyles';
import { ITableColumn } from './types';

export interface ICommonTableProps {
  children: ReactNode;
  columns: ITableColumn[];
  hasCopyLinkButtonInPlaceholder?: boolean;
  hasPlaceholder?: boolean;
  headCellClassName?: string;
  isLoading?: boolean;
  placeholder: string;
}

export const CommonTable = ({
  children,
  columns,
  hasCopyLinkButtonInPlaceholder,
  hasPlaceholder,
  headCellClassName,
  isLoading,
  placeholder,
}: ICommonTableProps) => {
  const { classes } = useCommonTableStyles();

  return (
    <TableContainer component={Widget}>
      <Table classes={classes}>
        <TableHead cellClassName={headCellClassName} columns={columns} />
        <TableBody
          columnsCount={columns.length}
          hasCopyLinkButtonInPlaceholder={hasCopyLinkButtonInPlaceholder}
          hasPlaceholder={hasPlaceholder}
          isLoading={isLoading}
          placeholder={placeholder}
        >
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
