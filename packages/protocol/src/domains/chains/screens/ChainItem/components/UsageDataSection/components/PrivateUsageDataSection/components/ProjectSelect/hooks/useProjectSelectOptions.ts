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
import { SelectOption } from '../ProjectSelect';
import { renderProjectName } from 'domains/jwtToken/utils/renderProjectName';

export const ALL_PROJECTS_VALUE = 'All';

const getAllProjectsItem = () => {
  return {
    value: ALL_PROJECTS_VALUE,
    title: t(`${jwtTokenIntlRoot}.select.all-projects`),
  };
};

const getSelectItems = (
  jwtTokens: JwtManagerToken[],
  shouldDisablePrimaryProject?: boolean,
): SelectOption[] => {
  const items = jwtTokens.map(({ userEndpointToken, index }) => {
    return {
      value: userEndpointToken,
      title: renderProjectName(index),
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

  const options = useMemo(
    () => getSelectItems(jwtTokens, shouldDisablePrimaryProject),
    [jwtTokens, shouldDisablePrimaryProject],
  );

  return options;
};
