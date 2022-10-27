import { useDispatchRequest } from '@redux-requests/react';
import { fetchHarmonyChainReqeust } from 'domains/requestComposer/actions/harmony/fetchHarmonyChainReqeust';
import {
  HarmonyLibraryID,
  HarmonyMethod,
} from 'domains/requestComposer/constants/harmony';
import { HARMONY_CALL_CONFIG } from 'domains/requestComposer/utils/harmony/RPCCallConfig';
import { EndpointGroup } from 'modules/endpoints/types';
import { useCallback } from 'react';
import { HarmonyMethodsFormData } from '../../components/MethodsForm/MethodsFormTypes';
import { HarmonyApiVersionTabs } from '../HarmonyApiVersionTabs';
import {
  HarmonyApiVersionPrefix,
  useVersionTabs,
} from '../HarmonyApiVersionTabs/versionTabsUtils';
import { HarmonyMethodsForm } from '../HarmonyMethodsForm';
import { formatParameters } from '../HarmonySampleCode/HarmonySampleCodeUtils';

interface IHarmonyLibraryContentProps {
  group: EndpointGroup;
  libraryID: HarmonyLibraryID;
}

export const HarmonyLibraryContent = ({
  group,
  libraryID,
}: IHarmonyLibraryContentProps) => {
  const dispatchRequest = useDispatchRequest();

  const web3HttpUrl = group.urls[0].rpc;

  const queryHarmonyReqeust = useCallback(
    (url, harmonyMethod, parameters) => {
      dispatchRequest(fetchHarmonyChainReqeust(url, harmonyMethod, parameters));
    },
    [dispatchRequest],
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
