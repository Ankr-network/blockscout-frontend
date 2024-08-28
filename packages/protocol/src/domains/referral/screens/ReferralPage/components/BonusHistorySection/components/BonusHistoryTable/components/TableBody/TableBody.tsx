import { OverlaySpinner } from '@ankr.com/ui';
import { ReactNode } from 'react';
import { TableBody as MuiTableBody, TableRow } from '@mui/material';

import { Placeholder } from 'modules/common/components/Placeholder';
import { TablePlaceholder } from 'domains/referral/screens/ReferralPage/components/TablePlaceholder';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { CommonCell } from '../CommonCell';
import { tableBodyTranslation } from './translation';
import { useTableBodyStyles } from './useTableBodyStyles';

export interface ITableBodyProps {
  children: ReactNode;
  hasPlaceholder?: boolean;
  isLoading?: boolean;
}

export const TableBody = ({
  children,
  hasPlaceholder = false,
  isLoading = false,
}: ITableBodyProps) => {
  const { classes } = useTableBodyStyles();
  const { keys, t } = useTranslation(tableBodyTranslation);

  return (
    <MuiTableBody>
      <Placeholder
        hasPlaceholder={isLoading}
        placeholder={
          <TableRow>
            <CommonCell colSpan={2}>
              <OverlaySpinner className={classes.placeholder} />
            </CommonCell>
          </TableRow>
        }
      >
        <Placeholder
          hasPlaceholder={hasPlaceholder}
          placeholder={
            <TableRow>
              <CommonCell colSpan={2}>
                <TablePlaceholder
                  className={classes.placeholder}
                  hasCopyLinkButton
                  text={t(keys.placeholder)}
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
