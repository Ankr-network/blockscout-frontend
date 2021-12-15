import { Story } from '@storybook/react';
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
import { ITableProps } from './Table';

export default {
  title: 'components/Table',
  component: Table,
};

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

const Template: Story<ITableProps> = args => {
  return (
    <>
      <DataTable captions={CAPTIONS} {...args} rows={DATA} />
      <div style={{ height: '100vh' }} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  dense: false,
  stickyHeader: false,
  customCell: '0.5fr 1fr 1fr 0.6fr minmax(70px, 1fr)',
  columnsCount: CAPTIONS.length,
  paddingCollapse: false,
  minWidth: 810,
};

export const ContentDisplayOnDifferentSide = () => (
  <DataTable captions={CAPTIONS_2} rows={DATA} />
);
