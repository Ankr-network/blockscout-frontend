import { uid } from 'react-uid';
import { Table } from '.';
import {
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '..';
import { CAPTIONS, CAPTIONS_2, DATA } from '../mocks';
import {
  ICustomProps,
  IStyleProps,
  ITablesCaptionProps,
  ITablesRowProps,
} from '../types';

interface IDataTableProps extends ICustomProps, IStyleProps {
  className?: string;
  captions: ITablesCaptionProps[];
  rows: ITablesRowProps[];
}

const DataTable = ({ captions, rows, ...rest }: IDataTableProps) => {
  return (
    <Table columnsCount={captions.length} {...rest}>
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell key={cell.key} label={cell.label} align={cell.align} />
        ))}
      </TableHead>
      {rows && (
        <TableBody>
          {rows.map(row => (
            <TableRow key={uid(row)}>
              {captions.map(cell => (
                <TableBodyCell
                  key={cell.key}
                  align={cell.align}
                  label={`${cell.label}`}
                >
                  {row.data[cell.key]}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export const SimpleTable = () => <DataTable captions={CAPTIONS} rows={DATA} />;

export const DenseSimpleTable = () => (
  <DataTable captions={CAPTIONS} rows={DATA} dense />
);

export const StickyHeader = () => (
  <>
    <DataTable captions={CAPTIONS} rows={DATA} stickyHeader />
    <div style={{ height: '100vh' }} />
  </>
);

export const CustomCellSize = () => (
  <DataTable
    captions={CAPTIONS}
    rows={DATA}
    customCell="2.5fr 1.5fr 1fr 1.5fr minmax(70px, 1fr)"
  />
);

export const ContentDisplayOnRightSide = () => (
  <DataTable captions={CAPTIONS} rows={DATA} alignCell="right" />
);

export const ContentDisplayOnCenter = () => (
  <DataTable captions={CAPTIONS} rows={DATA} alignCell="center" />
);

export const ContentDisplayOnDifferentSide = () => (
  <DataTable captions={CAPTIONS_2} rows={DATA} />
);

export default {
  title: 'components/Table',
};
