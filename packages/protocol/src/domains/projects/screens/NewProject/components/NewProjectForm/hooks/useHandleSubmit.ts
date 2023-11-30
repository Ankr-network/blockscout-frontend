import { UserEndpointTokenMode } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';
import { useHistory } from 'react-router';

import { NewProjectStep } from 'domains/projects/types';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useAppSelector } from 'store/useAppSelector';
import { selectAllProjects } from 'domains/projects/store/WhitelistsSelector';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

import { useWhitelistStepOnSubmit } from './useWhitelistStepOnSubmit';
import {
  NewProjectFormValues,
  NewProjectFormProps,
} from '../NewProjectFormTypes';
import { useGeneralStepOnSubmit } from './useGeneralStepOnSubmit';

// eslint-disable-next-line max-lines-per-function
export const useHandleSubmit = (
  step: NewProjectStep,
  onSubmit: NewProjectFormProps['onSubmit'],
) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleCreateToken, handleUpdateToken } = useGeneralStepOnSubmit();
  const handleWhitelistStepOnSubmit = useWhitelistStepOnSubmit();
  const { handleEnableWhitelist, handleResetConfig } = useEnableWhitelist();

  const allProjects = useAppSelector(selectAllProjects);

  const handleSubmit = useCallback(
    // eslint-disable-next-line max-lines-per-function
    async (values: NewProjectFormValues) => {
      switch (step) {
        case NewProjectStep.General:
        default: {
          const {
            name,
            description,
            tokenIndex,
            userEndpointToken: sliceUserEndpointToken,
          } = values;

          const hasNameDuplication = allProjects.some(
            project =>
              project.name === name && project.tokenIndex !== tokenIndex,
          );

          const isExistedToken = allProjects.some(
            project => project.tokenIndex === tokenIndex,
          );

          /* validation start */
          if (hasNameDuplication) {
            dispatch(
              NotificationActions.showNotification({
                message: t(
                  'projects.rename-dialog.error-message.name-duplication',
                  {
                    value: name,
                  },
                ),
                severity: 'error',
              }),
            );

            return null;
          }

          if (!tokenIndex) {
            dispatch(
              NotificationActions.showNotification({
                message: t(
                  'projects.new-project.step-2.error-message.token-index-error',
                ),
                severity: 'error',
              }),
            );

            return null;
          }

          if (!name) {
            dispatch(
              NotificationActions.showNotification({
                message: t(
                  'projects.new-project.step-2.error-message.required',
                ),
                severity: 'error',
              }),
            );

            return null;
          }
          /* validation end */

          const data = await (isExistedToken
            ? handleUpdateToken(tokenIndex, name, description)
            : handleCreateToken(tokenIndex, name, description));

          return onSubmit(step, {
            name,
            description,
            tokenIndex,
            userEndpointToken:
              sliceUserEndpointToken || data?.userEndpointToken,
          });
        }

        case NewProjectStep.Chains: {
          const {
            selectedMainnetIds = [],
            selectedTestnetIds = [],
            selectedDevnetIds = [],
            selectedBeaconMainnetIds = [],
            selectedBeaconTestnetIds = [],
            selectedOpnodeMainnetIds = [],
            selectedOpnodeTestnetIds = [],
          } = values;

          if (
            selectedMainnetIds.length === 0 &&
            selectedTestnetIds.length === 0 &&
            selectedDevnetIds.length === 0 &&
            selectedBeaconMainnetIds.length === 0 &&
            selectedBeaconTestnetIds.length === 0 &&
            selectedOpnodeMainnetIds.length === 0 &&
            selectedOpnodeTestnetIds.length === 0
          ) {
            dispatch(
              NotificationActions.showNotification({
                message: t(
                  'projects.new-project.step-2.error-message.required',
                ),
                severity: 'error',
              }),
            );

            return null;
          }

          return onSubmit(step, {
            selectedMainnetIds,
            selectedTestnetIds,
            selectedDevnetIds,
            selectedBeaconMainnetIds,
            selectedBeaconTestnetIds,
            selectedOpnodeMainnetIds,
            selectedOpnodeTestnetIds,
          });
        }

        case NewProjectStep.Whitelist: {
          const { whitelistItems, userEndpointToken } = values;

          const hasContracts = whitelistItems?.some(
            item => item.type === UserEndpointTokenMode.ADDRESS,
          );

          if (hasContracts) {
            onSubmit(step, {
              whitelistItems,
            });
          }

          await handleWhitelistStepOnSubmit(userEndpointToken);

          const { isSuccess } = await handleEnableWhitelist(false);

          if (isSuccess) {
            if (!hasContracts) {
              history.push(ProjectsRoutesConfig.projects.generatePath());
            }

            handleResetConfig();
          }

          return null;
        }
      }
    },
    [
      allProjects,
      step,
      onSubmit,
      dispatch,
      handleCreateToken,
      handleUpdateToken,
      handleEnableWhitelist,
      handleResetConfig,
      handleWhitelistStepOnSubmit,
      history,
    ],
  );

  return { handleSubmit };
};
