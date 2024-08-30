import { OverlaySpinner } from '@ankr.com/ui';
import { ReactNode } from 'react';
import { TableBody as MuiTableBody, TableRow } from '@mui/material';

import { Placeholder } from 'modules/common/components/Placeholder';

import { CommonCell } from '../CommonCell';
import { TablePlaceholder } from '../TablePlaceholder';
import { useTableBodyStyles } from './useTableBodyStyles';

export interface ITableBodyProps {
  children: ReactNode;
  columnsCount: number;
  hasCopyLinkButtonInPlaceholder?: boolean;
  hasPlaceholder?: boolean;
  isLoading?: boolean;
  placeholder: string;
}

export const TableBody = ({
  children,
  columnsCount,
  hasCopyLinkButtonInPlaceholder,
  hasPlaceholder = false,
  isLoading = false,
  placeholder,
}: ITableBodyProps) => {
  const { classes } = useTableBodyStyles();

  return (
    <MuiTableBody>
      <Placeholder
        hasPlaceholder={isLoading}
        placeholder={
          <TableRow>
            <CommonCell colSpan={columnsCount}>
              <OverlaySpinner className={classes.placeholder} />
            </CommonCell>
          </TableRow>
        }
      >
        <Placeholder
          hasPlaceholder={hasPlaceholder}
          placeholder={
            <TableRow>
              <CommonCell colSpan={columnsCount}>
                <TablePlaceholder
                  className={classes.placeholder}
                  hasCopyLinkButton={hasCopyLinkButtonInPlaceholder}
                  text={placeholder}
                />
              </CommonCell>
            </TableRow>
          }
        >
          {children}
        </Placeholder>
      </Placeholder>
    </MuiTableBody>
  );
};
