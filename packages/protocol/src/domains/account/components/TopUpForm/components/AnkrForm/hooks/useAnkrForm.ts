import { AnkrFormProps } from '../types';
import { useInitialValues } from './useInitialValues';
import { useRenderForm } from './useRenderForm';
import { useSubmitHandler } from './useSubmitHandler';
import { useTopUpTransaction } from './useTopUpTransaction';
import { useValidator } from './useValidator';

export const useAnkrForm = ({
  handleOpenEmailDialog,
  onBundleBannerClick,
  shouldUseDefaultValue = false,
  trackSubmit,
  hasEmailBound,
}: AnkrFormProps) => {
  const { amount: transactionAmount, isProcessing: isTopUpProcessing } =
    useTopUpTransaction();

  const initialValues = useInitialValues({
    isTopUpProcessing,
    shouldUseDefaultValue,
    transactionAmount,
  });

  const validateAmount = useValidator();

  const renderForm = useRenderForm({
    isTopUpProcessing,
    onBundleBannerClick,
    validateAmount,
  });

  const handleSubmit = useSubmitHandler({
    handleOpenEmailDialog,
    hasEmailBound,
    trackSubmit,
    validateAmount,
  });

  return { handleSubmit, initialValues, renderForm };
};
