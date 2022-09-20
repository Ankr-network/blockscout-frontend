import { EVMLibraryID, EVMMethod } from 'domains/requestComposer/constants';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';

export interface EVMMethodsFormProps {
  group: EndpointGroup;
  libraryID: EVMLibraryID;
  onSubmit: (data: MethodsRequest<EVMMethod>) => void;
}
