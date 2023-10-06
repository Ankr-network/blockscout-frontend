export enum EditProjectDialogFields {
  name = 'name',
  tokenIndex = 'tokenIndex',
}

export interface EditProjectDialogType {
  [EditProjectDialogFields.name]?: string;
  [EditProjectDialogFields.tokenIndex]: number;
}
