import {
  AvalancheLibraryID,
  CChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';

export interface CChainMethodsFormProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
  onSubmit: (data: MethodsRequest<CChainMethod>) => void;
}
