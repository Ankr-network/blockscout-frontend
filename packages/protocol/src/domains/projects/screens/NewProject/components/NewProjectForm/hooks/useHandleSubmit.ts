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
            selectedMainnetIds = [],
            selectedTestnetIds = [],
            selectedDevnetIds = [],
          } = values;

          /* validation start */
          if (
            selectedMainnetIds.length === 0 &&
            selectedTestnetIds.length === 0 &&
            selectedDevnetIds.length === 0
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
            selectedMainnetIds,
            selectedTestnetIds,
            selectedDevnetIds,
          });
        }

        case NewProjectStep.Whitelist: {
          const { whitelistItems, tokenIndex } = values;

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

          const userEndpointToken = await handleWhitelistStepOnSubmit(
            tokenIndex,
          );

          if (userEndpointToken) {
            return onSubmit(step, {
              whitelistItems,
              userEndpointToken,
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
          const { isSuccess, shouldRedirectToStripe } =
            await handleEnableWhitelist(false);

          if (isSuccess) {
            history.push(ProjectsRoutesConfig.projects.generatePath());
            handleResetConfig();

            return null;
          }

          if (!planPrice) return null;

          const price = getFinalPrice(whitelistItems, planPrice);

          const url = await handleCheckoutStepOnSubmit(price);

          if (url && shouldRedirectToStripe) {
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
