import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { utils } from 'ethers';
import { t } from '@ankr.com/common';
import { useHistory } from 'react-router';

import {
  NewProjectFormValues,
  NewProjectFormProps,
} from '../NewProjectFormTypes';
import { NewProjectStep } from 'domains/projects/types';
import { useWhitelistStepOnSubmit } from './useWhitelistStepOnSubmit';
import { useCheckoutStepOnSubmit } from './useCheckoutStepOnSubmit';
import { setTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { TopUpOrigin } from 'domains/account/types';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

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
            chainId,
            subChainId,
            chainName,
            chainType,
            groupId,
          } = values;

          /* validation start */
          if (!subChainId) {
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
            chainId,
            subChainId,
            chainName,
            chainType,
            groupId,
          });
        }

        case NewProjectStep.Whitelist: {
          const { contractAddress, tokenIndex } = values;

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

          if (!contractAddress) {
            return {
              contractAddress: t(
                'projects.new-project.step-2.error-message.required',
              ),
            };
          }

          if (!utils.isAddress(contractAddress)) {
            return {
              contractAddress: t(
                'projects.new-project.step-2.error-message.invalid',
              ),
            };
          }
          /* validation end */

          const userEndpointToken = await handleWhitelistStepOnSubmit(
            tokenIndex,
          );

          if (userEndpointToken) {
            return onSubmit(step, {
              contractAddress,
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
          const { planPrice } = values;
          const isSuccess = await handleEnableWhitelist(false);

          if (isSuccess) {
            history.push(ProjectsRoutesConfig.projects.generatePath());
            handleResetConfig();

            return null;
          }

          if (!planPrice) return null;

          const url = await handleCheckoutStepOnSubmit(planPrice);

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
