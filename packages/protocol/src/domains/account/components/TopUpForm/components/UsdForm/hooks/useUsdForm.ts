import { UsdFormProps } from '../types';
import { useInitialValues } from './useInitialValues';
import { useRenderForm } from './useRenderForm';
import { useSubmitHandler } from '../../AnkrForm/hooks/useSubmitHandler';
import { validateAmount } from '../../../../TopUp/USDTopUpForm/USDTopUpFormUtils';

export const useUsdForm = ({
  handleOpenEmailDialog,
  hasEmailBound,
  onBundleBannerClick,
  priceId,
  shouldUseDefaultValue = false,
  trackSubmit,
}: UsdFormProps) => {
  const initialValues = useInitialValues({
    priceId,
    shouldUseDefaultValue,
  });

  const renderForm = useRenderForm({
    onBundleBannerClick,
    shouldUseDefaultValue,
  });

  const handleSubmit = useSubmitHandler({
    handleOpenEmailDialog,
    hasEmailBound,
    trackSubmit,
    validateAmount,
  });

  return { onSubmit: handleSubmit, initialValues, renderForm };
};
