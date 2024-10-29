import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { NewProjectStep } from 'domains/projects/types';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { useJWTsManager } from 'domains/jwtToken/hooks/useJWTsManager';

import {
  NewProjectFormValues,
  NewProjectFormProps,
} from '../NewProjectFormTypes';
import { useGeneralStepOnSubmit } from './useGeneralStepOnSubmit';
import { useWhitelistStepOnSubmit } from './useWhitelistStepOnSubmit';

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

  const { jwts: projects } = useJWTsManager();

  const handleSubmit = useCallback(
    // eslint-disable-next-line max-lines-per-function
    async (values: NewProjectFormValues) => {
      switch (step) {
        case NewProjectStep.General:
        default: {
          const {
            description,
            name,
            tokenIndex,
            userEndpointToken: sliceUserEndpointToken,
          } = values;

          const hasNameDuplication = projects.some(
            project => project.name === name && project.index !== tokenIndex,
          );

          const isExistedToken = projects.some(
            project => project.index === tokenIndex,
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

          if (isExistedToken) {
            await handleUpdateToken(tokenIndex, name, description);

            return onSubmit(step, {
              description,
              name,
              tokenIndex,
              userEndpointToken: sliceUserEndpointToken,
            });
          }

          const token = await handleCreateToken(tokenIndex, name, description);

          return onSubmit(step, {
            description,
            name,
            tokenIndex,
            userEndpointToken: token?.userEndpointToken,
          });
        }

        case NewProjectStep.Chains: {
          const {
            isSelectedAll,
            selectedBeaconMainnetIds = [],
            selectedBeaconTestnetIds = [],
            selectedDevnetIds = [],
            selectedMainnetIds = [],
            selectedOpnodeMainnetIds = [],
            selectedOpnodeTestnetIds = [],
            selectedTestnetIds = [],
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
            isSelectedAll,
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
          const { userEndpointToken, whitelistItems } = values;

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
            history.push(ProjectsRoutesConfig.projects.generatePath());

            handleResetConfig();
          }

          return null;
        }
      }
    },
    [
      dispatch,
      handleCreateToken,
      handleEnableWhitelist,
      handleResetConfig,
      handleUpdateToken,
      handleWhitelistStepOnSubmit,
      history,
      onSubmit,
      projects,
      step,
    ],
  );

  return { handleSubmit };
};
