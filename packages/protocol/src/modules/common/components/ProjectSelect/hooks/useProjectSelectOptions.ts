import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import {
  IUserJwtToken,
  fetchAllJwtTokenRequests,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import {
  jwtTokenIntlRoot,
  PRIMARY_TOKEN_INDEX,
} from 'domains/jwtToken/utils/utils';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';
import { useAppSelector } from 'store/useAppSelector';
import { selectEnterpriseApiKeysAsJwtManagerTokens } from 'domains/enterprise/store/selectors';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { ALL_PROJECTS_VALUE } from 'domains/projects/const';

import { SelectOption } from '../ProjectSelect';

export const getAllProjectsItem = () => {
  return {
    value: ALL_PROJECTS_VALUE,
    title: t(`${jwtTokenIntlRoot}.select.all-projects`),
  };
};

const getSelectItems = (
  jwtTokens: JwtManagerToken[],
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

const defaultJWTTokens: IUserJwtToken = { jwtTokens: [] };

export const useProjectSelectOptions = (
  shouldDisablePrimaryProject?: boolean,
) => {
  const [, { data: { jwtTokens } = defaultJWTTokens }] = useQueryEndpoint(
    fetchAllJwtTokenRequests,
  );

  const { apiKeys: enterpriseJwtTokens } = useAppSelector(
    selectEnterpriseApiKeysAsJwtManagerTokens,
  );

  const { isEnterpriseClient } = useEnterpriseClientStatus();

  const options = useMemo(() => {
    if (isEnterpriseClient) {
      return getSelectItems(enterpriseJwtTokens, shouldDisablePrimaryProject);
    }

    return getSelectItems(jwtTokens, shouldDisablePrimaryProject);
  }, [
    isEnterpriseClient,
    jwtTokens,
    shouldDisablePrimaryProject,
    enterpriseJwtTokens,
  ]);

  return options;
};
