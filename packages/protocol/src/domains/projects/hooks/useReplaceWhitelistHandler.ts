import {
  ReplaceWhitelistBody,
  ReplaceWhitelistBodyKey,
  WhitelistItem,
} from 'multirpc-sdk';
import { useCallback, useMemo } from 'react';

import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { useReplaceWhitelistMutation } from '../actions/replaceWhitelist';
import { useSelectedProject } from './useSelectedProject';

export interface UseReplaceWhitelistParams {
  onSuccess?: () => void;
  whitelist: WhitelistItem[];
}

const getReplaceWhitelistBody = (whitelist: WhitelistItem[]) =>
  whitelist.reduce<ReplaceWhitelistBody>(
    (result, item) => {
      const type = item.type as ReplaceWhitelistBodyKey;

      result[type] = {
        ...result[type],
        [item.blockchain]: [
          ...new Set([...(result[type][item.blockchain] || []), ...item.list]),
        ],
      };

      return result;
    },
    { address: {}, ip: {}, referer: {} },
  );

export const useReplaceWhitelistHandler = ({
  onSuccess,
  whitelist: whitelistItems,
}: UseReplaceWhitelistParams) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();
  const { project } = useSelectedProject();

  const [replace, { isLoading: isReplacing }] = useReplaceWhitelistMutation();

  const userEndpointToken = project?.userEndpointToken;

  const whitelist = useMemo(
    () => getReplaceWhitelistBody(whitelistItems),
    [whitelistItems],
  );

  const handleReplaceWhitelist = useCallback(() => {
    if (userEndpointToken) {
      replace({
        params: { group, token: userEndpointToken, whitelist },
      }).then(onSuccess);
    }
  }, [group, onSuccess, replace, userEndpointToken, whitelist]);

  return { handleReplaceWhitelist, isReplacing };
};
