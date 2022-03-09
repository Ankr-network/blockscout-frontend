/* eslint-disable import/no-extraneous-dependencies */
import { Story } from '@storybook/react';
import { ReactNode } from 'react';
import { uid } from 'react-uid';

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

import { ITableComponentProps } from './Table';

import { Table } from '.';

export default {
  title: 'modules/common/components/Table',
  component: Table,
};

interface IDataTableProps extends ICustomProps, IStyleProps {
  className?: string;
  captions: ITablesCaptionProps[];
  rows: ITablesRowProps[];
}

const DataTable = ({
  captions,
  rows,
  ...rest
}: IDataTableProps): JSX.Element => {
  return (
    <Table columnsCount={captions.length} {...rest}>
      <TableHead>
        {captions.map(cell => (
          <TableHeadCell key={cell.key} align={cell.align} label={cell.label} />
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
                  {row.data[cell.key] as ReactNode}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

const Template: Story<ITableComponentProps> = args => {
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

export const ContentDisplayOnDifferentSide = (): JSX.Element => (
  <DataTable captions={CAPTIONS_2} rows={DATA} />
);
