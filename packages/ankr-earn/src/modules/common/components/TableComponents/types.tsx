import React from 'react';
export type AlignType = 'center' | 'right' | 'left';

export interface IStyleProps {
  alignCell?: AlignType;
  dense?: boolean;
  paddingCollapse?: boolean;
  stickyHeader?: boolean;
}

export interface ICustomProps {
  customCell?: string;
}

export interface ITablesCaptionProps {
  key: string;
  label: React.ReactNode;
  align?: AlignType;
}

export type IDataProps = Record<string, any>;

export interface ITableRowProps {
  data: IDataProps;
}

export interface ITablesRowProps extends ITableRowProps {}
