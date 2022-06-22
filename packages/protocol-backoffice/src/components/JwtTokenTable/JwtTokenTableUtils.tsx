import React, { ReactElement } from 'react';
import { Tag } from 'antd';
import { TJwtTokenStatus, TJwtTokenType } from 'multirpc-sdk';

export const renderStatus = (status: TJwtTokenStatus): ReactElement => {
  const colors: Record<TJwtTokenStatus, string> = {
    JWT_TOKEN_STATUS_ACTIVE: 'green',
    JWT_TOKEN_STATUS_EXPIRED: 'red',
    JWT_TOKEN_STATUS_REVOKED: 'grey',
  };

  return (
    <Tag color={colors[status] || 'grey'} key={status}>
      {status.substr('JWT_TOKEN_STATUS_'.length)}
    </Tag>
  );
};

export const renderType = (status: TJwtTokenType): ReactElement => {
  const colors: Record<TJwtTokenType, string> = {
    JWT_TOKEN_TYPE_UNKNOWN: 'grey',
    JWT_TOKEN_TYPE_USER: 'blue',
    JWT_TOKEN_TYPE_ADMIN: 'red',
  };

  return (
    <Tag color={colors[status] || 'grey'} key={status}>
      {status.substr('JWT_TOKEN_TYPE_'.length)}
    </Tag>
  );
};

export const tableColumns = [
  {
    title: 'Owner',
    dataIndex: 'owner_address',
    key: 'owner_address',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: renderStatus,
  },
  {
    title: 'Threshold Key',
    dataIndex: 'threshold_key',
    key: 'threshold_key',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: renderType,
  },
  {
    title: 'Expires At',
    dataIndex: 'expires_at',
    key: 'expired_at',
    render: (value: number) => {
      if (value < 946684800) value *= 1000;
      if (!value) return 'N/A';

      return new Date(value * 1000).toLocaleDateString();
    },
  },
];
