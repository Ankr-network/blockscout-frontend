import React from 'react';

import { Header } from './components/Header';
import { PreparedRequest } from '../../types';
import { Row } from './components/Row';

import { useStyles } from './TableStyles';

export interface TableProps {
  requests: PreparedRequest[];
}

export const Table = ({ requests }: TableProps) => {
  const classes = useStyles();

  return (
    <div className={classes.tableRoot}>
      <Header />
      <div className={classes.body}>
        {requests.map(request => (
          <Row request={request} key={request.method} />
        ))}
      </div>
    </div>
  );
};
