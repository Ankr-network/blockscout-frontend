export enum AddAndEditProjectDialogFields {
  name = 'name',
  description = 'description',
  isEditingProjectDialog = 'isEditingProjectDialog',
  tokenIndex = 'tokenIndex',
}

export interface AddAndEditProjectDialogType {
  [AddAndEditProjectDialogFields.name]?: string;
  [AddAndEditProjectDialogFields.description]?: string;
  [AddAndEditProjectDialogFields.isEditingProjectDialog]: boolean;
  [AddAndEditProjectDialogFields.tokenIndex]: number;
}
