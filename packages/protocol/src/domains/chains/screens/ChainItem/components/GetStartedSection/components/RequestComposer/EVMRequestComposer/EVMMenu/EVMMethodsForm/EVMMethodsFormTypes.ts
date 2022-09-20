import { EVMLibraryID } from 'domains/requestComposer/constants';
import { EVMMethodsRequest, MethodOption } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';

export interface EVMMethodsFormProps {
  group: EndpointGroup;
  libraryID: EVMLibraryID;
  onSubmit: (data: EVMMethodsRequest) => void;
}

export type EVMMethodsFieldsData = {
  [key: string]: string;
};

export type EVMMethodsFormData = {
  methodName?: MethodOption;
} & EVMMethodsFieldsData;
