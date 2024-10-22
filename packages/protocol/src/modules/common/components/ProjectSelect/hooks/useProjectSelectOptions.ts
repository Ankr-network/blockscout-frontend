import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { ALL_PROJECTS_VALUE } from 'domains/projects/const';
import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import {
  PRIMARY_TOKEN_INDEX,
  jwtTokenIntlRoot,
} from 'domains/jwtToken/utils/utils';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { selectEnterpriseApiKeysAsJWTs } from 'domains/enterprise/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { SelectOption } from '../ProjectSelect';

export const getAllProjectsItem = () => {
  return {
    value: ALL_PROJECTS_VALUE,
    title: t(`${jwtTokenIntlRoot}.select.all-projects`),
  };
};

const getSelectItems = (
  jwtTokens: JWT[],
  shouldDisablePrimaryProject?: boolean,
): SelectOption[] => {
  const items = jwtTokens.map(({ index, name, userEndpointToken }) => {
    return {
      value: userEndpointToken,
      title: name || renderProjectName(index),
      isDisabled: index === PRIMARY_TOKEN_INDEX && shouldDisablePrimaryProject,
    };
  });

  return [getAllProjectsItem(), ...items];
};

export const useProjectSelectOptions = (
  shouldDisablePrimaryProject?: boolean,
) => {
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwts } = useJWTs({ group, skipFetching: true });

  const { apiKeys: enterpriseJwtTokens } = useAppSelector(
    selectEnterpriseApiKeysAsJWTs,
  );

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const options = useMemo(() => {
    if (isEnterpriseClient) {
      return getSelectItems(enterpriseJwtTokens, shouldDisablePrimaryProject);
    }

    return getSelectItems(jwts, shouldDisablePrimaryProject);
  }, [
    enterpriseJwtTokens,
    isEnterpriseClient,
    jwts,
    shouldDisablePrimaryProject,
  ]);

  return options;
};
