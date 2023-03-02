import { EmptyMessage } from '../EmptyMessage';
import { ErrorMessage } from '../ErrorMessage';
import { Preloader } from '../Preloader';
import { Table, TableProps } from './Table';
import { areRequestsEmpty } from '../../utils/areRequestsEmpty';

export interface TableContainerProps extends TableProps {
  error: unknown;
  isUninitialized: boolean;
}

export const TableContainer = ({
  data,
  error,
  hasHeader,
  isUninitialized,
  variant,
}: TableContainerProps) => {
  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (areRequestsEmpty(data)) {
    return <EmptyMessage />;
  }

  if (isUninitialized || !data) {
    return <Preloader />;
  }

  return <Table data={data} hasHeader={hasHeader} variant={variant} />;
};
