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

export type CaptionType = {
  label: string;
  tip?: string;
  align?: AlignType;
};

export type IDataProps = Record<string, any>;

export interface ITableRowProps {
  data: IDataProps;
}

export interface ITablesRowProps extends ITableRowProps {}
