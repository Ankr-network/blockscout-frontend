import { LatestRequest } from 'multirpc-sdk';

import { TableBody } from '../TableBody';
import { TableHead } from '../TableHead';
import { TableVariant } from '../../types';

export interface TableProps {
  data?: LatestRequest[];
  hasHeader?: boolean;
  variant: TableVariant;
}

export const Table = ({ data, hasHeader, variant }: TableProps) => (
  <>
    {hasHeader && <TableHead />}
    <TableBody requests={data} variant={variant} />
  </>
);
