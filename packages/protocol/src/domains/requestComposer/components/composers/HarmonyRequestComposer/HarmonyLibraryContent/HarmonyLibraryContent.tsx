import { useCallback } from 'react';

import { EndpointGroup } from 'modules/endpoints/types';
import { HARMONY_CALL_CONFIG } from 'domains/requestComposer/utils/harmony/RPCCallConfig';
import { HarmonyApiVersionTabs } from '../HarmonyApiVersionTabs';
import {
  HarmonyApiVersionPrefix,
  useVersionTabs,
} from '../HarmonyApiVersionTabs/versionTabsUtils';
import {
  HarmonyLibraryID,
  HarmonyMethod,
} from 'domains/requestComposer/constants/harmony';
import { HarmonyMethodsForm } from '../HarmonyMethodsForm';
import { HarmonyMethodsFormData } from '../../../MethodsForm/MethodsFormTypes';
import { formatParameters } from '../HarmonySampleCode/HarmonySampleCodeUtils';
import { requestComposerFetchHarmonyChainRequest } from 'domains/requestComposer/actions/harmony/fetchHarmonyChainReqeust';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

interface IHarmonyLibraryContentProps {
  group: EndpointGroup;
  libraryID: HarmonyLibraryID;
}

export const HarmonyLibraryContent = ({
  group,
  libraryID,
}: IHarmonyLibraryContentProps) => {
  const [fetchHarmonyChainReqeust, , reset] = useQueryEndpoint(
    requestComposerFetchHarmonyChainRequest,
  );

  const web3HttpUrl = group.urls[0].rpc;

  const queryHarmonyReqeust = useCallback(
    (web3URL, method, params) => {
      // We have to reset the request before sending because RTK query considers
      // values of reference data types with different references but with the
      // same inner values as equal values.
      reset();
      fetchHarmonyChainReqeust({ web3URL, method, params });
    },
    [fetchHarmonyChainReqeust, reset],
  );

  const handleSubmit = useCallback(
    (data: HarmonyMethodsFormData) => {
      const { methodName, ...params } = data;
      const harmonyMethod = methodName?.value as HarmonyMethod;

      const argList =
        HARMONY_CALL_CONFIG?.[harmonyMethod]?.[HarmonyLibraryID.Harmony]?.args;
      const parameters = formatParameters(params, harmonyMethod, argList);

      queryHarmonyReqeust(web3HttpUrl, harmonyMethod, parameters);
    },
    [queryHarmonyReqeust, web3HttpUrl],
  );

  const [tabs, selectedTab] = useVersionTabs();

  return (
    <>
      <HarmonyApiVersionTabs tabs={tabs} selectedTab={selectedTab} />
      {selectedTab?.id === HarmonyApiVersionPrefix.v1 && (
        <HarmonyMethodsForm
          onSubmit={handleSubmit}
          group={group}
          libraryID={libraryID}
          versionId={HarmonyApiVersionPrefix.v1}
        />
      )}
      {selectedTab?.id === HarmonyApiVersionPrefix.v2 && (
        <HarmonyMethodsForm
          onSubmit={handleSubmit}
          group={group}
          libraryID={libraryID}
          versionId={HarmonyApiVersionPrefix.v2}
        />
      )}
    </>
  );
};
