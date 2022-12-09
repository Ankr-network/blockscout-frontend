import {
  AvalancheLibraryID,
  PChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';

export interface PChainMethodsFormProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
  onSubmit: (data: MethodsRequest<PChainMethod>) => void;
}
