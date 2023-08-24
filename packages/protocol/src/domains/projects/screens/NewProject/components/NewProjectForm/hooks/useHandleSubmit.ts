import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';
import { useHistory } from 'react-router';

import { NewProjectStep } from 'domains/projects/types';
import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { TopUpOrigin } from 'domains/account/types';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

import { useCheckoutStepOnSubmit } from './useCheckoutStepOnSubmit';
import { useWhitelistStepOnSubmit } from './useWhitelistStepOnSubmit';
import {
  NewProjectFormValues,
  NewProjectFormProps,
} from '../NewProjectFormTypes';
import { getFinalPrice } from '../../../utils/getFinalPrice';

// eslint-disable-next-line max-lines-per-function
export const useHandleSubmit = (
  step: NewProjectStep,
  onSubmit: NewProjectFormProps['onSubmit'],
) => {
  const dispatch = useDispatch();
  const handleWhitelistStepOnSubmit = useWhitelistStepOnSubmit();
  const handleCheckoutStepOnSubmit = useCheckoutStepOnSubmit();
  const { handleEnableWhitelist, handleResetConfig } = useEnableWhitelist();
  const history = useHistory();

  return useCallback(
    async (values: NewProjectFormValues) => {
      switch (step) {
        case NewProjectStep.Chain:
        default: {
          const {
            projectName,
            tokenIndex,
            userEndpointToken,
            selectedMainnetIds = [],
            selectedTestnetIds = [],
            selectedDevnetIds = [],
            selectedBeaconMainnetIds = [],
            selectedBeaconTestnetIds = [],
            selectedOpnodeMainnetIds = [],
            selectedOpnodeTestnetIds = [],
          } = values;

          /* validation start */
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
                  'projects.new-project.step-1.error-message.required',
                ),
                severity: 'error',
              }),
            );

            return null;
          }
          /* validation end */

          return onSubmit(step, {
            projectName,
            tokenIndex,
            userEndpointToken,
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
          const { whitelistItems, tokenIndex, userEndpointToken } = values;

          /* validation start */
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

          // TODO: MRPC-3371 rewrite it
          if (!whitelistItems || whitelistItems.length === 0) {
            return {
              contractAddress: t(
                'projects.new-project.step-2.error-message.required',
              ),
            };
          }

          const isUpdatedWithWhitelist = await handleWhitelistStepOnSubmit(
            userEndpointToken,
          );

          if (isUpdatedWithWhitelist) {
            return onSubmit(step, {
              whitelistItems,
            });
          }

          return null;
        }

        case NewProjectStep.Plan: {
          const { planName, planPrice } = values;

          return onSubmit(step, { planName, planPrice });
        }

        case NewProjectStep.Checkout: {
          const { planPrice, whitelistItems } = values;
          const isSuccess = await handleEnableWhitelist(false);

          if (isSuccess) {
            history.push(ProjectsRoutesConfig.projects.generatePath());
            handleResetConfig();

            return null;
          }

          if (!planPrice) return null;

          const price = getFinalPrice(whitelistItems, planPrice);

          const url = await handleCheckoutStepOnSubmit(price);

          if (url) {
            const submitResult = onSubmit(step, {
              isCheckedOut: true,
            });

            await dispatch(setTopUpOrigin(TopUpOrigin.PROJECTS));

            window.location.href = url;

            return submitResult;
          }

          return null;
        }
      }
    },
    [
      step,
      onSubmit,
      handleWhitelistStepOnSubmit,
      handleCheckoutStepOnSubmit,
      dispatch,
      handleEnableWhitelist,
      history,
      handleResetConfig,
    ],
  );
};
