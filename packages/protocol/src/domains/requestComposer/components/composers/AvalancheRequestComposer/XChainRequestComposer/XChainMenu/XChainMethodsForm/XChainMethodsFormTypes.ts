import {
  AvalancheLibraryID,
  XChainMethod,
} from 'domains/requestComposer/constants/avalanche';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';

export interface XChainMethodsFormProps {
  group: EndpointGroup;
  libraryID: AvalancheLibraryID;
  onSubmit: (data: MethodsRequest<XChainMethod>) => void;
}
