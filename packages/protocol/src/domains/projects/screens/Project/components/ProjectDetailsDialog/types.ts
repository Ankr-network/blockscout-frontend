export enum ProjectDetailsFormFields {
  name = 'name',
  description = 'description',
}

export interface ProjectDetailsFormValues {
  [ProjectDetailsFormFields.name]: string;
  [ProjectDetailsFormFields.description]: string;
}
