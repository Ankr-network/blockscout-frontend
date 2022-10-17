import {
  NearLibraryID,
  NearMethod,
} from 'domains/requestComposer/constants/near';
import { MethodsRequest } from 'domains/requestComposer/types';
import { EndpointGroup } from 'modules/endpoints/types';

export interface NearMethodsFormProps {
  group: EndpointGroup;
  libraryID: NearLibraryID;
  onSubmit: (data: MethodsRequest<NearMethod>) => void;
}
