import { Box } from '@mui/material';

import { EndpointGroup } from 'modules/endpoints/types';
import { SolanaLibraryID } from 'domains/requestComposer/constants/solana';

import { SolanaMethodsForm } from '../SolanaMethodsForm';
import { useSubmitCallback } from './hooks/useSubmitCallback';

export interface LibraryContentProps {
  group: EndpointGroup;
  libraryID: SolanaLibraryID;
}

export const LibraryContent = ({ group, libraryID }: LibraryContentProps) => {
  const onSubmit = useSubmitCallback({ group, libraryID });

  return (
    <Box>
      <SolanaMethodsForm
        group={group}
        libraryID={libraryID}
        onSubmit={onSubmit}
      />
    </Box>
  );
};
