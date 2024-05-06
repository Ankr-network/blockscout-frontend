import { MutationDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { MutationActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';

type DefaultDefinition = MutationDefinition<any, any, any, any>;

type SuccessfulMutation<Definition extends DefaultDefinition> = Exclude<
  Awaited<MutationActionCreatorResult<Definition>>,
  { error: any }
>;

export const isMutationSuccessful = <Definition extends DefaultDefinition>(
  result: Awaited<MutationActionCreatorResult<Definition>>,
): result is SuccessfulMutation<Definition> => 'data' in result;
